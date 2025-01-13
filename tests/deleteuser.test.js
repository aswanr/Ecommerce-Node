const request = require('supertest');
const app = require('../server');

describe('CRUD Operations', () => {

    let server;
    server = app.listen(3001);
    
    it('DELETE a user by ID',async()=>{
    const deleteId = 16;
    const res = await request(server).delete(`/userdelete/${deleteId}`);
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe(' Deleted successfully ');
    const getUser = await request(server).get(`/get/${deleteId}`);
    expect(getUser.statusCode).toBe(404);
    expect(getUser.text).toBe("Id not founded");
    })
  

  it('return "Id not founded" if user does not exist', async () => {
    const deleteId = 6000;
    const res = await request(server).delete(`/userdelete/${deleteId}`);
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Id not founded");
  });
});