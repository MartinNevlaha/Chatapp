const Sequelize = require("sequelize");

const sequelize = require("../config/db");
const { hashPwd } = require("../utils/utilities");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fullName: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set(value) {
      throw new Error("Dont try to set fullName");
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("password", hashPwd(value));
    },
  },
  role: {
    type: Sequelize.STRING,
    defaultValue: "user",
    allowNull: false,
  },
  activated: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  lastLogin: Sequelize.DATE,
  activationToken: Sequelize.STRING
});

module.exports = User;
