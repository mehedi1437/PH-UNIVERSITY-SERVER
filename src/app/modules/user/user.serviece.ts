import config from "../../config";
import { Student } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { StudentModel } from "../student/student.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utils";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createStudentIntoDB = async (password: string, payLoad: Student) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // if passsword is not given use default password

  userData.password = password || (config.default_pass as string);
  // set student role
  userData.role = "student";

  // Find academic semester Info
  const admissonSemester = await AcademicSemester.findById(
    payLoad.admissonSemester
  );
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set Auto generated password
    userData.id = await generateStudentId(
      admissonSemester as TAcademicSemester
    );

    // create a user(Transation-1)
    const newUser = await User.create([userData], { session }); // Array
    //   Create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to create user");
    }
    // set id ,_id as  user
    payLoad.id = newUser[0].id;
    payLoad.user = newUser[0]._id; //reference id

    // create a new Student (Transation-2)
    const newstudent = await StudentModel.create([payLoad], { session });
    if (!newstudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to create Student");
    }

    await session.commitTransaction();
    await session.endSession();
    return newstudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    
    throw new Error('Failed to Create student');
  }
};

export const UserServices = {
  createStudentIntoDB,
};
