const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const { validateResults } = require("../validators");
const { rules: createPostRules } = require("../validators/post/createPost");
const { userPostImageUpload } = require("../middleware/fileUpload");
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} = require("../controllers/post");

router.get("/", isAuth, getPosts);

router.post(
  "/create",
  [isAuth, userPostImageUpload, createPostRules, validateResults],
  createPost
);

router.put("/update/:postId", isAuth, updatePost);

router.delete("/delete/:postId", isAuth, deletePost);

module.exports = router;
