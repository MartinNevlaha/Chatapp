const { body } = require("express-validator");

exports.rules = (() => {
  return [body("answer").trim().isInt({ min: 1, max: 2 })];
})();
