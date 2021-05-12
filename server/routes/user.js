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
const cache = require("../config/redisChache");
const {
  setUserProfileIdToRedis,
  delUserProfileCacheEntry,
} = require("../middleware/redisChache");

router.get(
  "/profile",
  [isAuth, setUserProfileIdToRedis, cache.route()],
  userProfile
);

router.put(
  "/update",
  [
    isAuth,
    delUserProfileCacheEntry,
    userAvatarUpload,
    resizeImage,
    updateRules,
    validateResults,
  ],
  userUpdate
);

router.delete("/", [isAuth, delUserProfileCacheEntry], deleteUserAccount);

module.exports = router;
