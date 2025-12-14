import { useEffect, useState } from "react";
import { getAllSweets, searchSweets } from "../api/sweets";
import { purchaseSweet } from "../api/inventory";

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
    <div className="auth-wrapper">
      <div className="container">
        <h2>User Dashboard</h2>

        {/* SEARCH */}
        <div style={{ marginBottom: "20px" }}>
          <input
            placeholder="Search name"
            value={filters.name}
            onChange={(e) =>
              setFilters({ ...filters, name: e.target.value })
            }
          />

          <input
            placeholder="Category"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Min price"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Max price"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
          />

          <button onClick={handleSearch}>Search</button>
        </div>

        {error && <p className="error">{error}</p>}

        <ul>
          {sweets.map((sweet) => (
            <li key={sweet.id}>
              <strong>{sweet.name}</strong> ({sweet.category}) — ₹
              {sweet.price}
              <br />
              Stock: {sweet.quantity}
              <br />
              <button
                onClick={() => handlePurchase(sweet.name)}
                disabled={sweet.quantity === 0}
              >
                Buy 1
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
