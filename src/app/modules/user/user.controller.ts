import { Request, Response } from "express";
import { UserServices } from "./user.serviece";

const createStudent = async (req: Request, res: Response) => {
  try {
    // Creating a schema validation using zod
     const { password, student: studentData } = req.body;
    // const zodParsedData = studentValidationSchema.parse(student);
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );
    res.status(200).json({
      success: true,
      message: "student is created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: "student is created failed",
      data: null,
    });
  }
};

export const userControllers = {
  createStudent,
};
