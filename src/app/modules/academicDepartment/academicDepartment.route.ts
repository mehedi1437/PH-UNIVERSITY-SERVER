import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicDepartmentValidation } from "./academicDepartment.validation";
import { academicDepartmentIdControllers } from "./academicDepartment.controller";

const router = express.Router();
router.post(
  "/create-academic-department",
  validateRequest(
    academicDepartmentValidation.createAcademicDepartmentValidationSchema
  ),
  academicDepartmentIdControllers.createAcademicDepartment
);

router.get(
  "/:DepartmentId",
  academicDepartmentIdControllers.getSingleAcademicDepartment
);
router.patch(
  "/:DepartmentId",
  validateRequest(
    academicDepartmentValidation.updateAcademicDepartmentValidationSchema
  ),
  academicDepartmentIdControllers.updateAcademicDepartment
);

router.get("/", academicDepartmentIdControllers.getAllAcademicDepartment);
// router.get('/:id',StudentsControllers.getSinglStudent);

export const AcademicDepartmentRoutes = router;
