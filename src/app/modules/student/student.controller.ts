import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.serviece";
import sendResponse from "../../utils/sendresponse";
import httpStatus from "http-status";

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     // Creating a schema validation using zod

//     const student = req.body

//     const zodParsedData = studentValidationSchema.parse(student);

//     const result = await StudentServices.createStudentIntoDB(zodParsedData);

//     res.status(200).json({
//       success: true,
//       message: "student is created successfully",
//       data: result,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

const getAllStudents = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await StudentServices.geAlltStudentaFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "students are retrived successfully",
      data: result,
    });
  } catch (err:any) {
    next(err)
  }
};
const getSinglStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const id = req.params.id;
    const result = await StudentServices.geSingletStudentaFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "single student is retrived successfully",
      data: result,
    });
  } catch (err) {
    next(err)
  }
};
export const StudentsControllers = {
  
  getAllStudents,
  getSinglStudent,
};
