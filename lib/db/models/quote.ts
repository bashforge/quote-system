import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  eventType: { type: String, required: true },
  date: { type: Date, required: true },
  attendees: { type: Number, required: true },
  additionalRequests: String,
  status: {
    type: String,
    enum: ['pending', 'quoted', 'accepted', 'expired'],
    default: 'pending'
  },
  adminNotes: String,
  quotedAmount: Number,
  expiryDate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Quote = mongoose.models.Quote || mongoose.model('Quote', quoteSchema);