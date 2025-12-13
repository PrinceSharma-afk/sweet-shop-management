// Temporary in-memory inventory storage
const sweetsInventory = {}; // keeps track of sweet quantities and prices

// Purchase a sweet
exports.purchaseSweet = (req, res) => {
  const { name, quantity } = req.body;

  if (!name || !quantity || quantity <= 0 || !sweetsInventory[name]) {
    return res.status(400).json({ error: 'Invalid quantity or sweet' });
  }

  if (sweetsInventory[name].quantity < quantity) {
    return res.status(400).json({ error: 'Out of stock' });
  }

  sweetsInventory[name].quantity -= quantity;
  return res.status(200).json({ message: 'Purchase successful' });
};

// Restock a sweet (admin only)
exports.restockSweet = (req, res) => {
  const { name, quantity } = req.body;

  if (!name || !quantity || quantity <= 0) {
    return res.status(400).json({ error: 'Invalid quantity' });
  }

  if (!sweetsInventory[name]) {
    sweetsInventory[name] = { quantity, price: 50 }; // default price
  } else {
    sweetsInventory[name].quantity += quantity;
  }

  return res.status(200).json({ message: 'Restock successful' });
};

// Export inventory for tests if needed
exports.sweetsInventory = sweetsInventory;
