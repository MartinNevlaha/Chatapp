const User = require("../models/").User;

exports.getActiveUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        activated: true
      },
      attributes: {
        exclude: ["password", "activationToken", "activated", "email"]
      }
    });
    if (!users) {
      const error = new Error("Cant find any active user");
      error.statusCode = 404;
      return next(error);
    }
    res.json({
      status: "ok",
      message: "Users successfully loaded",
      users: users
    })
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};