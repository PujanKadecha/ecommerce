const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

const authenticate = require("../middleware/auth.middleware");

const validate = require("../middleware/validation.middleware");

const {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  logoutSchema,
} = require("../validators/auth.validator");

router.post("/register", validate(registerSchema), authController.register);

router.post("/login", validate(loginSchema), authController.login);

router.post(
  "/refresh",
  validate(refreshTokenSchema),
  authController.refreshToken,
);

router.post("/logout", validate(logoutSchema), authController.logout);

router.post("/logoutall", authenticate, authController.logoutAll);

module.exports = router;
