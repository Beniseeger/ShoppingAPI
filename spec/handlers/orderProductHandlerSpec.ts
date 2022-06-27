import supertest from 'supertest';
import app from '../../src/server';
import jwt from 'jsonwebtoken';
import { User, UserStore } from '../../src/models/user';
import { Product, ProductStore } from '../../src/models/product';
import { Order, OrderStore } from '../../src/models/order';
import { OrderProductStore } from '../../src/models/orderProduct';

const request = supertest(app);

describe('testing the order_product handler', (): void => {
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
    await request.post('/orderproduct/1/product/1').send({ token: token });
  });

  it('should return all products in orders', async (): Promise<void> => {
    const result = await request.get('/orderproduct');

    expect(result.body.length).toBeGreaterThanOrEqual(1);
  });

  it('should add another product to the order with id 1', async (): Promise<void> => {
    const result = await request
      .post('/orderproduct/1/product/1')
      .send({ token: token });

    expect(result.status).toBe(200);
  });

  it('should delete product from order_product endpoint', async (): Promise<void> => {
    const user = {
      password: 'password123',
      firstname: 'test',
      lastname: 'tester',
      token: token,
    } as User;

    const createdUser = await new UserStore().createUser(user);

    const order = {
      userid: createdUser.id,
      status: 'active',
    } as Order;
    const createdOrder = await new OrderStore().createOrder(order);

    const product = {
      name: 'test',
      price: 100,
    } as Product;
    const createdProduct = await new ProductStore().createProduct(product);

    //create order product relation
    await new OrderProductStore().addProductToOrder(
      createdOrder.id as number,
      createdProduct.id as number
    );

    const result = await request
      .post(`/orderproduct/${createdOrder.id}/product/${createdProduct.id}`)
      .send({ token: token });

    expect(result.status).toBe(200);
  });
});
