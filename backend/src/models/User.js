import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  studentId: {
    type: String,
    unique: true,
    sparse: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student',
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
  },
  phone: String,
  college: String,
  degree: String,
  graduationYear: Number,
  githubUrl: String,
  linkedinUrl: String,
  portfolioUrl: String,
  resumeUrl: String,
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  otp: String,
  otpExpiry: Date,
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  badges: [{
    type: String
  }],
  currentStreak: {
    type: Number,
    default: 0,
  },
  longestStreak: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

const User = mongoose.model('User', userSchema);
export default User;
