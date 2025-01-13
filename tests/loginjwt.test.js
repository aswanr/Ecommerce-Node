const jwt = require('jsonwebtoken');
const { userauth, adminauth } = require('../../middleware/loginjwt');

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('Auth Middleware', () => {
  describe('userauth middleware', () => {
    it('should return 401 if no authorization header is provided', async () => {
      const req = {
        headers: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await userauth(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'user not found' });
    });

    it('should return 401 if authorization header does not start with "Bearer "', async () => {
      const req = {
        headers: {
          authorization: 'Basic token',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await userauth(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'user not found' });
    });

    it('should call next if token is valid', async () => {
      const req = {
        headers: {
          authorization: 'Bearer valid_token',
        },
      };
      const res = {};
      const next = jest.fn();

      jwt.verify.mockResolvedValue({ id: 1 });

      await userauth(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should return 404 if token is invalid', async () => {
      const req = {
        headers: {
          authorization: 'Bearer invalid_token',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      jwt.verify.mockRejectedValue(new Error('invalid token'));

      await userauth(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'unautherized token' });
    });
  });

  // Test for adminauth middleware
  describe('adminauth middleware', () => {
    it('should return 401 if no authorization header is provided', async () => {
      const req = {
        headers: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await adminauth(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'user not found' });
    });

    it('should return 401 if authorization header does not start with "Bearer "', async () => {
      const req = {
        headers: {
          authorization: 'Basic token',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await adminauth(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'user not found' });
    });

    it('should call next if token is valid', async () => {
      const req = {
        headers: {
          authorization: 'Bearer valid_token',
        },
      };
      const res = {};
      const next = jest.fn();

      jwt.verify.mockResolvedValue({ id: 1 });

      await adminauth(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should return 404 if token is invalid', async () => {
      const req = {
        headers: {
          authorization: 'Bearer invalid_token',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      jwt.verify.mockRejectedValue(new Error('invalid token'));

      await adminauth(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'unautherized token' });
    });
  });
});
