import path = require("path");
import express = require("express");

const router = express.Router();

router.get("/", (_req, res, _next) => {
  res.sendFile(path.join(__dirname, "../front/public/index.html"));
});

export const indexRouter = router;
