import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    enum: ['Python', 'Java', 'Web', 'AI'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  capacity: {
    type: Number,
    default: 100,
  }
}, {
  timestamps: true,
});

const Program = mongoose.model('Program', programSchema);

const courseSchema = new mongoose.Schema({
  programId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program',
    required: true,
  },
  totalDays: {
    type: Number,
    default: 30,
  },
  description: String,
}, {
  timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);

const dayModuleSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  dayNumber: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isLocked: {
    type: Boolean,
    default: true, // Will be false for day 1
  },
  lesson: {
    videoUrl: String,
    writtenNotes: String,
    codeExamples: String,
    downloads: [String],
  },
  quiz: {
    timeLimit: Number,
    passingPercentage: { type: Number, default: 70 },
    questions: [{
      question: String,
      options: [String],
      correctAnswer: String,
    }]
  },
  assessment: {
    timeLimit: Number,
    isFullScreenEnforced: { type: Boolean, default: true },
    questions: [String]
  },
  assignment: {
    overview: String,
    objectives: [String],
    technicalRequirements: [String],
    deliverables: [String],
    resources: [String],
  }
}, {
  timestamps: true,
});

dayModuleSchema.index({ courseId: 1, dayNumber: 1 });

const DayModule = mongoose.model('DayModule', dayModuleSchema);

export { Program, Course, DayModule };
