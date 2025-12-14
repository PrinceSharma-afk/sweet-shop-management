import api from "./axios";

export const getAllSweets = () => api.get("/sweets");

export const searchSweets = (params) =>
  api.get("/sweets/search", { params });

export const createSweet = (data) => api.post("/sweets", data);

export const updateSweet = (name, data) =>
  api.put(`/sweets/${name}`, data);

export const deleteSweet = (name) =>
  api.delete(`/sweets/${name}`);
