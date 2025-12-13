const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = []; // Temporary in-memory storage

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || username.length === 0) {
    return res.status(400).json({ error: 'Invalid username' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ username }, 'secretkey', { expiresIn: '1h' });
  res.status(200).json({ token });
};
