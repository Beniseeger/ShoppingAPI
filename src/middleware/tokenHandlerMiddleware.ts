import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const tokenHandler = (
  _req: Request,
  res: Response,
  next: NextFunction
): boolean => {
  try {
    const token = _req.body.token;

    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401).json(`Invalid token ${err}`);
    return false;
  }

  next();
  return true;
};

export default tokenHandler;
