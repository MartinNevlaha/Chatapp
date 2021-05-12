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


module.exports = {
  setUserProfileIdToRedis,
  delUserProfileCacheEntry
};
