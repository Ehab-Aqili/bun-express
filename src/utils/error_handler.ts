import { StatusCodes } from "../enums/status_code.enum";

export const ErrorHandler = (error: any) => {
  let status = StatusCodes.INTERNAL_SERVER;
  let response = {
    error: true,
    message: "Internal Server Error",
    details: {},
  };

  if (error.code === 11000) {
    const key = Object.keys(error.keyPattern)[0];
    const value = error.keyValue[key];
    status = StatusCodes.BAD_REQUEST;
    response = {
      error: true,
      message: "Bad Request",
      details: {
        [key]: `${key} is a duplicate value: "${value}". Please use a unique value.`,
      },
    };
  } else if (error instanceof Error) {
    response.details = {
      general: `${error.message}`,
    };
  }

  return { response, status };
};
