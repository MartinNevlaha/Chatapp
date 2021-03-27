const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const isFriend = require("../middleware/isFriend");
const { validateResults } = require("../validators");
const { rules: createPostRules } = require("../validators/post/createPost");
const { userPostImageUpload } = require("../middleware/fileUpload");
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getFriendsPosts
} = require("../controllers/post");

router.get("/", isAuth, getPosts);

router.get("/friends-post", isAuth, getFriendsPosts);

router.post(
  "/create",
  [isAuth, userPostImageUpload, createPostRules, validateResults],
  createPost
);

router.put("/update/:postId", isAuth, updatePost);

router.delete("/delete/:postId", isAuth, deletePost);

router.patch("/like-status/:postId", [isAuth, isFriend] );

module.exports = router;
