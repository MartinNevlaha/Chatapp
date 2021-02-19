const { body } = require("express-validator");

exports.rules = (() => {
  return [
    body("email").trim().notEmpty().isString().isEmail(),
    body("password").trim().notEmpty().isString().isLength({ min: 6 }),
  ];
})();
