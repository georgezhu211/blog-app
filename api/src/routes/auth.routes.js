const { Router } = require("express");

const controller = require("../controllers/auth.controller");
const {
  validateSignup,
  validateLogin,
} = require("../validators/auth.validation");
const { handleValidation } = require("../middleware/validation.middleware");

const router = Router();

router.post("/signup", validateSignup, handleValidation, controller.signup);

router.post("/login", validateLogin, handleValidation, controller.login);

module.exports = router;
