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
    return cb(null, false);
  }
};

