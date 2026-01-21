import { Request, Response, NextFunction } from "express";
import { register } from "@controllers/user.controller";
import * as AuthService from "@services/user.service";

jest.mock("@services/user.service", () => ({
  register: jest.fn(),
}));

describe("register tests", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockReq = {
      body: {
        email: "antonio4.testexample.com",
        password: "123456b",
      },
    };

    mockRes = {
      // Permite encadenar métodos chaining
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockNext = jest.fn();
  });

  it("return status = 201 and json: userRegister", async () => {
    const mockUser = {
      user: {
        _id: "697089...",
        email: "antonio4.test@example.com",
      },
      token: "eyJhbGciOi...",
    };

    mockReq = {
      body: {
        email: "antonio4.test@example.com",
        password: "123456b",
      },
    };

    (AuthService.register as jest.Mock).mockResolvedValue(mockUser);

    await register(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ userRegister: mockUser });
  });

  it("return 400 and message: 'Datos del registro no validos' ", async () => {
    const mockError = {
      message: "Datos del registro no validos",
      errors: [
        {
          field: "email",
          message: '"email" must be a valid email',
        },
      ],
    };

    await register(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(mockError);
  });
});
