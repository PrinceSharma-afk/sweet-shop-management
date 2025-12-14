// -------------------- PROTECTED ROUTE --------------------

// Navigate is used for programmatic redirection
import { Navigate } from "react-router-dom";

// Custom authentication hook providing auth state
import { useAuth } from "../context/AuthContext";

/*
  ProtectedRoute Component

  Guards routes that require authentication.

  Access rules:
  - Not authenticated → redirect to login page
  - Authenticated → render protected content
*/
export default function ProtectedRoute({ children }) {
  // Retrieve authentication state from context
  const { isAuthenticated } = useAuth();

  // If user is not logged in, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated
  // Render protected child components
  return children;
}
