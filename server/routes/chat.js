const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const isFriend = require("../middleware/isFriend");

const { getUserChatData, createChat } = require("../controllers/chat");

router.get("/", isAuth, getUserChatData);
router.post("/create", [isAuth, isFriend], createChat);

module.exports = router;
