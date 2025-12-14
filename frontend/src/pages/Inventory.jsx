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

  return (
    <div className="auth-wrapper">
      <div className="container">
        <h2>Inventory Management</h2>

        {error && <p className="error">{error}</p>}

        {sweets.length === 0 ? (
          <p>No sweets found</p>
        ) : (
          <ul>
            {sweets.map((sweet) => (
              <li key={sweet.id} style={{ marginBottom: "15px" }}>
                <strong>{sweet.name}</strong> ({sweet.category}) — ₹{sweet.price}
                <br />
                Stock: {sweet.quantity}

                <div style={{ marginTop: "8px" }}>
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

                  <button onClick={() => handleRestock(sweet.name)}>
                    Restock
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
