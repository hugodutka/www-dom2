import { get, all, run } from "../db";

export class Quiz {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public questions: Question[]
  ) {}

  toObject = () => ({
    id: this.id,
    title: this.title,
    description: this.description,
    questions: this.questions.map((q) => q.toObject()),
  });

  // Questions are not fetched.
  static async list(db): Promise<Quiz[]> {
    const quizzes = await all(db)("SELECT id, title, description FROM quiz;");
    return quizzes.map((q) => new Quiz(q.id, q.title, q.description, []));
  }

  static async getById(db, id: number): Promise<Quiz | null> {
    const quizPromise = get(db)("SELECT * FROM quiz WHERE id = ?;", id);
    const questionsPromise = all(db)(
      "SELECT * FROM question WHERE quizId = ? ORDER BY sequence ASC;",
      id
    );
    const quiz = await quizPromise;
    if (!quiz) return null;
    const questions = await questionsPromise;
    return new Quiz(
      quiz.id,
      quiz.title,
      quiz.description,
      questions.map((q) => new Question(q.id, q.quizId, q.question, q.answer, q.penalty))
    );
  }

  async listAnswers(db, userId: number): Promise<Answer[]> {
    const answers = await all(db)(
      `SELECT a.id, a.questionId, a.answer, a.time, a.correct
       FROM userAnswer AS a
       JOIN question AS q
       ON q.id == a.questionId
       WHERE a.userId = ? AND q.quizId = ?;`,
      userId,
      this.id
    );
    return answers.map(
      (a) => new Answer(a.id, userId, a.questionId, a.answer, a.time, Boolean(a.correct))
    );
  }

  async getScore(db, userId: number): Promise<number | null> {
    return await get(db)("SELECT score FROM userScore WHERE userId = ?", userId)
      .then(({ score }) => Number(score))
      .catch((err) => null);
  }

  async getTopScores(db, limit: number = 3): Promise<{ username: string; score: number }[]> {
    return await all(db)(
      `SELECT u.username, s.score
       FROM userScore AS s
       JOIN user AS u
       ON u.id == s.userId
       WHERE s.quizId = ?
       ORDER BY s.score ASC
       LIMIT ?;`,
      this.id,
      limit
    );
  }

  async getAnswerStats(db): Promise<{ questionId: number; avgCorrectTimeInMs: number }[]> {
    return await all(db)(
      `SELECT questionId, AVG(time)
      FROM userAnswer
      WHERE correct = 1 AND questionId IN (
        SELECT question.id
        FROM question
        JOIN quiz
        ON quiz.id = question.quizId
        WHERE quiz.id = ?
      )
      GROUP BY questionId;`,
      this.id
    ).then((results) =>
      results.map((r) => ({
        questionId: Number(r.questionId),
        avgCorrectTimeInMs: Number(r["AVG(time)"]),
      }))
    );
  }

  // Must be run inside a transaction.
  async solve(db, userId: number, answers: Answer[]): Promise<Error | undefined> {
    const prevAnswers = await this.listAnswers(db, userId);
    if (prevAnswers.length !== 0) {
      return new Error("a quiz can only be solved once");
    }

    const questionsMap = this.questions.reduce((acc, q) => {
      acc.set(q.id, q);
      return acc;
    }, new Map());

    if (
      questionsMap.size !== answers.length ||
      !answers.every((ans) => Boolean(questionsMap.get(ans.questionId)))
    ) {
      return new Error("all questions must be answered exactly once");
    }

    var score = 0;
    for (const a of answers) {
      const question = questionsMap.get(a.questionId);
      a.correct = a.answer === question.answer;
      score += a.time / 1000 + (a.correct ? 0 : question.penalty);
    }
    score = Math.round(score);

    for (const a of answers) {
      await run(db)(
        `INSERT INTO userAnswer (userId, questionId, answer, time, correct)
         VALUES (?, ?, ?, ?, ?)`,
        a.userId,
        a.questionId,
        a.answer,
        a.time,
        a.correct
      );
    }

    await run(db)(
      "INSERT INTO userScore (userId, quizId, score) VALUES (?, ?, ?)",
      userId,
      this.id,
      score
    );
  }
}

export class Question {
  constructor(
    public id: number,
    public quizId: number,
    public question: string,
    public answer: string,
    public penalty: number
  ) {}

  toObject = () => ({
    id: this.id,
    question: this.question,
    penalty: this.penalty,
    answer: this.answer,
  });
}

export class Answer {
  constructor(
    public id: number,
    public userId: number,
    public questionId: number,
    public answer: string,
    public time: number,
    public correct: boolean = false
  ) {
    if (typeof id != "number") throw new Error("id must be a number");
    if (typeof userId != "number") throw new Error("userId must be a number");
    if (typeof questionId != "number") throw new Error("questionId must be a number");
    if (typeof answer != "string") throw new Error("answer must be a string");
    if (typeof time != "number") throw new Error("time must be a number");
    if (typeof correct != "boolean") throw new Error("correct must be a boolean");
  }

  toObject = () => ({
    questionId: this.questionId,
    answer: this.answer,
    time: this.time,
    correct: this.correct,
  });
}
