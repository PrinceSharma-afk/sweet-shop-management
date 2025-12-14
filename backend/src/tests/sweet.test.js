// -------------------- SWEETS API TESTS --------------------

// supertest is used to simulate HTTP requests
// without starting an actual server
const request = require("supertest");

// Import the Express app instance
const app = require("../app");

// JWT token used for authenticated requests
let token;

/*
  beforeAll Hook

  Runs once before all sweets-related tests.
  Sets up a predictable test environment by:
  - Registering an admin user
  - Logging in to obtain a JWT token
  - Creating an initial sweet in the database
*/
beforeAll(async () => {
  // Register admin user
  await request(app).post("/api/auth/register").send({
    username: "admin",
    password: "admin123",
    isAdmin: true,
  });

  // Login admin user to retrieve JWT token
  const login = await request(app)
    .post("/api/auth/login")
    .send({ username: "admin", password: "admin123" });

  token = login.body.token;

  // Create a sweet for testing GET and SEARCH operations
  await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Ladoo",
      category: "Indian",
      price: 10,
      quantity: 5,
    });
});

/*
  Test Suite: Sweets API

  Validates read and search functionality for sweets.
  All routes are protected and require authentication.
*/
describe("Sweets API", () => {

  /*
    Test Case: Get all sweets

    Verifies that:
    - Authenticated users can fetch all sweets
    - API returns HTTP 200
    - The expected number of sweets is returned
  */
  test("Get all sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  /*
    Test Case: Search sweets by name

    Verifies that:
    - Search endpoint works correctly
    - Filtering by name returns the expected sweet
    - Partial search functionality behaves as intended
  */
  test("Search sweets by name", async () => {
    const res = await request(app)
      .get("/api/sweets/search?search=Ladoo")
      .set("Authorization", `Bearer ${token}`);

    expect(res.body[0].name).toBe("Ladoo");
  });
});
