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
    dayNumber: Number,
    lessonCompleted: { type: Boolean, default: false },
    quizScore: { type: Number, default: 0 },
    assignmentSubmitted: { type: Boolean, default: false },
    isDayCompleted: { type: Boolean, default: false },
  }]
}, {
  timestamps: true,
});

userProgressSchema.index({ userId: 1, programId: 1 }, { unique: true });

const UserProgress = mongoose.model('UserProgress', userProgressSchema);
export default UserProgress;
