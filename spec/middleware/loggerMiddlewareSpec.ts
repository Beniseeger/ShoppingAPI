import loggerMiddleware from '../../src/middleware/loggerMiddleware';
import { Request, Response } from 'express';

describe('testing logger middleware', (): void => {
  const mockRequest: Partial<Request> = { url: '/api' };
  let mockResponse: Partial<Response>;

  it('should log an entry for /api', (): void => {
    const logMessage = loggerMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      () => {
        console.log('Going to the next middleware');
      }
    );
    expect(logMessage).toContain('The endpoint: /api has been accessed');
  });
});
