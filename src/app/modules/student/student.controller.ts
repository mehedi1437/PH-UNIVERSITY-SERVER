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

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const {student} = req.body
  const result = await StudentServices.updateStudentaFromDB(studentId,student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated succesfully',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted succesfully',
    data: result,
  });
});


export const StudentsControllers = {
  getAllStudents,
  getSinglStudent,
  deleteStudent,
  updateStudent
};
