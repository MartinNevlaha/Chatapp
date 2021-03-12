const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const { validateResults } = require("../validators/");
const {
  rules: sendRequestRules,
} = require("../validators/friendRequest/sendFriendRequest");
const {
  sendFriendRequest,
  getFriendRequest,
} = require("../controllers/friendRequest");

router.get("/", isAuth, getFriendRequest);

router.put(
  "/send",
  [isAuth, sendRequestRules, validateResults],
  sendFriendRequest
);

module.exports = router;
