const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const adminController = require("../controllers/admin.controller");
const validate = require("../middleware/validation.middleware");
const { mongoIdSchema } = require("../validators/admin.validator");

router.use(authenticate);
router.use(authorize("admin"));

router.get("/users", adminController.getAllUsers);

router.get(
  "/user/:id",
  validate(mongoIdSchema, "params"),
  adminController.getUserById,
);

module.exports = router;
