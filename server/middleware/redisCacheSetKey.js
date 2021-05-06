const cache = require("../config/redisChache");
const logger = require("../config/winston");
const timestamp = require("time-stamp");

const setUserProfileIdToRedis = (req, res, next) => {
  res.express_redis_cache_name = `auth-user-${req.user.id}`;

  next();
};

const delUserProfileCacheEntry = (req, res, next) => {
  const userId = `auth-user-${req.user.id}`;
  cache.del(userId, (err) => {
    logger.error({
      time: timestamp("YYYY/MM/DD/HH:mm:ss"),
      level: "error",
      message: `Cant delete cache entry for ${userId}, ${err}`,
    });
  });

  next();
};

const setUserIdInfoToRedis = (req, res, next) => {
  res.express_redis_cache_name = `auth-user-${req.user.id}_user-info-${req.params.userId}`;

  next();
};

const setUserPostToRedis = (req, res, next) => {
  res.express_redis_cache_name = `auth-user-${req.user.id}_user-posts-${req.params.userId}_page-${req.query.page}`;

  next();
};

const setUserFriendToRedis = (req, res, next) => {
  res.express_redis_cache_name = `auth-user-${req.user.id}_user-friends-${req.params.userId}`;

  next();
};

const setDashboardPostToRedis = (req, res, next) => {
  res.express_redis_cache_name = `auth-user-${req.user.id}_post-page-${req.query.page}`;

  next();
};

const setUserFriendsToRedis = (req, res, next) => {
  res.express_redis_cache_name = `auth-use-${req.user.id}_all_friends`;

  next();
}

module.exports = {
  setUserProfileIdToRedis,
  delUserProfileCacheEntry,
  setUserIdInfoToRedis,
  setUserFriendToRedis,
  setUserPostToRedis,
  setDashboardPostToRedis,
  setUserFriendsToRedis
};