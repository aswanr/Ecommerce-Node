const request = require('supertest');
const express = require('express');
const app = require('../../server'); 
jest.mock('../../config/db.conf', () => ({
    query: jest.fn()
}));

const db = require('../../config/db.conf');
const { userauth } = require('../../middleware/loginjwt');
jest.mock('../../middleware/loginjwt', () => ({
    userauth: (req, res, next) => next()
}));

describe('POST /user/products', () => {
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
            .post('/user/products')
            .send();

        expect(res.status)
    });
});