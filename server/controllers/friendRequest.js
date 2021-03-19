const models = require("../models");
const { sequelize } = require("../models");
const User = models.User;
const Friendship = models.Friendship;

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
    if (!friendRequest) {
      const error = new Error("Cant find any friend requests");
      error.statusCode = 404;
      return next(error);
    }
    res.json({
      status: "Ok",
      message: "Fetch list of request successfully",
      requests: friendRequest,
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
    const friendship = await Friendship.findByPk(requestId, { raw: true });
    if (!friendship) {
      const error = new Error(`Request with id ${requestId} doesnt exists`);
      error.statusCode = 404;
      return next(error);
    }
    if (req.user.id === friendship.userId) {
      const error = new Error("You are not friend request recipient");
      error.statusCode = 409;
      return next(error);
    }
    const t = await sequelize.transaction();

    const updatedFriendship = await Friendship.update(
      { status: req.body.answer },
      {
        where: {
          id: requestId,
        },
        returning: true,
        raw: true,
      },
      { transaction: t }
    );
    if (!updatedFriendship) {
      const error = new Error("Cant response to friendship request");
      error.statusCode = 500;
      return next(error);
    }
    const boothsideExist = await Friendship.findOne({
      where: {
        userId: friendship.friendId,
        friendId: friendship.userId,
      },
    });
    if (!boothsideExist) {
      const reverseFriendShip = await Friendship.create(
        {
          userId: friendship.friendId,
          friendId: friendship.userId,
          status: req.body.answer,
        },
        { transaction: t }
      );
      if (!reverseFriendShip) {
        const error = new Error("Cant response to friendship request");
        error.statusCode = 500;
        return next(error);
      }
    }
    await t.commit();
    let message;
    if (req.body.answer === "1") {
      message = "Friend request was accepted";
    } else if (req.body.answer === "2") {
      message = "Friend request was rejected";
    }

    res.json({
      status: "Ok",
      message,
      answer: updatedFriendship[1][0],
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
    const friendship = await Friendship.findByPk(requestId, { raw: true });
    if (!friendship) {
      const error = new Error("Friendship request doesnt exist");
      error.statusCode = 404;
      return next(error);
    }
    const reverseFriendship = await Friendship.findOne({
      where: {
        userId: friendship.friendId,
        friendId: friendship.userId,
      },
      raw: true,
    });
    let arrayOfId = [requestId];
    if (reverseFriendship) {
      arrayOfId.push(reverseFriendship.id);
    }
    await Friendship.destroy({
      where: { id: arrayOfId },
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
