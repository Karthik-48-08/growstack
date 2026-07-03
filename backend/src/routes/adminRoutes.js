import express from 'express';
import { protect, admin } from '../middlewares/authMiddleware.js';
import {
  getAllUsers,
  getPendingApplications,
  reviewApplication,
  getStats,
} from '../controllers/adminController.js';

const router = express.Router();

router.use(protect);
router.use(admin);

router.get('/users', getAllUsers);
router.get('/applications/pending', getPendingApplications);
router.put('/applications/:id', reviewApplication);
router.get('/stats', getStats);

export default router;
