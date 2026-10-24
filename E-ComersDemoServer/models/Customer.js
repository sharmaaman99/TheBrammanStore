const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  city: { type: String },
  state: { type: String },
  pincode: { type: String },
  tier: { type: String, default: 'New Collector' },
  totalSpent: { type: Number, default: 0 },
  ordersCount: { type: Number, default: 0 },
  lastActive: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);
