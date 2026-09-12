import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { seedDatabase } from './seeder';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (mongoURI) {
      // Connect to actual Database (MongoDB Atlas)
      await mongoose.connect(mongoURI);
      console.log(`✅ Production MongoDB Connected`);
    } else {
      // Spin up an in-memory MongoDB instance automatically for Dev
      const mongoServer = await MongoMemoryServer.create();
      const devMongoURI = mongoServer.getUri();
      
      await mongoose.connect(devMongoURI);
      console.log(`✅ MongoDB Connected (In-Memory for Dev): ${devMongoURI}`);
      
      // Seed database after connection only for dev memory server
      await seedDatabase();
    }
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};
