const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const validate = require("../middleware/validation.middleware");
const {
  addToCartSchema,
  updateCartItemSchema,
  cartItemIdSchema,
} = require("../validators/cart.validator");

router.post(
  "/",
  authenticate,
  authorize("customer"),
  validate(addToCartSchema),
  cartController.addToCart,
);

router.get("/", authenticate, authorize("customer"), cartController.getMyCart);

router.patch(
  "/:itemId",
  authenticate,
  authorize("customer"),
  validate(cartItemIdSchema, "params"),
  validate(updateCartItemSchema),
  cartController.updateCartItem,
);

router.delete(
  "/:itemId",
  authenticate,
  authorize("customer"),
  validate(cartItemIdSchema, "params"),
  cartController.removeCartItem,
);

router.delete("/",authenticate,authorize("customer"),cartController.clearCart);

module.exports = router;
