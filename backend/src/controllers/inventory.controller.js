const Sweet = require('../models/Sweet');

exports.purchaseSweet = async (req, res) => {
  const { name, quantity } = req.body;
  if (!name || quantity <= 0) return res.status(400).json({ error: 'Invalid quantity or sweet' });

  try {
    const sweet = await Sweet.findOne({ where: { name } });
    if (!sweet) return res.status(400).json({ error: 'Sweet not found' });
if (sweet.quantity < quantity) return res.status(400).json({ error: 'Insufficient stock' });


    sweet.quantity -= quantity;
    await sweet.save();

    res.status(200).json({ message: 'Purchase successful', sweet });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.restockSweet = async (req, res) => {
  const { name, quantity } = req.body;
  if (!name || quantity <= 0) return res.status(400).json({ error: 'Invalid quantity or sweet' });

  try {
    const sweet = await Sweet.findOne({ where: { name } });
    if (!sweet) return res.status(400).json({ error: 'Sweet not found' });

    sweet.quantity += quantity;
    await sweet.save();

    res.status(200).json({ message: 'Restock successful', sweet });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
