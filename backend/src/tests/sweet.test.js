const request = require('supertest');
const app = require('../app');

describe('Sweet Management Tests', () => {
  // Seed some sweets before tests
  beforeAll(() => {
    app.locals.sweets = [
      { name: 'Ladoo', price: 10 },
      { name: 'Barfi', price: 15 }
    ];
  });

  test('Get all sweets endpoint', async () => {
    const res = await request(app).get('/sweets');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Search sweets functionality', async () => {
    const res = await request(app).get('/sweets?search=Ladoo'); // matches controller query param
    expect(res.statusCode).toBe(200);
    expect(res.body[0].name).toBe('Ladoo');
  });

  test('Create new sweet', async () => {
    const res = await request(app)
      .post('/sweets')
      .send({ name: 'Jalebi', price: 20 });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Sweet created');
  });
});
