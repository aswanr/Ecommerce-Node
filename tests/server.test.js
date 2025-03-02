const request = require('supertest');
const app = require('../server');


describe('crud call',()=>{
    it('server is running or not',async () => { 
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
    });
    it('not running',async ()=>{
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
    })
    it("is running or on any other port",async()=>{
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
    })
});
