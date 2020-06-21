const { Database } = require("sqlite3");
const { promisify } = require("util");
const { hashPassword } = require("./auth");
import { userDefinitions, quizDefinitions, answerDefinitions } from "./seed";

export const newDB = () => new Database("db.sqlite");
const retry = (f: Function, maxTries: number) => async (...args) => {
  var tries = 0;
  while (true) {
    tries += 1;
    try {
      return await f(...args);
    } catch (err) {
      if (tries >= maxTries) throw err;
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
};
export const run = (db) => retry(promisify(db.run.bind(db)), 3);
export const get = (db) => retry(promisify(db.get.bind(db)), 3);
export const all = (db) => retry(promisify(db.all.bind(db)), 3);
export const beginTransaction = async (db, immediate = false) => {
  if (!db.transactionOpen) {
    await run(db)(`BEGIN TRANSACTION ${immediate ? "IMMEDIATE" : ""};`);
  }
  db.transactionOpen = true;
};
export const commitTransaction = async (db) => {
  if (db.transactionOpen) {
    await run(db)(`COMMIT;`);
  }
  db.transactionOpen = false;
};
export const rollbackTransaction = async (db) => {
  if (db.transactionOpen) {
    await run(db)(`ROLLBACK;`);
  }
  db.transactionOpen = false;
};

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
      time integer NOT NULL,

      UNIQUE (userId, questionId),
      FOREIGN KEY (userId) REFERENCES user(id),
      FOREIGN KEY (questionId) REFERENCES question(id)
    );
  `);
  for (const { id, title, description, questions } of quizDefinitions) {
    const quizId = id;
    await run(db)(
      "INSERT INTO quiz (id, title, description) VALUES (?, ?, ?);",
      quizId,
      title,
      description
    );
    for (const { id, question, answer, penalty } of questions) {
      await run(db)(
        `INSERT INTO question (quizId, sequence, question, answer, penalty)
         VALUES (?, ?, ?, ?, ?);`,
        quizId,
        id,
        question,
        answer,
        penalty
      );
    }
  }
  for (const { id, username, password } of userDefinitions) {
    await run(db)(
      "INSERT INTO user (id, username, passwordHash) VALUES (?, ?, ?)",
      id,
      username,
      await hashPassword(password)
    );
  }
  for (const { userId, questionId, answer, time } of answerDefinitions) {
    await run(db)(
      "INSERT INTO userAnswer (userId, questionId, answer, time) VALUES (?, ?, ?, ?)",
      userId,
      questionId,
      answer,
      time
    );
  }
  await run(db)("COMMIT TRANSACTION;");
};
