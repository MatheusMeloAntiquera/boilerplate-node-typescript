import { Request, Response, NextFunction } from "express";
import { AppError } from "@errors/AppError";

export default function (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
): Response {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json(error.toJson());
  }

  //Todo: Save the error on a file error log
  console.log(error);
  //Send a generic message error
  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
}
