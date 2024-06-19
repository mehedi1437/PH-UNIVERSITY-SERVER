import express from 'express'
import { StudentsControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';

const router = express.Router();

router.get('/',StudentsControllers.getAllStudents);
router.get('/:studentId',StudentsControllers.getSinglStudent);
router.patch('/:studentId', validateRequest(studentValidations.updateStudentValidationSchema), StudentsControllers.updateStudent);
router.delete('/:studentId', StudentsControllers.deleteStudent);
export const StudentsRoutes = router