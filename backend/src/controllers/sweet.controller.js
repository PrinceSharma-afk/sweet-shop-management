// -------------------- SWEETS CONTROLLER --------------------

// Sweet model represents the sweets inventory table
const Sweet = require("../models/Sweet");

// Sequelize operators for advanced querying (LIKE, >=, <=, etc.)
const { Op } = require("sequelize");

/* =========================
   GET ALL SWEETS (PROTECTED)

   Returns the complete list of sweets.
   Typically accessible only to authenticated users.
========================= */
exports.getAllSweets = async (req, res) => {
  try {
    // Fetch all sweets from the database
    const sweets = await Sweet.findAll();

    // Return list of sweets
    res.status(200).json(sweets);
  } catch (err) {
    // Log unexpected errors for debugging/monitoring
    console.error(err);

    // Generic server error response
    res.status(500).json({ error: "Server error" });
  }
};

/* =========================
   SEARCH SWEETS 

   GET /api/sweets/search
   Supports filtering using query parameters:
   ?name=&category=&minPrice=&maxPrice=

   Allows flexible, partial searches without multiple endpoints.
========================= */
exports.searchSweets = async (req, res) => {
  // Extract optional search filters from query string
  const { name, category, minPrice, maxPrice } = req.query;

  try {
    // Dynamic where clause built based on provided filters
    const where = {};

    // Case-insensitive partial name search
    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }

    // Exact match on category
    if (category) {
      where.category = category;
    }

    // Price range filtering
    if (minPrice || maxPrice) {
      where.price = {};

      if (minPrice) {
        where.price[Op.gte] = Number(minPrice);
      }

      if (maxPrice) {
        where.price[Op.lte] = Number(maxPrice);
      }
    }

    // Fetch sweets matching the constructed query
    const sweets = await Sweet.findAll({ where });

    // Return filtered results
    res.status(200).json(sweets);
  } catch (err) {
    // Log errors for troubleshooting
    console.error(err);

    // Return generic server error
    res.status(500).json({ error: "Server error" });
  }
};

/* =========================
   CREATE SWEET (ADMIN ONLY)

   Adds a new sweet to the inventory.
   Typically restricted to admin users.
========================= */
exports.createSweet = async (req, res) => {
  // Extract sweet details from request body
  const { name, category, price, quantity } = req.body;

  // Validate input data
  if (
    !name ||
    !category ||
    price == null ||
    price < 0 ||
    quantity == null ||
    quantity < 0
  ) {
    return res.status(400).json({ error: "Invalid sweet data" });
  }

  try {
    // Prevent duplicate sweets with the same name
    const existing = await Sweet.findOne({ where: { name } });
    if (existing) {
      return res.status(400).json({ error: "Sweet already exists" });
    }

    // Create new sweet entry in database
    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
    });

    // Return success response with created sweet
    res.status(201).json({ message: "Sweet created", sweet });
  } catch (err) {
    // Log unexpected errors
    console.error(err);

    // Return generic server error
    res.status(500).json({ error: "Server error" });
  }
};

/* =========================
   UPDATE SWEET (ADMIN ONLY)

   Updates price, quantity, or category of an existing sweet.
   Partial updates are supported.
========================= */
exports.updateSweet = async (req, res) => {
  // Sweet name is passed via URL parameter
  const { name } = req.params;

  // Fields that may be updated
  const { price, quantity, category } = req.body;

  try {
    // Find the sweet by name
    const sweet = await Sweet.findOne({ where: { name } });

    // Return 404 if sweet does not exist
    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    // Update only provided and valid fields
    if (price != null && price >= 0) sweet.price = price;
    if (quantity != null && quantity >= 0) sweet.quantity = quantity;
    if (category) sweet.category = category;

    // Persist changes to database
    await sweet.save();

    // Return updated sweet
    res.status(200).json({ message: "Sweet updated", sweet });
  } catch (err) {
    // Log errors for diagnosis
    console.error(err);

    // Generic error response
    res.status(500).json({ error: "Server error" });
  }
};

/* =========================
   DELETE SWEET (ADMIN ONLY)

   Removes a sweet from the inventory permanently.
========================= */
exports.deleteSweet = async (req, res) => {
  // Sweet name passed via URL parameter
  const { name } = req.params;

  try {
    // Locate sweet in database
    const sweet = await Sweet.findOne({ where: { name } });

    // Return 404 if sweet does not exist
    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    // Permanently delete sweet record
    await sweet.destroy();

    // Confirm deletion
    res.status(200).json({ message: "Sweet deleted" });
  } catch (err) {
    // Log unexpected failures
    console.error(err);

    // Return generic server error
    res.status(500).json({ error: "Server error" });
  }
};
