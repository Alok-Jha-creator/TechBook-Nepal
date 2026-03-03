const mongoose = require('mongoose')

const technicianSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  skills: [{
    type: String,
  }],
  experienceYears: {
    type: Number,
    default: 0,
  },
  verification: {
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    citizenshipFront: String,
    citizenshipBack: String,
    selfiePhoto: String,
    adminNote: String,
    reviewedAt: Date,
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
  rating: {
    average: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  availability: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true })

module.exports = mongoose.model('Technician', technicianSchema)