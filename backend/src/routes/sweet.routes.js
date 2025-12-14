// -------------------- SWEETS ROUTES --------------------

// Express router for sweet-related endpoints
const express = require("express");

// Sweet controller methods
// - getAllSweets: fetch full inventory
// - searchSweets: filter sweets by name, category, or price
// - createSweet: add a new sweet (admin only)
// - updateSweet: modify existing sweet (admin only)
// - deleteSweet: remove sweet from inventory (admin only)
const {
  getAllSweets,
  searchSweets,
  createSweet,
  updateSweet,
  deleteSweet,
} = require("../controllers/sweet.controller");

// Inventory controller methods reused here
// - purchaseSweet: reduce stock when a purchase occurs
// - restockSweet: increase stock when inventory is replenished
const {
  purchaseSweet,
  restockSweet,
} = require("../controllers/inventory.controller");

// Authentication & authorization middleware
// - verifyToken: ensures the user is authenticated
// - verifyAdmin: ensures the user has admin privileges
const {
  verifyToken,
  verifyAdmin,
} = require("../middlewares/auth.middleware");

// Initialize router instance
const router = express.Router();

/* =========================
   SWEETS ROUTES (PROTECTED)

   These routes expose inventory data and management
   operations for sweets.

   Access rules:
   - Read/search: authenticated users
   - Create/update/delete: admin users only
========================= */

// Get all sweets
// Flow: verifyToken → getAllSweets
router.get("/", verifyToken, getAllSweets);

// Search sweets by name, category, and/or price range
// Flow: verifyToken → searchSweets
router.get("/search", verifyToken, searchSweets);

// -------------------- ADMIN-ONLY CRUD --------------------

// Create a new sweet
router.post("/", verifyToken, verifyAdmin, createSweet);

// Update an existing sweet by name
router.put("/:name", verifyToken, verifyAdmin, updateSweet);

// Delete a sweet by name
router.delete("/:name", verifyToken, verifyAdmin, deleteSweet);

// Purchase a sweet (authenticated users)
router.post("/:name/purchase", verifyToken, purchaseSweet);

// Restock a sweet (admin users only)
router.post("/:name/restock", verifyToken, verifyAdmin, restockSweet);

// Export router to be mounted in the main application
module.exports = router;
