import express from "express";
import "express-async-errors";
import cors from "cors";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { routes } from "@routes";
import ErrorHandlerMiddleware from "@middlewares/ErrorHandlerMiddleware";

createConnection()
  .then(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(routes);
    app.use(ErrorHandlerMiddleware);
    app.listen(4000, () => {
      console.log(`server running on port 4000`);
    });
  })
  .catch((error) => console.log(error));
