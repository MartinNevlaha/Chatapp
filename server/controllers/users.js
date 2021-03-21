const User = require("../models/").User;

exports.getUsers = async (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const offset = page * limit;

  try {
    const users = await User.findAndCountAll({
      where: {
        activated: true
      },
      attributes: {
        exclude: ["password", "activationToken", "activated", "email"]
      },
      limit: limit,
      offset: offset,
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
      count: users.count,
      users: users.rows
    })
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};