const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const timestamp = require("time-stamp");
require("dotenv").config();

const logger = require("./config/winston");
const db = require("./config/db");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(
  morgan("combined", {
    stream: logger.stream,
  })
);
db.sync()
  .then((res) => {
    app.listen(PORT, () => {
      logger.log({
        time: timestamp("YYYY/MM/DD/HH:mm:ss"),
        level: "debug",
        message: `DB connected and server is up and running on port ${PORT}`,
      });
    });
  })
  .catch(err => {
    logger.error({
      time: timestamp("YYYY/MM/DD/HH:mm:ss"),
      level: "error",
      message: err
    })
  });
