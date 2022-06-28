import jwt from 'jsonwebtoken';
import tokenHandler from '../../src/middleware/tokenHandlerMiddleware';
import { mockRequest, mockResponse } from 'mock-req-res';

describe('testing token handler endpoint', (): void => {
  const token = jwt.sign({ user: {} }, process.env.TOKEN_SECRET as string);
  it('should accept the request when a valid token is provided', (): void => {
    const req = mockRequest({ body: { token: token } });
    const res = mockResponse();
    const result = tokenHandler(req, res, () => {
      console.log('Going to the next middleware');
    });

    expect(result).toBeTrue();
  });

  it('should reject the request when no token is provided', (): void => {
    const req = mockRequest();
    const res = mockResponse();
    const result = tokenHandler(req, res, () => {
      console.log('Going to the next middleware');
    });

    expect(result).toBeFalse();
  });

  it('should reject the request when no valid token is provided', (): void => {
    const req = mockRequest({ body: { token: 'thisIsAFalseToken' } });
    const res = mockResponse();
    const result = tokenHandler(req, res, () => {
      console.log('Going to the next middleware');
    });

    expect(result).toBeFalse();
  });
});
