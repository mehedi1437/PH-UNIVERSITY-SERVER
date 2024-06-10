import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterintoDB =async(payload:TAcademicSemester)=>{

    const result = await AcademicSemester.create(payload);
    return result
}

export const academicSemesterServieces = {
    createAcademicSemesterintoDB
}