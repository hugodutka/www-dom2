import express = require("express");
import { handleAsyncErrors } from "../utils";
import { authorizeUser } from "../middleware";
import { cmpPassword } from "../auth";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/login",
  handleAsyncErrors(async (req, res, _next) => {
    const user = await User.getByUsername(res.locals.db, req.body.username);
    if (user === null || !(await cmpPassword(req.body.password, user.passwordHash))) {
      throw { message: "invalid credentials", status: 401 };
    }
    req.session.userId = user.id;
    req.session.sessionId = user.validSessionId;
    return res.json({ ok: true, username: user.username });
  })
);

router.post("/logout", (req, res, _next) => {
  req.session.userId = undefined;
  req.session.sessionId = undefined;
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
