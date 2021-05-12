const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const { validateResults } = require("../validators/");
const { rules: updateRules } = require("../validators/user/update");
const {
  userUpdate,
  userProfile,
  deleteUserAccount,
} = require("../controllers/user");
const { userAvatarUpload } = require("../middleware/fileUpload");
const resizeImage = require("../middleware/resizeImage");

router.get(
  "/profile",
  isAuth,
  userProfile
);

router.put(
  "/update",
  [
    isAuth,
    userAvatarUpload,
    resizeImage,
    updateRules,
    validateResults,
  ],
  userUpdate
);

router.delete("/", isAuth, deleteUserAccount);

module.exports = router;
