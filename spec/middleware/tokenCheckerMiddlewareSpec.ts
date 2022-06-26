import jwt from 'jsonwebtoken';
import tokenHanlder from '../../src/middleware/tokenCheckerMiddleware';
import { mockRequest, mockResponse } from 'mock-req-res';

describe('testing token handler endpoint', (): void => {
  const token = jwt.sign({ user: {} }, process.env.TOKEN_SECRET as string);
  it('should accept the request when a valid token is provided', (): void => {
    const req = mockRequest({ body: { token: token } });
    const res = mockResponse();
    const result = tokenHanlder(req, res, () => {});

    expect(result).toBeTrue();
  });

  it('should reject the request when no token is provided', (): void => {
    const req = mockRequest();
    const res = mockResponse();
    const result = tokenHanlder(req, res, () => {});

    expect(result).toBeFalse();
  });

  it('should reject the request when no valid token is provided', (): void => {
    const req = mockRequest({ body: { token: 'thisIsAFalseToken' } });
    const res = mockResponse();
    const result = tokenHanlder(req, res, () => {});

    expect(result).toBeFalse();
  });
});
