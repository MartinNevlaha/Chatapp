const model = require('../models');
const User = model.User;
const FriendRequest = model.FriendRequest;

exports.sendFriendRequest = async (req, res, next) => {
  try {
    if (req.user.id !== req.body.recipientId) {
      const existRequest = await FriendRequest.findOne({
        where: {
          senderId: req.user.id,
          recipientId: req.body.recipientId,
        }
      })
      if (existRequest) {
        const error = new Error("Friend request allready exist");
        error.statusCode = 400;
        return next(error);
      }
      await FriendRequest.create({
        senderId: req.user.id,
        recipientId: req.body.recipientId,
      })
      res.json({
        status: "ok",
        message: "Request was send",
      })
    } else {
      const error = new Error("Cannot send friend request to yourself");
      error.statusCode = 400;
      return next(error);
    }
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};
