const Sequelize = require("sequelize");

const db = require("../config/db");

const Message = db.define("message", {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Message;
