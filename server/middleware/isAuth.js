const jwt = require("jsonwebtoken");
const config = require("../config/app");

const isAuth = (req, res, next) => {
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
    req.user = {
      userId: decodedToken.userId,
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      role: decodedToken.role,
    };
    next();
  } catch (error) {
    const error = new Error("Authentification failed");
    error.statusCode = 401;
    return next(error);
  }
};
