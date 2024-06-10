import { Schema, model } from "mongoose";
import { TAcademicSemester, TAcademicSemesterCode, TAcademicSemesterName, TMonths } from "./academicSemester.interface";


const Months: TMonths[] = [
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
];
const AcademicSemestername :TAcademicSemesterName[] = ["Autumn" ,"Summer","Fall"]
const AcademicSemestercode :TAcademicSemesterCode[] = ["01" ,"02","03"]
const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, requried: true,enum:AcademicSemestername },
    year: { type: String, requried: true },
    code: { type: String, requried: true,enum:AcademicSemestercode },
    startMonth: { type: String,requried: true, enum: Months },
    endMonth: { type: String,requried: true, enum: Months },
  },
  {
    timestamps: true,
  }
);

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
