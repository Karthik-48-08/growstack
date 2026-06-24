import express from 'express';
import { createApplication, getMyApplications, updateApplicationStatus } from '../controllers/applicationController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createApplication);
router.route('/my').get(protect, getMyApplications);
router.route('/:id/status').put(protect, admin, updateApplicationStatus);

export default router;
