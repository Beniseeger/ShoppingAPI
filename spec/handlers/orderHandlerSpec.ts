import loggerMiddleware from '../../src/middleware/loggerMiddleware';
import supertest from 'supertest';
import { Request, Response } from 'express';
import app from '../../src/server';

const request = supertest(app);

describe('testing order api endpoints', (): void => {
  beforeAll(() => {
    request.post('/orders').send({ user_id: '1', status: 'active' });
  });

  //Needs to be reworked because there is no post to orders yet
  xit('should show all orders for the index route', async (): Promise<void> => {
    const result = await request.get('/orders');
    //console.log(result);
    expect(result.body).toEqual([{ id: 1, status: 'active', user_id: '1' }]);
  });
});
