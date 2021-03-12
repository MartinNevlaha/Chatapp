const { body } = require("express-validator");

exports.rules = (() => {
  return [body("text").trim().isString().notEmpty().isLength({ max: 250 })];
})();
