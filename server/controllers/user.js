const User = require("../models/").User;

exports.userUpdate = async (req, res, next) => {
  const userId = req.user.userId;
  console.log(userId);
  try {
    const [rows, result] = await User.update(req.body, {
      where: {
        id: userId,
      },
      returning: true,
      individualHooks: true,
    });
    const user = result[0].get({ raw: true });
    user.avatar = result[0].avatar
    delete user.password;
    res.json({
      status: "ok",
      message: "User successfully update",
      user: user
    })
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};
