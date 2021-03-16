const router = require("express").Router();

const isAuth = require("../middleware/isAuth");

const {
  sendFriendRequest,
  getPendingFriendRequest,
  answerFriendshipRequest
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

router.put("/", [isAuth], answerFriendshipRequest);


module.exports = router;
