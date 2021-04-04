const { Op } = require("sequelize");
const models = require("../models");
const { Friendship } = models;

const friendStatus = require("../config/friendRequestStatus");


const isFriend = async (req, res, next) => {
  let friendId;
  if (req.body.friendId) {
    friendId = req.body.friendId;
  } else if (req.params.userId) {
    friendId = req.params.userId
  }
  try {
    const userFriendship = await Friendship.findAll({
      where: {
        [Op.or]: [
          {
            user_1: req.user.id,
            user_2: friendId,
            status: friendStatus.accept,
          },
          {
            user_1: friendId,
            user_2: req.user.id,
            status: friendStatus.accept,
          },
        ],
      },
      raw: true
    });
    if (userFriendship.length > 0) {
      req.isFriend = true;
    } else {
      req.isFriend = false;
    }
    next();
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
      return next(error);
    }
  }
};

module.exports = isFriend;