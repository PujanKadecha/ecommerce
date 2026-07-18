const Joi = require("joi");

const createCategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),

  slug: Joi.string().trim().lowercase().required(),

  description: Joi.string().trim().allow("").optional(),

  parent: Joi.string().hex().length(24).allow(null, ""),

  status: Joi.string().valid("active", "inactive").optional(),
});

const updateCategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),

  slug: Joi.string().trim().lowercase(),

  description: Joi.string().trim().allow(""),

  parent: Joi.string().hex().length(24).allow(null, ""),

  status: Joi.string().valid("active", "inactive"),
}).min(1);

const categoryIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
};
