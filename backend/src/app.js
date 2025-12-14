require("dotenv").config(); // must be first

const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

// Routes
const authRoutes = require("./routes/auth.routes");
const sweetRoutes = require("./routes/sweet.routes");
const inventoryRoutes = require("./routes/inventory.routes");

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

/* =========================
   API ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);
app.use("/api/inventory", inventoryRoutes); // legacy + documented

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.status(200).json({ message: "Sweet Shop API running" });
});

/* =========================
   DATABASE INIT
========================= */
if (process.env.NODE_ENV !== "test") {
  sequelize
    .authenticate()
    .then(() => console.log("PostgreSQL connected"))
    .catch((err) => console.error("DB connection error:", err));

  sequelize
    .sync({ alter: true })
    .then(() => console.log("DB synced"))
    .catch((err) => console.error("DB sync error:", err));
}

module.exports = app;
