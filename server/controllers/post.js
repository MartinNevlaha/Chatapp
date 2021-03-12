const models = require("../models/");
const Post = models.Post;

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
  try {
    const post = await Post.create({
      userId: req.user.id,
      text: req.body.text,
    });
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
