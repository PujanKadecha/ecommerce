const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlist.controller");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const validate = require("../middleware/validation.middleware");
const {
  addToWishlist,
  productIdSchema,
} = require("../validators/wishlist.validator");

router.post(
  "/",
  authenticate,
  authorize("customer"),
  validate(addToWishlist),
  wishlistController.addToWishlist,
);

router.get(
  "/",
  authenticate,
  authorize("customer"),
  wishlistController.getMyWishlist,
);

router.delete(
  "/:productId",
  authenticate,
  authorize("customer"),
  validate(productIdSchema, "params"),
  wishlistController.removeFromWishlist,
);

router.delete(
  "/",
  authenticate,
  authorize("customer"),
  wishlistController.clearWishlist
)

module.exports = router;
