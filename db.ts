const { Database } = require("sqlite3");
const { promisify } = require("util");
const { hashPassword } = require("./auth");

export const newDB = () => new Database("db.sqlite");
export const run = (db) => promisify(db.run.bind(db));
export const get = (db) => promisify(db.get.bind(db));
export const all = (db) => promisify(db.all.bind(db));

export const setupDB = async (db) => {
  await run(db)("BEGIN TRANSACTION;");
  await run(db)("DROP TABLE IF EXISTS user;");
  await run(db)(`
    CREATE TABLE IF NOT EXISTS user (
      id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
      username text NOT NULL UNIQUE,
      passwordHash text NOT NULL
    );
  `);
  await run(db)(
    "INSERT INTO user (username, passwordHash) VALUES (?, ?)",
    "hugo",
    await hashPassword("password")
  );
  await run(db)("COMMIT TRANSACTION;");
};
