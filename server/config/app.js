require("dotenv").config();

module.exports = {
  nodeEnv: process.env.NODE_ENV,
  appPort: process.env.PORT || 8000,
  dbName: process.env.DATABASE,
  dbUser: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  jwtSecret: process.env.JWT_SECRET,
  jwtSecretMail: process.env.JWT_SECRET_MAIL_ACTIVATED,
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD
}