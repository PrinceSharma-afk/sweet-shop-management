const express = require("express");
const {
  getAllSweets,
  searchSweets,
  createSweet,
  updateSweet,
  deleteSweet,
} = require("../controllers/sweet.controller");

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
   SWEETS ROUTES (PROTECTED)
========================= */

// Get all sweets
router.get("/", verifyToken, getAllSweets);

// Search sweets (name, category, price range)
router.get("/search", verifyToken, searchSweets);

// Admin-only CRUD
router.post("/", verifyToken, verifyAdmin, createSweet);
router.put("/:name", verifyToken, verifyAdmin, updateSweet);
router.delete("/:name", verifyToken, verifyAdmin, deleteSweet);

/* =========================
   KATA-SPEC ALIAS ROUTES
   Reuse inventory logic
========================= */

// Purchase sweet (authenticated users)
router.post("/:name/purchase", verifyToken, purchaseSweet);

// Restock sweet (admin only)
router.post("/:name/restock", verifyToken, verifyAdmin, restockSweet);

module.exports = router;
