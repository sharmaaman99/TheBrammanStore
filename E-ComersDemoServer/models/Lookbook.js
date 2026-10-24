const mongoose = require('mongoose');

const lookbookSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  creatorHandle: { type: String, required: true },
  creatorName: { type: String },
  image: { type: String, required: true },
  city: { type: String },
  caption: { type: String },
  likes: { type: Number, default: 0 },
  taggedProducts: [{ type: String }],
  taggedProductHandles: [{ type: String }],
  curated: { type: Boolean, default: true },
  curationStatus: { type: String, default: 'approved' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Lookbook', lookbookSchema);
