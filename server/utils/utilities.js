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

exports.videoFilter = (req, file, cb) => {
  const extension = getFileType(file);

  const allowedTypes = /avi|mpg|mp4/;
  const isValid = allowedTypes.test(extension);
  if (isValid) {
    return cb(null, true);
  } else {
    const error = new Error("Invalid file type, use only avi, mpg, mp4");
    error.statusCode = 422;
    return cb(error, false);
  }
}
