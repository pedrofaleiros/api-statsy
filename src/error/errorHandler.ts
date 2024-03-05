import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResourceNotFoundError } from "./ResourceNotFoundError";
import { ValidationError } from "./ValidationError";
import { ServiceError } from "./ServiceError";
import { NotAuthError } from "./NotAuthError";

export function errorHandler() {
  return (err: Error, _: Request, res: Response, __: NextFunction) => {

    if (err instanceof NotAuthError) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: err.message
      })
    }

    if (err instanceof ResourceNotFoundError) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: err.message
      })
    }

    if (err instanceof ValidationError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: err.message
      })
    }

    if (err instanceof ServiceError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: err.message
      })
    }

    if (err instanceof SyntaxError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Verifique os dados enviados."
      })
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server error",
      error: `${err.name}: ${err.message}`
    });
  };
}
