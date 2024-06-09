import express, { NextFunction, Request, Response } from "express";
import { userControllers } from "./user.controller";
import { AnyZodObject } from "zod";
import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();


router.post(
  "/create-student",
  validateRequest(studentValidations.createStudentValidationSchema),
  userControllers.createStudent
);

export const UserRoutes = router;
