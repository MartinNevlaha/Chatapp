const User = require("../models").User;
const Friendship = require("../models").Friendship;

exports.getFriends = async (req, res, next) => {
  try {
    const friends = await Friendship.findAll({
      where: {
        userId: req.user.id,
        status: 1,
      },
      include: {
        model: User,
        as: "friend",
        attributes: {
          exclude: ["password", "activationToken", "activated", "email"],
        },
      }
    });
    if (!friends) {
      const error = new Error("Cant fetch list of friends");
      error.statusCode = 404;
      return next(error);
    }
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
