const { Sequelize } = require("sequelize");
const timestamp = require("time-stamp");

const logger = require("./winston");

const DATABASE = process.env.DATABASE;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const sequelize = new Sequelize(DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
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
