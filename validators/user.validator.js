const Joi = require("joi");

const updateProfileSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50),

  lastName: Joi.string().trim().min(2).max(50),
  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/),
}).min(1);

const changePasswordSchema = Joi.object({
    currentPassword: Joi.string()
        .required(),

    newPassword: Joi.string()
        .min(8)
        .max(30)
        .required()
});

module.exports = {
    updateProfileSchema,
    changePasswordSchema
}