const User = require("../models/User");
const logger = require("../config/winston");
const timestamp = require("time-stamp");

exports.cleanUpInactiveUsers = async () => {
  try {
    let inactiveArrayEmails = [];
    const inactiveUsers = await User.findAll({
      where: {
        activated: false,
      },
    });
    inactiveUsers.forEach((user) => inactiveArrayEmails.push(user.email));
    await User.destroy({ where: { email: inactiveArrayEmails } });
    logger.log({
      time: timestamp("YYYY/MM/DD/HH:mm:ss"),
      level: "info",
      message: `Users with emails ${inactiveArrayEmails.toString()} was deleted due to inactivated email status`,
    });
  } catch (error) {
    logger.error({
      time: timestamp("YYYY/MM/DD/HH:mm:ss"),
      level: "error",
      message: error,
    });
  }
};
