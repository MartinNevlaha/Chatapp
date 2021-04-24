const sharp = require("sharp");
const logger = require("../config/winston");
const timestamp = require("time-stamp");
const { imageDimension } = require("../config/imageDimension");


sharp.cache(false);

const resizeImage = async (req, res, next) => {
  try {
    if (req.file) {
      let buffer = await sharp(req.file.path, { failOnError: false })
        .resize(imageDimension.width, imageDimension.heigth, { fit: sharp.fit.fill, withoutEnlargement: true })
        .toBuffer();
      if (!buffer) {
        logger.error({
          time: timestamp("YYYY/MM/DD/HH:mm:ss"),
          level: "error",
          message: "Cant create buffer from imageOptim",
        });
        next();
      }
      const file = await sharp(buffer).toFile(req.file.path);
      if (!file) {
        logger.error({
          time: timestamp("YYYY/MM/DD/HH:mm:ss"),
          level: "error",
          message: "Cant create resized image from imageOptim",
        });
        next();
      }
      next();
    } else {
      next();
    }
  } catch (error) {
    logger.error({
      time: timestamp("YYYY/MM/DD/HH:mm:ss"),
      level: "error",
      message: error,
    });
    next();
  }
};

module.exports = resizeImage;
