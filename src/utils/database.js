const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // First try with basic connection (no auth)
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    console.log('Trying with authentication...');
    
    // If basic connection fails, try with auth
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        authSource: 'admin'
      });
      console.log(`MongoDB Connected (with auth): ${conn.connection.host}`);
    } catch (authError) {
      console.error('Authenticated connection also failed:', authError);
      
      // Try Docker connection if available
      if (process.env.MONGODB_URI.includes('localhost')) {
        console.log('Trying Docker connection...');
        try {
          const dockerUri = 'mongodb://admin:password@localhost:27017/expense-tracker?authSource=admin';
          const conn = await mongoose.connect(dockerUri);
          console.log(`MongoDB Connected (Docker): ${conn.connection.host}`);
        } catch (dockerError) {
          console.error('Docker connection failed:', dockerError);
          process.exit(1);
        }
      } else {
        process.exit(1);
      }
    }
  }
};

module.exports = connectDB;