const jwt = require("jsonwebtoken");
const config = require("../config/app");
const User = require("../models").User;

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      const error = new Error("Authentification failed");
      error.statusCode = 401;
      return next(error);
    }
    const decodedToken = jwt.verify(token, config.jwtSecret, (err, user) => {
      if (err) {
        const error = new Error("Token is invalid");
        error.statusCode = 401;
        return next(error);
      }
      return user;
    });
    const userReq = await User.findOne({
      where: {
        id: decodedToken.userId,
      },
      attributes: {
        exclude: ["password", "activationToken", "activated"],
      },
    });
    req.user = userReq;

    next();
  } catch (err) {
    const error = new Error("Authentification failed");
    error.statusCode = 401;
    return next(error);
  }
};

module.exports = isAuth;
