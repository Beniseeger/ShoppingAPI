import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import tokenCheckerMiddleware from '../middleware/tokenCheckerMiddleware';

const routes = express.Router();

const productStore = new ProductStore();

const productIndexRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await productStore.index();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const showProductRoute = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await productStore.getProductById(req.params.id);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const createProductRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newProduct = {
      name: req.body.name as string,
      price: req.body.price as number,
    } as Product;
    const result = await productStore.createNewProduct(newProduct);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

routes.get('/', productIndexRoute);
routes.get('/:id', showProductRoute);
routes.post('/create', tokenCheckerMiddleware, createProductRoute);

export default routes;