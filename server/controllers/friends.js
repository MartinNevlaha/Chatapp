const { Op } = require("sequelize");
const models = require("../models");
const { User, Friendship } = models;

exports.getFriends = async (req, res, next) => {
  try {
    const userFriendship = await Friendship.findAll({
      where: {
        [Op.or]: [
          {
            user_1: req.user.id,
            status: 1,
          },
          {
            user_2: req.user.id,
            status: 1,
          },
        ],
      },
      include: [
        {
          model: User,
          as: "requestor",
          attributes: {
            exclude: ["password", "activationToken", "activated", "email"],
          },
        },
        {
          model: User,
          attributes: {
            exclude: ["password", "activationToken", "activated", "email"],
          },
        },
      ],
    });
    if (!userFriendship) {
      const error = new Error("Cant fetch list of friends");
      error.statusCode = 404;
      return next(error);
    }

    let friends = [];
    userFriendship.forEach((friendship) => {
      if (friendship.requestor.id === req.user.id) {
        const friendObj = {
          id: friendship.id,
          updatedAt: friendship.updatedAt,
          friend: {
            ...friendship.User.dataValues,
          },
        };
        friends.push(friendObj);
      } else {
        const friendObj = {
          id: friendship.id,
          updatedAt: friendship.updatedAt,
          friend: {
            ...friendship.requestor.dataValues,
          },
        };
        friends.push(friendObj);
      }
    });
    res.json({
      status: "Ok",
      message: "Friends list was fetched",
      friends: friends,
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};
