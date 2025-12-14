import { useEffect, useState } from "react";
import { getAllSweets } from "../api/sweets";
import { restockSweet } from "../api/inventory";
import "../styles/inventory.css";
import "../styles/admin.css";




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
    const qty = Number(restockQty[name] || 1);

    if (qty <= 0) {
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

  return  (
  <div className="container">
    <h2>Inventory Management</h2>

    {error && <p className="error">{error}</p>}

    <div className="sweet-list">
      {sweets.map((sweet) => (
        <div className="card card-manage" key={sweet.id}>
          <div className="card-row">
            <div className="card-info">
              <strong>{sweet.name}</strong> ({sweet.category}) — ₹{sweet.price}
              <div className="meta">Stock: {sweet.quantity}</div>
            </div>
          </div>

          <div className="admin-actions">
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
