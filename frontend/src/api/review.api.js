import api from "./axios";

export const getProductReviews = (productId) => {
  return api.get(`/reviews/products/${productId}/reviews`);
};

export const createReview = (productId, data) => {
  return api.post(`/reviews/products/${productId}/reviews`, data);
};

export const updateReview = (reviewId, data) => {
  return api.put(`/reviews/reviews/${reviewId}`, data);
};

export const deleteReview = (reviewId) => {
  return api.delete(`/reviews/reviews/${reviewId}`);
};
