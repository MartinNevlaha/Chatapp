const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const { validateResults } = require("../validators");
const { rules: createPostRules } = require("../validators/post/createPost");
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} = require("../controllers/post");

router.get("/", isAuth, getPosts);

router.post("/create", [isAuth, createPostRules, validateResults], createPost);

router.put("/update/:postId", isAuth, updatePost);

router.delete("/delete/:postId", isAuth, deletePost);

module.exports = router;