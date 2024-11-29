import express from "express";
import { z, ZodError } from "my-custom-name";

import { StatusCodes } from "../enums/status-code.enum";

export function validateData(schema: z.ZodObject<any, any>) {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid data", details: errorMessages });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER)
          .json({ error: "Internal Server Error" });
      }
    }
  };
}
