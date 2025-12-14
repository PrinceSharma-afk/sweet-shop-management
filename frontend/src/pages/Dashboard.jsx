import { useEffect, useState } from "react";
import { getAllSweets, searchSweets } from "../api/sweets";
import { purchaseSweet } from "../api/inventory";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleSearch = async () => {
    try {
      const res = await searchSweets(filters);
      setSweets(res.data);
    } catch {
      setError("Search failed");
    }
  };

  const handlePurchase = async (name) => {
    try {
      await purchaseSweet({ name, quantity: 1 });
      fetchSweets();
    } catch (err) {
      setError(err.response?.data?.error || "Purchase failed");
    }
  };

  if (loading) return <p>Loading sweets...</p>;

  return (
    <div className="container">
      <h2>User Dashboard</h2>

      {error && <p className="error">{error}</p>}

      {/* =========================
          Search Section
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
          Sweets Section
      ========================= */}
      <h3 className="section-title">Sweets</h3>

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
