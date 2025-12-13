const request = require('supertest');
const app = require('../app'); // app doesn't exist yet

describe('Authentication Tests', () => {
  test('User registration with validation', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: '', password: '123' }); // invalid username
    expect(res.statusCode).toBe(400);
  });
});
