const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const router = express.Router();
const userController = require("../controllers/user.controller");
const {validate} = require("../middleware/validation.middleware");
const {
  updateProfileSchema,
  changePasswordSchema,
} = require("../validators/user.validator");
const upload = require("../middleware/upload.middleware");
const authorize = require("../middleware/authorize.middleware");

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

router.post(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  userController.uploadAvatar,
);

router.delete("/me", authenticate, userController.deleteAccount);

module.exports = router;
