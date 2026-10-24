const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    address: { type: String }
  },
  items: [{
    id: { type: String },
    title: { type: String },
    handle: { type: String },
    size: { type: String },
    color: { type: String },
    quantity: { type: Number, default: 1 },
    price: { type: Number },
    image: { type: String }
  }],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: 'Cash on Delivery' },
  status: {
    type: String,
    default: 'PROCESSING'
  },
  statusText: { type: String, default: 'Order Placed & Confirmed' },
  trackingNumber: { type: String },
  trackingUrl: { type: String },
  timeline: [{
    title: { type: String },
    time: { type: String },
    done: { type: Boolean, default: false },
    desc: { type: String }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
