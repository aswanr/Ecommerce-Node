const request = require('supertest');
const express = require('express');
const app = require('../../server'); 
const db = require('../../config/db.conf');
const { adminauth } = require('../../middleware/loginjwt');


jest.mock('../../config/db.conf');
jest.mock('../../middleware/loginjwt');

describe('POST /admin/user', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    adminauth.mockImplementation((req, res, next) => next());
  });
  it('should return 500 if there is a database error', async () => {
    db.query.mockImplementation((query,callback) => {
      callback(new Error('DataBase error'), null); 
    });
    const response = await request(app).post('/admin/user');
    expect(response.status).toBe(500);
    expect(response.text).toEqual("Internal Server Error");
  });

  it('should return 200 and user data if database query is successful', async () => {

    const mockUsers = [
      { id: 1, username: 'user1', password: 'password1' },
      { id: 2, username: 'user2', password: 'password2' },
    ];

    db.query.mockImplementation((query, callback) => {
      callback(null, mockUsers); 
    });

    const response = await request(app).post('/admin/user');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(mockUsers);
  });

  it('should return 401 if admin authentication fails', async () => {
    adminauth.mockImplementation((req, res, next) => {
      res.status(401).json({ message: 'Authentication failed' });
    });

    const response = await request(app).post('/admin/user');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication failed');
  });
});

