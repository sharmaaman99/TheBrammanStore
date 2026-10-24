const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Product = require('./models/Product');
const Order = require('./models/Order');
const Customer = require('./models/Customer');
const Lookbook = require('./models/Lookbook');
const BatchScarcity = require('./models/BatchScarcity');
const User = require('./models/User');

let isConnected = false;

// Get MongoDB URI from environment variables
const getMongoURI = () => {
  return (
    process.env.MONGODB_URI ||
    process.env.MONGODB_URL ||
    process.env.MONGO_URI ||
    process.env.VITE_MONGODB_URI ||
    process.env.VITE_MONGODB_URL ||
    process.env.DATABASE_URL ||
    ''
  ).trim();
};

const connectDB = async (seedData = {}) => {
  const uri = getMongoURI();

  if (!uri) {
    console.log('ℹ️  [MONGODB] No MONGODB_URI detected in .env files yet.');
    console.log('ℹ️  [MONGODB] Running in high-resilience in-memory mode. Once MONGODB_URI is provided, live sync activates.');
    return false;
  }

  // Obfuscate credentials for safe console logging
  const safeLogURI = uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
  console.log(`⏳ [MONGODB] Attempting connection to: ${safeLogURI}`);

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 20000,
      connectTimeoutMS: 20000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log('✅ [MONGODB] Connected successfully to MongoDB Database!');

    // Auto-seed Initial Products if database is fresh
    try {
      if (seedData.products && seedData.products.length > 0) {
        const prodCount = await Product.countDocuments();
        if (prodCount === 0) {
          console.log(`🌱 [MONGODB] Seeding ${seedData.products.length} initial products...`);
          await Product.insertMany(seedData.products);
          console.log('✅ [MONGODB] Initial products seeded successfully.');
        } else {
          console.log(`📦 [MONGODB] Database has ${prodCount} products.`);
        }
      }
    } catch (e) {
      console.warn('⚠️  [MONGODB] Product seed notice:', e.message);
    }

    // Auto-seed Initial Orders if collection is fresh
    try {
      if (seedData.orders && seedData.orders.length > 0) {
        const orderCount = await Order.countDocuments();
        if (orderCount === 0) {
          console.log(`🌱 [MONGODB] Seeding ${seedData.orders.length} initial orders...`);
          await Order.insertMany(seedData.orders);
          console.log('✅ [MONGODB] Initial orders seeded.');
        } else {
          console.log(`📦 [MONGODB] Database has ${orderCount} orders.`);
        }
      }
    } catch (e) {
      console.warn('⚠️  [MONGODB] Order seed notice:', e.message);
    }

    // Auto-seed Customers
    try {
      if (seedData.customers && seedData.customers.length > 0) {
        const custCount = await Customer.countDocuments();
        if (custCount === 0) {
          console.log(`🌱 [MONGODB] Seeding ${seedData.customers.length} initial customers...`);
          await Customer.insertMany(seedData.customers);
          console.log('✅ [MONGODB] Initial customers seeded.');
        } else {
          console.log(`📦 [MONGODB] Database has ${custCount} customers.`);
        }
      }
    } catch (e) {
      console.warn('⚠️  [MONGODB] Customer seed notice:', e.message);
    }

    // Auto-seed Default Test User
    try {
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        console.log('🌱 [MONGODB] Seeding default test collector account...');
        const defaultUser = new User({
          name: 'Shiva Sharma',
          email: 'collector@thebrahmmanstore.com',
          phone: '+91 98765 43210',
          tier: 'Vedic Collector Archive',
          role: 'customer',
          memberSince: 'October 2026'
        });
        defaultUser.setPassword('password123');
        await defaultUser.save();
        console.log('✅ [MONGODB] Default user created (collector@thebrahmmanstore.com / password123).');
      } else {
        console.log(`👤 [MONGODB] Database has ${userCount} registered users.`);
      }
    } catch (e) {
      console.warn('⚠️  [MONGODB] User seed notice:', e.message);
    }

    return true;
  } catch (error) {
    isConnected = false;
    console.error('❌ [MONGODB] Connection error:', error.message);
    console.log('⚠️  [MONGODB] Running in fallback in-memory store mode to ensure zero downtime.');
    return false;
  }
};

module.exports = {
  connectDB,
  isMongoConnected: () => isConnected,
  getMongoURI,
  Product,
  Order,
  Customer,
  Lookbook,
  BatchScarcity,
  User,
};
