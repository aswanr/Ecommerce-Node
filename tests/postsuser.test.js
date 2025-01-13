const request = require('supertest');
const app = require('../server');

describe('CRUD Operations', () => {
    let server;
    server = app.listen(3001);

it('POST a new user', async () => {
    const user = {
      id: 2499,
      first_name: 'Joxdhn',
      last_name: 'Ddxoe',
      username: 'jodkxskshndoe',
      password: 'paxxsdsword',
      email: 'johndxode@example.com',
      phone_number: '4523456789',
      created_time: new Date(),
    };
    const res = await request(server).post('/post').send(user);
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe(' Done successfully ');
    const getUser = await request(server).get(`/get/2499`);
    expect(getUser.statusCode).toBe(200);
    expect(getUser.body).toEqual(expect.arrayContaining([expect.objectContaining(user)]));
  });

  it('POST a new user with invalid data', async () => {
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
    expect(res.statusCode).toBe(404); 
  });
});

