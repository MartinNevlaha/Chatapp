const { Op } = require("sequelize");
const models = require("../models");
const { Friendship } = models;


const isFriend = async (req, res, next) => {
  let friendId;
  if (req.body.friendId) {
    friendId = req.body.friendId;
  } else if (req.params.friendId) {
    friendId = req.params.friendId
  }
  try {
    const userFriendship = await Friendship.findAll({
      where: {
        [Op.or]: [
          {
            user_1: req.user.id,
            user_2: friendId,
            status: 1,
          },
          {
            user_1: req.body.friendId,
            user_2: friendId,
            status: 1,
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