const { Op } = require("sequelize");
const config = require("../config/app");
const models = require("../models");
const { User, Friendship, Post, Likes } = models;

const { getFriendHelper } = require("../utils/utilities");
const friendRequest = require("../config/friendRequestStatus");

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
        [Op.not]: { id: req.user.id },
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

exports.getUserInfo = async (req, res, next) => {
  const isFriend = req.isFriend;
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
      attributes: {
        exclude: ["password", "activationToken", "activated", "email"],
      },
    });
    if (!user) {
      const error = new Error("Cant find this user");
      error.statusCode = 404;
      return next(error);
    }
    res.json({
      status: "Ok",
      message: "User info was fetched",
      user: user,
      isFriend: isFriend,
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

exports.getUserPosts = async (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const offset = page * limit;
  const isFriend = req.isFriend;
  try {
    let findedPosts;
    let countOfPosts;
    if (isFriend === friendRequest.accept) {
      const posts = await Post.findAndCountAll({
        where: {
          userId: req.params.userId,
        },
        include: {
          model: Likes,
          include: {
            model: User,
            attributes: {
              exclude: ["password", "activationToken", "activated", "email"],
            },
          },
        },
      });
      if (!posts) {
        const error = new Error("Cant fetch user posts");
        error.statusCode = 404;
        return next(error);
      }
      findedPosts = posts.rows;
      countOfPosts = posts.count;
    } else {
      findedPosts = [];
      countOfPosts = 0;
    }
    res.json({
      status: "Ok",
      message: "Posts was fetched",
      posts: findedPosts,
      count: countOfPosts,
      isFriend: isFriend,
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

exports.getUserFriends = async (req, res, next) => {
  const isFriend = req.isFriend;
  const userId = req.params.userId;
  try {
    let friendship;
    if (isFriend === friendRequest.accept) {
      const userFriendship = await Friendship.findAll({
        where: {
          [Op.or]: [
            {
              user_1: userId,
              status: friendStatus.accept,
            },
            {
              user_2: userId,
              status: friendStatus.a,
            },
          ],
        },
        include: [
          {
            model: User,
            as: "requestor",
            attributes: {
              exclude: ["password", "activationToken", "activated", "email"],
            },
          },
          {
            model: User,
            attributes: {
              exclude: ["password", "activationToken", "activated", "email"],
            },
          },
        ],
      });
      if (!userFriendship) {
        const error = new Error("Cant fetch list of friends");
        error.statusCode = 404;
        return next(error);
      }
      friendship = getFriendHelper(userFriendship, userId);
    } else {
      friendship = [];
    }
    res.json({
      status: "Ok",
      message: "Friends list was fetched",
      friendships: friendship,
      isFriend: isFriend,
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};
