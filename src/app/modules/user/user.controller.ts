import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.serviece";
import sendResponse from "../../utils/sendresponse";
import httpStatus from "http-status";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Creating a schema validation using zod
    const { password, student: studentData } = req.body;
    // const zodParsedData = studentValidationSchema.parse(student);
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "student is created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userControllers = {
  createStudent,
};
