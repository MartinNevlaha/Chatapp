const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const {
  sendFriendRequest,
  getPendingFriendRequest,
} = require("../controllers/friendRequest");
const { validateResults } = require("../validators/");
const {
  rules: sendFriendRequestRules,
} = require("../validators/friendRequest/friendRequest");

router.get("/", isAuth, getPendingFriendRequest);

router.post(
  "/",
  [isAuth, sendFriendRequestRules, validateResults],
  sendFriendRequest
);

module.exports = router;
