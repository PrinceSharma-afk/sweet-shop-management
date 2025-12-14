// -------------------- LOGIN PAGE --------------------

// React hook for local component state
import { useState } from "react";

// React Router hook for programmatic navigation
import { useNavigate } from "react-router-dom";

// Authentication context for login action and auth state
import { useAuth } from "../context/AuthContext";

// Authentication page styles
import "../styles/auth.css";

/*
  Login Component

  Handles user authentication by:
  - Collecting username and password
  - Calling backend login API via AuthContext
  - Redirecting user based on role (admin or user)
*/
export default function Login() {
  // -------------------- STATE --------------------

  // Form field values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Error message for UI feedback
  const [error, setError] = useState("");

  // Login action from auth context
  const { login, isAdmin } = useAuth();

  // Navigation hook
  const navigate = useNavigate();

  /*
    Handle Login Form Submission

    Flow:
    - Prevent default form submission
    - Call login API with credentials
    - Store auth state via AuthContext
    - Redirect user based on role
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Perform login (sets token and role in context & localStorage)
      await login({ username, password });

      // Read admin flag from localStorage
      // Used to determine post-login redirection
      const adminFlag = localStorage.getItem("isAdmin");

      // Redirect based on user role
      if (adminFlag === "true") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      // Display backend or generic error message
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Login</h2>

        {/* Display error message if login fails */}
        {error && <p className="error">{error}</p>}

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
