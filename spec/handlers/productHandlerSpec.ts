import supertest from 'supertest';
import app from '../../src/server';
import jwt from 'jsonwebtoken';

const request = supertest(app);

describe('testing products api endpoints', (): void => {
  let token: string;

  beforeAll(async (): Promise<void> => {
    token = jwt.sign({ user: {} }, process.env.TOKEN_SECRET as string);

    await request
      .post('/products/create')
      .send({ name: 'test_product', price: 100, token: token });
  });

  it('should show all products for the index route', async (): Promise<void> => {
    const result = await request.get('/products');

    expect(result.body.length).toBeGreaterThanOrEqual(1);
  });

  it('should return a specific product for product id', async (): Promise<void> => {
    const result = await request.get('/products/1');
    expect(result.status).toBe(200);
  });

  it('should create a new product', async (): Promise<void> => {
    const result = await request
      .post('/products/create')
      .send({ name: 'test_product', price: 100, token: token });

    expect(result.status).toBe(200);
  });
});
