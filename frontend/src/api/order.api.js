import api from "./axios";

export const placeOrder = (orderData) => {
  return api.post("/orders", orderData);
};

export const getOrders = () => {
  return api.get("/orders");
};

export const getOrderById = (id) => {
  return api.get(`/orders/${id}`);
};

export const cancelOrder = (id) => {
  return api.post(`/orders/${id}/cancel`);
};
