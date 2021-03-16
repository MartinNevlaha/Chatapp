'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friendship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: "userId", constraints: false});
      this.belongsTo(models.User, {as: "friend", foreignKey: "friendId", constraints: false})
    }
  };
  Friendship.init({
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Friendship',
  });
  return Friendship;
};