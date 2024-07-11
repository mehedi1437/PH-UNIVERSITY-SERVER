import { Schema, model } from "mongoose";
import { Gurdian, LocalGurdian, Student, UserName } from "./student.interface";


const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
    trim:true,
    maxlength:[20,'first name can not be more than 20']
  },
  middleName: {
    type: String,
    trim:true,
  },
  lastName: {
    type: String,
    required: true,
    trim:true,
  },
});

const gurdianSchema = new Schema<Gurdian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGurdianSchema = new Schema<LocalGurdian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String ,required:true, unique:true },
  user:{type:Schema.Types.ObjectId,required:[true,'user id is required'],unique:true,ref:"User" },
  name:{type: userNameSchema,required:true},
  gender: { type: String, enum: {values:["male", "female", "other"],message:'gender is required'}, required: [true,'FGernder lagbei lagbe'] },
  dateOfBirth: { type: Date },
  email: { type: String, required: true,unique:true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: { type: String, enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  gurdian: {type:gurdianSchema,required:true},
  localGurdian: {type:localGurdianSchema,required:true},
  admissonSemester:{type:Schema.Types.ObjectId,required:[true,'Admisson Semester required'],ref:"AcademicSemester"},
  profileImg: { type: String, required: true },
  isDeleted:{type:Boolean,default:false},
  academicDepartment:{type:Schema.Types.ObjectId,required:[true,'Academic Department required'],ref:"AcademicDepartment"}
});

export const StudentModel = model<Student>('Student', studentSchema);
