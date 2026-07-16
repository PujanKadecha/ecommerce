const Joi = require("joi");

const updateProfileSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50),

  lastname: Joi.string().trim().min(2).max(50),
  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/),
}).min(1);

module.exports = {
    updateProfileSchema
}