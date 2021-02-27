const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const { userUpdate } = require("../controllers/user");

router.put("/update", isAuth, userUpdate);

module.exports = router;