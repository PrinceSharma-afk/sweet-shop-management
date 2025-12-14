import { useEffect, useState } from "react";
import {
  getAllSweets,
  createSweet,
  deleteSweet,
  updateSweet,
} from "../api/sweets";
import { restockSweet } from "../api/inventory";
import "../styles/admin.css";

export default function Admin() {
  const [sweets, setSweets] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  const fetchSweets = async () => {
    try {
      const res = await getAllSweets();
      setSweets(res.data);
    } catch {
      setError("Failed to load sweets");
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

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

      setName("");
      setCategory("");
      setPrice("");
      setQuantity("");
      fetchSweets();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add sweet");
    }
  };

  const handleDelete = async (name) => {
    try {
      await deleteSweet(name);
      fetchSweets();
    } catch {
      setError("Delete failed");
    }
  };

  const handleUpdatePrice = async (name, price) => {
    await updateSweet(name, { price: Number(price) });
    fetchSweets();
  };

  const handleRestock = async (name, qty) => {
    await restockSweet({ name, quantity: Number(qty) });
    fetchSweets();
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      {error && <p className="error">{error}</p>}

      {/* =========================
          Add Sweet (2x2)
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
          Manage Sweets (2x2)
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

              <button
                className="btn-danger"
                onClick={() => handleDelete(sweet.name)}
              >
                Delete
              </button>
            </div>

            <div className="admin-actions">
              <input
                type="number"
                placeholder="New Price"
                onBlur={(e) =>
                  e.target.value &&
                  handleUpdatePrice(sweet.name, e.target.value)
                }
              />

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
