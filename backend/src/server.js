// -------------------- SERVER ENTRY POINT --------------------

// Import configured Express application
// (middlewares, routes, and DB setup are handled inside app.js)
const app = require('./app');

// Define port for the server
// Uses environment variable in production
// Falls back to 5000 for local development
const PORT = process.env.PORT || 5000;

// Start the HTTP server and begin listening for requests
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
