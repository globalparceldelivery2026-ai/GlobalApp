const mongoose = require('mongoose');

const trackingUpdateSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const trackingSchema = new mongoose.Schema({
  trackingNumber: {
    type: String,
    required: [true, 'Tracking number is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['booked', 'picked-up', 'in-transit', 'out-for-delivery', 'delivered', 'cancelled'],
    default: 'booked'
  },
  currentLocation: {
    type: String,
    default: 'Processing Center'
  },
  updates: [trackingUpdateSchema],
  bookingRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  senderName: {
    type: String,
    required: true
  },
  receiverName: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  estimatedDelivery: {
    type: Date
  },
  actualDelivery: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate tracking number before validation so 'required' check passes
trackingSchema.pre('validate', function(next) {
  if (!this.trackingNumber) {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(1000 + Math.random() * 9000);
    this.trackingNumber = `GPD${timestamp}${random}`;
  }
  next();
});

trackingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Tracking', trackingSchema);
