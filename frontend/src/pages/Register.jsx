import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

import "../styles/auth.css";
export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser({ username, password });
      alert("Registration successful. Please login.");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
  <div className="auth-wrapper">
    <div className="auth-container">
      <h2>Register</h2>

      {error && <p className="error">{error}</p>}

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
