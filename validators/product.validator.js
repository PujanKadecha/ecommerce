const Joi = require("joi");

const createProductSchema = Joi.object({
  name: Joi.string().trim().min(3).max(200).required(),

  slug: Joi.string().trim().lowercase().required(),

  description: Joi.string().max(5000).required(),

  sku: Joi.string().trim().uppercase().required(),

  price: Joi.number().min(0).required(),

  discountPrice: Joi.number().min(0).default(0),

  stock: Joi.number().integer().min(0).required(),

  brand: Joi.string().trim().required(),

  category: Joi.string().trim().required(),

  featured: Joi.boolean().default(false),

  status: Joi.string().valid("active", "inactive").default("active"),
});

const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(3).max(200),

  slug: Joi.string().trim().lowercase(),

  description: Joi.string().max(5000),

  sku: Joi.string().trim().uppercase(),

  price: Joi.number().min(0),

  discountPrice: Joi.number().min(0),

  stock: Joi.number().integer().min(0),

  brand: Joi.string().trim(),

  category: Joi.string().trim(),

  featured: Joi.boolean(),

  status: Joi.string().valid("active", "inactive"),
}).min(1);

const productIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  productIdSchema,
};
