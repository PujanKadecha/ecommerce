const Joi = require("joi");

const addToWishlist = Joi.object({
  productId: Joi.string().hex().length(24).required(),
});

const productIdSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(),
});

module.exports = {
    addToWishlist,
    productIdSchema
}