const router = require("express").Router();

const {
  userLogin,
  userRegister,
  activationUser,
} = require("../controllers/authUser");
const { validateResults } = require("../validators");
const { rules: loginRules } = require("../validators/auth/login");
const { rules: registrationRules } = require("../validators/auth/register");

router.post("/register", [registrationRules, validateResults], userRegister);

router.patch("/activation/:token", activationUser);

router.post("/login", [loginRules, validateResults], userLogin);

module.exports = router;
