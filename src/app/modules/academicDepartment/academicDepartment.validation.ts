import { z } from "zod";
const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic department must be string",
      required_error: "academic Departent name is required",
    }),
    academicFaculty: z.string({
      invalid_type_error: "Academic Faculty must be a object id",
      required_error: "academic Faculty reference is required",
    }),
  }),
});
const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic department must be string",
      required_error: "academic Departent name is required",
    }).optional(),
    academicFaculty: z.string({
      invalid_type_error: "Academic Faculty must be a object id",
      required_error: "academic Faculty reference is required",
    }).optional(),
  }),
});

export const academicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
