const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../app');
const { User, Sweet } = require('../models');

let adminToken;

beforeAll(async () => {
  const hashedPassword = await bcrypt.hash('password', 10);

  await User.create({
    username: 'admin',
    password: hashedPassword,
    isAdmin: true
  });

  const loginRes = await request(app)
    .post('/auth/login')
    .send({
      username: 'admin',
      password: 'password'
    });

  adminToken = loginRes.body.token;
});

describe('Sweet Management Tests', () => {

  test('Create new sweet', async () => {
    const res = await request(app)
      .post('/sweets')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Rasgulla',
        price: 100,
        quantity: 20
      });

    expect(res.statusCode).toBe(201);
  });

  test('Duplicate sweet creation fails', async () => {
    const res = await request(app)
      .post('/sweets')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Rasgulla',
        price: 100,
        quantity: 20
      });

    expect(res.statusCode).toBe(400);
  });

  test('Get all sweets', async () => {
    const res = await request(app).get('/sweets');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

});
