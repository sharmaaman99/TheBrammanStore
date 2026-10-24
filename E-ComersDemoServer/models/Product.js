const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  handle: { type: String, required: true },
  title: { type: String, required: true },
  nameDevanagari: { type: String },
  nameEnglish: { type: String },
  subTitle: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  currency: { type: String, default: 'INR' },
  gsm: { type: String },
  fabric: { type: String },
  fit: { type: String },
  description: { type: String },
  concept: { type: String },
  images: [{ type: String }],
  badge: { type: String },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  stock: { type: Number, default: 0 },
  salesCount: { type: Number, default: 0 },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
