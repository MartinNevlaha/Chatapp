const { body } = require("express-validator");

exports.rules = (() => {
  return [
    body("friendId").trim().isInt(),
  ];
})();
