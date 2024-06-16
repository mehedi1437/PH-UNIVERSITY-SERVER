import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
    {
      name: { type: String, requried: true,unique:true },
      academicFaculty: { type: Schema.Types.ObjectId, requried: true,unique:true ,ref:'AcademicFaculty'},
     
    },
    {
      timestamps: true,
    }
  );

  
export const AcademicDepartment = model<TAcademicDepartment>("AcademicDepartment", academicDepartmentSchema);