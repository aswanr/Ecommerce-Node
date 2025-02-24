const request = require('supertest');
const app = require('../server');

describe('CRUD Operations', () => {
  let server;

  beforeEach(() => {
    server = app.listen(3001);
  });

  afterEach(() => {
    server.close();
  });
  it('POST /post with valid data', async () => {
    const user = {
      id: 477,
      first_name: 'Jodhn',
      last_name: 'Ddoe',
      username: 'jodkskshndoe',
      password: 'pasdsword',
      email: 'johndoe@example.com',
      phone_number: '1234567890',
      created_time: new Date(),
    };

    const res = await request(server).post('/post').send(user);
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Done successfully');
  });

  it('POST /post with invalid data', async () => {
    const user = {
      first_name: 'John',
      last_name: 'Doe',
      username: 'jossskskshndoe',
      password: 'psssassword',
      email: 'johnssdoe@example.com',
      phone_number: '1852567890',
      created_time: new Date(),
    };

    const res = await request(server).post('/post').send(user);
    expect(res.statusCode).toBe(404); // or 422, depending on your implementation
  });

  it('POST /post with missing required fields', async () => {
    const user = {
      first_name: 'John',
      last_name: 'Doe',
    };

    const res = await request(server).post('/post').send(user);
    expect(res.statusCode).toBe(404); 
  });
  it('POST /post with error scenario', async () => {
    
    const user = {
      id: 249,
      first_name: 'Jodhn',
      last_name: 'Ddoe',
      username: 'jodkskshndoe',
      password: 'pasdsword',
      email: 'johndoe@example.com',
      phone_number: '1234567890',
      created_time: new Date(),
    };

    const res = await request(server).post('/post').send(user);
    expect(res.statusCode).toBe(404); 
  });
});

