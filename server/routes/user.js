const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const { validateResults } = require("../validators/");
const { rules: updateRules } = require("../validators/user/update");
const { userUpdate } = require("../controllers/user");
const { userFileUpload } = require("../middleware/fileUpload");

router.put(
  "/update",
  [isAuth, userFileUpload, updateRules, validateResults],
  userUpdate
);

module.exports = router;
