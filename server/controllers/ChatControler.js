const models = require("../models");
const { User, Chat, ChatUser, Message } = models;
const { Op } = require("sequelize");

exports.index = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
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
      chatData: user
    })
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};
