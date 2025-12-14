import api from "./axios";

export const purchaseSweet = (data) => {
  return api.post("/inventory/purchase", data);
};

export const restockSweet = (data) => {
  return api.post("/inventory/restock", data);
};
