const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = require("../models/User");

exports.userRegister = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Enterd data is incorrect");
    error.statusCode = 422;
    return next(error);
  }
  const { firstName, lastName, email, password } = req.body;
  try {
    //chceck if user exist
    const userExist = await User.findAll({ where: { email: email } });
    if (userExist[0]) {
      const error = new Error(
        "User is allready exist, please try another email"
      );
      error.statusCode = 409;
      return next(error);
    }
    const hashedPwd = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPwd
    });
    delete user.dataValues.password;

    if (!user) {
      const error = new Error("Cant create user in Db");
      error.statusCode = 409;
      return next(error);
    }

    res.status(201).json({
      status: "ok",
      user: user,
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    res.json({
      status: "ok",
      user: "fake",
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};
