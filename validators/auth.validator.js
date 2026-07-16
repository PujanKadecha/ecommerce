const Joi = require("joi");

const registerSchema = Joi.object({
  firstname: Joi.string().trim().min(2).max(10).required(),

  lastname: Joi.string().trim().min(2).max(10).required(),

  email: Joi.string().email().lowercase().required(),

  password: Joi.string()
    .min(8)
    .max(32)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain uppercase, lowercase, number and special character.",
    }),

  phone: Joi.string().allow("").optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),

  password: Joi.string().required(),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const logoutSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  logoutSchema,
};
