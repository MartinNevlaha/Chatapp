const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const isFriend = require("../middleware/isFriend");
const cache = require("../config/redisChache");
const {
  setViewedUserInfo,
  setViewedUserFriends,
  setViewedUserPosts,
} = require("../middleware/redisChache");

const {
  getUsers,
  searchUser,
  getUserInfo,
  getUserPosts,
  getUserFriends,
} = require("../controllers/users");

router.get("/users", isAuth, getUsers);

router.get("/search", isAuth, searchUser);

router.get(
  "/info/:userId",
  [isAuth, isFriend, setViewedUserInfo, cache.route({ expire: 180 })],
  getUserInfo
);

router.get(
  "/posts/:userId",
  [isAuth, isFriend, setViewedUserPosts, cache.route({ expire: 180 })],
  getUserPosts
);

router.get(
  "/friends/:userId",
  [isAuth, isFriend, setViewedUserFriends, cache.route({ expire: 180 })],
  getUserFriends
);

module.exports = router;
