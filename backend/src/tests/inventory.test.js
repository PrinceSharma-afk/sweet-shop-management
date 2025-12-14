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
      name: "Barfi",
      category: "Indian",
      price: 20,
      quantity: 10,
    });
});

describe("Inventory API", () => {
  test("Purchase sweet (alias route)", async () => {
    const res = await request(app)
      .post("/api/sweets/Barfi/purchase")
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 2 });

    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBe(8);
  });

  test("Restock sweet (admin)", async () => {
    const res = await request(app)
      .post("/api/sweets/Barfi/restock")
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBe(13);
  });
});
