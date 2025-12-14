const Sweet = require('../models/Sweet');
const { Op } = require('sequelize');

// Get all sweets
exports.getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.findAll();
    res.status(200).json(sweets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Search sweets by name (case-insensitive)
exports.searchSweets = async (req, res) => {
  const { search } = req.query;
  try {
    const sweets = await Sweet.findAll({
      where: search
        ? { name: { [Op.iLike]: `%${search}%` } }
        : {}
    });
    res.status(200).json(sweets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new sweet (admin only)
exports.createSweet = async (req, res) => {
  const { name, price, quantity } = req.body;

  if (!name || price == null || price < 0 || quantity < 0) {
    return res.status(400).json({ error: 'Invalid sweet data' });
  }

  try {
    const [sweet, created] = await Sweet.findOrCreate({
      where: { name },
      defaults: { price, quantity }
    });

    if (!created) return res.status(400).json({ error: 'Sweet already exists' });

    res.status(201).json({ message: 'Sweet created', sweet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update sweet details (admin only)
exports.updateSweet = async (req, res) => {
  const { name } = req.params;
  const { price, quantity } = req.body;

  try {
    const sweet = await Sweet.findOne({ where: { name } });
    if (!sweet) return res.status(404).json({ error: 'Sweet not found' });

    if (price != null && price >= 0) sweet.price = price;
    if (quantity != null && quantity >= 0) sweet.quantity = quantity;

    await sweet.save();
    res.status(200).json({ message: 'Sweet updated', sweet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a sweet (admin only)
exports.deleteSweet = async (req, res) => {
  const { name } = req.params;

  try {
    const sweet = await Sweet.findOne({ where: { name } });
    if (!sweet) return res.status(404).json({ error: 'Sweet not found' });

    await sweet.destroy();
    res.status(200).json({ message: 'Sweet deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
