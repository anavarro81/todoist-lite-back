// src/__tests__/auth/register.unit.test.ts
import { Request, Response, NextFunction } from 'express';
import { register } from '@controllers/user.controller';
import * as AuthService from '@services/user.service';
import AppError from '../../errors/AppError';

// Mock del servicio
jest.mock('@services/user.service', () => ({
  register: jest.fn()
}));

describe('register controller (unit)', () => {
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

  it('should call AuthService.register and return 201 on success', async () => {
    const mockUser = {
      user: { _id: '123', email: 'test@test.com' },
      token: 'mock-jwt-token'
    };
    (AuthService.register as jest.Mock).mockResolvedValue(mockUser);

    await register(mockReq as Request, mockRes as Response, mockNext);

    expect(AuthService.register).toHaveBeenCalledWith(mockReq.body);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ userRegister: mockUser });
  });

  it('should call next() with AppError on service error', async () => {
    const error = AppError.badRequest('Email already exists');
    (AuthService.register as jest.Mock).mockRejectedValue(error);

    await register(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });

  it('should return 400 if validation fails', async () => {
    mockReq.body = { email: 'invalid', password: 'short' };

    await register(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalled();
    expect(mockNext).not.toHaveBeenCalled();
  });
});