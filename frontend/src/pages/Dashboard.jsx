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

  return (<div className="container">
  <h2>User Dashboard</h2>

  {/* Search Section */}
  <div className="search-card">
    <input placeholder="Search name" />
    <input placeholder="Category" />
    <input placeholder="Min price" />
    <input placeholder="Max price" />
    <button className="btn-primary">Search</button>
  </div>

  {/* Results */}
  <div className="sweet-list">
    {sweets.map((sweet) => (
      <div className="sweet-card" key={sweet.id}>
        <div className="sweet-info">
          <strong>{sweet.name}</strong> ({sweet.category}) — ₹{sweet.price}
          <div className="meta">Stock: {sweet.quantity}</div>
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
</div>

  );
}
