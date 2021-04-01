const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const { getUsers, searchUser } = require("../controllers/users");

router.get("/users", isAuth, getUsers);

router.get("/search", isAuth, searchUser);

module.exports = router;
