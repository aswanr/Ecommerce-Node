const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());
const db = require("../../config/db.conf");
const { userauth } = require('../../middleware/loginjwt');

jest.mock("../../config/db.conf");
jest.mock('../../middleware/loginjwt');

app.post('/user/products/ordering', userauth, async (req, res) => {
  const { product_id, order_id, price, quantity, created_time } = req.body;
  const values = [product_id, order_id, price, quantity, created_time];
  const q = 'INSERT INTO ecommerse_db.ordered_item (product_id,order_id,price,quantity,created_time) VALUES (?,?,?,?,?);';
  db.query(q, values, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Database Error" });
    } else {
      res.json({ success: true, data: result });
    }
  });
});

describe('POST /user/products/ordering', () => {
  it('should respond with data if db query is successful', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(null, { affectedRows: 1 });
    });
    userauth.mockImplementation((req, res, next) => next());

    const response = await request(app)
      .post('/user/products/ordering')
      .send({
        product_id: 1,
        order_id: 1,
        price: 100,
        quantity: 2,
        created_time: '2025-01-13 15:00:00'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual({ affectedRows: 1 });
  });

  it('should respond with a 500 status if db query fails', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(new Error("Database Error"), null);
    });
    userauth.mockImplementation((req, res, next) => next());

    const response = await request(app)
      .post('/user/products/ordering')
      .send({
        product_id: 1,
        order_id: 1,
        price: 100,
        quantity: 2,
        created_time: '2025-01-13 15:00:00'
      });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Database Error");
  });
});

module.exports = app;
