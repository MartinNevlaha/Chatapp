const models = require("../models");
const { User, Chat, ChatUser, Message } = models;
const { Op } = require("sequelize");
const { sequelize } = require("../models");

const friendStatus = require("../config/friendRequestStatus");
const isFriend = require("../middleware/isFriend");

exports.getUserChatData = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["password", "activationToken", "activated", "email"],
      },
      include: [
        {
          model: Chat,
          include: [
            {
              model: User,
              where: {
                [Op.not]: {
                  id: req.user.id,
                },
              },
              attributes: {
                exclude: ["password", "activationToken", "activated", "email"],
              },
            },
            {
              model: Message,
              limit: 20,
              order: [["id", "DESC"]],
            },
          ],
        },
      ],
    });
    if (!user) {
      const error = new Error("Cant fetch user chat data");
      error.statusCode = 404;
      return next(error);
    }
    res.json({
      status: "Ok",
      message: "User chat data was fetched",
      chatData: user,
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

exports.createChat = async (req, res, next) => {
  const { friendId } = req.body;
  const t = await sequelize.transaction();
  try {
    if (req.isFriend === friendStatus.accept) {
      const user = await User.findOne({
        where: {
          id: req.user.id,
        },
        include: {
          model: Chat,
          where: {
            type: "dual",
          },
          include: [
            {
              model: ChatUser,
              where: {
                userId: friendId,
              },
            },
          ],
        },
      });

      //check if dual chat exists between this two users
      if (user && user.Chats.length > 0) {
        const error = new Error("Chat allready exists");
        error.statusCode = 403;
        return next(error);
      }

      const chat = await Chat.create({ type: "dual" }, { transaction: t });
      const chatUser = await ChatUser.bulkCreate(
        [
          {
            chatId: chat.id,
            userId: req.user.id,
          },
          {
            chatId: chat.id,
            userId: friendId,
          },
        ],
        { transaction: t }
      );

      await t.commit();

      const createdChat = await Chat.findOne({
        where: {
          id: chat.id,
        },
        include: [
          {
            model: User,
            where: {
              [Op.not]: {
                id: req.user.id,
              },
            },
            attributes: {
              exclude: ["password", "activationToken", "activated", "email"],
            },
          },
          {
            model: Message,
          },
        ],
      });
      if (!createdChat) {
        const error = new Error("Cant create new chat");
        error.statusCode = 500;
        return next(error);
      }

      res.status(201).json({
        status: "Ok",
        message: "Chat was created",
        chat: createdChat,
      });
    } else {
      const error = new Error("Users are not friends");
      error.statusCode = 403;
      return next(error);
    }
  } catch (error) {
    await t.rollback();
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};
