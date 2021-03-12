const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const { validateResults } = require("../validators/");
const {rules: sendRequest} = require("../validators/friendRequest/sendFriendRequest");

router.put("/send", [isAuth, sendRequest, validateResults], )

module.exports = router;