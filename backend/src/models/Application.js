import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  domain: {
    type: String,
    enum: ['Python', 'Java', 'Web', 'AI'],
  },
  stepCompleted: {
    type: Number,
    default: 1,
    min: 1,
    max: 7,
  },
  personalDetails: {
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    address: String,
  },
  academicInfo: {
    college: String,
    degree: String,
    yearOfStudy: String,
    cgpa: String,
  },
  requirementsAcknowledged: {
    hasLaptop: Boolean,
    hasInternet: Boolean,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Skipped'],
    default: 'Pending',
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  status: {
    type: String,
    enum: ['Draft', 'Pending', 'Accepted', 'Rejected'],
    default: 'Draft',
  }
}, {
  timestamps: true,
});

applicationSchema.index({ userId: 1 });
applicationSchema.index({ status: 1 });

const Application = mongoose.model('Application', applicationSchema);
export default Application;
