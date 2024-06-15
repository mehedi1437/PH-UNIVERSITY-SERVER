import { object } from "zod";
import config from "../../config";
import { Student } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { StudentModel } from "../student/student.model";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";

const createStudentIntoDB = async (password: string, studentData: Student) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // if passsword is not given use default password

  userData.password = password || (config.default_pass as string);
  // set student role
  userData.role = "student";

// Year SemesterCOde $ digit Code
const geenerateStudentId=(payLoad:TAcademicSemester)=>{

}








  //set Auto generated password
  // userData.id = geenerateStudentId();

  // create a user
  const newUser = await User.create(userData);
  //   Create a student
  if (Object.keys(newUser).length) {
    // set id ,_id as  user
    studentData.id = newUser.id;
    studentData.user = newUser._id; //reference id

    const newstudent = await StudentModel.create(studentData);
    return newstudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
