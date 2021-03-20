"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Friendship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "user_1" });
      this.belongsTo(models.User, { foreignKey: "user_2" });
    }
  }
  Friendship.init(
    {
      user_1: DataTypes.INTEGER,
      user_2: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Friendship",
    }
  );
  return Friendship;
};
