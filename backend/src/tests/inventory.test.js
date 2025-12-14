const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../app');
const { User, Sweet } = require('../models');

let adminToken;

beforeAll(async () => {
  // Create admin user
  const hashedPassword = await bcrypt.hash('password', 10);

  await User.create({
    username: 'inventoryAdmin',
    password: hashedPassword,
    isAdmin: true
  });

  // Login admin
  const loginRes = await request(app)
    .post('/auth/login')
    .send({
      username: 'inventoryAdmin',
      password: 'password'
    });

  adminToken = loginRes.body.token;

  // Create a sweet
  await Sweet.create({
    name: 'Kaju Katli',
    price: 500,
    quantity: 10
  });
});

describe('Inventory Tests', () => {

  test('Purchase sweet reduces quantity', async () => {
    const res = await request(app)
      .post('/inventory/purchase')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Kaju Katli',
        quantity: 2
      });

    expect(res.statusCode).toBe(200);

    const updatedSweet = await Sweet.findOne({
      where: { name: 'Kaju Katli' }
    });

    expect(updatedSweet.quantity).toBe(8);
  });

  test('Purchase more than stock fails', async () => {
    const res = await request(app)
      .post('/inventory/purchase')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Kaju Katli',
        quantity: 100
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Insufficient stock');
  });

  test('Restock sweet increases quantity', async () => {
    const res = await request(app)
      .post('/inventory/restock')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Kaju Katli',
        quantity: 5
      });

    expect(res.statusCode).toBe(200);

    const updatedSweet = await Sweet.findOne({
      where: { name: 'Kaju Katli' }
    });

    expect(updatedSweet.quantity).toBe(13);
  });

  test('Restock invalid quantity fails', async () => {
    const res = await request(app)
      .post('/inventory/restock')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Kaju Katli',
        quantity: -5
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid quantity or sweet');
  });

});
