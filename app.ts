import createError = require("http-errors");
import express = require("express");
import cookieParser = require("cookie-parser");
import session = require("express-session");
import csrf = require("csurf");
import { authRouter } from "./routes/auth";
import { quizRouter } from "./routes/quiz";
import { provideDB, cleanUpDB, putCSRFTokenInCookies } from "./middleware";
import { sessionSecret } from "./config";
import { newDB, setupDB } from "./db";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrf({ cookie: true }));
app.use(provideDB);
app.use(putCSRFTokenInCookies);
app.use(
  session({
    secret: sessionSecret,
    cookie: { maxAge: 60 * 60 * 1000 }, // one hour
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/auth", authRouter);
app.use("/quiz", quizRouter);
app.use(express.static("./front/public"));

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  const status = err.status || 500;
  if (status === 500) console.trace(err.stack);
  // render the error page
  res.status(status);
  res.json({
    error: status,
    message: status === 500 ? "internal server error" : err.message,
  });

  next();
});

app.use(cleanUpDB);

const port = 3000;
app.listen(port, async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    await setupDB(newDB());
  } catch (err) {
    console.trace(err.stack);
    process.exit(1);
  }
  console.log(`Server listening at http://localhost:${port}`);
  app.emit("serverListening");
});

export default app;
