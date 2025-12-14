const request = require("supertest");
const app = require("../app");

describe("Auth API", () => {
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
