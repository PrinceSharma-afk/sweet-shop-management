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

  /* =========================
     ADD SWEET
  ========================= */
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

  /* =========================
     DELETE
  ========================= */
  const handleDelete = async (name) => {
    try {
      await deleteSweet(name);
      fetchSweets();
    } catch {
      setError("Delete failed");
    }
  };

  /* =========================
     UPDATE
  ========================= */
  const handleUpdate = async (name, data) => {
    try {
      await updateSweet(name, data);
      fetchSweets();
    } catch {
      setError("Update failed");
    }
  };

  /* =========================
     RESTOCK
  ========================= */
  const handleRestock = async (name, qty) => {
    try {
      await restockSweet({ name, quantity: Number(qty) });
      fetchSweets();
    } catch {
      setError("Restock failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="container">
        <h2>Admin Dashboard</h2>

        {error && <p className="error">{error}</p>}

        {/* ADD SWEET */}
        <form onSubmit={handleAddSweet}>
          <h3>Add Sweet</h3>

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

          <button type="submit">Add Sweet</button>
        </form>

        <hr />

        {/* SWEET LIST */}
        <ul>
          {sweets.map((sweet) => (
            <li key={sweet.id} style={{ marginBottom: "15px" }}>
              <strong>{sweet.name}</strong> ({sweet.category}) — ₹{sweet.price}
              <br />
              Stock: {sweet.quantity}

              <div style={{ marginTop: "8px" }}>
                <input
                  placeholder="New Category"
                  onBlur={(e) =>
                    e.target.value &&
                    handleUpdate(sweet.name, {
                      category: e.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  placeholder="New Price"
                  onBlur={(e) =>
                    e.target.value &&
                    handleUpdate(sweet.name, {
                      price: Number(e.target.value),
                    })
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

                <button onClick={() => handleDelete(sweet.name)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
