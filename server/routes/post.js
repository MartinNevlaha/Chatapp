const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const isFriend = require("../middleware/isFriend");
const resizeImage = require("../middleware/resizeImage");
const { validateResults } = require("../validators");
const {
  rules: createOrUpdatePostRules,
} = require("../validators/post/createOrUpdatePost");
const { rules: likePostRules } = require("../validators/post/likePost");
const { userPostImageUpload } = require("../middleware/fileUpload");
const {
  createPost,
  updatePost,
  deletePost,
  getFriendsPosts,
  likeOrUnlikePost,
} = require("../controllers/post");

router.get("/friends-post", isAuth, getFriendsPosts);

router.post(
  "/create",
  [isAuth, userPostImageUpload, resizeImage, createOrUpdatePostRules, validateResults],
  createPost
);

router.put(
  "/update/:postId",
  [isAuth, userPostImageUpload, resizeImage, createOrUpdatePostRules, validateResults],
  updatePost
);

router.patch(
  "/like-status/:postId",
  [isAuth, isFriend, likePostRules, validateResults],
  likeOrUnlikePost
);

router.delete("/delete/:postId", isAuth, deletePost);

module.exports = router;
