const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const { getUsers } = require("../controllers/users");

router.get("/users", isAuth, getUsers);

router.get("/users/find", isAuth, );

module.exports = router;
