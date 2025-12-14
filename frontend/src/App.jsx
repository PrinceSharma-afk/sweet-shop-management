import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import api from "./api/axios";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Inventory from "./pages/Inventory";

function App() {
  useEffect(() => {
    api.get("/test") 
      .then((res) => console.log("Axios test response:", res.data))
      .catch((err) => console.log("Axios test error:", err));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
