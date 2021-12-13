import { Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
import ErrorResponse from "../utils/ErrorResponse";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = err;
  error.message = err.message;

  if (err.name === "ValidationError") {
    const valError: mongoose.Error.ValidationError = err;
    const message = Object.values(valError.errors)
      .map((value) => value.message)
      .join(", ");
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ error: error.message || "Server Error" });
};

export default errorHandler;
