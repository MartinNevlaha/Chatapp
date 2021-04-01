const { body } = require("express-validator");

exports.rules = (() => {
  return [
    body("friendId").trim().isInt(),
    body("likeOrUnlike").trim().isInt({ min: 0, max: 1 }),
  ];
})();
