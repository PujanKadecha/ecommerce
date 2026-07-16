const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const router = express.Router();
const userController = require("../controllers/user.controller");
const validate = require("../middleware/validation.middleware");
const {
  updateProfileSchema,
  changePasswordSchema,
} = require("../validators/user.validator");

router.get("/me", authenticate, userController.getCurrentUser);

router.patch(
  "/profile",
  authenticate,
  validate(updateProfileSchema),
  userController.updateProfile,
);

router.patch(
  "/change-password",
  authenticate,
  validate(changePasswordSchema),
  userController.changePassword,
);

module.exports = router;
