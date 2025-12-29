// src/__tests__/auth/register.e2e.test.ts
import request from 'supertest';
import app from '../../server';
import { setupDB, teardownDB, disconnectDB } from '../support/test-db-setup';
import userModel from '@models/user.model';

describe('POST /auth/register (E2E)', () => {
  beforeAll(async () => await setupDB());
  beforeEach(async () => await teardownDB()); // ✅ Limpieza antes de cada test
  afterAll(async () => await disconnectDB());

  const timestamp = Date.now();

  it('should register a new user and return 201', async () => {
    const email = `newuser-${timestamp}@example.com`;
    
    const res = await request(app)
      .post('/auth/register')
      .send({ email, password: 'SecurePass123' })
      .expect(201);

    // Verifica respuesta
    expect(res.body).toHaveProperty('userRegister');
    expect(res.body.userRegister.user.email).toBe(email);
    expect(res.body.userRegister).toHaveProperty('token');

    // Verifica que el usuario existe en BD
    const userInDB = await userModel.findOne({ email });
    expect(userInDB).not.toBeNull();
    expect(userInDB!.password).not.toBe('SecurePass123'); // ✅ No está en texto claro
  });

  it('should return 400 for invalid email', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'invalid-email', password: 'SecurePass123' })
      .expect(400);

    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'email', message: 'email no valido' })
      ])
    );
  });

  it('should return 400 for weak password', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'user@test.com', password: '123' }) // <6 chars
      .expect(400);

    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ 
          field: 'password', 
          message: '"password" debe de tener entre 6-30 caracteres' // ← ajusta al mensaje real
        })
      ])
    );
  });

  it('should return 400 when email is already registered', async () => {
    const email = `duplicate-${timestamp}@test.com`;
    
    // 1. Registra una vez
    await request(app)
      .post('/auth/register')
      .send({ email, password: 'SecurePass123' })
      .expect(201);

    // 2. Intenta registrar de nuevo → debe fallar
    const res = await request(app)
      .post('/auth/register')
      .send({ email, password: 'AnotherPass123' })
      .expect(400);

    expect(res.body.error).toBe('No se pudo completar el registro');
  });

  it('should create default project for new user', async () => {
    const email = `project-${timestamp}@test.com`;
    
    const res = await request(app)
      .post('/auth/register')
      .send({ email, password: 'SecurePass123' })
      .expect(201);

    const userId = res.body.userRegister.user._id;
    
    // Verifica que exista un proyecto "Inbox" para este usuario
    const projects = await (await import('@models/project.model')).default
      .find({ user: userId, isDefault: true });

    expect(projects).toHaveLength(1);
    expect(projects[0].name).toBe('Inbox');
  });
});