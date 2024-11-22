  // db.js
import mongoose from 'mongoose';

 const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DBCONNECT);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
