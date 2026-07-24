import api from "./axios";

export const getCategories = () => {
  return api.get("/categories");
};

export const getCategoryById = (id) => {
  return api.get(`/categories/${id}`);
};

// Admin Routes
export const createCategory = (data) => {
  return api.post("/categories", data);
};

export const updateCategory = (id, data) => {
  return api.patch(`/categories/${id}`, data);
};

export const deleteCategory = (id) => {
  return api.delete(`/categories/${id}`);
};

export const uploadCategoryImage = (id, formData) => {
  return api.post(`/categories/${id}/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteCategoryImage = (id) => {
  return api.delete(`/categories/${id}/image`);
};
