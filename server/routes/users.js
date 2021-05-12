const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const isFriend = require("../middleware/isFriend");

const {
  getUsers,
  searchUser,
  getUserInfo,
  getUserPosts,
  getUserFriends,
} = require("../controllers/users");

router.get("/users", isAuth, getUsers);

router.get("/search", isAuth, searchUser);

router.get(
  "/info/:userId",
  [isAuth, isFriend],
  getUserInfo
);

router.get(
  "/posts/:userId",
  [isAuth, isFriend],
  getUserPosts
);

router.get(
  "/friends/:userId",
  [isAuth, isFriend],
  getUserFriends
);

module.exports = router;
