import { User, UserStore } from '../../src/models/user';
import supertest from 'supertest';
import app from '../../src/server';
import jwt from 'jsonwebtoken';

const request = supertest(app);

describe('testing the user model', () => {
  const userStore = new UserStore();

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
  });

  it('should return the user from id', async (): Promise<void> => {
    const result = await userStore.showUser('1');

    console.log(result);
    //True, so no Error was thrown;
    expect(result.id).toBe(1);
  });

  it('should create a new product', async (): Promise<void> => {
    const user = {
      password: 'password123',
      firstname: 'Max',
      lastname: 'tester',
    };

    const result = await userStore.createUser(user as User);
    console.log(result);
    expect(result.firstname).toEqual('Max');
  });

  it('should show all users', async (): Promise<void> => {
    const result = await userStore.index();

    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it('should return token', async (): Promise<void> => {
    const result = await userStore.authenticateUser(1, 'password123');

    expect((result as User).id).toBe(1);
  });
});
