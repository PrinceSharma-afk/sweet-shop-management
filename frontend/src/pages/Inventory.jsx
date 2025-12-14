// -------------------- INVENTORY MANAGEMENT PAGE --------------------

// React hooks for lifecycle and state management
import { useEffect, useState } from "react";

// Sweet-related API function to fetch inventory
import { getAllSweets } from "../api/sweets";

// Inventory API function for restocking sweets
import { restockSweet } from "../api/inventory";

// Inventory page styles
import "../styles/inventory.css";

/*
  Inventory Component

  Provides an admin-focused interface to:
  - View current inventory levels
  - Restock sweets by specifying quantity

  All actions are protected by backend admin authorization.
*/
export default function Inventory() {
  // -------------------- STATE --------------------

  // List of sweets in inventory
  const [sweets, setSweets] = useState([]);

  // Stores restock quantities keyed by sweet name
  // Allows independent input handling for each sweet
  const [restockQty, setRestockQty] = useState({});

  // Error message for UI feedback
  const [error, setError] = useState("");

  // Loading state for initial inventory fetch
  const [loading, setLoading] = useState(true);

  /*
    Fetch all sweets from backend

    Used:
    - On initial page load
    - After successful restock
  */
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

  // Load inventory when component mounts
  useEffect(() => {
    fetchSweets();
  }, []);

  /*
    Handle Restock Action

    Flow:
    - Validate restock quantity
    - Send restock request to backend
    - Clear input state
    - Refresh inventory list
  */
  const handleRestock = async (name) => {
    const qty = Number(restockQty[name]);

    // Basic input validation
    if (!qty || qty <= 0) {
      setError("Enter a valid restock quantity");
      return;
    }

    try {
      await restockSweet({ name, quantity: qty });

      // Clear restock inputs after success
      setRestockQty({});

      // Refresh inventory data
      fetchSweets();
    } catch (err) {
      setError(err.response?.data?.error || "Restock failed");
    }
  };

  // Show loading state while inventory is being fetched
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

      {/* Display error message if any action fails */}
      {error && <p className="error">{error}</p>}

      {/* Inventory list */}
      <div className="inventory-grid">
        {sweets.map((sweet) => (
          <div className="inventory-card" key={sweet.id}>
            <div className="inventory-info">
              <strong>{sweet.name}</strong> ({sweet.category})
              <div className="meta">₹{sweet.price}</div>
              <div className="meta">Stock: {sweet.quantity}</div>
            </div>

            {/* Restock controls */}
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
