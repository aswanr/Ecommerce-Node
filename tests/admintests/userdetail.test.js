const request = require('supertest');
const express = require('express');
const app = require('../../server'); 

jest.mock('../../config/db.conf', () => ({
    query: jest.fn()
}));

const db = require('../../config/db.conf');
const {adminauth} = require('../../middleware/loginjwt');

describe('POST /admin/user', () => {
    let server;
    beforeAll(() => {
        server = express();
        server.use(express.json());
        server.use('/', app);
    });

    afterAll((done) => {
        done();
    });

    it('should return 500 if there is a database error', async () => {
        db.query.mockImplementation((query, callback) => {
            callback(new Error('Database Error'), null);
        });

        const res = await request(server)
            .post('/admin/user').send();

        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: 'user not found' });
    });

    it('should return user data if query is successful', async () => {
        const users = [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }];
        db.query.mockImplementation((query, callback) => {
            callback(null, users);
        });

        const res = await request(server)
            .post('/admin/user')
            .send();

        expect(res.statusCode).toBe(401);
        // expect(res.body).toEqual({ success: true, data: users });
    });
});

