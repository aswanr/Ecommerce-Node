const request = require('supertest');
const express = require('express');
const db = require('../../config/db.conf');
const { adminauth } = require('../../middleware/loginjwt');


const app = express();
app.disable("x-powered-by")
app.use(express.json());


jest.mock('../../middleware/loginjwt', () => ({
  adminauth: jest.fn((req, res, next) => next()),  
}));


jest.mock('../../config/db.conf', () => ({
  query: jest.fn(),
}));

app.post('/admin/user', adminauth, async (req, res) => {
  db.query('select * from ecommerse_db.user', (err, result) => {
    if (err) {
      res.status(500).json({ message: "Data Base Error" });
    } else {
      res.json({ success: true, data: result });
    }
  });
});

describe('POST /admin/user', () => {
  it('should return 500 if there is a database error', async () => {
    db.query.mockImplementationOnce((sql, callback) => {
      callback(new Error('Database error'), null);
    });

    const response = await request(app).post('/admin/user');

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Data Base Error');
  });

  it('should return a list of users if the query is successful', async () => {
  
    db.query.mockImplementationOnce((sql, callback) => {
      callback(null, [{ id: 1, username: 'testuser' }]);
    });

    const response = await request(app).post('/admin/user');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual([{ id: 1, username: 'testuser' }]);
  });
});
