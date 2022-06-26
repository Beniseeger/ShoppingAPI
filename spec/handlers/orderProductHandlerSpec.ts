import supertest from 'supertest';
import app from '../../src/server';
import jwt from 'jsonwebtoken';

const request = supertest(app);

describe('testing the order_product handler', () => {
  let token: string;

  beforeAll(async (): Promise<void> => {
    token = jwt.sign({ user: {} }, process.env.TOKEN_SECRET as string);

    //create User
    const user = {
      password: 'password123',
      firstName: 'test',
      lastname: 'tester',
      token: token,
    };
    await request.post('/users/create').send(user);

    //create order
    await request
      .post('/orders/create')
      .send({ userid: '1', status: 'active', token: token });

    //create product
    await request
      .post('/products/create')
      .send({ name: 'test_product', price: 100, token: token });

    //create order product relation
    await request.post('/orderproduct/1/product/1').send(user);
  });

  it('should return all products in orders', async (): Promise<void> => {
    const result = await request.get('/orderproduct');

    console.log(result);

    expect(result.body.length).toBeGreaterThanOrEqual(1);
  });

  it('should add another product to the order with id 1', async (): Promise<void> => {
    const result = await request
      .post('/orderproduct/1/products/1')
      .send({ token: token });

    expect(result.status).toBe(200);
  });
});
