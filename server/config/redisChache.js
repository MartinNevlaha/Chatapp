const config = require("../config/app");
const logger = require("../config/winston");
const timestamp = require("time-stamp");

const cache = require("express-redis-cache")({
  host: config.redisHost,
  port: config.redisPort,
  auth_pass: config.redisPass,
  expire: 900,
});

cache.on("connected", () => {
  logger.log({
    time: timestamp("YYYY/MM/DD/HH:mm:ss"),
    level: "info",
    message: `Connect to redis on ${config.redisHost}, port ${config.redisPort}`,
  });
});

module.exports = cache;
