// -------------------- REGISTER PAGE --------------------

// React hook for local component state
import { useState } from "react";

// API function to register a new user
import { registerUser } from "../api/auth";

// React Router hook for programmatic navigation
import { useNavigate } from "react-router-dom";

// Authentication page styles
import "../styles/auth.css";

/*
  Register Component

  Handles user registration by:
  - Collecting username and password
  - Sending registration request to backend
  - Redirecting user to login after success
*/
export default function Register() {
  // -------------------- STATE --------------------

  // Form field values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Error message for UI feedback
  const [error, setError] = useState("");

  // Navigation hook
  const navigate = useNavigate();

  /*
    Handle Registration Form Submission

    Flow:
    - Prevent default form submission
    - Call registration API
    - Show success message
    - Redirect user to login page
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Register new user
      await registerUser({ username, password });

      // Inform user and redirect to login
      alert("Registration successful. Please login.");
      navigate("/");
    } catch (err) {
      // Display backend or generic error message
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Register</h2>

        {/* Display error message if registration fails */}
        {error && <p className="error">{error}</p>}

        {/* Registration form */}
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
