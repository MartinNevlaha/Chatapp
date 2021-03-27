const { Op } = require("sequelize");
const models = require("../models");
const { Friendship } = models;


const isFriend = async (req, res, next) => {
  try {
    const userFriendship = await Friendship.findAll({
      where: {
        [Op.or]: [
          {
            user_1: req.user.id,
            user_2: req.body.friendId,
            status: 1,
          },
          {
            user_1: req.body.friendId,
            user_2: req.user.id,
            status: 1,
          },
        ],
      },
    });
    if (userFriendship) {
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