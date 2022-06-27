import express, { Request, Response } from 'express';
import { OrderProductStore } from '../models/orderProduct';
import tokenChecker from '../middleware/tokenHandlerMiddleware';

const routes = express.Router();

const orderProductStore = new OrderProductStore();

const getOrderProductIndexRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await orderProductStore.orderProductIndex();
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
    const result = await orderProductStore.addProductToOrder(
      req.params.orderId as unknown as number,
      req.params.productId as unknown as number
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteOrderProductRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await orderProductStore.deleteProductFromOrder(
      req.params.orderid as unknown as number,
      req.params.productid as unknown as number
    );

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

routes.get('/', getOrderProductIndexRoute);
routes.post(
  '/:orderId/product/:productId',
  tokenChecker,
  addProductToOrderRoute
);

routes.post(
  '/:orderId/product/:productId/delete',
  tokenChecker,
  deleteOrderProductRoute
);

export default routes;
