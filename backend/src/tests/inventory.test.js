const request = require('supertest');
const app = require('../app');

describe('Inventory Tests', () => {
  beforeAll(async () => {
    // Seed some sweets for inventory
    await request(app).post('/sweets').send({ name: 'Ladoo', price: 10 });
    await request(app).post('/sweets').send({ name: 'Barfi', price: 15 });
  });

  test('Purchase sweet with quantity reduction', async () => {
    const res = await request(app)
      .post('/inventory/purchase')
      .send({ name: 'Ladoo', quantity: 2 });

    // Will FAIL initially
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Purchase successful');
  });

  test('Restock functionality (admin only)', async () => {
    const res = await request(app)
      .post('/inventory/restock')
      .send({ name: 'Ladoo', quantity: 5 });

    // Will FAIL initially
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Restocked successfully');
  });

  test('Quantity validation', async () => {
    const res = await request(app)
      .post('/inventory/purchase')
      .send({ name: 'Ladoo', quantity: -1 });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid quantity');
  });

  test('Out of stock handling', async () => {
    const res = await request(app)
      .post('/inventory/purchase')
      .send({ name: 'Barfi', quantity: 100 });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Out of stock');
  });

  test('Concurrent purchase handling', async () => {
    // Simulate two purchases at the same time
    const purchase1 = request(app).post('/inventory/purchase').send({ name: 'Ladoo', quantity: 3 });
    const purchase2 = request(app).post('/inventory/purchase').send({ name: 'Ladoo', quantity: 3 });

    const results = await Promise.all([purchase1, purchase2]);

    // At least one should fail due to insufficient stock
    expect(results.some(r => r.statusCode === 400)).toBe(true);
  });
});
