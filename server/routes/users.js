const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const { getUsers } = require("../controllers/users");

router.get("/users", isAuth, getUsers);

module.exports = router;
