const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const timestamp = require("time-stamp");
const cron = require("node-cron");

const logger = require("./config/winston");
const config = require("./config/app");
const db = require("./config/db");
const { cleanUpInactiveUsers } = require("./jobs/cleanUpInactiveUsers");

//models
const User = require("./models/User");
const Room = require("./models/Room");
const Message = require("./models/Message");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(
  morgan("combined", {
    stream: logger.stream,
  })
);

app.use("/api/users", require("./routes/authUser"));

//Error handler
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  logger.error(
    `${timestamp("YYYY/MM/DD/HH:mm:ss")} - ${status} - ${message} - ${data} - ${
      req.originalUrl
    } - ${req.method} - ${req.ip}`
  );
  res.status(status);
  res.json({ message: message, data: data });
});

User.belongsTo(Room, { constraints: true, onDelete: "CASCADE" });
Room.hasMany(User);
Message.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Message);
Message.belongsTo(Room, { constraints: true, onDelete: "CASCADE" });
Room.hasMany(Message);

//run clean up database inactive users every day at 2:30 AM
cron.schedule("30 2 * * *", () => cleanUpInactiveUsers());

db.sync()
  .then((res) => {
    app.listen(config.appPort, () => {
      logger.log({
        time: timestamp("YYYY/MM/DD/HH:mm:ss"),
        level: "info",
        message: `DB connected and server is up and running on port ${config.appPort}`,
      });
    });
  })
  .catch((err) => {
    console.log(err);
    logger.error({
      time: timestamp("YYYY/MM/DD/HH:mm:ss"),
      level: "error",
      message: err,
    });
  });
