const Joi = require("joi");

const mongoIdSchema = Joi.object({
  id: Joi.string().length(24).hex().required(),
});

const updateRoleSchema = Joi.object({
  role: Joi.string().valid("customer", "seller", "admin").required(),
});

module.exports = {
  mongoIdSchema,
  updateRoleSchema,
};
