const { Op } = require("sequelize");
const models = require("../models");
const { User, Friendship, ChatUser, Chat } = models;
const friendStatus = require("../config/friendRequestStatus");

exports.sendFriendRequest = async (req, res, next) => {
  try {
    if (req.user.id !== +req.body.friendId) {
      const existRequest = await Friendship.findOne({
        where: {
          [Op.or]: [
            {
              user_1: req.user.id,
              user_2: req.body.friendId,
            },
            {
              user_2: req.user.id,
              user_1: req.body.friendId,
            },
          ],
        },
      });
      if (existRequest) {
        const error = new Error("Friend request allready exist");
        error.statusCode = 400;
        return next(error);
      }
      const friendship = await Friendship.create({
        user_1: req.user.id,
        user_2: req.body.friendId,
      });

      res.status(201).json({
        status: "Ok",
        message: "Request was send",
        friendship: friendship,
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
        user_2: req.user.id,
        status: friendStatus.pending,
      },
      include: {
        model: User,
        as: "requestor",
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
    if (req.user.id === friendship.user_1) {
      const error = new Error("You are not friend request recipient");
      error.statusCode = 409;
      return next(error);
    }
    const updatedFriendship = await Friendship.update(
      {
        status: req.body.answer,
      },
      {
        where: {
          id: requestId,
        },
        returning: true,
        raw: true,
      }
    );

    let message;
    if (req.body.answer === "1") {
      message = "Friend request was accepted";
      const user_1 = await User.findByPk(friendship.user_1);
      await user_1.increment("friendsCount", { by: 1 });
      const user_2 = await User.findByPk(friendship.user_2);
      await user_2.increment("friendsCount", { by: 1 });
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
  const friendId = req.params.friendId;
  const userId = req.user.id;

  try {
    const friendship = await Friendship.findOne({
      where: {
        [Op.or]: [
          { user_1: friendId, user_2: userId },
          { user_1: userId, user_2: friendId },
        ],
      },
    });
    if (!friendship) {
      const error = new Error("Friendship request doesnt exist");
      error.statusCode = 404;
      return next(error);
    }

    const friendChats = await ChatUser.findAll({
      where: {
        userId: friendId,
      },
    });

    const chatId = await getChatId(friendChats, userId);
    if (chatId) {
      await Chat.destroy({
        where: {
          id: chatId,
        },
      });
    }

    await Friendship.destroy({
      where: { id: friendship.id },
    });

    if (friendship.status === 1) {
      const user_1 = await User.findByPk(friendship.user_1);
      await user_1.decrement("friendsCount", { by: 1 });
      const user_2 = await User.findByPk(friendship.user_2);
      await user_2.decrement("friendsCount", { by: 1 });
    }
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

const getChatId = async (chats, userId) => {
  let chatId = [];
  for await (let chat of chats) {
    const userChats = await ChatUser.findAll({
      where: {
        chatId: chat.chatId,
      },
      raw: true,
    });
    if (userChats)
      userChats.forEach((chat) => {
        if (chat.userId === userId) chatId.push(chat);
      });
  }
  if (chatId.length > 0) {
    return chatId[0].chatId;
  } else {
    return null;
  }
};
