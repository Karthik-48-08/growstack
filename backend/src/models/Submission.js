import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dayModuleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DayModule',
    required: true,
  },
  type: {
    type: String,
    enum: ['Assignment', 'Assessment'],
    required: true,
  },
  githubUrl: String,
  linkedinUrl: String,
  zipUrl: String,
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  remarks: String,
  score: Number,
}, {
  timestamps: true,
});

submissionSchema.index({ userId: 1, dayModuleId: 1 });

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;
