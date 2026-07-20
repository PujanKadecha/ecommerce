const Joi = require("joi");

const addToCartSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(),
  quantity: Joi.number().integer().min(1).default(),
});

const updateCartItemSchema = Joi.object({
  quantity: Joi.number().integer.min(1).default(),
});

const productIdSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(),
});

const cartItemIdSchema = Joi.object({
  itemId: Joi.string().hex().length(24).required(),
});

module.exports = {
  addToCartSchema,
  updateCartItemSchema,
  productIdSchema,
  cartItemIdSchema,
};
