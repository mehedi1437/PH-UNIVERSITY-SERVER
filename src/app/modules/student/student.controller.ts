import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.serviece";
import sendResponse from "../../utils/sendresponse";
import httpStatus from "http-status";

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};
const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.geAlltStudentaFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "students are retrived successfully",
    data: result,
  });
});

const getSinglStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await StudentServices.geSingletStudentaFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "single student is retrived successfully",
    data: result,
  });
});
export const StudentsControllers = {
  getAllStudents,
  getSinglStudent,
};
