import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const tokenHandler = (
  _req: Request,
  res: Response,
  next: NextFunction
): boolean => {
  const authorizationHeader = _req.headers.authorization;
  try {
    const token = (authorizationHeader as string).split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    if (authorizationHeader == undefined) {
      res.status(401).json(`No Token was provided ${err}`);
    } else {
      res.status(401).json(`Invalid token ${err}`);
    }

    return false;
  }

  next();
  return true;
};

export default tokenHandler;
