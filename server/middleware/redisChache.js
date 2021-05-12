const cache = require("../config/redisChache");
const logger = require("../config/winston");
const timestamp = require("time-stamp");

const setUserProfileIdToRedis = (req, res, next) => {
  res.express_redis_cache_name = `auth-user-${req.user.id}`;

  next();
};

const delUserProfileCacheEntry = (req, res, next) => {
  const userId = `auth-user-${req.user.id}`;
  const viewedUser = `viewed-user-info-${req.user.id}`;

  cache.del(userId, (err) => {
    logger.info({
      time: timestamp("YYYY/MM/DD/HH:mm:ss"),
      level: "info",
      message: `Cant delete cache entry for ${userId}, ${err}`,
    });
  });

  cache.del(viewedUser, (err) => {
    logger.info({
      time: timestamp("YYYY/MM/DD/HH:mm:ss"),
      level: "info",
      message: `Cant delete cache entry for ${viewedUser}, ${err}`,
    });
  });

  next();
};

const setViewedUserInfo = (req, res, next) => {
  res.express_redis_cache_name = `viewed-user-info-${req.params.userId}`;

  next();
};

const setViewedUserFriends = (req, res, next) => {
  res.express_redis_cache_name = `viewed-user-friends-${req.params.userId}`;

  next();
};

const delViewedUserFriends = (req, res, next) => {
  const viewedUser = `viewed-user-friends-${req.params.friendId}`;

  cache.del(viewedUser, (err) => {
    logger.info({
      time: timestamp("YYYY/MM/DD/HH:mm:ss"),
      level: "info",
      message: `Cant delete cache entry for ${viewedUser}, ${err}`,
    });
  });

  next();
};

const setViewedUserPosts = (req, res, next) => {
  res.express_redis_cache_name = `viewed-user-posts-${req.params.userId}-page-${req.query.page}`;

  next();
}

module.exports = {
  setUserProfileIdToRedis,
  delUserProfileCacheEntry,
  setViewedUserInfo,
  setViewedUserFriends,
  delViewedUserFriends,
  setViewedUserPosts
};
