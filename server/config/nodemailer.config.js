const nodemailer = require("nodemailer");

const USER = "testovic.prvy@gmail.com";
const GMAIL_PASSWORD = "ubuntu123456";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: USER,
    pass: GMAIL_PASSWORD,
  },
});

module.exports.sendConfirmationMail = async (
  name,
  email,
  confirmationToken
) => {
  try {
    return transport.sendMail({
      from: USER,
      to: email,
      subject: "Please activate your account",
      html: `<h1>Please activate your account</h1>
      <h2>Hello ${name}</h2>
      <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
      <a href=http://localhost:8081/api/users/activation/${confirmationToken}> Click here</a>
      </div>`,
    });
  } catch (error) {
    throw error;
  }
};
