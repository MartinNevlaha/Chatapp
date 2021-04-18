const { Op } = require("sequelize");
const models = require("../models");
const { Friendship } = models;

const friendStatus = require("../config/friendRequestStatus");

const isFriend = async (req, res, next) => {
  let friendId;
  let friend; 
  if (req.body.friendId) {
    friendId = +req.body.friendId;
  } else if (req.params.userId) {
    friendId = +req.params.userId;
  } else if (req.query.userId) {
    friendId = +req.query.userId
  }
  try {
    if (+req.user.id !== friendId) {
    const userFriendship = await Friendship.findAll({
      where: {
        [Op.or]: [
          {
            user_1: req.user.id,
            user_2: friendId,
          },
          {
            user_1: friendId,
            user_2: req.user.id,
          },
        ],
      },
      raw: true,
    });

    if (userFriendship.length === 0) {
        friend = friendStatus.doesntExist;
    } else if (userFriendship[0].status === friendStatus.accept) {
      friend = friendStatus.accept;
    } else if (userFriendship[0].status === friendStatus.pending) {
      friend = friendStatus.pending;
    } else if (userFriendship[0].status === friendStatus.reject) {
      friend = friendStatus.reject;
    } 
    } else {
      friend = friendStatus.myself
    }
    req.isFriend = friend;
    next();
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
      return next(error);
    }
  }
};

module.exports = isFriend;
