const express = require("express");
const router = express.Router();
const validate = require("../middleware/validation.middleware");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const reviewController = require("../controllers/review.controller");
const {
  createReviewSchema,
  updateReviewSchema,
} = require("../validators/review.validator");

router.get("/products/:productId/reviews", reviewController.getProductReviews);

router.post(
  "/products/:productId/reviews",
  authenticate,
  authorize("customer", "admin"),
  validate(createReviewSchema),
  reviewController.createReview,
);

router.put(
  "/reviews/:reviewId",
  authenticate,
  authorize("customer", "admin"),
  validate(updateReviewSchema),
  reviewController.updateReview,
);

router.delete(
  "/reviews/:reviewId",
  authenticate,
  authorize("customer", "admin"),
  reviewController.deleteReview,
);

module.exports = router;
