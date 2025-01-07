const request = require('supertest');
const app = require('../server');


describe('crud call',async()=>{
    it('server is running or not',async () => { 
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
    });
    it('not running',async ()=>{
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
    })
});
