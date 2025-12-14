// -------------------- APPLICATION ENTRY POINT --------------------

// React core library
import React from "react";

// React 18 root API for rendering the application
import ReactDOM from "react-dom/client";

// Authentication context provider
// Wraps the app to provide global auth state
import { AuthProvider } from "./context/AuthContext";

// Main application component
import App from "./App";
import "./styles/global.css";

/*
  Bootstrap the React application

  Flow:
  - Create root element
  - Enable StrictMode for development checks
  - Wrap App with AuthProvider for global auth access
*/
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
