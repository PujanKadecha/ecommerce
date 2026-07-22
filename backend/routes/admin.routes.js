const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const adminController = require("../controllers/admin.controller");
const validate = require("../middleware/validation.middleware");
const {
  mongoIdSchema,
  updateRoleSchema,
} = require("../validators/admin.validator");

router.use(authenticate);
router.use(authorize("admin"));

router.get("/users", adminController.getAllUsers);

router.get(
  "/user/:id",
  validate(mongoIdSchema, "params"),
  adminController.getUserById,
);

router.patch(
  "/users/:id/role",
  validate(mongoIdSchema, "params"),
  validate(updateRoleSchema),
  adminController.updateUserRole,
);

router.delete("/users/:id",validate(mongoIdSchema,"params"),adminController.deleteUser);

router.get("/dashboard",adminController.getDashboardStatus);

module.exports = router;