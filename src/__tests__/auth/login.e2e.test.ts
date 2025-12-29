// src/__tests__/auth/login.e2e.test.ts
import request from 'supertest';
import app from '../../server';
import { setupDB, teardownDB, disconnectDB } from '../support/test-db-setup';
import userModel from '@models/user.model';
import { hashPassword } from '@utils/auth';

describe('POST /auth/login (E2E)', () => {
  beforeAll(async () => {
    await setupDB();
  });

  beforeEach(async () => {
    await teardownDB(); // ✅ Limpia antes de cada test
  });

  afterAll(async () => {
    await disconnectDB();
  });

  const timestamp = Date.now();

  it('should return 200 and token when credentials are valid', async () => {
    const email = `test-${timestamp}@example.com`;
    const hashedPass = await hashPassword('securePass123');
    await userModel.create({ email, password: hashedPass });

    const res = await request(app)
      .post('/auth/login')
      .send({ email, password: 'securePass123' })
      .expect(200);

    expect(res.body).toHaveProperty('userLogged');
    expect(res.body.userLogged).toHaveProperty('token');
    expect(res.body.userLogged.user.email).toBe(email);
  });

  it('should return 400 when email is missing', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ password: 'any' })
      .expect(400);

    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'email', message: 'email es obligatrio' })
      ])
    );
  });

  it('should return 401 when password is incorrect', async () => {
    const email = `user-${timestamp}@test.com`;
    const hashedPass = await hashPassword('correctPass');
    await userModel.create({ email, password: hashedPass });

    const res = await request(app)
      .post('/auth/login')
      .send({ email, password: 'wrongPass' })
      .expect(401);

    expect(res.body.error).toBe('Usuario o contraseña no válido');
  });

  it('should return 400 when email is not found', async () => {
    // ✅ PRIMERO: verifica que NO haya usuarios
    const count = await userModel.countDocuments();
    console.log('Usuarios en BD:', count); // Debe ser 0

    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'no-existe@nunca.com', password: 'cualquiera' })
      .expect(400);

    console.log('Respuesta:', res.body); // Ver qué devuelve
    expect(res.body.error).toBe('Email no encontrado');
  });
});