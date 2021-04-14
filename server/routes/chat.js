const router = require("express").Router();

const isAuth = require("../middleware/isAuth");

const { getUserChatData } = require("../controllers/chat");

router.get("/", isAuth, getUserChatData);

module.exports = router;
