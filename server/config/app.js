require("dotenv").config();

module.exports = {
  nodeEnv: process.env.NODE_ENV,
  appPort: process.env.PORT || 8000,
  appUrl: process.env.APP_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtSecretMail: process.env.JWT_SECRET_MAIL_ACTIVATED,
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  redisPass: process.env.REDIS_PASSWORD
}