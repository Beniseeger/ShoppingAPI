import express, { Request, Response } from 'express';
import { OrderStore } from '../models/order';
import tokenChecker from '../middleware/tokenCheckerMiddleware';

const routes = express.Router();

const orderStore = new OrderStore();

const getOrderFromUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await orderStore.getCurrentOrderByUserId(
      req.params.id as unknown as string
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await orderStore.orderIndexRoute();
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const addNewOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await orderStore.createNewOrder(
      req.body.userId,
      req.body.status
    );
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

routes.get('/:id', getOrderFromUserId);
routes.get('/', getAllOrders);
routes.post('/create', tokenChecker, addNewOrder);

export default routes;
