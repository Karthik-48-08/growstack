import User from '../models/User.js';
import Application from '../models/Application.js';
import Submission from '../models/Submission.js';
import { Program } from '../models/Program.js';
import UserProgress from '../models/UserProgress.js';

// @desc    List all users (admin)
// @route   GET /api/admin/users
// @access  Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'student' })
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Pending applications (admin)
// @route   GET /api/admin/applications/pending
// @access  Admin
export const getPendingApplications = async (req, res) => {
  try {
    const apps = await Application.find({ status: 'Pending' })
      .populate('userId', 'name email college phone')
      .sort({ createdAt: 1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Approve / reject application
// @route   PUT /api/admin/applications/:id
// @access  Admin
export const reviewApplication = async (req, res) => {
  try {
    const { status, remarks } = req.body;
    if (!['Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ message: 'Application not found' });

    app.status = status;
    app.remarks = remarks || '';
    app.reviewedBy = req.user._id;
    app.reviewedAt = new Date();
    await app.save();

    // If accepted → create a Program enrollment (find/create program by domain)
    if (status === 'Accepted') {
      const program = await Program.findOne({ domain: app.domain, isActive: true });
      if (program) {
        const existing = await UserProgress.findOne({ userId: app.userId, programId: program._id });
        if (!existing) {
          await UserProgress.create({
            userId: app.userId,
            programId: program._id,
            currentDay: 1,
            unlockedDays: [1],
            dayLogs: [],
          });
        }
      }
    }

    // Notify user
    if (req.io) {
      req.io.to(`user_${app.userId}`).emit('application_updated', app);
    }

    res.json(app);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Admin stats overview
// @route   GET /api/admin/stats
// @access  Admin
export const getStats = async (req, res) => {
  try {
    const [students, pendingApps, pendingSubs, totalPrograms] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      Application.countDocuments({ status: 'Pending' }),
      Submission.countDocuments({ status: 'Pending' }),
      Program.countDocuments({ isActive: true }),
    ]);
    res.json({
      students,
      pendingApps,
      pendingSubs,
      totalPrograms,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
