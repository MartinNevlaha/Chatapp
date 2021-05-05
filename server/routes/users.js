const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const isFriend = require("../middleware/isFriend");
const {
  setUserIdInfoToRedis,
  setUserPostToRedis,
  setUserFriendToRedis,
} = require("../middleware/redisCacheName");
const cache = require("../config/redisChache");

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
  [isAuth, isFriend, setUserIdInfoToRedis, cache.route()],
  getUserInfo
);

router.get(
  "/posts/:userId",
  [isAuth, isFriend,],
  getUserPosts
);

router.get(
  "/friends/:userId",
  [isAuth, isFriend, setUserFriendToRedis, cache.route()],
  getUserFriends
);

module.exports = router;
