// -------------------- USER DASHBOARD --------------------

// React hooks for lifecycle and state management
import { useEffect, useState } from "react";

// Sweet-related API functions
import { getAllSweets, searchSweets } from "../api/sweets";

// Inventory API function for purchasing sweets
import { purchaseSweet } from "../api/inventory";

// Dashboard-specific styles
import "../styles/dashboard.css";

/*
  Dashboard Component

  Provides a user-facing dashboard to:
  - View all available sweets
  - Search sweets using filters
  - Purchase sweets (1 unit at a time)

  All routes are protected and require authentication.
*/
export default function Dashboard() {
  // -------------------- STATE --------------------

  // List of sweets displayed on the dashboard
  const [sweets, setSweets] = useState([]);

  // Search/filter parameters
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  // Error message for UI feedback
  const [error, setError] = useState("");

  // Loading state for initial data fetch
  const [loading, setLoading] = useState(true);

  /*
    Fetch all sweets from backend

    Used:
    - On initial page load
    - After successful purchase
  */
  const fetchSweets = async () => {
    try {
      const res = await getAllSweets();
      setSweets(res.data);
    } catch {
      setError("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  // Load sweets when component mounts
  useEffect(() => {
    fetchSweets();
  }, []);

  /*
    Handle Search

    Sends filter parameters to backend
    and updates sweets list with results.
  */
  const handleSearch = async () => {
    try {
      const res = await searchSweets(filters);
      setSweets(res.data);
    } catch {
      setError("Search failed");
    }
  };

  /*
    Handle Purchase

    Purchases 1 unit of the selected sweet.
    Refreshes sweets list after successful purchase.
  */
  const handlePurchase = async (name) => {
    try {
      await purchaseSweet({ name, quantity: 1 });
      fetchSweets();
    } catch (err) {
      setError(err.response?.data?.error || "Purchase failed");
    }
  };

  // Show loading state while data is being fetched
  if (loading) return <p>Loading sweets...</p>;

  return (
    <div className="container">
      <h2>User Dashboard</h2>

      {/* Display error message if any operation fails */}
      {error && <p className="error">{error}</p>}

      {/* =========================
          SEARCH SECTION
      ========================= */}
      <div className="search-card">
        <h3 className="section-title">Search Sweets</h3>

        <div className="search-grid">
          <div>
            <label>Name</label>
            <input
              type="text"
              value={filters.name}
              onChange={(e) =>
                setFilters({ ...filters, name: e.target.value })
              }
              placeholder="Sweet name"
            />
          </div>

          <div>
            <label>Category</label>
            <input
              type="text"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              placeholder="Category"
            />
          </div>

          <div>
            <label>Min Price</label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: e.target.value })
              }
              placeholder="Minimum price"
            />
          </div>

          <div>
            <label>Max Price</label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
              placeholder="Maximum price"
            />
          </div>
        </div>

        <div className="search-actions">
          <button className="btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <hr className="section-divider" />

      {/* =========================
          SWEETS LIST SECTION
      ========================= */}
      <h3 className="section-title">Sweets</h3>

      {/* Show empty state if no sweets match filters */}
      {sweets.length === 0 ? (
        <p>No sweets available</p>
      ) : (
        <div className="sweet-grid">
          {sweets.map((sweet) => (
            <div className="sweet-card" key={sweet.id}>
              <div className="sweet-info">
                <strong>{sweet.name}</strong>
                <div className="meta">{sweet.category}</div>
                <div className="meta">₹{sweet.price}</div>
                <div className="meta">
                  Available: {sweet.quantity}
                </div>
              </div>

              <div className="sweet-action">
                {/* Disable purchase if stock is zero */}
                <button
                  className="btn-primary"
                  disabled={sweet.quantity === 0}
                  onClick={() => handlePurchase(sweet.name)}
                >
                  Buy 1
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
