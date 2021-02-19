const { body } = require("express-validator");

exports.rules = (() => {
  return [
    body("firstName").trim().notEmpty().isString().isLength({ max: 20 }),
    body("lastName").trim().notEmpty().isString().isLength({ max: 20 }),
    body("email").trim().notEmpty().isString().isEmail(),
    body("password").trim().notEmpty().isString().isLength({ min: 6 }),
  ];
})();
