// -------------------- APPLICATION ROUTING --------------------

// React Router components for client-side routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Protected pages
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Inventory from "./pages/Inventory";

// Shared layout components
import Navbar from "./components/Navbar";

// Route guards
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

/*
  App Component

  Defines the global routing structure of the application.

  Routing strategy:
  - Public routes: Login, Register
  - Protected routes: Dashboard (authenticated users)
  - Admin-only routes: Admin, Inventory
*/
function App() {
  return (
    <BrowserRouter>
      {/* Global navigation bar (visible on all pages) */}
      <Navbar />

      <Routes>
        {/* -------------------- PUBLIC ROUTES -------------------- */}

        {/* Login page (default route) */}
        <Route path="/" element={<Login />} />

        {/* User registration page */}
        <Route path="/register" element={<Register />} />

        {/* -------------------- PROTECTED ROUTES -------------------- */}

        {/* User dashboard (requires authentication) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* -------------------- ADMIN ROUTES -------------------- */}

        {/* Admin dashboard (admin users only) */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        {/* Inventory management (admin users only) */}
        <Route
          path="/inventory"
          element={
            <AdminRoute>
              <Inventory />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
