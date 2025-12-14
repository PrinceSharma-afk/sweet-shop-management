import axios from "axios";

// Base URL from .env
const baseURL ="http://localhost:5000";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});


export default api;
