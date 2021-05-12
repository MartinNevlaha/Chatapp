const router = require("express").Router();

const isAuth = require("../middleware/isAuth");

const {
  sendFriendRequest,
  getPendingFriendRequest,
  answerFriendshipRequest,
  deleteFriendShip
} = require("../controllers/friendRequest");

const { validateResults } = require("../validators/");
const {
  rules: sendFriendRequestRules,
} = require("../validators/friendRequest/friendRequest");
const {
  rules: answerFriendRequestRules,
} = require("../validators/friendRequest/answerRequest");

router.get("/", isAuth, getPendingFriendRequest);

router.post(
  "/",
  [isAuth, sendFriendRequestRules, validateResults],
  sendFriendRequest
);

router.put(
  "/:requestId",
  [isAuth, answerFriendRequestRules, validateResults],
  answerFriendshipRequest
);

router.delete("/:friendId", isAuth, deleteFriendShip);

module.exports = router;
