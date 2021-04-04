const { Op } = require("sequelize");
const models = require("../models");
const { User, Friendship } = models;

const { getFriendHelper } = require("../utils/utilities");
const friendStatus = require("../config/friendRequestStatus");

exports.getFriends = async (req, res, next) => {
  try {
    const userFriendship = await Friendship.findAll({
      where: {
        [Op.or]: [
          {
            user_1: req.user.id,
            status: friendStatus.accept,
          },
          {
            user_2: req.user.id,
            status: friendStatus.accept,
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
    const friends = getFriendHelper(userFriendship, req.user.id);
    res.json({
      status: "Ok",
      message: "Friends list was fetched",
      friendships: friends,
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};
