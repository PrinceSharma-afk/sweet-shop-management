// -------------------- NAVBAR COMPONENT --------------------

// React Router utilities for navigation and linking
import { Link, useNavigate } from "react-router-dom";

// Authentication context for user state and actions
import { useAuth } from "../context/AuthContext";

// Navbar-specific styles
import "../styles/navbar.css";

/*
  Navbar Component

  Displays navigation links based on:
  - Authentication status
  - User role (admin or regular user)

  Provides:
  - Conditional navigation links
  - Logout functionality
*/
export default function Navbar() {
  // Retrieve auth state and logout action from context
  const { isAuthenticated, isAdmin, logout } = useAuth();

  // Programmatic navigation hook
  const navigate = useNavigate();

  // Handle user logout
  // Clears auth state and redirects to login page
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      {/* -------------------- LEFT SIDE -------------------- */}
      <div className="nav-left">
        {/* Dashboard link visible to all authenticated users */}
        {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}

        {/* Admin-only navigation links */}
        {isAuthenticated && isAdmin && (
          <>
            <Link to="/admin">Admin</Link>
            <Link to="/inventory">Inventory</Link>
          </>
        )}
      </div>

      {/* -------------------- RIGHT SIDE -------------------- */}
      <div className="nav-right">
        {/* Show Login/Register when user is not authenticated */}
        {!isAuthenticated && (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {/* Show Logout button when user is authenticated */}
        {isAuthenticated && (
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
