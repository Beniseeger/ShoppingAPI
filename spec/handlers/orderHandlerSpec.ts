import supertest from 'supertest';
import app from '../../src/server';
import jwt from 'jsonwebtoken';

const request = supertest(app);

describe('testing order api endpoints', (): void => {
  let token: string;

  beforeAll(async (): Promise<void> => {
    token = jwt.sign({ user: {} }, process.env.TOKEN_SECRET as string);

    const user = {
      password: 'password123',
      firstName: 'test',
      lastname: 'tester',
      token: token,
    };
    await request.post('/users/create').send(user);

    await request
      .post('/orders/create')
      .send({ userId: '1', status: 'active', token: token });
  });

  it('should show all orders for the index route', async (): Promise<void> => {
    const result = await request.get('/orders');

    expect(result.body.length).toBeGreaterThanOrEqual(1);
  });

  it('should return a specific order by user_id', async (): Promise<void> => {
    const result = await request.get('/orders/1');

    expect(result.status).toBe(200);
  });

  it('should create a new order', async (): Promise<void> => {
    const result = await request
      .post('/orders/create')
      .send({ user_id: '1', status: 'active', token: token });

    expect(result.status).toBe(200);
  });
});
