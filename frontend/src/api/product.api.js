import api from "./axios";

export const getProducts = (params = {}) => {
  return api.get("/products", { params });
};

export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};

// Admin Routes
export const createProduct = (data) => {
  return api.post("/products", data);
};

export const updateProduct = (id, data) => {
  return api.patch(`/products/${id}`, data);
};

export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};

export const uploadProductImages = (id, formData) => {
  return api.post(`/products/${id}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProductImage = (productId, imageId) => {
  return api.delete(`/products/${productId}/images/${imageId}`);
};
