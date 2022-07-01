import { Order, OrderStore } from '../../src/models/order';
import supertest from 'supertest';
import app from '../../src/server';

const request = supertest(app);

describe('testing the order model', (): void => {
  const orderStore = new OrderStore();

  let token: string;

  beforeAll(async (): Promise<void> => {
    const user = {
      password: 'password123',
      firstName: 'test',
      lastname: 'tester',
    };
    await request.post('/users/create').send(user);

    await request
      .post('/orders/create')
      .set({ Authorization: `Bearer ${token}` })
      .send({ userid: '1', status: 'active' });
  });

  it('should return the current order from user ID', async (): Promise<void> => {
    const result = await orderStore.getCurrentOrderByUserId('1');

    expect(result.id).toBe(1);
  });

  it('should create a new order', async (): Promise<void> => {
    const order = {
      userid: 1,
      status: 'active',
    } as Order;
    const result = await orderStore.createOrder(order);
    expect(result.status).toEqual('active');
  });

  it('should show all orders', async (): Promise<void> => {
    const result = await orderStore.orderIndexRoute();

    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it('should delete order', async (): Promise<void> => {
    const result = await orderStore.deleteOrder('1');

    expect(result.id).toBe(1);
  });
});
