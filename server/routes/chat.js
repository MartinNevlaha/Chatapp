const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const isOneOfChatters = require("../middleware/isOneOfChatters");
const { userChatFileUpload } = require("../middleware/fileUpload");
const isFriend = require("../middleware/isFriend");

const {
  getUserChatData,
  createChat,
  getMessages,
  deleteChat,
  imageUpload,
  seeMessage,
} = require("../controllers/chat");

router.get("/", isAuth, getUserChatData);

router.post("/create", [isAuth, isFriend], createChat);

router.get("/messages", [isAuth, isOneOfChatters, isFriend], getMessages);

router.delete("/delete/:chatId", [isAuth, isOneOfChatters], deleteChat);

router.post(
  "/upload-image/:chatId",
  [isAuth, isOneOfChatters, userChatFileUpload],
  imageUpload
);

router.patch("/see-message/:chatId", [isAuth, isOneOfChatters], seeMessage);

module.exports = router;
