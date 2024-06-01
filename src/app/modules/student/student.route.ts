import express from 'express'
import { StudentsControllers } from './student.controller';

const router = express.Router();

router.get('/',StudentsControllers.getAllStudents);
router.get('/:id',StudentsControllers.getSinglStudent);

export const StudentsRoutes = router