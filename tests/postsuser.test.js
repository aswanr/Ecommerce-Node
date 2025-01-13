const request = require('supertest');
const app = require('../server'); 
const db = require('../config/db.conf');

jest.mock('../config/db.conf'); 

describe('POST /post', () => {
    test('should insert user successfully', async () => {
        db.query.mockImplementation((query, values, callback) => {
            callback(null, { message: 'User inserted successfully' });
        });

        const response = await request(app).post('/post').send({
            id: 105,
            first_name: 'Jssohn',
            last_name: 'Dsoe',
            username: 'joshndoe',
            password: 'passsword',
            email: 'johns.doe@example.com',
            phone_number: '1784567890',
            created_time: '2023-01-01 00:00:00'
        });

        expect(response.status).toBe(200);
        expect(response.text).toBe('Done successfully');
    });

    test('should return error when user insertion fails', async () => {
        db.query.mockImplementation((query, values, callback) => {
            callback(new Error('Error inserting user'), null);
        });

        const response = await request(app).post('/post').send({
            id: 105,
            first_name: 'John',
            last_name: 'Doe',
            username: 'johndoe',
            password: 'password',
            email: 'john.doe@example.com',
            phone_number: '1234567890',
            created_time: '2023-01-01 00:00:00'
        });

        expect(response.status).toBe(404); 
        expect(response.text).toBe('Error inserting user');
    });
});
