import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      {/* LEFT SIDE */}
      <div className="nav-left">
        {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}

        {isAuthenticated && isAdmin && (
          <>
            <Link to="/admin">Admin</Link>
            <Link to="/inventory">Inventory</Link>
          </>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">
        {!isAuthenticated && (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {isAuthenticated && (
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
