import { Request, Response } from "express";
import { StudentServices } from "./student.serviece";

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

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.geAlltStudentaFromDB();
    res.status(200).json({
      success: true,
      message: "All Student Fatched successfully",
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "something went wrong",
      data: null,
    });
  }
};
const getSinglStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await StudentServices.geSingletStudentaFromDB(id);
    res.status(200).json({
      success: true,
      message: "Single Fatched successfully bt ID",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
export const StudentsControllers = {
  
  getAllStudents,
  getSinglStudent,
};
