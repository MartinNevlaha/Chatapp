const bcrypt = require("bcryptjs");


exports.hashPwd = async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 12);
  }

  return user;
};




