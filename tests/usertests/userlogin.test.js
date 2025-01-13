const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = require('../../server'); 

jest.mock('../../config/db.conf');

jest.mock('../../config/db.conf', () => ({
    query: jest.fn()
}));

const db = require('../../config/db.conf');

describe('POST /login', () => {
    let server;
    beforeAll(() => {
        server = express();
        server.use(express.json());
        server.use('/', app);
    });

    afterAll((done) => {
        done();
    });

    it('should return 404 if username or password is missing', async () => {
        const res = await request(server)
            .post('/login/user')
            .send({ username: '', password: '' });
        
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: 'Authentication failed' });
    });

    it('should return 500 if login failed', async () => {
        db.query.mockImplementation((query, values, callback) => {
            callback(null, []);
        });

        const res = await request(server)
            .post('/login/user')
            .send({ username: 'user1', password: 'pass1' });

        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'user name and password are incorrect' });
    });

    it('should return 500 if username or password is incorrect', async () => {
        db.query.mockImplementation((query, values, callback) => {
            callback(null, []);
        });

        const res = await request(server)
            .post('/login/user')
            .send({ username: 'user2', password: 'wrongpassword' });

        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'user name and password are incorrect' });
    });

    it('should return a token if login is successful', async () => {
        const userId = 1;
        db.query.mockImplementation((query, values, callback) => {
            callback(null, [{ id: userId, password: 'pass1' }]);
        });

        // const res = await request(server).post('/login/user').send({ username: 'user1', password: 'pass1' });
        // expect(res.status).toBe(200);
        // const token = res.body;
        // const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        // expect(decoded.ids).toBe(userId);
    });
});
