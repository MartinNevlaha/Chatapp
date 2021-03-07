const { body } = require("express-validator");

exports.rules = (()=>{
  return [
    body("recipientId").trim().notEmpty().isFloat()
  ]
})();