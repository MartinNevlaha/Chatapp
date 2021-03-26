const { body } = require("express-validator");

exports.rules = (() => {
  return [body("textContent").trim().isString().notEmpty().isLength({ max: 255 })];
})();
