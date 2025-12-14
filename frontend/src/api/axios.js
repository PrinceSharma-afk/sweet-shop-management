// -------------------- AXIOS CONFIGURATION --------------------

// Axios is used for making HTTP requests to the backend
import axios from "axios";

// Create a pre-configured Axios instance
// Centralizes base URL and shared request behavior
const api = axios.create({
  // Base URL for all API requests
  // Keeps endpoint usage consistent across the frontend
  baseURL: "http://localhost:5000/api",
});

/*
  Request Interceptor

  This interceptor runs before every outgoing request.

  Purpose:
  - Automatically attach JWT token (if available)
  - Ensures authenticated requests without repeating logic
  - Keeps API calls clean inside components
*/
api.interceptors.request.use((config) => {
  // Retrieve JWT token from localStorage
  const token = localStorage.getItem("token");

  // If token exists, attach it to Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Return modified request configuration
  return config;
});

// Export configured Axios instance
// Used across the frontend API layer
export default api;
