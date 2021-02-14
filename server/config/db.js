const { Sequelize } = require("sequelize");
const timestamp = require("time-stamp");

const logger = require("./winston");
const config = require('./app');

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
  host: config.dbHost,
  dialect: "postgres",
  logging: false
    /*process.env.NODE_ENV === "production"
      ? false
      : (msg) => {
          logger.debug({
            time: timestamp("YYYY/MM/DD/HH:mm:ss"),
            level: "debug",
            message: msg,
          });
        },*/
});

module.exports = sequelize;
