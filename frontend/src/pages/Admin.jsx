import { useEffect, useState } from "react";
import {
  getAllSweets,
  createSweet,
  deleteSweet,
  updateSweet,
} from "../api/sweets";
import { restockSweet } from "../api/inventory";

export default function Admin() {
  const [sweets, setSweets] = useState([]);
  const [name, setName] = useState("");
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
        price: Number(price),
        quantity: Number(quantity),
      });
      setName("");
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

  const handleUpdatePrice = async (name, newPrice) => {
    try {
      await updateSweet(name, { price: Number(newPrice) });
      fetchSweets();
    } catch {
      setError("Update failed");
    }
  };

  const handleRestock = async (name, qty) => {
    try {
      await restockSweet({ name, quantity: Number(qty) });
      fetchSweets();
    } catch {
      setError("Restock failed");
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Add Sweet */}
      <form onSubmit={handleAddSweet}>
        <h3>Add Sweet</h3>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

        <button type="submit">Add</button>
      </form>

      <hr />

      {/* Sweet List */}
      <ul>
        {sweets.map((sweet) => (
          <li key={sweet.id} style={{ marginBottom: "15px" }}>
            <strong>{sweet.name}</strong> — ₹{sweet.price}  
            (Qty: {sweet.quantity})

            <div>
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

              <button onClick={() => handleDelete(sweet.name)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
