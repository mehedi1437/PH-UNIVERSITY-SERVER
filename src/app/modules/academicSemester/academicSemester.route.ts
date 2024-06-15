import express from 'express'
import { academicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicsemesterValidation } from './academicSemester.valiadtion';

const router = express.Router();
router.post('/create-academic-semester', validateRequest(AcademicsemesterValidation.createAcademicSemesterValidationSchema),academicSemesterControllers.createAcademicSemester)


router.get(
    '/:semesterId',
    academicSemesterControllers.getSingleAcademicSemester,
  );
router.get('/', academicSemesterControllers.getAllAcademicSemesters);
// router.get('/:id',StudentsControllers.getSinglStudent);

export const AcademicSemesterRoutes = router