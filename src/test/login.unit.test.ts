import { Request, Response, NextFunction } from 'express';
import { login, register } from '@controllers/user.controller';
import * as AuthService from '@services/user.service';


// Mock del servicio
jest.mock('@services/user.service', () => ({
  login: jest.fn(),
  
}));

describe('login controller (unit)', () => {
  
  
  let mockNext: jest.Mock;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

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
    
    // Hace que el mock devuelva una promesa con un valor: mockUser 
    (AuthService.login as jest.Mock).mockResolvedValue(mockUser);

   // Se ejecuta el CONTROLADOR que estamos probando
  // Internamente, este controlador llamará a AuthService.login (mockeado)
    await login(mockReq as Request, mockRes as Response, mockNext);

    expect(AuthService.login).toHaveBeenCalledWith(mockReq.body);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ userLogged: mockUser });
  })

});



