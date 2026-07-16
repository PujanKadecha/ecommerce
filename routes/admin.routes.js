const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");

const adminController = require("../controllers/admin.controller");

router.use(authenticate);
router.use(authorize("admin"));

router.get(
    "/users",
    adminController.getAllUsers
);

module.exports = router;