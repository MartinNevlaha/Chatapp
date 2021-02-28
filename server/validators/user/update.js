const { body } = require("express-validator");

exports.rules = (() => {
  return [
    body("firstName").trim().notEmpty().isString().isLength({ max: 20 }),
    body("lastName").trim().notEmpty().isString().isLength({ max: 20 }),
    body("email").trim().notEmpty().isString().isEmail(),
    body("oldPassword").optional({ checkFalsy: true }).isLength({ min: 6 }),
    body("newPassword").optional({ checkFalsy: true }).isLength({ min: 6 }),
  ];
})();
