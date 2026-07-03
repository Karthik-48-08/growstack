import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  programId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program',
    required: true,
  },
  currentDay: {
    type: Number,
    default: 1,
  },
  unlockedDays: [{
    type: Number,
  }],
  dayLogs: [{
    dayNumber: { type: Number, required: true },

    // Lesson
    lessonCompleted: { type: Boolean, default: false },
    lessonCompletedAt: { type: Date },

    // Quiz (multiple-choice)
    quizPassed: { type: Boolean, default: false },
    quizScore: { type: Number, default: 0 },
    quizXpAwarded: { type: Boolean, default: false },

    // Coding assessment (timed fullscreen)
    assessmentScore: { type: Number, default: 0 },
    assessmentXpAwarded: { type: Boolean, default: false },

    // Assignment (submitted for admin review)
    assignmentSubmitted: { type: Boolean, default: false },
    assignmentSubmittedAt: { type: Date },

    // Day as a whole
    isDayCompleted: { type: Boolean, default: false },
    completedAt: { type: Date },
  }],
}, {
  timestamps: true,
});

userProgressSchema.index({ userId: 1, programId: 1 }, { unique: true });

const UserProgress = mongoose.model('UserProgress', userProgressSchema);
export default UserProgress;