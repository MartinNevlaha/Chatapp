const router = require("express").Router();

router.use("/api/auth", require("./authUser"));
router.use("/api/user/", require("./user"));
router.use("/api/users/", require("./users"));
router.use("/api/posts/", require("./post"));
router.use("/api/friendship/", require("./friendRequest"));
router.use("/api/friends", require("./friends"));
router.use("/api/chat/", require("./chat"));

module.exports = router;