import { object } from "zod";
import config from "../../config";
import { Student } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { StudentModel } from "../student/student.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utils";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";

const createStudentIntoDB = async (password: string, payLoad: Student) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // if passsword is not given use default password

  userData.password = password || (config.default_pass as string);
  // set student role
  userData.role = "student";



// Find academic semester Info
const admissonSemester = await AcademicSemester.findById(payLoad.admissonSemester)

  //set Auto generated password
  userData.id = await generateStudentId(admissonSemester as TAcademicSemester);

  // create a user
  const newUser = await User.create(userData);
  //   Create a student
  if (Object.keys(newUser).length) {
    // set id ,_id as  user
    payLoad.id = newUser.id;
    payLoad.user = newUser._id; //reference id

    const newstudent = await StudentModel.create(payLoad);
    return newstudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
