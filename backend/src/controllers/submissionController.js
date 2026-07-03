import Submission from '../models/Submission.js';
import UserProgress from '../models/UserProgress.js';
import User from '../models/User.js';
import { DayModule } from '../models/Program.js';
import { findProgressForDay, maybeCompleteDay } from './_progressHelpers.js';

// @desc    Submit assignment for a day
// @route   POST /api/submissions/assignment
// @access  Private
export const submitAssignment = async (req, res) => {
  try {
    const { dayModuleId, githubUrl, linkedinUrl, zipUrl, notes } = req.body;

    if (!githubUrl && !linkedinUrl && !zipUrl) {
      return res.status(400).json({ message: 'At least one URL is required' });
    }

    const day = await DayModule.findById(dayModuleId);
    if (!day) return res.status(404).json({ message: 'Day not found' });

    // Upsert: one submission per user per day
    let submission = await Submission.findOne({
      userId: req.user._id,
      dayModuleId,
      type: 'Assignment',
    });

    if (submission) {
      submission.githubUrl = githubUrl || submission.githubUrl;
      submission.linkedinUrl = linkedinUrl || submission.linkedinUrl;
      submission.zipUrl = zipUrl || submission.zipUrl;
      submission.notes = notes || submission.notes;
      submission.status = 'Pending';
      submission.submittedAt = new Date();
      await submission.save();
    } else {
      submission = await Submission.create({
        userId: req.user._id,
        dayModuleId,
        type: 'Assignment',
        githubUrl,
        linkedinUrl,
        zipUrl,
        notes,
      });
    }

    // Mark assignment submitted on the progress log and run the day-completion
    // check (so submitting the assignment can be the action that unlocks the
    // next day — even if lesson and quiz were done earlier).
    const { progress } = await findProgressForDay(req, day);
    if (progress) {
      let dayLog = progress.dayLogs.find((l) => l.dayNumber === day.dayNumber);
      if (!dayLog) {
        // Re-fetch after push so `dayLog` is the live Mongoose subdocument.
        progress.dayLogs.push({ dayNumber: day.dayNumber });
        dayLog = progress.dayLogs[progress.dayLogs.length - 1];
      }
      dayLog.assignmentSubmitted = true;
      dayLog.assignmentSubmittedAt = new Date();

      await maybeCompleteDay(progress, day, dayLog);
      await progress.save();
    }

    // Notify admins
    if (req.io) {
      req.io.emit('submission_created', submission);
    }

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get my submissions
// @route   GET /api/submissions/my
// @access  Private
export const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.user._id })
      .populate('dayModuleId', 'dayNumber title')
      .sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all pending submissions (admin)
// @route   GET /api/submissions/pending
// @access  Admin
export const getPendingSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ status: 'Pending' })
      .populate('userId', 'name email studentId college')
      .populate('dayModuleId', 'dayNumber title')
      .sort({ createdAt: 1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Review a submission (approve / reject)
// @route   PUT /api/submissions/:id/review
// @access  Admin
export const reviewSubmission = async (req, res) => {
  try {
    const { status, remarks, score } = req.body;
    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const submission = await Submission.findById(req.params.id)
      .populate('userId')
      .populate('dayModuleId');

    if (!submission) return res.status(404).json({ message: 'Submission not found' });

    submission.status = status;
    submission.remarks = remarks || '';
    submission.score = score;
    submission.reviewedBy = req.user._id;
    submission.reviewedAt = new Date();
    await submission.save();

    // If approved, award XP
    if (status === 'Approved') {
      const user = await User.findById(submission.userId._id);
      const XP_REWARD = submission.dayModuleId.assignment.xpReward || 50;
      user.xp = (user.xp || 0) + XP_REWARD;
      user.level = Math.floor(user.xp / 500) + 1;
      await user.save();

      // Notify user via socket
      if (req.io) {
        req.io.to(`user_${submission.userId._id}`).emit('submission_reviewed', {
          dayNumber: submission.dayModuleId.dayNumber,
          status,
          remarks,
          xpEarned: XP_REWARD,
        });
      }
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
