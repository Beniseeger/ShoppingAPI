import supertest from 'supertest';
import app from '../src/server';

const request = supertest(app);

describe('testing the initial route', () => {
  it('should return 200 for the initial route', async () => {
    const result = await request.get('/');
    expect(result.status).toBe(200);
  });
});

export default request;
