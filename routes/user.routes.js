const express = require("express");

const authenticate = require("../middleware/auth.middleware");

const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/me",authenticate,userController.getCurrentUser);

module.exports = router;
