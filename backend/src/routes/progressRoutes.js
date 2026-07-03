import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  completeLesson,
  submitQuiz,
  submitAssessment,
  getProgress,
} from '../controllers/progressController.js';

const router = express.Router();

router.use(protect);

router.post('/lesson-complete', completeLesson);
router.post('/quiz-submit', submitQuiz);
router.post('/assessment-submit', submitAssessment);
router.get('/:programId', getProgress);

export default router;
