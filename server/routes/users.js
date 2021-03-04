const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const { getActiveUsers } = require("../controllers/users");

router.get("/active-users", isAuth, getActiveUsers);

module.exports = router;
