const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const { validateResults } = require("../validators/");
const { rules: updateRules } = require("../validators/user/update");
const { userUpdate } = require("../controllers/user");

router.put("/update", [isAuth, updateRules, validateResults], userUpdate);

module.exports = router;
