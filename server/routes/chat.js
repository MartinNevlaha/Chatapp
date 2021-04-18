const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const isFriend = require("../middleware/isFriend");

const {
  getUserChatData,
  createChat,
  getMessages,
  deleteChat,
} = require("../controllers/chat");

router.get("/", isAuth, getUserChatData);

router.post("/create", [isAuth, isFriend], createChat);

router.get("/messages", [isAuth, isFriend], getMessages);

router.delete("/delete/:id", isAuth, deleteChat);

module.exports = router;
