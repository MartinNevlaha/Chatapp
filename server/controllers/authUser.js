const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const timestamp = require("time-stamp");

const User = require("../models/").User;
const { sendConfirmationMail } = require("../config/nodemailer.config");
const logger = require("../config/winston");
const config = require("../config/app");

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
      config.jwtSecretMail,
      { expiresIn: "1h" }
    );

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      activationToken,
    });

    if (!user) {
      const error = new Error("Cant create user in Db");
      error.statusCode = 409;
      return next(error);
    }

    const activationEmail = await sendConfirmationMail(
      user.fullName,
      user.email,
      user.activationToken
    );
    if (!activationEmail) {
      const error = new Error("Cant send activation email");
      error.statusCode = 500;
      return next(error);
    }

    res.status(201).json({
      status: "ok",
      message: `User register successfully`,
      registered: true,
    });
  } catch (error) {
    console.log(error);
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
      config.jwtSecret,
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

exports.activationUser = async (req, res, next) => {
  const confirmationToken = req.params.token;
  let validToken = true;
  try {
    const decodedToken = await jwt.verify(
      confirmationToken,
      config.jwtSecretMail,
      (err, verified) => {
        if (err) {
          validToken = false;
        } else {
          return verified;
        }
      }
    );
    if (validToken) {
      const user = await User.findOne({
        where: {
          email: decodedToken.email,
        },
      });
      if (!user) {
        const error = new Error("User doesn't exist");
        error.statusCode = 404;
        return next(error);
      }
      if (user.activated === true) {
        const error = new Error("User is allready activated");
        error.statusCode = 409;
        return next(error);
      }
      if (user.activationToken !== confirmationToken) {
        const error = new Error("Activation token is malformed");
        error.statusCode = 401;
        return next(error);
      }
      user.activated = true;
      user.activationToken = "";
      const updatedUser = user.save();

      if (!updatedUser) {
        const error = new Error("Cant activate user");
        error.statusCode = 500;
        return next(error);
      }
      res.json({
        status: "ok",
        message: "User is successfully activated",
        activated: user.activated,
      });
    } else {
      await User.destroy({
        where: { activationToken: confirmationToken },
      });
      const { email } = jwt.decode(confirmationToken);
      logger.log({
        time: timestamp("YYYY/MM/DD/HH:mm:ss"),
        level: "info",
        message: `User with mail ${email} was deleted due to expired token`,
      });
      const error = new Error("Activate token is invalid");
      error.statusCode = 401;
      return next(error);
    }
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};
