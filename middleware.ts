import { verifyTokens } from "./auth";
import { handleAsyncErrors } from "./utils";
import { newDB } from "./db";
import { User } from "./models/user";

export const provideDB = (_req, res, next) => {
  res.locals.db = newDB();
  next();
};

export const authorizeUser = handleAsyncErrors(async (req, res, next) => {
  const jwt = req.cookies.jwt;
  const csrf = req.header("X-CSRF-TOKEN");
  if (!jwt) throw { status: 401, message: "missing jwt" };
  if (!csrf) throw { status: 401, message: "missing csrf token" };
  const [valid, info, errMsg] = verifyTokens(jwt, csrf);
  if (!valid) throw { status: 401, message: errMsg };
  const user = await User.getById(res.locals.db, info.userId);
  if (user.jwtId !== info.jwtId) throw { status: 401, message: "you were logged out" };
  res.locals.user = user;
  next();
});
