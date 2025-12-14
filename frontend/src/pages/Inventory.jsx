import { useEffect, useState } from "react";
import { getAllSweets } from "../api/sweets";
import { restockSweet } from "../api/inventory";

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
    setError("");

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
      <h2 className="section-title">Inventory Management</h2>

      {error && <p className="error">{error}</p>}

      {sweets.length === 0 ? (
        <p>No sweets found</p>
      ) : (
        sweets.map((sweet) => (
          <div key={sweet.id} className="card">
            <div className="card-row">
              <div className="card-info">
                <strong>{sweet.name}</strong>
                <div className="meta">
                  ₹{sweet.price} • Current Stock: {sweet.quantity}
                </div>
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Restock Qty"
                  value={restockQty[sweet.name] || ""}
                  onChange={(e) =>
                    setRestockQty({
                      ...restockQty,
                      [sweet.name]: e.target.value,
                    })
                  }
                />

                <button
                  className="btn btn-secondary"
                  onClick={() => handleRestock(sweet.name)}
                >
                  Restock
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
