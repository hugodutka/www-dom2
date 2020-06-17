import express = require("express");
import { handleAsyncErrors } from "../utils";
import { authorizeUser } from "../middleware";
import { cmpPassword, prepareTokens } from "../auth";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/login",
  handleAsyncErrors(async (req, res, _next) => {
    const user = await User.getByUsername(res.locals.db, req.body.username);
    if (user === null || !(await cmpPassword(req.body.password, user.passwordHash))) {
      throw { message: "invalid credentials", status: 401 };
    }
    const [token, csrf, maxAge] = prepareTokens(user);
    res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
    res.cookie("csrf", csrf, { maxAge: maxAge * 1000, httpOnly: false });
    return res.json({ ok: true });
  })
);

router.post("/logout", (_req, res, _next) => {
  res.cookie("jwt", "", { expires: new Date(0) });
  res.cookie("csrf", "", { expires: new Date(0) });
  return res.json({ ok: true });
});

router.post(
  "/changePassword",
  authorizeUser,
  handleAsyncErrors(async (req, res, _next) => {
    if (!req.body.password) throw { status: 400, message: "missing password field" };
    await res.locals.user.changePassword(res.locals.db, req.body.password);
    return res.json({ ok: true });
  })
);

export const authRouter = router;
