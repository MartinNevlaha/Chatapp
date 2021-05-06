const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const { getFriends } = require("../controllers/friends");
const { setUserFriendsToRedis } = require("../middleware/redisCacheSetKey");
const cache = require("../config/redisChache");

router.get("/", [isAuth, setUserFriendsToRedis, cache.route()], getFriends);

module.exports = router;
