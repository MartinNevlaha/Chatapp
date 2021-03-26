const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { generateFileName, imageFilter } = require("../utils/utilities");

exports.userAvatarUpload = ((req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const { id } = req.user;
      const dest = `uploads/users/${id}`;

      fs.access(dest, (error) => {
        //folder doesnt exists
        if (error) {
          return fs.mkdir(dest, (error) => {
            cb(error, dest);
          });
        } else {
          //exist and rewrite everythinh in folder
          fs.readdir(dest, (error, files) => {
            if (error) throw error;
            for (const file of files) {
              fs.unlink(path.join(dest, file), (error) => {
                if (error) throw error;
              });
            }
          });
          return cb(null, dest);
        }
      });
    },
    filename: generateFileName,
  });

  return multer({ storage, imageFilter }).single("avatar");
})();

exports.userPostImageUpload = ((req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const { id } = req.user;
      const dest = `uploads/users/${id}/images`;

      fs.access(dest, (error) => {
        if (error) {
          return fs.mkdir(dest, (error) => {
            cb(error, dest);
          });
        } else {
          return cb(null, dest);
        }
      });
    },
    filename: generateFileName,
  });

  return multer({ storage, imageFilter }).single("image");
})();
