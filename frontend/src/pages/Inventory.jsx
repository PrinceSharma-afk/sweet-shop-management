import { useEffect, useState } from "react";
import { getAllSweets } from "../api/sweets";
import { restockSweet } from "../api/inventory";
import "../styles/inventory.css";

export default function Inventory() {
  const [sweets, setSweets] = useState([]);
  const [restockQty, setRestockQty] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSweets = async () => {
    try {
      const res = await getAllSweets();
      setSweets(res.data);
    } catch {
      setError("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleRestock = async (name) => {
    const qty = Number(restockQty[name]);

    if (!qty || qty <= 0) {
      setError("Enter a valid restock quantity");
      return;
    }

    try {
      await restockSweet({ name, quantity: qty });
      setRestockQty({});
      fetchSweets();
    } catch (err) {
      setError(err.response?.data?.error || "Restock failed");
    }
  };

  if (loading) {
    return (
      <div className="container">
        <p>Loading inventory...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Inventory Management</h2>

      {error && <p className="error">{error}</p>}

      <div className="inventory-grid">
        {sweets.map((sweet) => (
          <div className="inventory-card" key={sweet.id}>
            <div className="inventory-info">
              <strong>{sweet.name}</strong> ({sweet.category})
              <div className="meta">₹{sweet.price}</div>
              <div className="meta">Stock: {sweet.quantity}</div>
            </div>

            <div className="inventory-actions">
              <input
                type="number"
                placeholder="Restock qty"
                value={restockQty[sweet.name] || ""}
                onChange={(e) =>
                  setRestockQty({
                    ...restockQty,
                    [sweet.name]: e.target.value,
                  })
                }
              />

              <button
                className="btn-primary"
                onClick={() => handleRestock(sweet.name)}
              >
                Restock
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
