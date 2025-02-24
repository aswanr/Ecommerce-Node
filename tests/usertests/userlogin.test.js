const request = require('supertest');
const express = require('express');
const app = require('../../server'); 
const db = require('../../config/db.conf');
const jwt = require('jsonwebtoken');


jest.mock('../../config/db.conf');
jest.mock('jsonwebtoken');

describe('POST /login/user', () => {

  it('should return 404 if username or password is missing', async () => {
    const response = await request(app)
      .post('/login/user').send(
        {
        username: '', 
        password: 'password123'
      }
    );
    
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Authentication failed');
  });

  it('should return 404 if password is missing', async () => {
    const response = await request(app)
      .post('/login/user')
      .send({
        username: 'user1', 
        password: ''
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Authentication failed');
  });

  it('should return 500 if user is not found in the database', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(null, []);  
    });

    const response = await request(app)
      .post('/login/user')
      .send({
        username: 'nonexistentuser',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('user name and password are incorrect');
  });

  it('should return 500 if there is a database error', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(new Error('Database error'), null); 
    });

    const response = await request(app)
      .post('/login/user')
      .send({
        username: 'user1',
        password: 'password123'
      });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('user name and password are incorrect');
  });

  it('should return 200 and a token if login is successful', async () => {
    const mockUser = [{ id: 1, password: 'password123' }];
    db.query.mockImplementation((query, values, callback) => {
      callback(null, mockUser); 
    });

    const fakeToken = 'fake-jwt-token';
    jwt.sign.mockReturnValue(fakeToken);

    const response = await request(app)
      .post('/login/user')
      .send({
        username: 'user1',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.text).toBe(fakeToken);  
    expect(jwt.sign).toHaveBeenCalledWith(
      { ids: mockUser[0].id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: 300000 }
    );
  });
});
