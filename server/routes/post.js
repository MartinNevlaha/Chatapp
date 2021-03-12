const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const { validateResults } = require("../validators");
const { createPost, getPosts } = require("../controllers/post");

router.get("/", isAuth, getPosts);

router.post("/create", isAuth, createPost);

module.exports = router;