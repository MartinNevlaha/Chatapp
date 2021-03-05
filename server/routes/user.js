const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const { validateResults } = require("../validators/");
const { rules: updateRules } = require("../validators/user/update");
const { userUpdate, userProfile, sendFriendRequest } = require("../controllers/user");
const { userFileUpload } = require("../middleware/fileUpload");

router.get("/profile", isAuth, userProfile);

router.put(
  "/update",
  [isAuth, userFileUpload, updateRules, validateResults],
  userUpdate
);

router.put("/request", isAuth, sendFriendRequest);

module.exports = router;
