const request = require('supertest');
const express = require('express');
const app = require('../../server'); 
const db = require('../../config/db.conf');
const { userauth } = require('../../middleware/loginjwt');

jest.mock('../../config/db.conf');
jest.mock('../../middleware/loginjwt');

describe('POST /user/products', () => {
  beforeEach(() => {
    userauth.mockImplementation((req, res, next) => next());
  });

  it('should return products data on success', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 }
    ];
    db.query.mockImplementation((query, callback) => {
      callback(null, mockProducts); 
    });

    const response = await request(app).post('/user/products');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(mockProducts);
  });

  it('should return 500 if there is a database error', async () => {
    db.query.mockImplementation((query, callback) => {
      callback(new Error('Database error'), null); 
    });

    const response = await request(app).post('/user/products');

    expect(response.status).toBe(500);
    expect(response.body.message).toBe(undefined);
  });

});
