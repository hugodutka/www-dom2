export const handleAsyncErrors = (func: Function): Function => async (
  req,
  res,
  next
) => {
  try {
    await func(req, res, next);
  } catch (err) {
    next(err);
  }
};
