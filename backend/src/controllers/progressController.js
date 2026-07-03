import UserProgress from '../models/UserProgress.js';
import User from '../models/User.js';
import { DayModule, Course } from '../models/Program.js';
import Submission from '../models/Submission.js';
import Document from '../models/Document.js';
import crypto from 'crypto';
import {
  findProgressForDay,
  maybeCompleteDay,
} from './_progressHelpers.js';

// XP rewards — keep in sync with frontend
const XP = {
  LESSON_READ: 10,
  QUIZ_PASS_BONUS: 20,
  ASSESSMENT_PASS_BONUS: 30,
  ASSIGNMENT_APPROVED: 50,
  WEEKLY_PROJECT_BONUS: 100,
  DAILY_STREAK_BONUS: 20,
};

const BADGES = {
  DAY_7: { id: 'foundation_builder', name: 'Foundation Builder', emoji: '🧱', minDays: 7 },
  DAY_14: { id: 'oop_architect', name: 'OOP Architect', emoji: '🏛️', minDays: 14 },
  DAY_21: { id: 'data_wrangler', name: 'Data Wrangler', emoji: '📊', minDays: 21 },
  DAY_28: { id: 'oss_contributor', name: 'Open Source Contributor', emoji: '📦', minDays: 28 },
  DAY_30: { id: 'python_certified', name: 'Python Certified', emoji: '🐍', minDays: 30 },
};

const computeLevel = (xp) => Math.floor(xp / 500) + 1;

const computeStreak = (lastActiveDate, currentStreak) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (!lastActiveDate) return { currentStreak: 1, isNewDay: true };

  const last = new Date(lastActiveDate);
  const lastDay = new Date(last.getFullYear(), last.getMonth(), last.getDate());
  const diffDays = Math.floor((today - lastDay) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return { currentStreak, isNewDay: false };
  if (diffDays === 1) return { currentStreak: currentStreak + 1, isNewDay: true };
  return { currentStreak: 1, isNewDay: true }; // streak broken
};

// Award XP + update level + check badges atomically
const awardProgress = async (user, additionalXp) => {
  user.xp = (user.xp || 0) + additionalXp;
  user.level = computeLevel(user.xp);

  // Badge unlock check (cumulative — never removed)
  const completedDays = user.completedDaysCount || 0;
  for (const [key, badge] of Object.entries(BADGES)) {
    if (completedDays >= badge.minDays && !user.badges.includes(badge.id)) {
      user.badges.push(badge.id);
    }
  }
  await user.save();
  return { newXp: user.xp, newLevel: user.level, badges: user.badges };
};

