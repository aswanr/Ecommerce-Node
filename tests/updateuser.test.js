const request = require('supertest');
const express = require('express');
const updateuser = require('../server'); 
const db = require('../config/db.conf');

jest.mock('../config/db.conf'); 

const app = express();
app.use(express.json());


describe('PUT /useredit/:id', () => {
  server = updateuser.listen();

    test('should update user details successfully', async () => {
        db.query.mockImplementation((query, values, callback) => {
            callback(null, { affectedRows: 1 });
        });

        const user = {
            first_name: 'John',
            last_name: 'Doe',
            username: 'johndoe',
            email: 'john.doe@example.com',
            phone_number: '1234567890'
        };

        const response = await request(server).put('/useredit/1').send(user);
        expect(response.status).toBe(200);
        expect(response.text).toBe(' Updated successfully ');

        db.query.mockImplementation((query, values, callback) => {
            callback(null, [{
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                username: 'johndoe',
                email: 'john.doe@example.com',
                phone_number: '1234567890'
            }]);
        });

        const getUser = await request(server).get('/get/1');
        expect(getUser.status).toBe(200);
        expect(getUser.body).toEqual(expect.arrayContaining([expect.objectContaining(user)]));
    });

    test('should return "Id not founded" when ID does not exist', async () => {
        db.query.mockImplementation((query, values, callback) => {
            callback(null, { affectedRows: 0 });
        });

        const user = {
            first_name: 'John',
            last_name: 'Doe',
            username: 'johndoe',
            email: 'john.doe@example.com',
            phone_number: '1234567890'
        };

        const response = await request(server).put('/useredit/9999').send(user);
        expect(response.status).toBe(200); 
        expect(response.text).toBe('Id not founded');
    });

   
});
