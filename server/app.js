const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
})