// @desc    Mark lesson as read for a given day
// @route   POST /api/progress/lesson-complete
// @access  Private
export const completeLesson = async (req, res) => {
  try {
    const { dayModuleId } = req.body;
    const day = await DayModule.findById(dayModuleId);
    if (!day) return res.status(404).json({ message: 'Day not found' });

    const { progress } = await findProgressForDay(req, day);
    if (!progress) return res.status(404).json({ message: 'Not enrolled' });

    let dayLog = progress.dayLogs.find((l) => l.dayNumber === day.dayNumber);
    if (!dayLog) {
      // Push a new subdoc and re-fetch the actual reference. Without this,
      // `dayLog` would still point at the plain object literal and any
      // mutations to it would not be tracked by Mongoose's change detection.
      progress.dayLogs.push({ dayNumber: day.dayNumber });
      dayLog = progress.dayLogs[progress.dayLogs.length - 1];
    }
    if (!dayLog.lessonCompleted) {
      dayLog.lessonCompleted = true;
      dayLog.lessonCompletedAt = new Date();

      const awarded = await awardProgress(req.user, XP.LESSON_READ);

      // Streak
      const lastActive = req.user.lastActiveDate;
      const { currentStreak, isNewDay } = computeStreak(lastActive, req.user.currentStreak || 0);
      req.user.currentStreak = currentStreak;
      if (currentStreak > (req.user.longestStreak || 0)) {
        req.user.longestStreak = currentStreak;
      }
      req.user.lastActiveDate = new Date();
      await req.user.save();

      if (isNewDay) {
        await awardProgress(req.user, XP.DAILY_STREAK_BONUS);
      }

      // Run day-completion check (only fires if lesson+quiz+assignment all done)
      const completion = await maybeCompleteDay(progress, day, dayLog);

      await progress.save();

      if (req.io) {
        req.io.to(`user_${req.user._id}`).emit('progress_updated', {
          newXp: req.user.xp,
          newLevel: req.user.level,
          currentStreak: req.user.currentStreak,
          badges: req.user.badges,
        });
      }

      res.json({ message: 'Lesson marked complete', dayLog, awarded });
    } else {
      res.json({ message: 'Lesson already complete', dayLog });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Submit quiz answers, get graded result
// @route   POST /api/progress/quiz-submit
// @access  Private
export const submitQuiz = async (req, res) => {
  try {
    const { dayModuleId, answers } = req.body;
    // answers: [{ questionIndex: 0, selected: "Option A" }, ...]

    const day = await DayModule.findById(dayModuleId);
    if (!day) return res.status(404).json({ message: 'Day not found' });

    const questions = day.quiz.questions || [];
    let correct = 0;
    const breakdown = questions.map((q, idx) => {
      const submitted = answers.find((a) => a.questionIndex === idx);
      const isCorrect = submitted && submitted.selected === q.correctAnswer;
      if (isCorrect) correct++;
      return {
        questionIndex: idx,
        question: q.question,
        selected: submitted ? submitted.selected : null,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation || '',
      };
    });

    const score = Math.round((correct / questions.length) * 100);
    const passed = score >= (day.quiz.passingPercentage || 70);

    // Update progress
    const { progress } = await findProgressForDay(req, day);
    if (!progress) return res.status(404).json({ message: 'Not enrolled' });

    let dayLog = progress.dayLogs.find((l) => l.dayNumber === day.dayNumber);
    if (!dayLog) {
      // Re-fetch after push so `dayLog` is the live Mongoose subdocument.
      progress.dayLogs.push({ dayNumber: day.dayNumber });
      dayLog = progress.dayLogs[progress.dayLogs.length - 1];
    }
    const previousScore = dayLog.quizScore || 0;
    dayLog.quizScore = Math.max(previousScore, score);
    dayLog.quizPassed = dayLog.quizPassed || passed;

    let awarded = null;
    if (passed && !dayLog.quizXpAwarded) {
      awarded = await awardProgress(req.user, XP.QUIZ_PASS_BONUS);
      dayLog.quizXpAwarded = true;
    }

    // Try to unlock next day if all three components are done
    await maybeCompleteDay(progress, day, dayLog);

    await progress.save();

    res.json({
      score,
      passed,
      passingPercentage: day.quiz.passingPercentage,
      breakdown,
      awarded,
      unlockedNext: progress.unlockedDays.includes(day.dayNumber + 1),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Submit assessment (free-form answer text, manually graded later or auto-evaluated)
// @route   POST /api/progress/assessment-submit
// @access  Private
export const submitAssessment = async (req, res) => {
  try {
    const { dayModuleId, responses } = req.body;
    // responses: [{ questionIndex: 0, answer: "code or text" }, ...]

    const day = await DayModule.findById(dayModuleId);
    if (!day) return res.status(404).json({ message: 'Day not found' });

    // For simplicity, auto-evaluate based on expected output substring match
    const questions = day.assessment.questions || [];
    let totalPoints = 0;
    let earnedPoints = 0;
    const breakdown = questions.map((q, idx) => {
      totalPoints += q.points || 10;
      const resp = responses.find((r) => r.questionIndex === idx);
      const answer = resp ? resp.answer : '';
      // Simple heuristic — if expectedOutput appears in the answer, full points
      const matched =
        q.expectedOutput && answer.toLowerCase().includes(q.expectedOutput.toLowerCase());
      if (matched) earnedPoints += q.points || 10;
      return {
        questionIndex: idx,
        prompt: q.prompt,
        answer,
        matched,
        points: q.points || 10,
      };
    });

    const score = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    const passed = score >= 60;

    const { progress } = await findProgressForDay(req, day);
    if (!progress) return res.status(404).json({ message: 'Not enrolled' });

    let dayLog = progress.dayLogs.find((l) => l.dayNumber === day.dayNumber);
    if (!dayLog) {
      progress.dayLogs.push({ dayNumber: day.dayNumber });
      dayLog = progress.dayLogs[progress.dayLogs.length - 1];
    }
    dayLog.assessmentScore = Math.max(dayLog.assessmentScore || 0, score);
    if (passed && !dayLog.assessmentXpAwarded) {
      await awardProgress(req.user, XP.ASSESSMENT_PASS_BONUS);
      dayLog.assessmentXpAwarded = true;
    }

    await maybeCompleteDay(progress, day, dayLog);
    await progress.save();

    res.json({
      score,
      passed,
      breakdown,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get user's progress for a program
// @route   GET /api/progress/:programId
// @access  Private
export const getProgress = async (req, res) => {
  try {
    const progress = await UserProgress.findOne({
      userId: req.user._id,
      programId: req.params.programId,
    });
    if (!progress) return res.status(404).json({ message: 'No progress found' });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// (helpers — findProgressForDay, maybeCompleteDay, issueCertificate — are imported from _progressHelpers.js)
