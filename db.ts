const { Database } = require("sqlite3");
const { promisify } = require("util");
const { hashPassword } = require("./auth");
import { quizDefinitions } from "./data/quiz";

export const newDB = () => new Database("db.sqlite");
export const run = (db) => promisify(db.run.bind(db));
export const get = (db) => promisify(db.get.bind(db));
export const all = (db) => promisify(db.all.bind(db));

export const setupDB = async (db) => {
  await run(db)("BEGIN TRANSACTION;");
  await run(db)("DROP TABLE IF EXISTS user;");
  await run(db)("DROP TABLE IF EXISTS quiz;");
  await run(db)("DROP TABLE IF EXISTS question;");
  await run(db)("DROP TABLE IF EXISTS userAnswer;");
  await run(db)(`
    CREATE TABLE IF NOT EXISTS user (
      id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
      username text NOT NULL UNIQUE,
      passwordHash text NOT NULL,
      validSessionId integer NOT NULL DEFAULT 0
    );
  `);
  await run(db)(`
    CREATE TABLE IF NOT EXISTS quiz (
      id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
      title text NOT NULL,
      description text NOT NULL
    );
  `);
  await run(db)(`
    CREATE TABLE IF NOT EXISTS question (
      id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
      quizId integer NOT NULL,
      sequence integer NOT NULL,
      question text NOT NULL,
      answer text NOT NULL,
      penalty integer NOT NULL,

      UNIQUE (quizId, sequence),
      FOREIGN KEY (quizId) REFERENCES quiz(id)
    );
  `);
  await run(db)(`
    CREATE TABLE IF NOT EXISTS userAnswer (
      id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
      userId integer NOT NULL,
      questionId integer NOT NULL,
      answer text NOT NULL,

      UNIQUE (userId, questionId),
      FOREIGN KEY (userId) REFERENCES user(id),
      FOREIGN KEY (questionId) REFERENCES question(id)
    );
  `);
  for (const [i, { title, description, questions }] of quizDefinitions.entries()) {
    const quizId = i + 1;
    await run(db)(
      "INSERT INTO quiz (id, title, description) VALUES (?, ?, ?);",
      quizId,
      title,
      description
    );
    for (const [j, { question, answer, penalty }] of questions.entries()) {
      await run(db)(
        `INSERT INTO question (quizId, sequence, question, answer, penalty)
         VALUES (?, ?, ?, ?, ?);`,
        quizId,
        j,
        question,
        answer,
        penalty
      );
    }
  }
  await run(db)(
    "INSERT INTO user (username, passwordHash) VALUES (?, ?)",
    "hugo",
    await hashPassword("password")
  );
  await run(db)("COMMIT TRANSACTION;");
};
