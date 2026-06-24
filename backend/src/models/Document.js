import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: ['OfferLetter', 'Certificate'],
    required: true,
  },
  certificateId: {
    type: String,
    unique: true,
    sparse: true,
  },
  pdfUrl: {
    type: String,
    required: true,
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
  startDate: Date,
  endDate: Date,
}, {
  timestamps: true,
});

documentSchema.index({ certificateId: 1 });

const Document = mongoose.model('Document', documentSchema);
export default Document;
