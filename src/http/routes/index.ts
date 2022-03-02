import userRouter from "./UserRoutes";
import { Router } from "express";

const routes = Router();

routes.use("/users", userRouter);

export { routes };
