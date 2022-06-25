import express, { NextFunction } from 'express';

/**
 * Returns the api point accessed by the user.
 * @param req request paramters of type express.Request
 * @param res response parameters of type express.Reponse
 * @param next next middleware
 * @returns the api point accessed by the user and logs it in the console.
 */
const loggerMiddleware = (
  req: express.Request,
  res: express.Response,
  next: NextFunction
): string => {
  console.log(
    `The endpoint: ${req.url} has been accessed with Req method: ${req.method}`
  );

  next();
  return `The endpoint: ${req.url} has been accessed with Req method: ${req.method}`;
};

export default loggerMiddleware;
