import api from "./axios";

export const getCart = () => {
  return api.get("/cart");
};

export const addToCart = (productId, quantity = 1) => {
  return api.post("/cart", { productId, quantity });
};

export const updateCartItem = (itemId, quantity) => {
  return api.patch(`/cart/${itemId}`, { quantity });
};

export const removeCartItem = (itemId) => {
  return api.delete(`/cart/${itemId}`);
};

export const clearCart = () => {
  return api.delete("/cart");
};
