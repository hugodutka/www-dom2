import createError = require("http-errors");
import express = require("express");
import cookieParser = require("cookie-parser");
import indexRouter = require("./routes/index");
const { newDB, setupDB } = require("./db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("./front/public"));

app.use((_req, res, next) => {
  res.locals.db = newDB();
  next();
});

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  const status = err.status || 500;
  // render the error page
  res.status(status);
  res.json({ error: status, message: err.message });
});

const port = 3000;
app.listen(port, async () => {
  await setupDB(newDB());
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;
