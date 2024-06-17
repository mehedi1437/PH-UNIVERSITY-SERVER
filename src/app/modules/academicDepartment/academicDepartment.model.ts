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

  academicDepartmentSchema.pre('save', async function(next){
    const isDepartmentExits = await AcademicDepartment.findOne({name:this.name});
    if(isDepartmentExits){
      throw new Error('This Department is already exist')
    }
    next()
  });

  academicDepartmentSchema.pre('findOneAndUpdate', async function(next){
    const query = this.getQuery();
    const isDepartmentExits = await AcademicDepartment.findOne(query);
    if(!isDepartmentExits){
      throw new Error('This department Does not exists!')
    }
    next()
  })
  
export const AcademicDepartment = model<TAcademicDepartment>("AcademicDepartment", academicDepartmentSchema);