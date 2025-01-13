const request = require('supertest');
const app = require('../server');

describe('CRUD Operations', () => {
    let server;
    server = app.listen(3001);

    it('UPDATE a user by ID', async () => {
        const user = {
          first_name: 'Jodhn',
          last_name: 'Dode',
          username: 'johnddoe',
          password: 'vimal000',
          email: 'johnddoe@example.com',
          phone_number: '1284567890',
        };
        const res = await request(server).put('/useredit/4').send(user);
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe(' Updated successfully ');
        const getUser = await request(server).get(`/get/4`);
        expect(getUser.statusCode).toBe(200);
        expect(getUser.body).toEqual(expect.arrayContaining([expect.objectContaining(user)]));
      });
});

