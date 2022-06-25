import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import tokenChecker from "../middleware/tokenCheckerMiddleware";
import jwt from "jsonwebtoken";

const routes = express.Router();

const userStore = new UserStore();

const userIndexRoute = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await userStore.index();
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const showUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await userStore.showUser(req.params.id);

    res.status(200).send(result);
  } catch (err) {
    res.status(401).send(err);
  }
};

const authenticateUser = async (
  req: Request,
  res: Response
): Promise<void | null> => {
  try {
    const user = await userStore.authenticateUser(
      req.body.id,
      req.body.password
    );

    if (typeof user === "string") {
      res.status(401).send(user);
      return null;
    }

    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);

    res.status(200).send(token);
  } catch (err) {
    res.status(401).send(err);
  }
};

const createUser = async (
  req: Request,
  res: Response
): Promise<void | null> => {
  try {
    const user = await userStore.createUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    } as User);

    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);

    res.status(200).json(token);
  } catch (err) {
    res.status(400).json(err);
  }
};

routes.get("/", tokenChecker, userIndexRoute);
routes.get("/:id", tokenChecker, showUser);
routes.post("/authenticate", authenticateUser);
routes.post("/create", tokenChecker, createUser);

export default routes;
