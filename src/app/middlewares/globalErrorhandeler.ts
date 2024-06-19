/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error.interface";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Sensding  Default Values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";
  let errorSources: TErrorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];


  if (err instanceof ZodError) {
    const simplifidError = handleZodError(err);
    statusCode = simplifidError?.statusCode;

    message = simplifidError?.message;
    errorSources = simplifidError?.errorSources
  }
  else if(err?.name === 'ValidationError'){
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;

    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources
  }
  else if(err?.name === 'CastError'){
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources
  }

  // ultimate  return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack:config.NODE_ENV === 'development' ? err?.stack : null,
    //  err
  });
};

export default globalErrorHandler;
