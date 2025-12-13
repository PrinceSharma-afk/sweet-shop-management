const request = require('supertest');
const app = require('../app');

describe('Authentication Tests', () => {

  // Register a user before running login tests
  beforeAll(async () => {
    await request(app)
      .post('/auth/register')
      .send({ username: 'john', password: '123456' });
  });

  // ----- Registration Tests -----
  test('User registration with validation', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'jane', password: '123456' }); // new user
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered');
  });

  test('User registration with empty username should fail', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: '', password: '123456' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid username');
  });

  // ----- Login Tests -----
  test('User login with JWT token generation', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'john', password: '123456' }); // existing user

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

});
