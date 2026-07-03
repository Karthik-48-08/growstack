import UserProgress from '../models/UserProgress.js';
import User from '../models/User.js';
import { Course } from '../models/Program.js';
import Submission from '../models/Submission.js';
import Document from '../models/Document.js';
import crypto from 'crypto';

/**
 * Find the user's UserProgress for the program that the given day belongs to.
 *
 * Why this exists:
 *   `DayModule.courseId` is a Course `_id`, but `UserProgress.programId` stores the
 *   Program `_id`. Earlier versions queried `programId: day.courseId` which was
 *   silently 404-ing every submission ("Not enrolled"). This helper resolves the
 *   real Program `_id` via the Course before looking up progress.
 */
export async function findProgressForDay(req, day) {
  const course = await Course.findById(day.courseId).select('programId').lean();
  if (!course) return { progress: null, programId: null };
  const progress = await UserProgress.findOne({
    userId: req.user._id,
    programId: course.programId,
  });
  return { progress, programId: course.programId };
}

/**
 * If a day's log shows lesson + quiz + assignment all done, mark the day
 * complete and unlock the next one. Updates the user's completedDaysCount
 * (drives badge unlock math) and issues the certificate if day 30 is done.
 *
 * Returns `{ justCompleted, unlockedNext }` so callers can include this info
 * in their response.
 */
export async function maybeCompleteDay(progress, day, dayLog) {
  const fullyDone =
    dayLog.lessonCompleted && dayLog.quizPassed && dayLog.assignmentSubmitted;
  if (fullyDone && !dayLog.isDayCompleted) {
    dayLog.isDayCompleted = true;
    dayLog.completedAt = new Date();

    // Unlock next day
    const next = day.dayNumber + 1;
    if (!progress.unlockedDays.includes(next)) {
      progress.unlockedDays.push(next);
    }
    progress.currentDay = Math.max(progress.currentDay, next);

    // Update user's completed-days count for badge math
    const completedDaysCount = progress.dayLogs.filter((l) => l.isDayCompleted).length;
    await User.updateOne(
      { _id: progress.userId },
      { $set: { completedDaysCount } }
    );

    // If day 30 completed → issue certificate
    if (day.dayNumber === 30) {
      await issueCertificate(progress.userId, day.courseId);
    }

    return { justCompleted: true, unlockedNext: true };
  }

  return {
    justCompleted: false,
    unlockedNext: progress.unlockedDays.includes(day.dayNumber + 1),
  };
}

/**
 * Issue a GrowStack certificate of completion for a (user, program) pair.
 * Idempotent — returns the existing cert if one is already on file.
 */
export async function issueCertificate(userId, programId) {
  const exists = await Document.findOne({ userId, programId, type: 'Certificate' });
  if (exists) return exists;

  const certificateId = 'GS-' + crypto.randomBytes(6).toString('hex').toUpperCase();
  const cert = await Document.create({
    userId,
    programId,
    type: 'Certificate',
    certificateId,
    pdfUrl: `/api/certificates/${certificateId}/download`,
    issuedAt: new Date(),
    startDate: new Date(),
    endDate: new Date(),
  });
  return cert;
}