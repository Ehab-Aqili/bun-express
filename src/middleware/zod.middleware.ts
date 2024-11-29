import express from "express";
import { z, ZodError } from "my-custom-name";

import { StatusCodes } from "../enums/status_code.enum";

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
          const fieldErrors = error.errors.reduce((acc: Record<string, string>, issue: any) => {
          const fieldPath = issue.path.join("."); 
          acc[fieldPath] =`${issue.path.join(".")} is ${issue.message}`; 
          return acc;
        }, {});

        res.status(StatusCodes.BAD_REQUEST).json({
          error: true,
          message: 'Bad Request',
          details: fieldErrors,
        });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER)
          .json({ 
            error: true,
            message: "Internal Server Error"
           });
      }
    }
  };
}
