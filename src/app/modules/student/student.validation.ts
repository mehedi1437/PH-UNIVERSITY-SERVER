import { z } from "zod";

// Define the UserName schema
const createuserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "first name can not be more than 20")
    .nonempty("First name is required"),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().nonempty("Last name is required"),
});
// Define the UserName schema
const updateuserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "first name can not be more than 20")
    .nonempty("First name is required").optional(),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().nonempty("Last name is required").optional(),
});

// Define the Gurdian schema
const creategurdianValidationSchema = z.object({
  fatherName: z.string().nonempty("Father's name is required"),
  fatherOccupation: z.string().nonempty("Father's occupation is required"),
  fatherContactNo: z.string().nonempty("Father's contact number is required"),
  motherName: z.string().nonempty("Mother's name is required"),
  motherOccupation: z.string().nonempty("Mother's occupation is required"),
  motherContactNo: z.string().nonempty("Mother's contact number is required"),
});
// Define the Gurdian schema
const updategurdianValidationSchema = z.object({
  fatherName: z.string().nonempty("Father's name is required").optional(),
  fatherOccupation: z.string().nonempty("Father's occupation is required").optional(),
  fatherContactNo: z.string().nonempty("Father's contact number is required").optional(),
  motherName: z.string().nonempty("Mother's name is required").optional(),
  motherOccupation: z.string().nonempty("Mother's occupation is required").optional(),
  motherContactNo: z.string().nonempty("Mother's contact number is required").optional(),
});

// Define the LocalGurdian schema
const createlocalGurdianValidationSchema = z.object({
  name: z.string().nonempty("Local guardian's name is required"),
  occupation: z.string().nonempty("Local guardian's occupation is required"),
  contactNo: z.string().nonempty("Local guardian's contact number is required"),
  address: z.string().nonempty("Local guardian's address is required"),
});
// Define the LocalGurdian schema
const updatelocalGurdianValidationSchema = z.object({
  name: z.string().nonempty("Local guardian's name is required").optional(),
  occupation: z.string().nonempty("Local guardian's occupation is required").optional(),
  contactNo: z.string().nonempty("Local guardian's contact number is required").optional(),
  address: z.string().nonempty("Local guardian's address is required").optional(),
});

// Define the Student schema
const createStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: createuserNameValidationSchema,
      gender: z.enum(["male", "female", "other"], {
        required_error: "Gender is required",
        invalid_type_error:
          "Gender must be one of 'male', 'female', or 'other'",
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email("Invalid email address")
        .nonempty("Email is required"),
      contactNo: z.string().nonempty("Contact number is required"),
      emergencyContactNo: z
        .string()
        .nonempty("Emergency contact number is required"),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])
        .optional(),
      presentAddress: z.string().nonempty("Present address is required"),
      permanentAddress: z.string().nonempty("Permanent address is required"),
      gurdian: creategurdianValidationSchema,
      localGurdian: createlocalGurdianValidationSchema,
      admissonSemester: z.string(),
      profileImg: z.string().nonempty("Profile image is required"),
      academicDepartment:z.string(),
    }),
  }),
});
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateuserNameValidationSchema.optional(),
      gender: z.enum(["male", "female", "other"], {
        required_error: "Gender is required",
        invalid_type_error:
          "Gender must be one of 'male', 'female', or 'other'",
      }).optional(),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email("Invalid email address")
        .nonempty("Email is required").optional(),
      contactNo: z.string().nonempty("Contact number is required").optional(),
      emergencyContactNo: z
        .string()
        .nonempty("Emergency contact number is required").optional(),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])
        .optional(),
      presentAddress: z.string().nonempty("Present address is required").optional(),
      permanentAddress: z.string().nonempty("Permanent address is required").optional(),
      gurdian: updategurdianValidationSchema.optional(),
      localGurdian: updatelocalGurdianValidationSchema.optional(),
      admissonSemester: z.string().optional(),
      profileImg: z.string().nonempty("Profile image is required").optional(),
      academicDepartment:z.string().optional(),
    }),
  }),
});

export const studentValidations = {
   createStudentValidationSchema,
   updateStudentValidationSchema
};
