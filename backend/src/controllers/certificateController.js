import Document from '../models/Document.js';
import User from '../models/User.js';
import { Program } from '../models/Program.js';

// @desc    Verify a certificate by certificateId (public)
// @route   GET /api/certificates/verify/:certificateId
// @access  Public
export const verifyCertificate = async (req, res) => {
  try {
    const doc = await Document.findOne({
      certificateId: req.params.certificateId,
      type: 'Certificate',
    })
      .populate('userId', 'name email college degree')
      .populate('programId', 'name domain');

    if (!doc) {
      return res.status(404).json({ valid: false, message: 'Certificate not found' });
    }

    res.json({
      valid: true,
      certificateId: doc.certificateId,
      issuedAt: doc.issuedAt,
      recipient: {
        name: doc.userId?.name,
        college: doc.userId?.college,
        degree: doc.userId?.degree,
      },
      program: {
        name: doc.programId?.name,
        domain: doc.programId?.domain,
      },
    });
  } catch (error) {
    res.status(500).json({ valid: false, message: 'Server Error' });
  }
};

// @desc    Get all my certificates
// @route   GET /api/certificates/my
// @access  Private
export const getMyCertificates = async (req, res) => {
  try {
    const certs = await Document.find({ userId: req.user._id, type: 'Certificate' })
      .populate('programId', 'name domain');
    res.json(certs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
