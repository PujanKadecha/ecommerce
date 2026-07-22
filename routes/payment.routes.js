const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const validate = require("../middleware/validation.middleware");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const {
  createPaymentSchema,
  verifyPaymentSchema,
  paymentIdSchema,
} = require("../validators/payment.validator");

router.post(
  "/create-intent",
  authenticate,
  authorize("customer"),
  validate(createPaymentSchema),
  paymentController.createPaymentIntent,
);

router.post(
  "/verify",
  authenticate,
  authorize("customer"),
  validate(verifyPaymentSchema),
  paymentController.verifyPayment,
);

router.post(
  "/webhook",
  express.raw({
    type: "application/json",
  }),
  paymentController.handleWebhook,
);

module.exports = router;
