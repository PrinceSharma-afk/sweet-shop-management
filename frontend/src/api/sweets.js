import api from "./axios";

export const getAllSweets = () => {
  return api.get("/sweets");
};

export const createSweet = (data) => {
  return api.post("/sweets", data);
};

export const updateSweet = (name, data) => {
  return api.put(`/sweets/${name}`, data);
};

export const deleteSweet = (name) => {
  return api.delete(`/sweets/${name}`);
};
