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
      this.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      this.hasMany(models.Likes, { foreignKey: "postId", onDelete: "CASCADE" });
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
            if (config.nodeEnv === "production") {
              return `${config.appUrl}/users/${userId}/images/${image}`;
            } else {
              return `${config.appUrl}:${config.appPort}/users/${userId}/images/${image}`;
            }
          } else {
            return null;
          }
        },
      },
      like: DataTypes.INTEGER,
      unlike: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
