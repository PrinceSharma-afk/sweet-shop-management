// -------------------- AUTH CONTEXT --------------------

// React hooks for state management and lifecycle handling
import { createContext, useContext, useEffect, useState } from "react";

// API call for user login
import { loginUser } from "../api/auth";

// Create authentication context
// Holds global auth state for the application
const AuthContext = createContext(null);

/*
  AuthProvider Component

  Wraps the application and provides authentication state:
  - JWT token
  - Authentication status
  - Admin role
  - Login & logout actions
*/
export const AuthProvider = ({ children }) => {
  // JWT token returned from backend
  const [token, setToken] = useState(null);

  // Indicates whether user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Indicates whether logged-in user has admin privileges
  const [isAdmin, setIsAdmin] = useState(false);

  /*
    Load authentication state on page refresh

    Purpose:
    - Persist login across browser refreshes
    - Restore token and role from localStorage
  */
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedIsAdmin = localStorage.getItem("isAdmin");

    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      setIsAdmin(savedIsAdmin === "true");
    }
  }, []);

  /*
    Login Function

    Flow:
    - Send credentials to backend
    - Receive JWT token and admin flag
    - Persist auth state in localStorage
    - Update global auth state
  */
  const login = async (credentials) => {
    const res = await loginUser(credentials);

    const { token, isAdmin } = res.data;

    // Persist auth data for session recovery
    localStorage.setItem("token", token);
    localStorage.setItem("isAdmin", isAdmin);

    // Update context state
    setToken(token);
    setIsAuthenticated(true);
    setIsAdmin(isAdmin);
  };

  /*
    Logout Function

    Flow:
    - Clear persisted auth data
    - Reset global auth state
    - User is effectively logged out
  */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");

    setToken(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/*
  useAuth Hook

  Provides easy access to authentication context
  inside any component.
*/
export const useAuth = () => {
  return useContext(AuthContext);
};
