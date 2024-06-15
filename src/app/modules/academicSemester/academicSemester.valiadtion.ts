import { z } from "zod";
const Months = z.enum([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

const AcademicSemesterName = z.enum(["Autumn", "Summer", "Fall"]);
const AcademicSemesterCode = z.enum(["01", "02", "03"]);
const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: AcademicSemesterName,
    year: z.string(),
    code: AcademicSemesterCode,
    startMonth: Months,
    endMonth: Months,
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});
const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: AcademicSemesterName.optional(),
    year: z.string().optional(),
    code: AcademicSemesterCode.optional(),
    startMonth: Months.optional(),
    endMonth: Months.optional(),
  }),
});

export const AcademicsemesterValidation = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema
};
