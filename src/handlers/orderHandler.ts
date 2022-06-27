import express, { Request, Response } from 'express';
import { OrderStore } from '../models/order';
import tokenChecker from '../middleware/tokenHandlerMiddleware';

const routes = express.Router();

const orderStore = new OrderStore();

const showOrderRoute = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await orderStore.getCurrentOrderByUserId(
      req.params.id as unknown as string
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const orderIndexRoute = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await orderStore.orderIndexRoute();
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const createOrderRoute = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await orderStore.createOrder(
      req.body.userId,
      req.body.status
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteOrderRoute = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await orderStore.deleteOrder(req.body.id);

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

routes.get('/:id', showOrderRoute);
routes.get('/', orderIndexRoute);
routes.post('/create', tokenChecker, createOrderRoute);
routes.post('/delete', tokenChecker, deleteOrderRoute);

export default routes;
