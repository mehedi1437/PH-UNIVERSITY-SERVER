import { z } from "zod";

// Define the UserName schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "first name can not be more than 20")
    .nonempty("First name is required"),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().nonempty("Last name is required"),
});

// Define the Gurdian schema
const gurdianValidationSchema = z.object({
  fatherName: z.string().nonempty("Father's name is required"),
  fatherOccupation: z.string().nonempty("Father's occupation is required"),
  fatherContactNo: z.string().nonempty("Father's contact number is required"),
  motherName: z.string().nonempty("Mother's name is required"),
  motherOccupation: z.string().nonempty("Mother's occupation is required"),
  motherContactNo: z.string().nonempty("Mother's contact number is required"),
});

// Define the LocalGurdian schema
const localGurdianValidationSchema = z.object({
  name: z.string().nonempty("Local guardian's name is required"),
  occupation: z.string().nonempty("Local guardian's occupation is required"),
  contactNo: z.string().nonempty("Local guardian's contact number is required"),
  address: z.string().nonempty("Local guardian's address is required"),
});

// Define the Student schema
const studentValidationSchema = z.object({
  id: z.string().nonempty("ID is required"),
  name: userNameValidationSchema,
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
    invalid_type_error: "Gender must be one of 'male', 'female', or 'other'",
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
  gurdian: gurdianValidationSchema,
  localGurdian: localGurdianValidationSchema,
  profileImg: z.string().nonempty("Profile image is required"),
  isActive: z.enum(["active", "block"]).default("active"),
});

export default studentValidationSchema;
