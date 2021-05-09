const nodemailer = require("nodemailer");

const config = require("../config/app");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.mailUser,
    pass: config.mailPassword,
  },
});

module.exports.sendConfirmationMail = async (
  name,
  email,
  confirmationToken
) => {
  try {
    return transport.sendMail({
      from: config.mailUser,
      to: email,
      subject: "Please activate your account",
      html: `<h1>Please activate your account</h1>
      <h2>Hello ${name}</h2>
      <p>Thank you for registering. Please confirm your email by clicking on the following link</p>
      <a href=${config.appUrl}/activation/${confirmationToken}> Click here</a>
      <p>This link will be valid only for 1 hours, then your registration data will be delete</p>
      </div>`,
    });
  } catch (error) {
    throw error;
  }
};
