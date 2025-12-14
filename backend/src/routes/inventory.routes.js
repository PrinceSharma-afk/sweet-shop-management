// -------------------- INVENTORY ROUTES --------------------

// Express router for inventory-related operations
const express = require("express");

// Inventory controller methods
// - purchaseSweet: reduces stock when a sweet is purchased
// - restockSweet: increases stock when inventory is refilled
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
   INVENTORY ROUTES

   These routes manage stock movement for sweets.

   Access Control:
   - Purchase: Any authenticated user
   - Restock: Admin users only
========================= */

// Purchase sweet
// Flow: verifyToken → purchaseSweet
// Ensures only logged-in users can purchase items
router.post("/purchase", verifyToken, purchaseSweet);

// Restock sweet
// Flow: verifyToken → verifyAdmin → restockSweet
// Ensures only admins can modify inventory stock
router.post("/restock", verifyToken, verifyAdmin, restockSweet);

// Export router to be mounted in the main application
module.exports = router;
