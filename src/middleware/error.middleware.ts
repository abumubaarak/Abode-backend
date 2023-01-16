import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/errorResponse";
export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: ErrorResponse | undefined;

  console.log(err);

  const { message, statusCode } = err;

  error = new ErrorResponse(statusCode, message);



  res.status(error?.statusCode || 500).json({
    success: false,
    message: error?.message || "Something went wrong",
  });
};
