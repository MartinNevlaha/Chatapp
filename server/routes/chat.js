const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const { userChatFileUpload } = require("../middleware/fileUpload");
const isFriend = require("../middleware/isFriend");
const imageResize = require("../middleware/resizeImage");

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

router.get("/messages", [isAuth, isFriend], getMessages);

router.delete("/delete/:id", isAuth, deleteChat);

router.post(
  "/upload-image",
  [isAuth, userChatFileUpload, imageResize],
  imageUpload
);

router.patch("/see-message/:chatId", isAuth, seeMessage);

module.exports = router;
