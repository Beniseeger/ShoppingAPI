import express, { Request, Response } from 'express';
import cors from 'cors';
import loggerMiddleware from './middleware/loggerMiddleware';
import bodyParser from 'body-parser';
import userHandler from './handlers/userHandler';
import productsHandler from './handlers/productHandler';
import orderHandler from './handlers/orderHandler';
import orderProductHandler from './handlers/orderProductHandler';

const app: express.Application = express();
const address = '0.0.0.0:3000';

//Middleware used for all routes
app.use(loggerMiddleware);
app.use(cors());

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response): void => {
  res.send('Initial route!');
});

app.listen(3000, (): void => {
  console.log(`starting app on: ${address}`);
});

app.use('/users', userHandler);
app.use('/products', productsHandler);
app.use('/orders', orderHandler);
app.use('/orderproduct', orderProductHandler);

export default app;
