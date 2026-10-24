const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  passwordSalt: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: '+91 98765 43210'
  },
  tier: {
    type: String,
    default: 'Vedic Collector Archive'
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  },
  memberSince: {
    type: String,
    default: () => {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const now = new Date();
      return `${months[now.getMonth()]} ${now.getFullYear()}`;
    }
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Helper method to set password securely using Node.js crypto scrypt
userSchema.methods.setPassword = function(password) {
  this.passwordSalt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.scryptSync(password, this.passwordSalt, 64).toString('hex');
};

// Helper method to validate password
userSchema.methods.validatePassword = function(password) {
  if (!this.passwordSalt || !this.passwordHash) return false;
  const hash = crypto.scryptSync(password, this.passwordSalt, 64).toString('hex');
  return this.passwordHash === hash;
};

// Format user object for safe frontend response (exclude password hashes)
userSchema.methods.toSafeObject = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    tier: this.tier,
    role: this.role,
    memberSince: this.memberSince,
    lastLogin: this.lastLogin
  };
};

module.exports = mongoose.model('User', userSchema);
