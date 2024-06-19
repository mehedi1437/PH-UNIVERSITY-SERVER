/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error.interface";
import config from "../config";

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

  const handleZodError = (err: ZodError) => {
    const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue?.path?.length - 1],
        message: issue.message,
      };
    });
    const statusCode = 400;

    return {
      statusCode,
      message: " Validation  error",
      errorSources,
    };
  };

  if (err instanceof ZodError) {
    const simplifidError = handleZodError(err);
    statusCode = simplifidError?.statusCode;

    message = simplifidError?.message;
    errorSources = simplifidError?.errorSources
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack:config.NODE_ENV === 'development' ? err?.stack : null
    // error : err
  });
};

export default globalErrorHandler;
