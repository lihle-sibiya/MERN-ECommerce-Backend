const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth");
const {
  validateRegister,
  validateLogin,
  validationErrors,
} = require("../validators/auth");

router.post("/register", validateRegister, validationErrors, register);
router.post("/login", validateLogin, validationErrors, login);

module.exports = router;
