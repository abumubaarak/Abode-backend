import { Response } from "express";

const response = (
  res: Response,
  status: number,
  success: boolean,
  data?: any,
  message?: string
) => {
  if (data) {
    res.status(status).json({
      success,
      data,
    });
  } else {
    res.status(status).json({
      success,
      message,
    });
  }
};

export default response;
