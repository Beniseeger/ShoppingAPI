import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import tokenChecker from '../middleware/tokenHandlerMiddleware';
import jwt from 'jsonwebtoken';

const routes = express.Router();

const userStore = new UserStore();

const userIndexRoute = async (
  req: Request,
  res: Response
): Promise<User[] | null> => {
  try {
    const result = await userStore.userIndex();
    res.status(200).send(result);
    return result;
  } catch (err) {
    res.status(400).send(err);
  }

  return null;
};

const showUserRoute = async (
  req: Request,
  res: Response
): Promise<User | null> => {
  try {
    const result = await userStore.getUserById(req.params.id);

    res.status(200).send(result);
    return result;
  } catch (err) {
    res.status(401).send(err);
  }

  return null;
};

const authenticateUserRoute = async (
  req: Request,
  res: Response
): Promise<string | null> => {
  try {
    const user = await userStore.authenticateUser(
      req.body.id,
      req.body.password
    );

    if (typeof user === 'string') {
      res.status(401).send(user);
      return null;
    }

    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);

    res.status(200).send(token);
    return token;
  } catch (err) {
    res.status(401).send(err);
  }

  return null;
};

const createUserRoute = async (
  req: Request,
  res: Response
): Promise<string | null> => {
  try {
    const user = await userStore.createUser({
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      password: req.body.password,
    } as User);

    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);

    res.status(200).json(token);
    return token;
  } catch (err) {
    res.status(400).json(err);
  }

  return null;
};

const deleteUserRoute = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userStore.deleteUser(req.body.id);

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

routes.get('/', tokenChecker, userIndexRoute);
routes.get('/:id', tokenChecker, showUserRoute);
routes.post('/authenticate', authenticateUserRoute);
routes.post('/create', tokenChecker, createUserRoute);
routes.post('/delete', tokenChecker, deleteUserRoute);

export default routes;
