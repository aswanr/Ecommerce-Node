const request = require('supertest');
const app = require('../server');


describe('CRUD Operations', () => {
    let server;
    server = app.listen(3001);
    it('GET a user by ID', async () => {
        const res = await request(server).get('/get/4');
        expect(res.statusCode).toBe(200);
        console.log(`got id ${res.status}`);
        
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).not.toBe(0);
        expect(res.body[0]).toHaveProperty('id',4);
      });
    
      it('GET a non-existent user by ID', async () => {
        const res = await request(server).get('/get/20005'); 
        expect(res.text).toBe('Id not founded');
      });

});