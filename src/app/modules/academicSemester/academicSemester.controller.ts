
import sendResponse from "../../utils/sendresponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { academicSemesterServieces } from "./academicSemster.serviece";

const createAcademicSemester = catchAsync(async (req, res,) => {
  // Creating a schema validation using zod
  const result = await academicSemesterServieces.createAcademicSemesterintoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester is created Successfully",
    data: result,
  });
});

export const academicSemesterControllers = {
  createAcademicSemester,
};