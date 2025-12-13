// src/tests/sweets.test.js
const request = require('supertest');
const app = require('../app');

describe('Sweet Management Tests', () => {

  test('Get all sweets endpoint', async () => {
    const res = await request(app).get('/sweets');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test('Search sweets functionality', async () => {
    const res = await request(app).get('/sweets?search=choco');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test('Create new sweet (admin only)', async () => {
    const res = await request(app)
      .post('/sweets')
      .send({ name: 'Chocolate', price: 50 })
      .set('Authorization', 'Bearer faketoken'); // placeholder token
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Sweet created');
  });

  // Add more tests for update, delete, and authorization middleware later
});
