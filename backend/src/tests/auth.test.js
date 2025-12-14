const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../app');
const { User } = require('../models');

describe('Authentication Tests', () => {

  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash('1234', 10);

    await User.create({
      username: 'testuser',
      password: hashedPassword,
      isAdmin: false
    });
  });

  test('Register new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'newuser',
        password: 'password'
      });

    expect(res.statusCode).toBe(201);
  });

  test('Duplicate user registration fails', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'testuser',
        password: '1234'
      });

    expect(res.statusCode).toBe(400);
  });

  test('Login valid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'testuser',
        password: '1234'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('Login invalid credentials fails', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'testuser',
        password: 'wrong'
      });

    expect(res.statusCode).toBe(401);
  });

});
