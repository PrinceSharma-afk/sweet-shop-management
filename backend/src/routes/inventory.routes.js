const express = require('express');
const { purchaseSweet, restockSweet } = require('../controllers/inventory.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/purchase', verifyToken, purchaseSweet);
router.post('/restock', verifyToken, restockSweet);

module.exports = router;
