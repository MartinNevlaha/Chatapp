const config = require("../config/app");

const cache = require("express-redis-cache")({
  host: config.redisHost,
  port: config.redisPort,
  auth_pass: config.redisPass,
  expire: 900
});

module.exports = cache;