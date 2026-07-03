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
  description: {
    type: String,
    default: '',
  },
  durationDays: {
    type: Number,
    default: 30,
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
  },
  thumbnail: {
    type: String,
    default: '',
  },
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

/**
 * Reading Section — a piece of the day's lesson
 * Each day has multiple reading sections (intro, theory, examples, summary)
 * so the student can read like a GeeksforGeeks article
 */
const readingSectionSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  // Markdown content — supports code blocks (```python ... ```),
  // tables, lists, blockquotes, inline HTML for diagrams (Mermaid SVG),
  // and inline ```mermaid blocks for flow diagrams.
  body: { type: String, required: true },
  // Optional Mermaid diagram source rendered alongside the body
  diagram: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { _id: false });

const codeExampleSchema = new mongoose.Schema({
  title: { type: String, default: 'Example' },
  language: { type: String, default: 'python' },
  code: { type: String, required: true },
  // Expected output (optional)
  output: { type: String, default: '' },
  explanation: { type: String, default: '' },
}, { _id: false });

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
  subtitle: {
    type: String,
    default: '',
  },
  estimatedMinutes: {
    type: Number,
    default: 90,
  },
  // Locked state is per-user; this is just the static default
  isLocked: {
    type: Boolean,
    default: true,
  },

  // ─── Reading-first lesson (GeeksforGeeks / W3Schools style) ───────────────
  lesson: {
    // Top-level introduction shown above sections
    introduction: { type: String, default: '' },
    // Multi-section reading content (intro → theory → examples → summary)
    readingSections: [readingSectionSchema],
    // Standalone, runnable code examples the student can copy
    codeExamples: [codeExampleSchema],
    // Quick summary box at the end of the reading
    keyTakeaways: [String],
    // External download links (PDF cheatsheet, dataset, etc.)
    downloads: [String],
  },

  // ─── MCQ Quiz ─────────────────────────────────────────────────────────────
  quiz: {
    timeLimit: { type: Number, default: 10 }, // minutes
    passingPercentage: { type: Number, default: 70 },
    questions: [{
      question: { type: String, required: true },
      options: { type: [String], required: true },
      correctAnswer: { type: String, required: true },
      explanation: { type: String, default: '' },
    }],
  },

  // ─── Fullscreen timed assessment (coding prompts, no MCQ) ─────────────────
  assessment: {
    timeLimit: { type: Number, default: 30 }, // minutes
    isFullScreenEnforced: { type: Boolean, default: true },
    instructions: { type: String, default: '' },
    questions: [{
      prompt: { type: String, required: true },
      starterCode: { type: String, default: '' },
      expectedOutput: { type: String, default: '' },
      points: { type: Number, default: 10 },
    }],
  },

  // ─── Assignment (submission) ───────────────────────────────────────────────
  assignment: {
    overview: { type: String, default: '' },
    objectives: { type: [String], default: [] },
    technicalRequirements: { type: [String], default: [] },
    deliverables: { type: [String], default: [] },
    resources: { type: [String], default: [] },
    xpReward: { type: Number, default: 50 },
  },
}, {
  timestamps: true,
});

dayModuleSchema.index({ courseId: 1, dayNumber: 1 }, { unique: true });

const DayModule = mongoose.model('DayModule', dayModuleSchema);

export { Program, Course, DayModule };
