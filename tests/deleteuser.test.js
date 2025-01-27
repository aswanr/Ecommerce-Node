const request = require('supertest');
const crud = require('../server');
const db = require('../config/db.conf');

jest.mock('../config/db.conf');

describe('CRUD module tests', () => {
  it('should delete a user successfully', async () => {
    const deleteId = "1";
    db.query.mockImplementation((query, id, callback) => {
      callback(null, { affectedRows: 1 });
    });
    const response = await request(crud).delete(`/userdelete/${deleteId}`);
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe(' Deleted successfully ');
    expect(db.query).toHaveBeenCalledWith('delete from user where id=?', deleteId, expect.any(Function));
  });
  it('should return "Id not founded" if user id does not exist', async () => {
    const deleteId = "2";
    db.query.mockImplementation((query, id, callback) => {
      callback(null, { affectedRows: 0 });
    });
    const response = await request(crud).delete(`/userdelete/${deleteId}`);
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Id not founded');
    expect(db.query).toHaveBeenCalledWith('delete from user where id=?', deleteId, expect.any(Function));
  });
});
