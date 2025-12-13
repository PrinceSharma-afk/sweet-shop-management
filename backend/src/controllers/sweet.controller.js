// Temporary in-memory storage
const sweets = [];

exports.getAllSweets = (req, res) => {
  res.status(200).json(sweets);
};

exports.searchSweets = (req, res) => {
  const { search } = req.query;
  const filtered = sweets.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  res.status(200).json(filtered);
};

exports.createSweet = (req, res) => {
  const { name, price } = req.body;
  sweets.push({ name, price });
  res.status(201).json({ message: 'Sweet created' });
};
