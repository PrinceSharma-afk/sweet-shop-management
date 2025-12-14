const request = require("supertest");
const app = require("../app");

let token;

beforeAll(async () => {
  await request(app).post("/api/auth/register").send({
    username: "admin",
    password: "admin123",
    isAdmin: true,
  });

  const login = await request(app)
    .post("/api/auth/login")
    .send({ username: "admin", password: "admin123" });

  token = login.body.token;

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

describe("Sweets API", () => {
  test("Get all sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("Search sweets by name", async () => {
    const res = await request(app)
      .get("/api/sweets/search?search=Ladoo")
      .set("Authorization", `Bearer ${token}`);

    expect(res.body[0].name).toBe("Ladoo");
  });
});
