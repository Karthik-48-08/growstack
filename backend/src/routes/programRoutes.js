import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  getPrograms,
  getProgramById,
  getCourseForProgram,
  getDayModules,
  getDayModuleById,
  getDayModuleByNumber,
  getEnrollment,
  getMyEnrollments,
} from '../controllers/programController.js';

const router = express.Router();

// Public
router.route('/').get(getPrograms);
router.route('/:id').get(getProgramById);
router.route('/:id/course').get(getCourseForProgram);

// Authenticated
router.use(protect);
router.route('/my-enrollments').get(getMyEnrollments);
router.route('/:programId/enrollment').get(getEnrollment);
router.route('/course/:courseId/days').get(getDayModules);
router.route('/course/:courseId/days/:dayNumber').get(getDayModuleByNumber);
router.route('/day/:dayId').get(getDayModuleById);

export default router;
