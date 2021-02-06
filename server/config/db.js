const { Sequelize } = require("sequelize");

const DATABASE = process.env.DATABASE;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const sequelize = new Sequelize(DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  logging: () => {
    if (process.env.NODE_ENV === "production") {
      return false;
    } else {
      return true;
    }
  }
});

module.exports = sequelize;