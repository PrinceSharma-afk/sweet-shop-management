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
    } catch {
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
      fetchSweets();
    } catch (err) {
      setError(err.response?.data?.error || "Purchase failed");
    }
  };

  if (loading) {
    return (
      <div className="container">
        <p>Loading sweets...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="section-title">Available Sweets</h2>

      {error && <p className="error">{error}</p>}

      {sweets.length === 0 ? (
        <p>No sweets available</p>
      ) : (
        sweets.map((sweet) => (
          <div key={sweet.id} className="card">
            <div className="card-row">
              <div className="card-info">
                <strong>{sweet.name}</strong>
                <div className="meta">
                  ₹{sweet.price} • Stock: {sweet.quantity}
                </div>
              </div>

              <button
                className="btn btn-primary"
                disabled={sweet.quantity === 0}
                onClick={() => handlePurchase(sweet.name)}
              >
                Buy 1
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
