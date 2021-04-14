const router = require("express").Router();

const isAuth = require("../middleware/isAuth");

const { index } = require("../controllers/ChatControler");

router.get("/", isAuth, index);

module.exports = router;
