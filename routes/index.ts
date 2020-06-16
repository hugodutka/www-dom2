import path = require("path");
import express = require("express");
import { handleAsyncErrors } from "../utils";
import { cmpPassword, prepareTokens, verifyTokens } from "../auth";
import { User } from "../models/user";

const router = express.Router();

router.get("/", (_req, res, _next) => {
  res.sendFile(path.join(__dirname, "../front/public/index.html"));
});

router.post(
  "/login",
  handleAsyncErrors(async (req, res, _next) => {
    const user = await User.getByUsername(res.locals.db, req.body.username);
    if (
      user === null ||
      !(await cmpPassword(req.body.password, user.passwordHash))
    ) {
      throw { message: "invalid credentials", status: 401 };
    }
    const [token, csrf, maxAge] = prepareTokens(user);
    res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
    res.cookie("csrf", csrf, { maxAge: maxAge * 1000, httpOnly: false });
    return res.json({ ok: true });
  })
);

module.exports = router;
