import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicFacultyValidation } from "./academicFaculty.validation";
import { academicFaclutyControllers } from "./academicFaculty.controller";

const router = express.Router();
router.post(
  "/create-academic-faculty",
  validateRequest(
    academicFacultyValidation.createAcademicFacultyValidationSchema
  ),
  academicFaclutyControllers.createAcademicFacluty
);

router.get(
  "/:facultyId",
  academicFaclutyControllers.getSingleAcademicFacluty
);
router.patch(
  "/:facultyId",
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  academicFaclutyControllers.updateAcademicFacluty
);

router.get("/", academicFaclutyControllers.getAllAcademicFacluty);
// router.get('/:id',StudentsControllers.getSinglStudent);

export const AcademicFacultyRoutes = router;
