
import { Types } from "mongoose";

export type Gurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type LocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type Student = {
  id: string;
  user:Types.ObjectId
  name: UserName;
  gender: "male" | "female"|"other";
  dateOfBirth?: Date;
  email: string;
  avatar?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  presentAddress: string;
  permanentAddress: string;
  gurdian: Gurdian;
  localGurdian: LocalGurdian;
  admissonSemester:Types.ObjectId;
  profileImg?: string;
 
};
