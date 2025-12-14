// -------------------- INVENTORY CONTROLLER --------------------

// Sweet model represents the sweets table in the database
const Sweet = require("../models/Sweet");

/* =========================
   PURCHASE SWEET CONTROLLER

   Handles reducing stock when a customer purchases sweets.

   Supports multiple API styles:
   - POST /api/inventory/purchase        (name in request body)
   - POST /api/sweets/:name/purchase     (name in URL params)

   This design allows flexibility for different frontend/API designs.
========================= */
exports.purchaseSweet = async (req, res) => {
  // Sweet name can come from URL params or request body
  const name = req.params.name || req.body.name;

  // Quantity defaults to 1 if not provided
  // Explicit conversion to Number to avoid string issues
  const quantity = Number(req.body.quantity || 1);

  // Basic input validation
  if (!name || quantity <= 0) {
    return res
      .status(400)
      .json({ error: "Invalid quantity or sweet" });
  }

  try {
    // Fetch the sweet from the database by name
    const sweet = await Sweet.findOne({ where: { name } });

    // If sweet does not exist, return 404
    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    // Ensure sufficient stock is available before purchase
    if (sweet.quantity < quantity) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    // Reduce available quantity
    sweet.quantity -= quantity;

    // Persist updated quantity to database
    await sweet.save();

    // Respond with updated sweet details
    res.status(200).json({
      message: "Purchase successful",
      sweet
    });

  } catch (err) {
    // Log error for debugging/monitoring purposes
    console.error(err);

    // Generic error response for unexpected failures
    res.status(500).json({ error: "Server error" });
  }
};

/* =========================
   RESTOCK SWEET CONTROLLER

   Handles increasing stock when new inventory arrives.

   Supports multiple API styles:
   - POST /api/inventory/restock
   - POST /api/sweets/:name/restock

   Typically restricted to admin or staff users.
========================= */
exports.restockSweet = async (req, res) => {
  // Sweet name can be provided via URL or request body
  const name = req.params.name || req.body.name;

  // Quantity must be explicitly provided and greater than 0
  const quantity = Number(req.body.quantity);

  // Validate input
  if (!name || quantity <= 0) {
    return res
      .status(400)
      .json({ error: "Invalid quantity or sweet" });
  }

  try {
    // Find the sweet in the database
    const sweet = await Sweet.findOne({ where: { name } });

    // If sweet does not exist, return 404
    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    // Increase available quantity
    sweet.quantity += quantity;

    // Save updated stock to database
    await sweet.save();

    // Return success response with updated sweet details
    res.status(200).json({
      message: "Restock successful",
      sweet
    });

  } catch (err) {
    // Log error for diagnostics
    console.error(err);

    // Return generic server error
    res.status(500).json({ error: "Server error" });
  }
};
