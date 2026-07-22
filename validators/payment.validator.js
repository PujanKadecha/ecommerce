const Joi = require("joi");

const createPaymentSchema = Joi.object({
  orderId: Joi.string().hex().length(24).required(),
});

const verifyPaymentSchema = Joi.object({
  paymentIntentId: Joi.string().required(),
});

const paymentIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

module.exports = {
  createPaymentSchema,
  verifyPaymentSchema,
  paymentIdSchema,
};
