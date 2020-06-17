import { get, all } from "../db";

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
    quizId: this.quizId,
    question: this.question,
    answer: this.answer,
    penalty: this.penalty,
  });
}
