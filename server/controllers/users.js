const User = require("../models/").User;

exports.getUsers = async (req, res, next) => {
  const page = req.query.page;
  const limit = req.query.limit;
  
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  try {
    const users = await User.findAll({
      where: {
        activated: true
      },
      attributes: {
        exclude: ["password", "activationToken", "activated", "email"]
      },
      limit: limit,
      order: [["id", "ASC"]]
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