import { OrderStore } from '../../src/models/order';
import supertest from 'supertest';
import app from '../../src/server';
import jwt from 'jsonwebtoken';

const request = supertest(app);

describe('testing the order model', () => {
  const orderStore = new OrderStore();

  let token: string;

  beforeAll(async (): Promise<void> => {
    token = jwt.sign({ user: {} }, process.env.TOKEN_SECRET as string);

    const user = {
      password: 'password123',
      firstName: 'test',
      lastname: 'tester',
      token: token,
    };
    const result = await request.post('/users/create').send(user);

    await request
      .post('/orders/create')
      .send({ userid: '1', status: 'active', token: token });
  });

  it('should return the current order from user ID', async (): Promise<void> => {
    const result = await orderStore.getCurrentOrderByUserId('1');

    //True, so no Error was thrown;
    expect(result.id).toBe(1);
  });

  it('should create a new order', async (): Promise<void> => {
    const result = await orderStore.createNewOrder(1, 'active');
    console.log(result);
    expect(result.status).toEqual('active');
  });

  it('should show all users', async (): Promise<void> => {
    const result = await orderStore.orderIndexRoute();

    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});