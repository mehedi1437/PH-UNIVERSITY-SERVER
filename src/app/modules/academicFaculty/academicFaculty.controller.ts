import sendResponse from "../../utils/sendresponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { academicFacultyServieces } from "./academicfaculty.services";

const createAcademicFacluty = catchAsync(async (req, res) => {
  // Creating a schema validation using zod
  const result = await academicFacultyServieces.createAcademicFacultyintoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Facluty is created Successfully",
    data: result,
  });
});
const getAllAcademicFacluty = catchAsync(async (req, res) => {
  const result = await academicFacultyServieces.getAllAcademicFacultiesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Facluty are retrieved successfully",
    data: result,
  });
});

const getSingleAcademicFacluty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await academicFacultyServieces.getSingleAcademicFacultyFromDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Facluty is retrieved succesfully",
    data: result,
  });
});
const updateAcademicFacluty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await academicFacultyServieces.updateAcademicFacultyIntoDB(
    facultyId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Facluty is Updated succesfully",
    data: result,
  });
});

export const academicFaclutyControllers = {
  createAcademicFacluty,
  getAllAcademicFacluty,
  getSingleAcademicFacluty,
  updateAcademicFacluty,
};
