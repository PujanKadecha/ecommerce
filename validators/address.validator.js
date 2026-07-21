const Joi = require("joi");

const addAddressSchema = Joi.object({
  fullName: Joi.string().trim().min(3).max(100).required(),
  phone: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required(),
  addressLine1: Joi.string().trim().max(200).required(),
  addressLine2: Joi.string().trim().allow("").optional(),
  landmark: Joi.string().trim().allow("").optional(),
  city: Joi.string().trim().max(100).required(),
  state: Joi.string().trim().max(100).required(),
  postalCode: Joi.string()
    .pattern(/^\d{6}$/)
    .required(),
  country: Joi.string().trim().max(100).default("India"),
  addressType: Joi.string().valid("home", "office", "other").default("home"),
  isDefault: Joi.boolean().default(false),
});

const updateAddressSchema = Joi.object({
  fullName: Joi.string().trim().min(3).max(100),
  phone: Joi.string().pattern(/^[6-9]\d{9}$/),
  addressLine1: Joi.string().trim().max(200),
  addressLine2: Joi.string().trim().allow(""),
  landmark: Joi.string().trim().allow(""),
  city: Joi.string().trim().max(100),
  state: Joi.string().trim().max(100),
  postalCode: Joi.string().pattern(/^\d{6}$/),
  country: Joi.string().trim().max(100),
  addressType: Joi.string().valid("home", "office", "other"),
  isDefault: Joi.boolean(),
}).min(1);

const addressIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

module.exports = {
  addAddressSchema,
  updateAddressSchema,
  addressIdSchema,
};
