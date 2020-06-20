import { handleAsyncErrors } from "./utils";
import { newDB, rollbackTransaction } from "./db";
import { User } from "./models/user";

export const provideDB = (_req, res, next) => {
  res.locals.db = newDB();
  next();
};

export const cleanUpDB = async (_req, res, next) => {
  try {
    if (res.locals.db && res.locals.db.transactionOpen) {
      await rollbackTransaction(res.locals.db);
    }
  } catch (err) {
    console.error("Ignoring error:");
    console.error(err);
  }
  next();
};

export const putCSRFTokenInCookies = (req, res, next) => {
  res.cookie("CSRF-Token", req.csrfToken());
  next();
};

export const authorizeUser = handleAsyncErrors(async (req, res, next) => {
  if (!req.session.userId) throw { status: 401, message: "you are not logged in" };
  const user = await User.getById(res.locals.db, req.session.userId);
  if (user.validSessionId !== req.session.sessionId)
    throw { status: 401, message: "you were logged out" };
  res.locals.user = user;
  next();
});
