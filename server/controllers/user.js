const brycpt = require("bcryptjs");
const models = require("../models")
const { sequelize } = require("../models");
const User = models.User;
const FriendRequest = models.FriendRequest;


exports.userUpdate = async (req, res, next) => {
  const userId = req.user.id;
  if (req.file) {
    req.body.avatar = req.file.filename;
  }
  if (typeof req.body.avatar !== "undefined" && req.body.avatar.length === 0) {
    delete req.body.avatar;
  }
  if (
    typeof req.body.oldPassword !== "undefined" &&
    req.body.oldPassword === 0
  ) {
    delete req.body.oldPassword;
    delete req.body.newPassword;
  }
  try {
    const { firstName, lastName, email, newPassword, avatar } = req.body;
    let data;
    if (req.body.oldPassword && req.body.newPassword) {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      const isPwdValid = await brycpt.compare(
        req.body.oldPassword,
        user.password
      );
      if (!isPwdValid) {
        const error = new Error(
          "Invalid old password entered, please try again"
        );
        error.statusCode = 401;
        return next(error);
      }
      data = {
        firstName,
        lastName,
        email,
        password: newPassword,
        avatar,
      };
    } else {
      data = {
        firstName,
        lastName,
        email,
        avatar,
      };
    }

    const [rows, result] = await User.update(data, {
      where: {
        id: userId,
      },
      returning: true,
      individualHooks: true,
    });
    const user = result[0].get({ raw: true });
    user.avatar = result[0].avatar;
    user.fullName = result[0].firstName + " " + result[0].lastName;
    delete user.password;
    delete user.activated;
    delete user.activationToken;

    res.json({
      status: "ok",
      message: "User successfully update",
      user: user,
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

exports.userProfile = async (req, res, next) => {
  const user = req.user

  try {
    if (!user) {
      const error = new Error("Cant get user profile data");
      error.statusCode = 404;
      return next(error);
    }
    res.json({
      status: "ok",
      message: "User profile info successfully fetched",
      user: user,
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};


