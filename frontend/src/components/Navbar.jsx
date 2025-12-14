import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{ marginBottom: "20px" }}>
      {!isAuthenticated && (
        <>
          <Link to="/">Login</Link> |{" "}
          <Link to="/register">Register</Link>
        </>
      )}

      {isAuthenticated && (
        <>
          <Link to="/dashboard">Dashboard</Link>

          {isAdmin && (
            <>
              {" | "}
              <Link to="/admin">Admin</Link>
              {" | "}
              <Link to="/inventory">Inventory</Link>
            </>
          )}

          {" | "}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}
