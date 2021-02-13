const router = require("express").Router();
const { body } = require("express-validator");

const { userLogin, userRegister } = require("../controllers/userLogin");
const validationInputs = require("../middleware/validationsInputs");

router.post(
  "/register",
  [
    body("firstName").trim().notEmpty().isString().isLength({ max: 20 }),
    body("lastName").trim().notEmpty().isString().isLength({ max: 20 }),
    body("email").trim().notEmpty().isString().isEmail(),
    body("password").trim().notEmpty().isString().isLength({min: 6})
  ],
  validationInputs,
  userRegister
);

router.post("/activation/:token")

router.post("/login", [
  body("email").trim().notEmpty().isString().isEmail(),
  body("password").trim().notEmpty().isString().isLength({min: 6})
], validationInputs, userLogin);


module.exports = router;
