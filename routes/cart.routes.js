const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const validate = require("../middleware/validation.middleware");
const { addToCartSchema } = require("../validators/cart.validator");

router.post(
  "/",
  authenticate,
  authorize("customer"),
  validate(addToCartSchema),
  cartController.addToCart,
);

module.exports = router;
