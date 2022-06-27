import { OrderProductStore } from '../../src/models/orderProduct';
import supertest from 'supertest';
import app from '../../src/server';
import jwt from 'jsonwebtoken';
import { Order, OrderStore } from '../../src/models/order';
import { Product, ProductStore } from '../../src/models/product';
import { User, UserStore } from '../../src/models/user';

const request = supertest(app);

describe('testing the order_product model', () => {
  const orderProductStore = new OrderProductStore();

  let token: string;

  beforeAll(async (): Promise<void> => {
    token = jwt.sign({ user: {} }, process.env.TOKEN_SECRET as string);

    //create User
    const user = {
      password: 'password123',
      firstname: 'test',
      lastname: 'tester',
      token: token,
    };
    await request.post('/users/create').send(user);

    //create order
    await request
      .post('/orders/create')
      .send({ userid: 1, status: 'active', token: token });

    //create product
    await request
      .post('/products/create')
      .send({ name: 'test_product', price: 100, token: token });

    //create order product relation
    await request.post('/orderproduct/1/product/1').send({ token: token });
  });

  it('should return all products in orders', async (): Promise<void> => {
    const result = await orderProductStore.orderProductIndex();

    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it('should add another product to the order with id 1', async (): Promise<void> => {
    const result = await orderProductStore.addProductToOrder(1, 1);

    //True, so no Error was thrown;
    expect(result.id).not.toBeNaN();
  });

  it('should delete product from order', async (): Promise<void> => {
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

    const result = await orderProductStore.deleteProductFromOrder(
      createdOrder.id as number,
      createdProduct.id as number
    );

    expect(result.order_id as number).toBeTruthy();
  });
});
