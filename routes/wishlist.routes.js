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

module.exports = router;
