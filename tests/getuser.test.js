const request = require('supertest');
const app = require('../server');
const db=require('../config/db.conf')

describe('get all user Operations', () => {
    let server;
    server = app.listen(3001);
    it('GET all users', async () => {
        const res = await request(server).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
      });
    });    