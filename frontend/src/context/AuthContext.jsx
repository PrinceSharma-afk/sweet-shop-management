import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load auth state on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedIsAdmin = localStorage.getItem("isAdmin");

    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      setIsAdmin(savedIsAdmin === "true");
    }
  }, []);

  const login = async (credentials) => {
    const res = await loginUser(credentials);

    const { token, isAdmin } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("isAdmin", isAdmin);

    setToken(token);
    setIsAuthenticated(true);
    setIsAdmin(isAdmin);
  };

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

export const useAuth = () => {
  return useContext(AuthContext);
};
