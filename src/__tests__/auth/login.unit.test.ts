// src/__tests__/auth/login.unit.test.ts
import { Request, Response, NextFunction } from 'express';
import { login } from '@controllers/user.controller';
import * as AuthService from '@services/user.service';
import AppError from '../../errors/AppError';

// Mock del servicio
jest.mock('@services/user.service', () => ({
  login: jest.fn()
}));

describe('login controller (unit)', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockReq = {
      body: { email: 'test@test.com', password: 'pass123' }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  it('should call AuthService.login and return 200 on success', async () => {
    const mockUser = {
      user: { _id: '123', email: 'test@test.com' },
      token: 'mock-jwt-token'
    };
    (AuthService.login as jest.Mock).mockResolvedValue(mockUser);

    await login(mockReq as Request, mockRes as Response, mockNext);

    expect(AuthService.login).toHaveBeenCalledWith(mockReq.body);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ userLogged: mockUser });
  });

  it('should call next() with AppError on service error', async () => {
    const error = AppError.unauthorized('Invalid');
    (AuthService.login as jest.Mock).mockRejectedValue(error);

    await login(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });

  it('should return 400 if validation fails', async () => {
    mockReq.body = { email: '' }; // Invalid

    await login(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalled();
    expect(mockNext).not.toHaveBeenCalled();
  });
});