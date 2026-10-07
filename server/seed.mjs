import 'dotenv/config';
import dns from 'dns';
import { MongoClient } from 'mongodb';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore in environments where setServers is restricted
}

async function seed() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/aptitude-prep';

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('aptitude-prep');

    // Create default user
    const users = db.collection('users');
    const existingUser = await users.findOne({ email: 'student@aptitudeprep.com' });

    if (!existingUser) {
      await users.insertOne({
        name: 'Student',
        email: 'student@aptitudeprep.com',
        password: 'password123', // In production, hash this!
        createdAt: new Date(),
      });
      console.log('Created default user: student@aptitudeprep.com / password123');
    } else {
      console.log('Default user already exists');
    }

    const existingAdmin = await users.findOne({ email: 'admin@aptitudeprep.com' });
    if (!existingAdmin) {
      await users.insertOne({
        name: 'Administrator',
        email: 'admin@aptitudeprep.com',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date(),
      });
      console.log('Created admin user: admin@aptitudeprep.com / admin123');
    } else {
      await users.updateOne({ _id: existingAdmin._id }, { $set: { role: 'admin' } });
      console.log('Admin user already exists');
    }

    // Create indexes
    await db.collection('progress').createIndex({ userId: 1 }, { unique: true });
    await db.collection('testAttempts').createIndex({ userId: 1, createdAt: -1 });
    await db.collection('speakingSessions').createIndex({ userId: 1, createdAt: -1 });
    await db.collection('dareAttempts').createIndex({ userId: 1, createdAt: -1 });
    await db.collection('questionAttempts').createIndex({ userId: 1, createdAt: -1 });

    console.log('Database seeded successfully!');
    console.log('MongoDB URI:', uri);
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await client.close();
  }
}

seed();