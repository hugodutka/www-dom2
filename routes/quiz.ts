import express = require("express");
import { handleAsyncErrors } from "../utils";
import { authorizeUser } from "../middleware";
import { Quiz } from "../models/quiz";

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
    const quiz = await Quiz.getById(res.locals.db, req.params.quizId);
    if (!quiz) throw { status: 404, message: "quiz not found" };
    return res.json(quiz.toObject());
  })
);

export const quizRouter = router;
