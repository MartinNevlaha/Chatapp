const { Op } = require("sequelize");

const config = require("../config/app");
const models = require("../models");
const { User, Friendship } = models;

exports.getUsers = async (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const offset = page * limit;

  try {
    const users = await User.findAndCountAll({
      where: {
        [Op.not]: { id: req.user.id },
        activated: true,
      },
      attributes: {
        exclude: ["password", "activationToken", "activated", "email"],
      },
      limit: limit,
      offset: offset,
      raw: true,
      order: [["id", "ASC"]],
    });
    if (!users) {
      const error = new Error("Cant find any active user");
      error.statusCode = 404;
      return next(error);
    }

    const userWithStatus = await isFriends(users.rows, req.user.id);

    res.json({
      status: "ok",
      message: "Users successfully loaded",
      count: users.count,
      users: userWithStatus,
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

const isFriends = async (users, userId) => {
  let usersWithFriendshipStatus = [];

  for await (let user of users) {
    const friendshipStatus = await Friendship.findOne({
      where: {
        [Op.or]: [
          { user_1: userId, user_2: user.id },
          { user_1: user.id, user_2: userId },
        ],
      },
    });
    let avatar = null;
    if (user.avatar) {
      avatar = `${config.appUrl}:${config.appPort}/users/${user.id}/${user.avatar}`;
    }
    if (friendshipStatus) {
      usersWithFriendshipStatus.push({
        ...user,
        avatar,
        fullName: `${user.firstName} ${user.lastName}`,
        friendStatus: friendshipStatus.status,
      });
    } else {
      usersWithFriendshipStatus.push({
        ...user,
        avatar,
        fullName: `${user.firstName} ${user.lastName}`,
        friendStatus: null,
      });
    }
  }
  return usersWithFriendshipStatus;
};

exports.searchUser = async (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const offset = page * limit;
  const search = req.query.search;

  try {
    const users = await User.findAndCountAll({
      where: {
        [Op.not]: {id: req.user.id},
        [Op.or]: [
          { lastName: { [Op.iLike]: `%${search}%` } },
          { firstName: { [Op.iLike]: `%${search}%` } }, //case insesitive search
        ],
      },
      attributes: {
        exclude: ["password", "activationToken", "activated", "email"],
      },
      limit: limit,
      offset: offset,
      raw: true,
      order: [["id", "ASC"]],
    });

    if (!users) {
      const error = new Error("Cant find any active user");
      error.statusCode = 404;
      return next(error);
    }

    const userWithStatus = await isFriends(users.rows, req.user.id);

    res.json({
      status: "Ok",
      message: "Users was find",
      users: userWithStatus,
      count: users.count,
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};
