const request = require('supertest');
const express=require('express');
const app = require('../server');
jest.mock('../config/db.conf');

jest.mock('../config/db.conf', () => ({
  query: jest.fn()
}));

const db = require('../config/db.conf');

describe('get all user Operations', () => {
  let server;
    beforeAll(() => {
        server = express();
        server.use(express.json());
        server.use('/', app);
        jest.clearAllMocks();
    });
    afterAll((done) => {
        done();
    });

  it('GET all users', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 }
    ];
    db.query.mockImplementation((query, callback) => {
      callback(null, mockProducts); 
    });
    const res = await request(server).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('GET user error', async () => { 
    db.query.mockImplementation((query, values, callback) => {
      callback(null, []);
  });
    const res = await request(server).get('/e');
    expect(res.statusCode).toBe(404);
  });

});    



