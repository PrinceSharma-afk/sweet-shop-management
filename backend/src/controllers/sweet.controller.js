const Sweet = require("../models/Sweet");
const { Op } = require("sequelize");

/* =========================
   GET ALL SWEETS (PROTECTED)
========================= */
exports.getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.findAll();
    res.status(200).json(sweets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

/* =========================
   SEARCH SWEETS (REQUIRED BY KATA)
   GET /api/sweets/search
   ?name=&category=&minPrice=&maxPrice=
========================= */
exports.searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  try {
    const where = {};

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }

    if (category) {
      where.category = category;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = Number(minPrice);
      if (maxPrice) where.price[Op.lte] = Number(maxPrice);
    }

    const sweets = await Sweet.findAll({ where });
    res.status(200).json(sweets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

/* =========================
   CREATE SWEET (ADMIN ONLY)
========================= */
exports.createSweet = async (req, res) => {
  const { name, category, price, quantity } = req.body;

  if (
    !name ||
    !category ||
    price == null ||
    price < 0 ||
    quantity == null ||
    quantity < 0
  ) {
    return res.status(400).json({ error: "Invalid sweet data" });
  }

  try {
    const existing = await Sweet.findOne({ where: { name } });
    if (existing) {
      return res.status(400).json({ error: "Sweet already exists" });
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
    });

    res.status(201).json({ message: "Sweet created", sweet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

/* =========================
   UPDATE SWEET (ADMIN ONLY)
========================= */
exports.updateSweet = async (req, res) => {
  const { name } = req.params;
  const { price, quantity, category } = req.body;

  try {
    const sweet = await Sweet.findOne({ where: { name } });
    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    if (price != null && price >= 0) sweet.price = price;
    if (quantity != null && quantity >= 0) sweet.quantity = quantity;
    if (category) sweet.category = category;

    await sweet.save();
    res.status(200).json({ message: "Sweet updated", sweet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

/* =========================
   DELETE SWEET (ADMIN ONLY)
========================= */
exports.deleteSweet = async (req, res) => {
  const { name } = req.params;

  try {
    const sweet = await Sweet.findOne({ where: { name } });
    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    await sweet.destroy();
    res.status(200).json({ message: "Sweet deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
