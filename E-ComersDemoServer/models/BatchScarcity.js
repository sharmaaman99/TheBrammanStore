const mongoose = require('mongoose');

const batchScarcitySchema = new mongoose.Schema({
  batchTitle: { type: String, default: 'Batch 04 // Spring 2026 Archive' },
  dropNumber: { type: String, default: 'DROP-04' },
  status: { type: String, default: 'Active Allocation' },
  totalBatchUnits: { type: Number, default: 300 },
  allocatedUnits: { type: Number, default: 212 },
  remainingUnits: { type: Number, default: 88 },
  scarcityWarningEnabled: { type: Boolean, default: true },
  scarcityMessage: { type: String, default: 'Only 88 archive pieces remaining in Batch 04 across all silhouettes.' },
  allowWaitlist: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('BatchScarcity', batchScarcitySchema);
