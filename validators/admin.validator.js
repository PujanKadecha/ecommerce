const Joi = require("joi");

const mongoIdSchema = Joi.object({
  id: Joi.string().length(24).hex().required(),
});

module.exports = {
  mongoIdSchema,
};
