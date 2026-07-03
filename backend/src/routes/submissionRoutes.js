import express from 'express';
import { protect, admin } from '../middlewares/authMiddleware.js';
import {
  submitAssignment,
  getMySubmissions,
  getPendingSubmissions,
  reviewSubmission,
} from '../controllers/submissionController.js';

const router = express.Router();

router.use(protect);

router.post('/assignment', submitAssignment);
router.get('/my', getMySubmissions);

router.get('/pending', admin, getPendingSubmissions);
router.put('/:id/review', admin, reviewSubmission);

export default router;
