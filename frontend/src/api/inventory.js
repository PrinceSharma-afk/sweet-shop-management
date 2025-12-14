// -------------------- INVENTORY API CLIENT --------------------

// Pre-configured Axios instance
// Automatically includes base URL and auth headers
import api from "./axios";

/*
  Purchase Sweet

  Sends a purchase request for a specific sweet.
  Used when a user buys an item.

  Request flow:
  - Frontend triggers purchase action
  - JWT token is attached via Axios interceptor
  - Backend validates stock and updates quantity
*/
export const purchaseSweet = ({ name, quantity }) =>
  api.post(`/sweets/${name}/purchase`, { quantity });

/*
  Restock Sweet

  Sends a restock request for a specific sweet.
  Typically restricted to admin users.

  Request flow:
  - Admin initiates restock
  - Backend validates admin access
  - Inventory quantity is increased
*/
export const restockSweet = ({ name, quantity }) =>
  api.post(`/sweets/${name}/restock`, { quantity });
