import sendResponse from "../../utils/sendresponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { academicDepartmentServieces } from "./academicDepartment.servieces";

const createAcademicDepartment = catchAsync(async (req, res) => {
  // Creating a schema validation using zod
  const result = await academicDepartmentServieces.createAcademicDepartmentintoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department is created Successfully",
    data: result,
  });
});
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmentServieces.getAllAcademicDepartmentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department are retrieved successfully",
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { DepartmentId } = req.params;
  const result =
    await academicDepartmentServieces.getSingleAcademicDepartmentFromDB(DepartmentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department is retrieved succesfully",
    data: result,
  });
});
const updateAcademicDepartment = catchAsync(async (req, res) => {
  const {  DepartmentId } = req.params;
  const result = await academicDepartmentServieces.updateAcademicDepartmentIntoDB(
    DepartmentId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department is Updated succesfully",
    data: result,
  });
});

export const academicDepartmentIdControllers = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateAcademicDepartment
};
