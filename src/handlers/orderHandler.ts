import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';

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

routes.get('/:id', getOrderFromUserId);
routes.get('/', getAllOrders);

export default routes;
