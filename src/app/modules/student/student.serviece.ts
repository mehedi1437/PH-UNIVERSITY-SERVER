import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { StudentModel } from "./student.model";
import { User } from "../user/user.model";
import mongoose from "mongoose";
import { Student } from "./student.interface";


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
  const result = await StudentModel.findOne({ id })
    .populate("admissonSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};
const updateStudentaFromDB = async (id: string, payload: Partial<Student>) => {
  const { name, gurdian, localGurdian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (gurdian && Object.keys(gurdian).length) {
    for (const [key, value] of Object.entries(gurdian)) {
      modifiedUpdatedData[`gurdian.${key}`] = value;
    }
  }
  if (localGurdian && Object.keys(localGurdian).length) {
    for (const [key, value] of Object.entries(localGurdian)) {
      modifiedUpdatedData[`localGurdian.${key}`] = value;
    }
  }
  // console.log(modifiedUpdatedData);

  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    { new: true, runValidators: true }
  );

  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to delete student");
  }
};

export const StudentServices = {
  geAlltStudentaFromDB,
  geSingletStudentaFromDB,
  deleteStudentFromDB,
  updateStudentaFromDB,
};
