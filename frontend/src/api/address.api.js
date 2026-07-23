import api from "./axios";

export const getaddress = () => {
  return api.get("/address");
};

export const addAddress = (data) => {
  return api.post("/address", data);
};

export const updateAddress = (id, data) => {
  return api.patch(`/address/${id}`, data);
};

export const deleteAddress = (id) => {
  return api.delete(`/address/${id}`);
};

export const setDefaultAddress = (id) => {
  return api.patch(`/address/${id}/default`);
};
