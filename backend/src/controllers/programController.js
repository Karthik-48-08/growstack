import { Program, Course, DayModule } from '../models/Program.js';
import Application from '../models/Application.js';
import UserProgress from '../models/UserProgress.js';

// ─── Programs ──────────────────────────────────────────────────────────────

// @desc    Get all programs
// @route   GET /api/programs
// @access  Public
export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find({ isActive: true }).sort({ domain: 1 });
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get program by ID
// @route   GET /api/programs/:id
// @access  Public
export const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (program) {
      res.json(program);
    } else {
      res.status(404).json({ message: 'Program not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get the course (track) for a program — creates one if missing
// @route   GET /api/programs/:id/course
// @access  Public
export const getCourseForProgram = async (req, res) => {
  try {
    let course = await Course.findOne({ programId: req.params.id });
    if (!course) {
      course = await Course.create({ programId: req.params.id, totalDays: 30 });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// ─── Day Modules ───────────────────────────────────────────────────────────

// @desc    Get all day modules for a course (overview list)
// @route   GET /api/programs/course/:courseId/days
// @access  Private (students enrolled + admins)
export const getDayModules = async (req, res) => {
  try {
    const { courseId } = req.params;
    const days = await DayModule.find({ courseId })
      .select('dayNumber title subtitle estimatedMinutes isLocked')
      .sort({ dayNumber: 1 });
    res.json(days);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single day module (full content)
// @route   GET /api/programs/day/:dayId
// @access  Private
export const getDayModuleById = async (req, res) => {
  try {
    const day = await DayModule.findById(req.params.dayId);
    if (!day) return res.status(404).json({ message: 'Day not found' });

    // DayModule.courseId is a Course _id, but UserProgress.programId stores the
    // Program _id. Resolve the real program before checking the user's unlock state.
    const course = await Course.findById(day.courseId).select('programId').lean();
    const progress = course
      ? await UserProgress.findOne({
          userId: req.user._id,
          programId: course.programId,
        })
      : null;

    const isAdmin = req.user.role === 'admin';
    const isUnlocked = progress && progress.unlockedDays.includes(day.dayNumber);

    if (!isAdmin && !isUnlocked) {
      return res.status(403).json({ message: 'This day is locked. Complete the previous day first.' });
    }

    res.json(day);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a day module by course + dayNumber
// @route   GET /api/programs/course/:courseId/days/:dayNumber
// @access  Private
export const getDayModuleByNumber = async (req, res) => {
  try {
    const { courseId, dayNumber } = req.params;
    const day = await DayModule.findOne({ courseId, dayNumber: Number(dayNumber) });
    if (!day) return res.status(404).json({ message: 'Day not found' });

    // Resolve program from the course before checking progress.
    const course = await Course.findById(courseId).select('programId').lean();
    const progress = course
      ? await UserProgress.findOne({
          userId: req.user._id,
          programId: course.programId,
        })
      : null;

    const isAdmin = req.user.role === 'admin';
    const isUnlocked = progress && progress.unlockedDays.includes(day.dayNumber);

    if (!isAdmin && !isUnlocked) {
      return res.status(403).json({ message: 'This day is locked.' });
    }

    res.json(day);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// ─── Student dashboard data ────────────────────────────────────────────────

// @desc    Get student's full enrollment state for a program
//          (program, course, all days with lock state, progress)
// @route   GET /api/programs/:programId/enrollment
// @access  Private
export const getEnrollment = async (req, res) => {
  try {
    const { programId } = req.params;
    const program = await Program.findById(programId);
    if (!program) return res.status(404).json({ message: 'Program not found' });

    const course = await Course.findOne({ programId });
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const days = await DayModule.find({ courseId: course._id })
      .select('dayNumber title subtitle estimatedMinutes')
      .sort({ dayNumber: 1 });

    let progress = await UserProgress.findOne({
      userId: req.user._id,
      programId,
    });

    if (!progress) {
      // Auto-enroll: create a fresh progress record with only Day 1 unlocked
      progress = await UserProgress.create({
        userId: req.user._id,
        programId,
        currentDay: 1,
        unlockedDays: [1],
        dayLogs: [],
      });
    }

    // Hydrate: mark each day's lock state
    const daysWithLock = days.map((d) => ({
      ...d.toObject(),
      isLocked: !progress.unlockedDays.includes(d.dayNumber),
      dayLog: progress.dayLogs.find((l) => l.dayNumber === d.dayNumber) || null,
    }));

    res.json({
      program,
      course,
      currentDay: progress.currentDay,
      unlockedDays: progress.unlockedDays,
      xp: req.user.xp,
      level: req.user.level,
      badges: req.user.badges,
      currentStreak: req.user.currentStreak,
      longestStreak: req.user.longestStreak,
      days: daysWithLock,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all enrollments for current user
// @route   GET /api/programs/my-enrollments
// @access  Private
export const getMyEnrollments = async (req, res) => {
  try {
    const progresses = await UserProgress.find({ userId: req.user._id }).populate('programId');
    const acceptedApplications = await Application.find({
      userId: req.user._id,
      status: 'Accepted',
    });

    res.json({
      enrollments: progresses,
      acceptedApplications,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
