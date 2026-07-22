const paymentServices = require("../services/payment.services");

const createPaymentIntent = async (req, res, next) => {
  try {
    const result = await paymentServices.createPaymentIntent(
      req.user._id,
      req.body.orderId,
    );

    res.status(201).json({
      success: true,
      message: "Payment intent created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const verifyPayment = async (req, res, next) => {
  try {
    const result = await paymentServices.verifyPayment(
      req.user._id,
      req.body.paymentIntentId,
    );

    res.status(200).json({
      success: true,
      message: "Payment Verified Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const stripe = require("../config/stripe");

const handleWebhook = async (req, res, next) => {
  try {
    const signature = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    await paymentService.handleWebhook(event);
    res.json({
      received: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPaymentIntent,
  verifyPayment,
  handleWebhook
};
