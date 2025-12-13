// Temporary in-memory storage
const sweets = [
  { name: 'Ladoo', price: 10 },
  { name: 'Barfi', price: 15 },
];

exports.getAllSweets = (req, res) => {
  res.status(200).json(sweets);
};

exports.searchSweets = (req, res) => {
  const { search = '' } = req.query; // default to empty string if missing
  const filtered = sweets.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );
  res.status(200).json(filtered);
};

exports.createSweet = (req, res) => {
  const { name, price } = req.body;

  if (!name || name.length === 0) {
    return res.status(400).json({ error: 'Sweet name is required' });
  }

  if (price === undefined || price < 0) {
    return res.status(400).json({ error: 'Valid price is required' });
  }

  sweets.push({ name, price });
  res.status(201).json({ message: 'Sweet created' });
};
