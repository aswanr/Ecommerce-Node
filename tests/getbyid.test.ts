// import { describe, it, expect, beforeAll } from 'vitest';
// import request from 'supertest';
// const express =require('express');
// const db =require( '../config/db.conf'); // Adjust the path based on your project structure
// const crud =require( '../routes/crud.routes');  // Adjust the path based on your project structure

// const app = express();
// app.use(express.json());
// app.use('/', crud);

// // Clear the database before running tests
// beforeAll((done) => {
//     db.query('DELETE FROM `user`', (err) => {
//         if (err) {
//             console.log(err);
//         }

//     });
// });

// describe('DELETE /userdelete/:id', () => {
//     it('should delete a user', async () => {
//         const newUser = {
//             id: new Date().getTime(),  // Use a timestamp as a unique ID
//             first_name: 'John',
//             last_name: 'Doe',
//             username: 'johndoe',
//             password: 'password',
//             email: 'john@example.com',
//             phone_number: '1234567890',
//             created_time: new Date().toISOString()
//         };

//         // Create a new user to test the delete functionality
//         await request(app).post('/post').send(newUser);

//         // Delete the user
//         const res = await request(app).delete(`/userdelete/${newUser.id}`);
//         expect(res.statusCode).toBe(200);
//         expect(res.text).toBe(' Deleted successfully ');

//         // Verify the user no longer exists
//         const checkRes = await request(app).get(`/get/${newUser.id}`);
//         expect(checkRes.statusCode).toBe(200);
//         expect(checkRes.text).toBe('Id not founded');
//     });

//     it('should return "Id not founded" for a non-existent user', async () => {
//         const res = await request(app).delete('/userdelete/999999');
//         expect(res.statusCode).toBe(200);
//         expect(res.text).toBe('Id not founded');
//     });
// });
