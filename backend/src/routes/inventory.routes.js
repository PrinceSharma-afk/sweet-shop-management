const express = require("express");
const {
  purchaseSweet,
  restockSweet,
} = require("../controllers/inventory.controller");
const {
  verifyToken,
  verifyAdmin,
} = require("../middlewares/auth.middleware");

const router = express.Router();

/* =========================
   INVENTORY ROUTES
========================= */

// Purchase sweet (any authenticated user)
router.post("/purchase", verifyToken, purchaseSweet);

// Restock sweet (ADMIN ONLY)
router.post("/restock", verifyToken, verifyAdmin, restockSweet);

module.exports = router;
