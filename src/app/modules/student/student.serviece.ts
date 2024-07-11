import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { StudentModel } from "./student.model";
import { User } from "../user/user.model";
import mongoose from "mongoose";
import { Student } from "./student.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchableFields } from "./student.constant";

// const createStudentIntoDB = async(student:Student) => {

//     const result = await StudentModel.create(student)
//     return result;

// };

const geAlltStudentaFromDB = async (query: Record<string, unknown>) => {
  // const queryObject = { ...query }; //Copy

  // let searchTerm = "";
  // if (query.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchQuery = StudentModel.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: "i" },
  //   })),
  // });

  // // Filtering

  // excludeFields.forEach((el) => delete queryObject[el]);

  // const filterQuery = searchQuery
  //   .find(queryObject)
  //   .populate("admissonSemester")
  //   .populate({
  //     path: "academicDepartment",
  //     populate: {
  //       path: "academicFaculty",
  //     },
  //   });
  // let sort = "-createdAt";
  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // let page = 1;
  // let limit = 1;
  // let skip = 0;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }
  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  // // Field Limiting
  // let fields = "-__v";
  // if (query.fields) {
  //   fields = (query.fields as string).split(",").join(" ");
  //   console.log({ fields });
  // }

  // const fieldQuery = await limitQuery.select(fields);

  // return fieldQuery;

  const srudentQuery = new QueryBuilder(
    StudentModel.find()
      .populate("admissonSemester")
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      }),
    query
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await srudentQuery.modelQuery;

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
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const StudentServices = {
  geAlltStudentaFromDB,
  geSingletStudentaFromDB,
  deleteStudentFromDB,
  updateStudentaFromDB,
};
