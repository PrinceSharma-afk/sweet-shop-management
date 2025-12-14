import { useEffect, useState } from "react";
import { getAllSweets } from "../api/sweets";
import { purchaseSweet } from "../api/inventory";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSweets = async () => {
    try {
      const res = await getAllSweets();
      setSweets(res.data);
    } catch (err) {
      setError("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handlePurchase = async (name) => {
    setError("");

    try {
      await purchaseSweet({ name, quantity: 1 });
      fetchSweets(); // refresh list after purchase
    } catch (err) {
      setError(err.response?.data?.error || "Purchase failed");
    }
  };

  if (loading) return <p>Loading sweets...</p>;

  return (
    <div className="container">
      <h2>User Dashboard</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {sweets.length === 0 ? (
        <p>No sweets available</p>
      ) : (
        <ul>
          {sweets.map((sweet) => (
            <li key={sweet.id} style={{ marginBottom: "10px" }}>
              <strong>{sweet.name}</strong> — ₹{sweet.price}  
              <br />
              Available: {sweet.quantity}
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
      )}
    </div>
  );
}
