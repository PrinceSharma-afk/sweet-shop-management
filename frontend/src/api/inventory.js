import api from "./axios";

export const purchaseSweet = ({ name, quantity }) =>
  api.post(`/sweets/${name}/purchase`, { quantity });

export const restockSweet = ({ name, quantity }) =>
  api.post(`/sweets/${name}/restock`, { quantity });
