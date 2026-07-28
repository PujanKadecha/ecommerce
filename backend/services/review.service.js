const mongoose = require("mongoose");
const Review = require("../models/review.model");
const Product = require("../models/product.model");

const updateProductRating = async (productId) => {
  const result = await Review.aggregate([
    {
      $match: {
        product: new mongoose.Types.ObjectId(productId),
      },
    },
    {
      $group: {
        _id: "$product",
        averageRating: {
          $avg: "$rating",
        },
        numReviews: {
          $sum: 1,
        },
      },
    },
  ]);

  if (result.length === 0) {
    await Product.findByIdAndUpdate(productId, {
      averageRating: 0,
      numReviews: 0,
    });

    return;
  }

  await Product.findByIdAndUpdate(productId, {
    averageRating: Number(result[0].averageRating.toFixed(1)),
    numReviews: result[0].numReviews,
  });
};

const createReview = async (userId, productId, data) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  const alreadyReviewed = await Review.findOne({
    user: userId,
    product: productId,
  });

  if (alreadyReviewed) {
    throw new Error("You have already reviewed this product");
  }

  const review = await Review.create({
    user: userId,
    product: productId,
    rating: data.rating,
    comment: data.comment,
  });

  await updateProductRating(productId);

  return review;
};

const getProductReviews = async (productId) => {
  return await Review.find({
    product: productId,
  })
    .populate("user", "firstName lastName avatar")
    .sort({
      createdAt: -1,
    });
};

const updateReview = async (reviewId, userId, data) => {
  const review = await Review.findById(reviewId);

  if (!review) {
    throw new Error("Review not found");
  }

  if (review.user.toString() !== userId.toString()) {
    throw new Error("Unauthorized");
  }
  review.rating = data.rating;
  review.comment = data.comment;
  await review.save();
  await updateProductRating(review.product);
  return review;
};

const deleteReview = async (reviewId, userId) => {
  const review = await Review.findById(reviewId);

  if (!review) {
    throw new Error("Review not found");
  }

  if (review.user.toString() !== userId.toString() && role !== "admin") {
    throw new Error("Unauthorized");
  }

  const productId = review.product;

  await review.deleteOne();

  await updateProductRating(productId);

  return;
};

module.exports = {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
};
