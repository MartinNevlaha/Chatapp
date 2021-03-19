const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const { getFriends } = require("../controllers/friends");

router.get("/", isAuth, getFriends);

module.exports = router;
