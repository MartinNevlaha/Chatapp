const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Enterd data is incorrect");
    error.statusCode = 422;
    return next(error);
  }
  return next();
};
