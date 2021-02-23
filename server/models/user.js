"use strict";
const { hashPwd } = require("../utils/utilities");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
        set() {
          return new Error("Dont try to set fullName");
        },
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      activated: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user) => hashPwd(user),
        beforeUpdate: (user) => hashPwd(user),
      },
    }
  );
  return User;
};
