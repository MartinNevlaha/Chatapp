"use strict";
const config = require("../config/app");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE" });
    }
  }
  Post.init(
    {
      userId: DataTypes.INTEGER,
      text: DataTypes.STRING,
      image: {
        type: DataTypes.STRING,
        get() {
          const image = this.getDataValue("image");
          if (image) {
            const userId = this.getDataValue("userId");
            const postId = this.getDataValue("id");
            return `${config.appUrl}:${config.appPort}/users/${userId}/post/${postId}/${image}`;
          } else {
            return null;
          }
        }
      },
      video: {
        type: DataTypes.STRING,
        get() {
          const video = this.getDataValue("video");
          if (image) {
            const userId = this.getDataValue("userId");
            const postId = this.getDataValue("id");
            return `${config.appUrl}:${config.appPort}/users/${userId}/post/${postId}/${video}`;
          } else {
            return null;
          }
        }
      },
      like: DataTypes.INTEGER,
      unline: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
