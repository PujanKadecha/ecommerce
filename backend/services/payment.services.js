const stripe = require("../config/stripe");
const Order = require("../models/order.model");
const Payment = require("../models/payment.model");

const createPaymentIntent = async (userId, orderId) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }

  if (order.paymentStatus === "paid") {
    const error = new Error("Order already paid");
    error.statusCode = 400;
    throw error;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: order.totalAmount * 100,
    currency: "usd",
    metadata: {
      orderId: order._id.toString(),
      userId: userId.toString(),
    },
  });

  const payment = await Payment.create({
    user: userId,
    order: order._id,
    paymentIntentId: paymentIntent.id,
    amount: order.totalAmount,
    currency: "usd",
    status: "pending",
    gatewayResponse: paymentIntent,
  });

  return {
    clientSecret: paymentIntent.client_secret,
    payment,
  };
};

const verifyPayment = async (userId, paymentIntentId) => {
  const payment = await Payment.findOne({
    paymentIntentId,
    user: userId,
  });

  if (!payment) {
    const error = new Error("Payment not found");
    error.statusCode = 404;
    throw error;
  }

  if (payment.status === "paid") {
    const error = new Error("Payment already verified");
    error.statusCode = 400;
    throw error;
  }
 
  if (paymentIntent.status !== "succeeded") {
    const error = new Error("Payment has not been completed");
    error.statusCode = 400;
    throw error;
  }

  payment.status = "paid";
  payment.paymentMethod = paymentIntent.payment_method_types[0];
  payment.gatewayResponse = paymentIntent;
  await payment.save();
  const order = await Order.findById(payment.order);
  order.paymentStatus = "paid";
  await order.save();

  return {
    payment,
    order,
  };
};

const handleWebhook = async (event) => {
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const payment = await Payment.findOne({
        paymentIntentId: paymentIntent.id,
      });
      if (!payment) {
        return;
      }
      if (payment.status === "paid") {
        return;
      }
      payment.status = "paid";
      payment.paymentMethod = paymentIntent.payment_method_types[0];
      payment.gatewayResponse = paymentIntent;
      await payment.save();
      await Order.findByIdAndUpdate(
        payment.order,
        {
          paymentStatus: "paid",
        },
      );
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      await Payment.findOneAndUpdate(
        {
          paymentIntentId: paymentIntent.id,
        },
        {
          status: "failed",
          gatewayResponse: paymentIntent,
        },
      );
      break;
    }

    default:
      console.log(`Unhandled Event: ${event.type}`);
  }
};

module.exports = {
  createPaymentIntent,
  verifyPayment,
  handleWebhook
};
