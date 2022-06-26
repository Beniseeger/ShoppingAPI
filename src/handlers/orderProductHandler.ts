import express, { Request, Response } from 'express';
import { OrderProductStore } from '../models/orderProduct';
import tokenChecker from '../middleware/tokenHandlerMiddleware';

const routes = express.Router();

const orderStore = new OrderProductStore();

const getOrderProductIndexRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await orderStore.orderProductIndex();
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const addProductToOrderRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await orderStore.addProductToOrder(
      req.params.orderId as unknown as number,
      req.params.productId as unknown as number
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

routes.get('/', getOrderProductIndexRoute);
routes.post(
  '/:orderId/product/:productId',
  tokenChecker,
  addProductToOrderRoute
);

export default routes;
