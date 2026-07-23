import api from "./axios";

export const getAddresses = () => {
  return api.get("/addresses");
};

export const addAddress = (data) => {
  return api.post("/addresses", data);
};

export const updateAddress = (id, data) => {
  return api.patch(`/addresses/${id}`, data);
};

export const deleteAddress = (id) => {
  return api.delete(`/addresses/${id}`);
};

export const setDefaultAddress = (id) => {
  return api.patch(`/addresses/${id}/default`);
};
