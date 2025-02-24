const { userauth, adminauth } = require('../middleware/loginjwt'); 
const jwt = require('jsonwebtoken');

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('jsonwebtoken');  

describe('Authentication Middleware', () => {

  const mockRequest = (headers = {}) => ({
    headers,
  });

  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const mockNext = jest.fn();

  describe('userauth middleware', () => {
    it('should call next if token is valid', async () => {
      const token = 'valid-token';
      const mockDecoded = { userId: 1 };
      jwt.verify.mockResolvedValue(mockDecoded);  

      const req = mockRequest({ authorization: `Bearer ${token}` });
      const res = mockResponse();

      await userauth(req, res, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should return 401 if no authorization header is provided', async () => {
      const req = mockRequest({});
      const res = mockResponse();

      await userauth(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'user not found' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 401 if the authorization header does not start with "Bearer "', async () => {
      const req = mockRequest({ authorization: 'InvalidToken' });
      const res = mockResponse();

      await userauth(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'user not found' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 404 if the token is invalid', async () => {
      const token = 'invalid-token';
      jwt.verify.mockRejectedValue(new Error('Invalid token')); 

      const req = mockRequest({ authorization: `Bearer ${token}` });
      const res = mockResponse();

      await userauth(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'unautherized token' });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('adminauth middleware', () => {
    it('should call next if token is valid', async () => {
      const token = 'valid-token';
      const mockDecoded = { adminId: 1 };
      jwt.verify.mockResolvedValue(mockDecoded);  

      const req = mockRequest({ authorization: `Bearer ${token}` });
      const res = mockResponse();

      await adminauth(req, res, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should return 401 if no authorization header is provided', async () => {
      const req = mockRequest({});
      const res = mockResponse();

      await adminauth(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'user not found' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 401 if the authorization header does not start with "Bearer "', async () => {
      const req = mockRequest({ authorization: 'InvalidToken' });
      const res = mockResponse();

      await adminauth(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'user not found' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 404 if the token is invalid', async () => {
      const token = 'invalid-token';
      jwt.verify.mockRejectedValue(new Error('Invalid token')); 

      const req = mockRequest({ authorization: `Bearer ${token}` });
      const res = mockResponse();

      await adminauth(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'unautherized token' });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
