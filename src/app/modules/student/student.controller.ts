import { StudentServices } from "./student.serviece";
import sendResponse from "../../utils/sendresponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";


const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.geAlltStudentaFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "students are retrived successfully",
    data: result,
  });
});

const getSinglStudent = catchAsync(async (req, res) => {
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
