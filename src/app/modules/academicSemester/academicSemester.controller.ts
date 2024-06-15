
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
const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await academicSemesterServieces.getAllAcademicSemestersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await academicSemesterServieces.getSingleAcademicSemesterFromDB(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});
const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await academicSemesterServieces.updateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

export const academicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester
};