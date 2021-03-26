const { Op } = require("sequelize");
const models = require("../models/");
const { Post, Friendship, User } = models;

exports.getPosts = async (req, res, next) => {
  // dorobit pagination
  try {
    const posts = await req.user.getPosts({ limit: 20, offset: 0 });
    if (!posts) {
      const error = new Error("Cant fetch your posts");
      error.statusCode = 404;
      return next(error);
    }
    res.json({
      status: "Ok",
      message: "Posts was fetched",
      posts: posts,
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

exports.createPost = async (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.filename;
  }
  if (typeof req.body.image !== "undefined" && req.body.image.length === 0) {
    delete req.body.image;
  }
  try {
    let data;
    if (req.body.image) {
      data = {
        userId: req.user.id,
        text: req.body.textContent,
        image: req.body.image,
      };
    } else {
      data = {
        userId: req.user.id,
        text: req.body.textContent,
      };
    }
    const post = await Post.create(data);
    if (!post) {
      const error = new Error("Cant create post");
      error.statusCode = 500;
      return next(error);
    }
    res.status(201).json({
      status: "Ok",
      message: "Post was successfully created",
      post: post,
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findOne({
      where: {
        id: postId,
        userId: req.user.id,
      },
    });
    if (!post) {
      const error = new Error(`Post with id ${postId} doesnt exists`);
      error.statusCode = 404;
      return next(error);
    }
    const updatedPost = await Post.update(req.body, {
      where: {
        id: postId,
        userId: req.user.id,
      },
      returning: true,
    });
    if (!updatedPost) {
      const error = new Error("Cant update selected post");
      error.statusCode = 500;
      return next(error);
    }
    res.json({
      status: "Ok",
      message: "Post was successfully updated",
      post: updatedPost[1],
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
      return next(error);
    }
  }
};

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findOne({
      where: {
        id: postId,
        userId: req.user.id,
      },
    });
    if (!post) {
      const error = new Error(`Post with id ${postId} doesnt exists`);
      error.statusCode = 404;
      return next(error);
    }
    await Post.destroy({
      where: {
        id: postId,
      },
    });
    res.json({
      status: "Ok",
      message: "Post was successfully deleted",
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
      return next(error);
    }
  }
};

exports.getFriendsPosts = async (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const offset = page * limit;

  try {
    const userFriendship = await Friendship.findAll({
      where: {
        [Op.or]: [
          {
            user_1: req.user.id,
            status: 1,
          },
          {
            user_2: req.user.id,
            status: 1,
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

    let friendsIdArray = [];
    userFriendship.forEach((friendship) => {
      if (friendship.requestor.id === req.user.id) {
        friendsIdArray.push(friendship.User.dataValues.id);
      } else {
        friendsIdArray.push(friendship.requestor.id);
      }
    });
    const friendsPost = await Post.findAndCountAll({
      where: {
        userId: friendsIdArray,
      },
      include: {
        model: User,
        attributes: {
          exclude: ["password", "activationToken", "activated", "email"],
        },
      },
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });
    res.json({
      status: "Ok",
      message: "Friends posts was fetched",
      count: friendsPost.count,
      posts: friendsPost.rows,
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
      return next(error);
    }
  }
};
