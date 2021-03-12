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
    res.json({
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
