import { UserServices } from "./user.serviece";
import sendResponse from "../../utils/sendresponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res,) => {
  // Creating a schema validation using zod
  const { password, student: studentData } = req.body;
  const result = await UserServices.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "student is created successfully",
    data: result,
  });
});

export const userControllers = {
  createStudent,
};
