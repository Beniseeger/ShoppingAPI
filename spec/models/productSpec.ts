import { ProductStore } from '../../src/models/product';
import supertest from 'supertest';
import app from '../../src/server';
import jwt from 'jsonwebtoken';

const request = supertest(app);

describe('testing the product model', (): void => {
  const productStore = new ProductStore();

  let token: string;

  beforeAll(async (): Promise<void> => {
    token = jwt.sign({ user: {} }, process.env.TOKEN_SECRET as string);

    await request
      .post('/products/create')
      .set({ Authorization: `Bearer ${token}` })
      .send({ name: 'test_product', price: 100 });
  });

  it('should return the product from id', async (): Promise<void> => {
    const result = await productStore.getProductById('1');

    expect(result.id).toBe(1);
  });

  it('should create a new product', async (): Promise<void> => {
    const result = await productStore.createProduct({
      name: 'tester',
      price: 100,
    });

    expect(result.name).toEqual('tester');
  });

  it('should show all products', async (): Promise<void> => {
    const result = await productStore.productIndexRoute();

    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it('should delete product', async (): Promise<void> => {
    const result = await productStore.deleteProduct('1');

    expect(result.id).toBe(1);
  });
});
