const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['cooked', 'dry', 'fruits', 'vegetables']
  },
  quantity: {
    type: String,
    required: true
  },
  description: String,
  expiry: {
    type: Date,
    required: true
  },
  condition: {
    type: String,
    required: true,
    enum: ['fresh', 'good', 'expired']
  },
  image: String,
  pickup: {
    type: String,
    required: true
  },
  dropoff: String,
  status: {
    type: String,
    enum: ['available', 'reserved', 'completed'],
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donation', donationSchema);
