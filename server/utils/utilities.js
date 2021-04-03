const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs-extra");
const logger = require("../config/winston");
const timestamp = require("time-stamp");
const config = require("../config/app");

exports.hashPwd = async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 12);
  }
  return user;
};

const getFileType = (file) => {
  const mimeType = file.mimetype.split("/");
  return mimeType[mimeType.length - 1];
};

exports.generateFileName = (req, file, cb) => {
  const extension = getFileType(file);

  const fileName = Date.now() + uuidv4() + "." + extension;
  cb(null, file.fieldname + "_" + fileName);
};

exports.imageFilter = (req, file, cb) => {
  const extension = getFileType(file);

  const allowedTypes = /jpeg|jpg|png|gif/;
  const isValid = allowedTypes.test(extension);
  if (isValid) {
    return cb(null, true);
  } else {
    const error = new Error("Invalid file type, use only jpg, jpge, png, gif");
    error.statusCode = 422;
    return cb(error, false);
  }
};

exports.removeAllAccountFiles = async (dirId) => {
  const path = `uploads/users/${dirId}`;
  try {
    const exist = await fs.pathExists(path);
    if (exist) {
      await fs.remove(path);
      logger.log({
        time: timestamp("YYYY/MM/DD/HH:mm:ss"),
        level: "info",
        message: "All user files was deleted",
      });
    } else {
      logger.log({
        time: timestamp("YYYY/MM/DD/HH:mm:ss"),
        level: "info",
        message: "No files to delete",
      });
    }
  } catch (error) {
    logger.error({
      time: timestamp("YYYY/MM/DD/HH:mm:ss"),
      level: "error",
      message: error,
    });
    throw error;
  }
};

exports.removePostImage = async (path) => {
  const removedString = `${config.appUrl}:${config.appPort}`;
  const removedLength = removedString.length;
  const finalPath = "uploads" + path.slice(removedLength);
  console.log(finalPath);
  try {
    if (fs.existsSync(finalPath)) {
      await fs.unlink(finalPath);
      logger.log({
        time: timestamp("YYYY/MM/DD/HH:mm:ss"),
        level: "info",
        message: `File ${finalPath} was deleted`,
      });
    } else {
      logger.log({
        time: timestamp("YYYY/MM/DD/HH:mm:ss"),
        level: "info",
        message: "No file to delete",
      });
    }
  } catch (error) {
    logger.error({
      time: timestamp("YYYY/MM/DD/HH:mm:ss"),
      level: "error",
      message: error,
    });
    throw error;
  }
};

exports.getFriendHelper = (friendshipsArr, userId) => {
  let friends = [];
  friendshipsArr.forEach((friendship) => {
    if (friendship.requestor.id === userId) {
      const friendObj = {
        id: friendship.id,
        updatedAt: friendship.updatedAt,
        friend: {
          ...friendship.User.dataValues,
          fullName:
            friendship.User.dataValues.firstName +
            " " +
            friendship.User.dataValues.lastName,
        },
      };
      friends.push(friendObj);
    } else {
      const friendObj = {
        id: friendship.id,
        updatedAt: friendship.updatedAt,
        friend: {
          ...friendship.requestor.dataValues,
          fullName:
            friendship.requestor.dataValues.firstName +
            " " +
            friendship.requestor.dataValues.lastName,
        },
      };
      friends.push(friendObj);
    }
  });
  return friends;
};
