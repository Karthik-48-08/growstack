import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  verifyCertificate,
  getMyCertificates,
} from '../controllers/certificateController.js';

const router = express.Router();

// Public — anyone can verify a certificate by its ID
router.get('/verify/:certificateId', verifyCertificate);

// Authenticated
router.get('/my', protect, getMyCertificates);

export default router;
