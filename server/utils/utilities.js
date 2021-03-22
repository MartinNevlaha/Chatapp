const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

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

exports.fileFilter = (req, file, cb) => {
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

const isFriends = async (users, userId) => {
  let usersWithFriendshipStatus = [];

  for await (let user of users) {
    const friendshipStatus = await Friendship.findOne({
      where: {
        [Op.or]: [
          { user_1: userId, user_2: user.id },
          { user_1: user.id, user_2: userId },
        ],
      },
    });
    let avatar = null;
    if (user.avatar) {
      avatar = `${config.appUrl}:${appPort}/users/${user.id}/${user.avatar}`
    }
    if (friendshipStatus) {
      usersWithFriendshipStatus.push({
        ...user,
        avatar,
        fullName: `${user.firstName} ${user.lastName}`,
        friendStatus: friendshipStatus.status,
      });
    } else {
      usersWithFriendshipStatus.push({
        ...user,
        avatar,
        fullName: `${user.firstName} ${user.lastName}`,
        friendStatus: null,
      });
    }
  }
  return usersWithFriendshipStatus;
};