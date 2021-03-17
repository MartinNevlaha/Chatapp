const User = require("../models").User;
const Friendship = require("../models").Friendship;

exports.sendFriendRequest = async (req, res, next) => {
  try {
    if (req.user.id !== +req.body.friendId) {
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
      res.status(201).json({
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
      request: friendRequest,
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

exports.answerFriendshipRequest = async (req, res, next) => {
  const requestId = req.params.requestId;
  try {
    const friendship = await Friendship.findByPk(requestId);
    if (!friendship) {
      const error = new Error(`Request with id ${requestId} doesnt exists`);
      error.statusCode = 404;
      return next(error);
    }
    const updatedFriendship = await Friendship.update(
      { status: req.body.answer },
      {
        where: {
          id: requestId,
        },
        returning: true,
      }
    );
    if (!updatedFriendship) {
      const error = new Error("Cant response to friendship request");
      error.statusCode = 500;
      return next(error);
    }
    res.json({
      status: "Ok",
      message: "Response to friendship request was save",
      answer: updatedFriendship[1],
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

exports.deleteFriendShip = async (req, res, next) => {
  const requestId = req.params.requestId;
  try {
    const friendship = await Friendship.findOne({
      where: {
        id: requestId,
      },
    });
    if (!friendship) {
      const error = new Error("Friendship request doesnt exist");
      error.statusCode = 404;
      return next(error);
    }
    await Friendship.destroy({
      where: {
        id: requestId,
      },
    });
    res.json({
      status: "Ok",
      message: "Friendship was deleted",
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};
