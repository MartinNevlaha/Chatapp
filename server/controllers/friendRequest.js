const User = require("../models").User;
const Friendship = require("../models").Friendship;

exports.sendFriendRequest = async (req, res, next) => {
  try {
    if (req.user.id !== req.body.recipientId) {
      const existRequest = await Friendship.findOne({
        where: {
          userId: req.user.id,
          friendId: req.body.friendId,
        },
      });
      if (existRequest) {
        const error = new Error("Friend request allready exist");
        error.statusCode = 400;
        return next(error);
      }
      await Friendship.create({
        userId: req.user.id,
        friendId: req.body.friendId,
      });
      res.json({
        status: "Ok",
        message: "Request was send",
      });
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

exports.getPendingFriendRequest = async (req, res, next) => {
  try {
    const friendRequest = await Friendship.findAll({
      where: {
        friendId: req.user.id,
        status: 0,
      },
      include: {
        model: User,
        attributes: {
          exclude: ["password", "activationToken", "activated", "email"],
        },
      },
    });
    res.json({
      status: "Ok",
      message: "Fetch list of request successfully",
      request: friendRequest[0].User,
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};
