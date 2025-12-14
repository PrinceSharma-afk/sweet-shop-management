import { useEffect, useState } from "react";
import { getAllSweets, createSweet, deleteSweet } from "../api/sweets";
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

  return (
    <div>
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
          <li key={sweet.id}>
            <strong>{sweet.name}</strong> — ₹{sweet.price}  
            (Qty: {sweet.quantity})

            <button onClick={() => handleDelete(sweet.name)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
