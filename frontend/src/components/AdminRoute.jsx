// -------------------- ADMIN PROTECTED ROUTE --------------------

// Navigate is used for programmatic redirection
import { Navigate } from "react-router-dom";

// Custom authentication hook providing auth state
import { useAuth } from "../context/AuthContext";

/*
  AdminRoute Component

  Protects routes that should only be accessible
  to authenticated admin users.

  Access rules:
  - Not authenticated → redirect to login page
  - Authenticated but not admin → redirect to dashboard
  - Authenticated admin → render protected content
*/
export default function AdminRoute({ children }) {
  // Retrieve authentication and authorization state
  const { isAuthenticated, isAdmin } = useAuth();

  // If user is not logged in, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If user is logged in but not an admin, redirect to dashboard
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // User is authenticated and authorized (admin)
  // Render protected admin content
  return children;
}
