// -------------------- AUTH API TESTS --------------------

// supertest is used to simulate HTTP requests
// without starting a real server
const request = require("supertest");

// Import the Express app instance
// This allows testing routes directly
const app = require("../app");

/*
  Test Suite: Auth API

  These tests validate the authentication flow:
  - User registration
  - User login
  - Token generation

  Runs against the test database configuration.
*/
describe("Auth API", () => {

  /*
    Test Case: Register admin user

    Verifies that:
    - A new admin user can be registered
    - The API returns HTTP 201 (Created)
    - The response contains the correct username
  */
  test("Register admin user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        username: "admin",
        password: "admin123",
        isAdmin: true,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.username).toBe("admin");
  });

  /*
    Test Case: Login admin user

    Verifies that:
    - Registered user can log in with valid credentials
    - API returns HTTP 200 (OK)
    - A JWT token is generated and returned
  */
  test("Login admin user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        username: "admin",
        password: "admin123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
