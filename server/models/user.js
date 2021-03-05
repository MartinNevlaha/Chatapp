"use strict";
const { hashPwd } = require("../utils/utilities");
const config = require("../config/app");

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
      this.belongsToMany(models.User, {as: "friends", through: "User_friends", foreignKey: "userId"})
      this.belongsToMany(models.User, {as: "userFriends", through: "User_friends", foreignKey: "friendId"})
      this.belongsToMany(models.User, {as: "requesters", through: "Friend_request", foreignKey: "requester"})
      this.belongsToMany(models.User, {as: "recipients", through: "Friend_request", foreignKey: "recipient"})
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
      avatar: {
        type: DataTypes.STRING,
        get() {
          const avatar = this.getDataValue("avatar");
          if (avatar) {
            const id = this.getDataValue("id");
            return `${config.appUrl}:${config.appPort}/users/${id}/${avatar}`;
          } else {
            return null;
          }
        },
      },
      status: DataTypes.STRING,
      activated: DataTypes.BOOLEAN,
      activationToken: DataTypes.STRING,
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
