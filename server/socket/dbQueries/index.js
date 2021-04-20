const timestamp = require("time-stamp");
const models = require("../../models");
const { Message } = models;
const logger = require("../../config/winston");

exports.createMessage = async (msg) => {
  const message = {
    type: msg.type,
    chatId: msg.chatId,
    fromUserId: msg.fromUser.id,
    message: msg.message
  }
  try {
    const createdMsg = await Message.create(message);
    if (!createdMsg) {
      logger.error({
        time: timestamp("YYYY/MM/DD/HH:mm:ss"),
        level: "error",
        message: "Message cannot be save in DB",
      });
    }
    
  } catch (error) {
    logger.error({
      time: timestamp("YYYY/MM/DD/HH:mm:ss"),
      level: "error",
      message: error,
    });
  }
}