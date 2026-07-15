const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

const validate = require("../middleware/validation.middleware");

const { registerSchema } = require("../validators/auth.validator");

router.post("/register", validate(registerSchema), authController.register);

module.exports = router;
