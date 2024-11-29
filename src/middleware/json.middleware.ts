import express from "express";
import { StatusCodes } from "../enums/status_code.enum";

export function validateJson(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (err instanceof SyntaxError && "body" in err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: true,
      message: "Bad Request",
      details: {
        general: "Invalid JSON format in the request body.",
      },
    });
  } else {
    next(err); 
  }
}
