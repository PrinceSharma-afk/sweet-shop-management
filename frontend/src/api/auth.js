// -------------------- AUTH API CLIENT --------------------

// Pre-configured Axios instance
// Handles base URL, headers, and interceptors (if any)
import api from "./axios";

/*
  Login User

  Sends user credentials to the backend login endpoint.
  On success:
  - Backend returns a JWT token
  - Frontend stores token (localStorage/context)
  - Token is used for authenticated requests
*/
export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

/*
  Register User

  Sends new user details to the backend registration endpoint.
  On success:
  - User account is created
  - Backend returns basic user information
*/
export const registerUser = (data) => {
  return api.post("/auth/register", data);
};
