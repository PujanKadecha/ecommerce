const Joi = require("joi");

const createReviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),

  comment: Joi.string().trim().min(5).max(1000).required(),
});

const updateReviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),

  comment: Joi.string().trim().min(5).max(1000).required(),
});

module.exports = {
  createReviewSchema,
  updateReviewSchema,
};
