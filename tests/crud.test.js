const request = require('supertest');
const app = require('../server');

describe('CRUD Operations', () => {
  let server;
  beforeAll((done) => {
    server = app.listen(3001, () => {
      console.log('server running on 3001');
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it('GET all users', async () => {
    const res = await request(server).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('POST a new user', async () => {
    const user = {
      id: 145,
      first_name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
      password: 'password',
      email: 'johndoe@example.com',
      phone_number: '1234567890',
      created_time: new Date(),
    };
    const res = await request(server).post('/post').send(user);
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Done successfully');
  });

  it('GET a user by ID', async () => {
    const res = await request(server).get('/get/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).not.toBe(0);
  });

  it('UPDATE a user by ID', async () => {
    const user = {
      first_name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
      password: 'newpassword',
      email: 'johndoe@example.com',
      phone_number: '1234567890',
    };
    const res = await request(server).put('/useredit/1').send(user);
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe(' Updated successfully ');
  });

  it('DELETE a user by ID', async () => {
    const deleteId = 1; // Use an ID that exists in your test database
    const res = await request(server).delete(`/userdelete/${deleteId}`);
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe(' Deleted successfully ');
  });

  it('if user does not exist', async () => {
    const deleteId = 9999; 
    const res = await request(server).delete(`/userdelete/${deleteId}`);
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Id not founded');
  });
});
