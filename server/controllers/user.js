const brycpt = require("bcryptjs");
const models = require("../models")
const { sequelize } = require("../models");
const User = models.User;
const FriendRequest = models.Friend_request;


exports.userUpdate = async (req, res, next) => {
  const userId = req.user.userId;
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
  const userId = req.user.userId;

  try {
    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ["password", "activationToken", "activated"],
      },
    });
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

exports.sendFriendRequest = async (req, res, next) => {
  try {
    if (req.user.userId !== req.body.requesteedId) {
      const existRequest = await FriendRequest.findOne({
        where: {
          requester: req.user.userId,
          recipient: req.body.requesteedId,
        }
      })
      if (existRequest) {
        const error = new Error("Friend request allready exist");
        error.statusCode = 400;
        return next(error);
      }
      await FriendRequest.create({
        requester: req.user.userId,
        recipient: req.body.requesteedId,
        status: 0 //0 - for pending
      })
      res.json({
        status: "ok",
        message: "Request was send",
      })
    } else {
      const error = new Error("Cannot send friend request to yourself");
      error.statusCode = 400;
      return next(error);
    }
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};
