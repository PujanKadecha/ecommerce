const reviewServices = require("../services/review.service");

const createReview = async (req, res, next) => {
  try {
    const review = await reviewServices.createReview(
      req.user.id,
      req.params.productId,
      req.body,
    );

    res.status(201).json({
      success: true,
      message: "Review Created Successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

const getProductReviews = async (req, res, next) => {
  try {
    const review = await reviewServices.getProductReviews(req.params.productId);

    res.status(200).json({
      success: true,
      message: "Review Fetched Successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const review = await reviewServices.updateReview(
      req.params.reviewId,
      req.user.id,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Review Updated Successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await reviewServices.deleteReview(
      req.params.reviewId,
      req.user.id,
    );

    res.status(200).json({
      success: true,
      message: "Review Deleted Successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
};
