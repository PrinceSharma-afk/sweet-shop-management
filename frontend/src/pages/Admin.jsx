// -------------------- ADMIN DASHBOARD --------------------

// React hooks for lifecycle and state management
import { useEffect, useState } from "react";

// Sweet management API functions
import {
  getAllSweets,
  createSweet,
  deleteSweet,
  updateSweet,
} from "../api/sweets";

// Inventory-specific API function
import { restockSweet } from "../api/inventory";

// Admin page styles
import "../styles/admin.css";

/*
  Admin Component

  Provides an admin-only dashboard to:
  - View all sweets
  - Add new sweets
  - Delete sweets
  - Update sweet price
  - Restock inventory

  All actions are protected by backend admin authorization.
*/
export default function Admin() {
  // -------------------- STATE --------------------

  // List of all sweets in inventory
  const [sweets, setSweets] = useState([]);

  // Form fields for adding a new sweet
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // Error message for UI feedback
  const [error, setError] = useState("");

  /*
    Fetch all sweets from backend

    Used:
    - On initial page load
    - After any create/update/delete/restock action
  */
  const fetchSweets = async () => {
    try {
      const res = await getAllSweets();
      setSweets(res.data);
    } catch {
      setError("Failed to load sweets");
    }
  };

  // Load sweets once when component mounts
  useEffect(() => {
    fetchSweets();
  }, []);

  /*
    Handle Add Sweet

    Flow:
    - Prevent default form submission
    - Send sweet data to backend
    - Reset form fields
    - Refresh sweets list
  */
  const handleAddSweet = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createSweet({
        name,
        category,
        price: Number(price),
        quantity: Number(quantity),
      });

      // Clear form after successful creation
      setName("");
      setCategory("");
      setPrice("");
      setQuantity("");

      // Refresh inventory list
      fetchSweets();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add sweet");
    }
  };

  /*
    Handle Delete Sweet

    Removes a sweet entirely from inventory
  */
  const handleDelete = async (name) => {
    try {
      await deleteSweet(name);
      fetchSweets();
    } catch {
      setError("Delete failed");
    }
  };

  /*
    Handle Price Update

    Triggered when admin updates price input
    Uses onBlur to avoid unnecessary API calls
  */
  const handleUpdatePrice = async (name, price) => {
    await updateSweet(name, { price: Number(price) });
    fetchSweets();
  };

  /*
    Handle Restock Sweet

    Increases available quantity for a sweet
    Triggered via restock input field
  */
  const handleRestock = async (name, qty) => {
    await restockSweet({ name, quantity: Number(qty) });
    fetchSweets();
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      {/* Display error message if any action fails */}
      {error && <p className="error">{error}</p>}

      {/* =========================
          ADD SWEET SECTION (2x2 GRID)
      ========================= */}
      <div className="card card-add">
        <h3 className="section-title">Add Sweet</h3>

        <form onSubmit={handleAddSweet}>
          <div className="admin-grid">
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <button className="btn-primary">Add Sweet</button>
        </form>
      </div>

      <hr className="section-divider" />

      {/* =========================
          MANAGE SWEETS SECTION
      ========================= */}
      <h3 className="section-title">Manage Sweets</h3>

      <div className="manage-grid">
        {sweets.map((sweet) => (
          <div className="card card-manage" key={sweet.id}>
            <div className="card-row">
              <div className="card-info">
                <strong>{sweet.name}</strong> ({sweet.category}) — ₹{sweet.price}
                <div className="meta">Stock: {sweet.quantity}</div>
              </div>

              {/* Delete sweet permanently */}
              <button
                className="btn-danger"
                onClick={() => handleDelete(sweet.name)}
              >
                Delete
              </button>
            </div>

            {/* Inline admin actions */}
            <div className="admin-actions">
              {/* Update price on input blur */}
              <input
                type="number"
                placeholder="New Price"
                onBlur={(e) =>
                  e.target.value &&
                  handleUpdatePrice(sweet.name, e.target.value)
                }
              />

              {/* Restock quantity on input blur */}
              <input
                type="number"
                placeholder="Restock Qty"
                onBlur={(e) =>
                  e.target.value &&
                  handleRestock(sweet.name, e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
