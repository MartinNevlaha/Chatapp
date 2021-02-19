const { validationResult } = require("express-validator");

exports.validateResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Entered data is incorrect");
    error.statusCode = 422;
    return next(error);
  }
  next();
};
