// -------------------- INVENTORY API TESTS --------------------

// supertest allows HTTP request testing without starting a real server
const request = require("supertest");

// Import the Express app instance
const app = require("../app");

// JWT token used for authenticated requests
let token;

/*
  beforeAll Hook

  This setup runs once before all inventory tests.
  It prepares a clean test environment by:
  - Registering an admin user
  - Logging in to obtain a JWT token
  - Creating an initial sweet in inventory
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

  // Create initial sweet for inventory testing
  await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Barfi",
      category: "Indian",
      price: 20,
      quantity: 10,
    });
});

/*
  Test Suite: Inventory API

  Validates stock movement operations:
  - Purchasing sweets (reducing inventory)
  - Restocking sweets (increasing inventory)

  Uses authenticated and authorized requests.
*/
describe("Inventory API", () => {

  /*
    Test Case: Purchase sweet (alias route)

    Verifies that:
    - Authenticated users can purchase sweets
    - Stock quantity decreases correctly
    - Alias route (/sweets/:name/purchase) works as expected
  */
  test("Purchase sweet (alias route)", async () => {
    const res = await request(app)
      .post("/api/sweets/Barfi/purchase")
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 2 });

    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBe(8);
  });

  /*
    Test Case: Restock sweet (admin)

    Verifies that:
    - Admin users can restock sweets
    - Inventory quantity increases correctly
    - Authorization middleware is enforced
  */
  test("Restock sweet (admin)", async () => {
    const res = await request(app)
      .post("/api/sweets/Barfi/restock")
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBe(13);
  });
});
