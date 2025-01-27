const request = require('supertest');
const app = require('../server');

describe('get all user Operations', () => {

  it('GET all users', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('GET user error', async () => { 
    const res = await request(app).get('/e');
    expect(res.statusCode).toBe(404);
  });

});    



