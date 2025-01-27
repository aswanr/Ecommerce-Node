const request = require('supertest');
const app = require('../server');
const db = require('../config/db.conf');

jest.mock('../config/db.conf'); 
describe('Getting user by id', () => {
    it('GET a user by ID', async () => {
        db.query.mockImplementation((query, values, callback) => {
            callback(null, [{ id: 1, first_name: 'John', last_name: 'Doe', username: 'johndoe' }]);
        });

        const res = await request(app).get('/get/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).not.toBe(0);
        expect(res.body[0]).toHaveProperty('id', 1);
    });

    it('GET a non-existent user by ID', async () => {
        db.query.mockImplementation((query, values, callback) => {
            callback(null, "Id not found");
        });
        const res = await request(app).get('/get/2055');
        expect(res.statusCode).toBe(200); 
        expect(res.text).toBe('Id not found'); 
    });
});
