import { Student } from "./student.interface";
import { StudentModel } from "./student.model";

// const createStudentIntoDB = async(student:Student) => {

//     const result = await StudentModel.create(student)
//     return result;

// };

const geAlltStudentaFromDB = async () => {
  const result = await StudentModel.find()
    .populate("admissonSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};
const geSingletStudentaFromDB = async (id: string) => {
  const result = await StudentModel.findById(id)
    .populate("admissonSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

export const StudentServices = {
  geAlltStudentaFromDB,
  geSingletStudentaFromDB,
};
