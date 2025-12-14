const Sweet = require("../models/Sweet");

/* =========================
   PURCHASE SWEET
   Works for:
   - POST /api/inventory/purchase
   - POST /api/sweets/:name/purchase
========================= */
exports.purchaseSweet = async (req, res) => {
  const name = req.params.name || req.body.name;
  const quantity = Number(req.body.quantity || 1);

  if (!name || quantity <= 0) {
    return res
      .status(400)
      .json({ error: "Invalid quantity or sweet" });
  }

  try {
    const sweet = await Sweet.findOne({ where: { name } });
    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    res.status(200).json({ message: "Purchase successful", sweet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

/* =========================
   RESTOCK SWEET
   Works for:
   - POST /api/inventory/restock
   - POST /api/sweets/:name/restock
========================= */
exports.restockSweet = async (req, res) => {
  const name = req.params.name || req.body.name;
  const quantity = Number(req.body.quantity);

  if (!name || quantity <= 0) {
    return res
      .status(400)
      .json({ error: "Invalid quantity or sweet" });
  }

  try {
    const sweet = await Sweet.findOne({ where: { name } });
    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    sweet.quantity += quantity;
    await sweet.save();

    res.status(200).json({ message: "Restock successful", sweet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
