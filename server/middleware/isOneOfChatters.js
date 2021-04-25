const models = require("../models");
const { ChatUser } = models;

const { isOneOfChattersHelper } = require("../utils/utilities");

const isOneOfChatters = async (req, res, next) => {
  let chatId;
  if (req.params.chatId) {
    chatId = +req.params.chatId;
  } else if (req.query.chatId) {
    chatId = +req.query.chatId;
  }
  try {
    const chatUsers = await ChatUser.findAll({
      where: {
        chatId: chatId,
      },
      raw: true,
    });
    if (!chatUsers) {
      const error = new Error("Cant fetch chatUsers");
      error.statusCode = 404;
      return next(error);
    }
    const isChatter = isOneOfChattersHelper(chatUsers, req.user.id);
    if (isChatter) {
      next();
    } else {
      const error = new Error("This user isnt one of chatters for this chat");
      error.statusCode = 403;
      return next(error);
    }
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

module.exports = isOneOfChatters;
