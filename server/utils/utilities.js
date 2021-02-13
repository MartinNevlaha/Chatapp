const bcrypt = require("bcryptjs");

exports.hashPwd = (pwd) => {
  return bcrypt.hashSync(pwd, 12);
}