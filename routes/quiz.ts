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
    await commitTransaction(res.locals.db);
    return res.json({ quiz: quiz.toObject(), answers: answers.map((a) => a.toObject()) });
  })
);

router.post(
  "/:quizId(\\d+)/solve",
  authorizeUser,
  handleAsyncErrors(async (req, res, _next) => {
    await beginTransaction(res.locals.db, true);
    const quiz = await Quiz.getById(res.locals.db, req.params.quizId);
    if (!quiz) throw { status: 404, message: "quiz not found" };
    var answers;
    try {
      answers = req.body.answers.map(
        ({ questionId, answer }) => new Answer(0, res.locals.user.id, questionId, answer, 1000)
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
