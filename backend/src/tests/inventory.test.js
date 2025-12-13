const request = require('supertest');
const app = require('../app');
const { sweetsInventory } = require('../controllers/inventory.controller');

describe('Inventory Tests', () => {
  const sweetName = 'Ladoo';

  beforeEach(() => {
    // Reset inventory before each test
    sweetsInventory[sweetName] = { quantity: 5, price: 50 };
  });

  // ----- Purchase Sweet -----
  test('Purchase sweet with quantity reduction', async () => {
    const initialQuantity = sweetsInventory[sweetName].quantity;

    const res = await request(app)
      .post('/inventory/purchase')
      .send({ name: sweetName, quantity: 2 });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Purchase successful');
    expect(sweetsInventory[sweetName].quantity).toBe(initialQuantity - 2);
  });

  // ----- Restock Sweet -----
  test('Restock functionality (admin only)', async () => {
    const initialQuantity = sweetsInventory[sweetName].quantity;

    const res = await request(app)
      .post('/inventory/restock')
      .send({ name: sweetName, quantity: 3 });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Restock successful');
    expect(sweetsInventory[sweetName].quantity).toBe(initialQuantity + 3);
  });

  // ----- Quantity Validation -----
  test('Quantity validation', async () => {
    const res = await request(app)
      .post('/inventory/purchase')
      .send({ name: sweetName, quantity: -1 });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid quantity or sweet');
  });

  // ----- Out of Stock -----
  test('Out of stock handling', async () => {
    const initialQuantity = sweetsInventory[sweetName].quantity;

    const res = await request(app)
      .post('/inventory/purchase')
      .send({ name: sweetName, quantity: initialQuantity + 1 });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Out of stock');
  });

  // ----- Concurrent Purchase -----
  test('Concurrent purchase handling', async () => {
    const initialQuantity = sweetsInventory[sweetName].quantity;

    // Simulate two simultaneous purchases
    const requests = [
      request(app).post('/inventory/purchase').send({ name: sweetName, quantity: 3 }),
      request(app).post('/inventory/purchase').send({ name: sweetName, quantity: 3 }),
    ];

    const results = await Promise.all(requests);

    // At least one request should fail due to insufficient stock
    expect(results.some(r => r.statusCode === 400)).toBe(true);

    // Inventory should not go negative
    expect(sweetsInventory[sweetName].quantity).toBeGreaterThanOrEqual(0);
  });
});
