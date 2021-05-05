const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const timestamp = require("time-stamp");
const cron = require("node-cron");
const http = require("http");
const path = require("path");
const router = require("./routes");

const SocketServer = require("./socket");
const logger = require("./config/winston");
const config = require("./config/app");
const { cleanUpInactiveUsers } = require("./jobs/cleanUpInactiveUsers");
const { clearRejectedRequest } = require("./jobs/clearRejectedReqest");

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

//router
app.use(router);

app.use(express.static(path.join(__dirname, "uploads")));

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

//run clean up database inactive users every day at 2:30 AM
cron.schedule("30 2 * * *", () => cleanUpInactiveUsers());
//run clear rejected friend request every 1st day of month at 00:00
cron.schedule("0 0 1 * *", () => clearRejectedRequest());

const server = http.createServer(app);
SocketServer(server);

server.listen(config.appPort, () => {
  logger.log({
    time: timestamp("YYYY/MM/DD/HH:mm:ss"),
    level: "info",
    message: `Server is up and running on port ${config.appPort}`,
  });
});
