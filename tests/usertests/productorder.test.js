const request = require('supertest');
const express = require('express');
const app = require('../../server'); 
const db = require('../../config/db.conf');
const { userauth } = require('../../middleware/loginjwt');

jest.mock('../../config/db.conf');
jest.mock('../../middleware/loginjwt');

describe('POST /user/products/ordering', () => {
  beforeEach(() => {
    userauth.mockImplementation((req, res, next) => next());
  });

  it('should insert order successfully and return 200', async () => {

    const mockResult = { affectedRows: 1, insertId: 123 };
    db.query.mockImplementation((query, values, callback) => {
      callback(null, mockResult); 
    });


    const orderData = {
      product_id: 1,
      order_id: 456,
      price: 100,
      quantity: 2,
      created_time: '2025-01-13 12:00:00'
    };

    const response = await request(app)
      .post('/user/products/ordering')
      .send(orderData);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(mockResult);
  });

  it('should return 500 if there is a database error', async () => {

    db.query.mockImplementation((query, values, callback) => {
      callback(new Error('Database error'), null);
    });

    const orderData = {
      product_id: 1,
      order_id: 456,
      price: 100,
      quantity: 2,
      created_time: '2025-01-13 12:00:00'
    };

    const response = await request(app)
      .post('/user/products/ordering')
      .send(orderData);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Database Error');
  });

  it('should return 400 if input data is missing', async () => {
    
    const orderData = {
      product_id: 1,
      price: 100,
      quantity: 2
    };

    const response = await request(app)
      .post('/user/products/ordering')
      .send(orderData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Missing required fields');
  });

  it('should return 500 if an unexpected server error occurs', async () => {
    db.query.mockImplementation((query, values, callback) => {
      throw new Error('Unexpected server error');
    });

    const orderData = {
      product_id: 1,
      order_id: 456,
      price: 100,
      quantity: 2,
      created_time: '2025-01-13 12:00:00'
    };

    const response = await request(app)
      .post('/user/products/ordering')
      .send(orderData);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server Error');
  });
});
