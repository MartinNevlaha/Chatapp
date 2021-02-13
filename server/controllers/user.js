const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET_MAIL_ACTIVATED_SALT =
  process.env.JWT_SECRET_MAIL_ACTIVATED_SALT;

const User = require("../models/User");

exports.userRegister = async (req, res, next) => {
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

    const activationToken = await jwt.sign(
      { email },
      lastName + JWT_SECRET_MAIL_ACTIVATED_SALT
    );

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      activationToken
    });
    if (!user) {
      const error = new Error("Cant create user in Db");
      error.statusCode = 409;
      return next(error);
    }

    res.status(201).json({
      status: "ok",
      message: `User register successfully`,
      registered: true,
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

exports.userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      const error = new Error("Invalid login email entered, please try again");
      error.statusCode = 401;
      return next(error);
    }
    const isPwdValid = await bcrypt.compare(password, user.password);
    if (!isPwdValid) {
      const error = new Error("Invalid password entered, please try again");
      error.statusCode = 401;
      return next(error);
    }
    if (!user.activated) {
      const error = new Error(
        "User is not activated, please activate user first"
      );
      error.statusCode = 401;
      return next(error);
    }
    const token = jwt.sign(
      {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      status: "ok",
      message: `User login successfully`,
      token: token,
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};
