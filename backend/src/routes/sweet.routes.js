const express = require('express');
const { getAllSweets, searchSweets, createSweet, updateSweet, deleteSweet } = require('../controllers/sweet.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', getAllSweets);
router.get('/search', searchSweets);
router.post('/', verifyToken, verifyAdmin, createSweet);
router.put('/:name', verifyToken, verifyAdmin, updateSweet);
router.delete('/:name', verifyToken, verifyAdmin, deleteSweet);

module.exports = router;
