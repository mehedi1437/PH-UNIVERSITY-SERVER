import {
  TAcademicSemester,
  TacademicSemesterNameCodeMapper,
} from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterintoDB = async (payload: TAcademicSemester) => {
  // semester name ---> Code

  const academicSemesterNameCodeMapper: TacademicSemesterNameCodeMapper = {
    Autumn: "01",
    Summer: "02",
    Fall: "02",
  };

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid Semester Code");
  }
  const result = await AcademicSemester.create(payload);
  return result;
};


const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};
const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

export const academicSemesterServieces = {
  createAcademicSemesterintoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB
};
