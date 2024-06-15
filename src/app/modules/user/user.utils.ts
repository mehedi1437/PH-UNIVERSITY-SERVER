import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: "student" }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};
// Year SemesterCode  4 digit Code
export const generateStudentId = async (payLoad: TAcademicSemester) => {
  console.log(await findLastStudentId());
  // first Time 0000
  let currentId = (0).toString(); // 0000 by default

  const lastStudentId = await findLastStudentId();
  const lastSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentyear = lastStudentId?.substring(0, 4);

  const currentSemesterCode = payLoad.code;
  const currentYear = payLoad.year;
  if (
    lastStudentId &&
    lastSemesterCode === currentSemesterCode &&
    lastStudentyear === currentYear
  ) {
    currentId = lastStudentId.substring(6)
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementId = `${payLoad.year}${payLoad.code}${incrementId}`;

  return incrementId;
};
