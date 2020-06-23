import express = require("express");
import { handleAsyncErrors } from "../utils";
import { authorizeUser } from "../middleware";
import { Quiz, Answer } from "../models/quiz";
import { beginTransaction, commitTransaction } from "../db";

const router = express.Router();

router.get(
  "/list",
  authorizeUser,
  handleAsyncErrors(async (_req, res, _next) => {
    const quizzes = await Quiz.list(res.locals.db);
    return res.json({
      quizzes: quizzes.map((q) => ({ ...q.toObject(), questions: undefined })),
    });
  })
);

router.get(
  "/:quizId(\\d+)",
  authorizeUser,
  handleAsyncErrors(async (req, res, _next) => {
    await beginTransaction(res.locals.db);
    const quiz = await Quiz.getById(res.locals.db, req.params.quizId);
    if (!quiz) throw { status: 404, message: "quiz not found" };
    const answers = await quiz.listAnswers(res.locals.db, res.locals.user.id);
    const topScores = await quiz.getTopScores(res.locals.db, 3);
    const answerStats = await quiz.getAnswerStats(res.locals.db);
    await commitTransaction(res.locals.db);
    if (!req.session.quizGetTimes) {
      req.session.quizGetTimes = {};
    }
    req.session.quizGetTimes[quiz.id] = Date.now();
    return res.json({
      quiz: quiz.toObject(),
      answers: answers.map((a) => a.toObject()),
      topScores,
      answerStats,
    });
  })
);

router.post(
  "/:quizId(\\d+)/solve",
  authorizeUser,
  handleAsyncErrors(async (req, res, _next) => {
    await beginTransaction(res.locals.db, true);
    const quiz = await Quiz.getById(res.locals.db, req.params.quizId);
    if (!quiz) throw { status: 404, message: "quiz not found" };
    const quizGetTimes = req.session.quizGetTimes;
    if (!quizGetTimes || !quizGetTimes[quiz.id])
      throw { status: 400, message: "quiz not served before" };
    var answers;
    try {
      var timeSum = 0;
      for (const { timeFraction } of req.body.answers) {
        timeSum += Number(timeFraction);
      }
      if (Math.abs(timeSum - 100) > 0.01) throw new Error("time fractions do not sum to 100");
      const timeDelta = Date.now() - quizGetTimes[quiz.id];
      answers = req.body.answers.map(
        ({ questionId, answer, timeFraction }) =>
          new Answer(
            0,
            res.locals.user.id,
            questionId,
            answer,
            Math.round((timeFraction / 100) * timeDelta)
          )
      );
    } catch (err) {
      throw { status: 400, message: `invalid payload: ${err.message}` };
    }
    const err = await quiz.solve(res.locals.db, res.locals.user.id, answers);
    if (err) {
      throw { status: 400, message: `quiz could not be solved: ${err.message}` };
    }
    await commitTransaction(res.locals.db);
    return res.json({ ok: true });
  })
);

export const quizRouter = router;
