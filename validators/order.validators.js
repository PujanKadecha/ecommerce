const Joi = require("joi");

const placeOrderSchema = Joi.object({
  addressId: Joi.string().hex().length(24).required(),

  paymentMethod: Joi.string().valid("cod", "razorpay", "stripe").default("cod"),
});

const orderIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateOrderStatusSchema = Joi.object({
  orderStatus: Joi.string()
    .valid(
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ).required(),
});

module.exports = {
  placeOrderSchema,
  orderIdSchema,
  updateOrderStatusSchema,
};
