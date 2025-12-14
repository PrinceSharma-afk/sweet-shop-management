// -------------------- SWEETS API CLIENT --------------------

// Pre-configured Axios instance
// Handles base URL and automatically attaches auth headers
import api from "./axios";

/*
  Get All Sweets

  Fetches the complete list of sweets from the backend.
  Accessible to authenticated users.
*/
export const getAllSweets = () => api.get("/sweets");

/*
  Search Sweets

  Fetches sweets based on optional filter parameters.
  Supported filters:
  - name
  - category
  - minPrice
  - maxPrice

  Parameters are automatically converted into query strings.
*/
export const searchSweets = (params) =>
  api.get("/sweets/search", { params });

/*
  Create Sweet

  Sends request to add a new sweet to inventory.
  Typically restricted to admin users.
*/
export const createSweet = (data) => api.post("/sweets", data);

/*
  Update Sweet

  Updates an existing sweet identified by name.
  Allows partial updates (price, quantity, category).
  Restricted to admin users.
*/
export const updateSweet = (name, data) =>
  api.put(`/sweets/${name}`, data);

/*
  Delete Sweet

  Removes a sweet from inventory permanently.
  Restricted to admin users.
*/
export const deleteSweet = (name) =>
  api.delete(`/sweets/${name}`);
