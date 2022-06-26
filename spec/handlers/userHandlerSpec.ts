import supertest from 'supertest';
import app from '../../src/server';
import jwt from 'jsonwebtoken';

const request = supertest(app);

describe('testing user api endpoints', (): void => {
  var token: string;

  beforeAll(async () => {
    token = jwt.sign({ user: {} }, process.env.TOKEN_SECRET as string);

    const user = {
      password: 'password123',
      firstname: 'test',
      lastname: 'tester',
      token: token,
    };
    await request.post('/users/create').send(user);
  });

  it('should show all users in the db', async (): Promise<void> => {
    const result = await request.get('/users').send({ token: token });

    expect(result.body.length).toBeGreaterThanOrEqual(1);
  });

  it('should give error when no jwt token is provided', async (): Promise<void> => {
    const result = await request.get('/users');
    expect(result.body).toContain('Invalid token JsonWebTokenError:');
  });

  it('should show a specific user with the id 1', async (): Promise<void> => {
    const result = await request.get('/users/1').send({ token: token });
    expect(result.body.id).toBe(1);
  });

  it('should create an user when token provided', async (): Promise<void> => {
    const user = {
      password: 'password123',
      firstname: 'test',
      lastname: 'tester',
      token: token,
    };
    const result = await request.post('/users/create').send(user);

    expect(result.status).toBe(200);
  });

  it('should return a valid token when authenticating', async (): Promise<void> => {
    const user = {
      id: '1',
      password: 'password123',
    };
    const result = await request.post('/users/authenticate').send(user);

    expect(result.status).toBe(200);
  });
});
