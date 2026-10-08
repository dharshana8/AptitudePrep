import 'dotenv/config';
import dns from 'dns';
import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore in environments where setServers is restricted
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());

// Health check route for AWS EC2 / Nginx
app.get(['/health', '/api/health', '/functions/health'], (req, res) => {
  res.json({ status: 'ok', message: 'Aptitude Prep API is running' });
});

// MongoDB connection
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/aptitude-prep';
const JWT_SECRET = process.env.JWT_SECRET || 'your-local-dev-secret-key';

let db;

async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db('aptitude-prep');
  console.log('Connected to local MongoDB');

  // Create indexes
  await db.collection('progress').createIndex({ userId: 1 }, { unique: true });
  await db.collection('testAttempts').createIndex({ userId: 1, createdAt: -1 });
  await db.collection('speakingSessions').createIndex({ userId: 1, createdAt: -1 });
  await db.collection('dareAttempts').createIndex({ userId: 1, createdAt: -1 });
  await db.collection('questionAttempts').createIndex({ userId: 1, createdAt: -1 });
}

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  const token = auth.substring(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.userObjectId = new ObjectId(decoded.userId);
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

async function adminMiddleware(req, res, next) {
  try {
    const user = await db.collection('users').findOne({ _id: req.userObjectId });
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    req.adminUser = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

// Auth routes (under /functions to match Netlify)
app.post('/functions/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.collection('users').findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id.toString(), email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role || 'member' } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/functions/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const result = await db.collection('users').insertOne({
      name,
      email,
      password,
      role: 'member',
      createdAt: new Date(),
    });

    const token = jwt.sign({ userId: result.insertedId.toString(), email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: result.insertedId.toString(), name, email, role: 'member' } });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

app.get('/functions/auth/me', authMiddleware, async (req, res) => {
  try {
    const user = await db.collection('users').findOne({ _id: req.userObjectId });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role || 'member' } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/functions/admin/members', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const members = await db.collection('users').find({ role: { $ne: 'admin' } }, { projection: { password: 0 } }).sort({ createdAt: -1 }).toArray();
    const result = await Promise.all(members.map(async member => {
      const progress = await db.collection('progress').findOne({ userId: member._id });
      const tests = await db.collection('testAttempts').find({ userId: member._id }).sort({ createdAt: -1 }).toArray();
      const sessions = await db.collection('speakingSessions').countDocuments({ userId: member._id });
      return {
        ...member,
        progress: progress || null,
        testsTaken: tests.length,
        averageTestScore: tests.length ? Math.round(tests.reduce((sum, test) => sum + test.score, 0) / tests.length) : 0,
        speakingSessions: sessions,
      };
    }));
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/functions/admin/results', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const results = await db.collection('testAttempts').aggregate([
      { $sort: { createdAt: -1 } },
      { $limit: 200 },
      { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'member' } },
      { $unwind: '$member' },
      { $project: { password: 0, 'member.password': 0 } },
    ]).toArray();
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/functions/admin/tests', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    res.json(await db.collection('customTests').find({}).sort({ createdAt: -1 }).toArray());
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/functions/admin/tests', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, description, duration, questions } = req.body;
    if (!title || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Title and at least one question are required' });
    }
    const test = {
      title,
      description: description || '',
      duration: Number(duration) || 30,
      questions,
      createdBy: req.adminUser._id,
      createdAt: new Date(),
    };
    const result = await db.collection('customTests').insertOne(test);
    res.status(201).json({ ...test, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Test creation failed' });
  }
});

// Progress routes
app.get('/functions/progress', authMiddleware, async (req, res) => {
  try {
    const progress = await db.collection('progress').findOne({ userId: req.userObjectId });
    res.json(progress || {
      aptitude: { currentOrder: 1, currentSubTopic: 'basics', masteredTopics: [], topicScores: {}, completedSubTopics: [] },
      communication: { sessionsCompleted: 0, averageDuration: '0:00', bestDuration: '0:00', streak: 0, currentFocus: 'Start Speaking', completedLessons: [], totalTime: '0:00', sessionsThisWeek: 0, recentSessions: [] },
      todayTasks: [
        { type: 'aptitude', label: 'Aptitude Practice', completed: false },
        { type: 'communication', label: 'Communication Practice', completed: false },
      ],
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/functions/aptitude/progress', authMiddleware, async (req, res) => {
  try {
    const progress = await db.collection('progress').findOne({ userId: req.userObjectId });
    res.json(progress?.aptitude || { currentOrder: 1, currentSubTopic: 'basics', masteredTopics: [], topicScores: {}, completedSubTopics: [] });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/functions/communication/progress', authMiddleware, async (req, res) => {
  try {
    const progress = await db.collection('progress').findOne({ userId: req.userObjectId });
    res.json(progress?.communication || { sessionsCompleted: 0, averageDuration: '0:00', bestDuration: '0:00', streak: 0, currentFocus: 'Start Speaking', completedLessons: [], totalTime: '0:00', sessionsThisWeek: 0, recentSessions: [] });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Aptitude subtopic complete
app.post('/functions/aptitude/subtopic/complete', authMiddleware, async (req, res) => {
  try {
    const { topicId, subTopicId } = req.body;
    await db.collection('progress').updateOne(
      { userId: req.userObjectId },
      { $addToSet: { 'aptitude.completedSubTopics': subTopicId }, $set: { updatedAt: new Date() } },
      { upsert: true }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Aptitude test submit
app.post('/functions/aptitude/test/submit', authMiddleware, async (req, res) => {
  try {
    const { topicId, score, correct, total, timeSpent, weakAreas, answers, patternScores = {} } = req.body;
    const topicOrder = parseInt(topicId.replace('number-system', '1').replace('hcf-lcm', '2'));

    const progress = await db.collection('progress').findOne({ userId: req.userObjectId });
    const apt = progress?.aptitude || { masteredTopics: [], topicScores: {}, completedSubTopics: [] };

    const patternsCovered = Object.values(patternScores).every(patternScore => patternScore >= 80);
    const mastered = score >= 80 && patternsCovered;
    const newMasteredTopics = [...(apt.masteredTopics || [])];
    if (mastered && !newMasteredTopics.includes(topicOrder)) {
      newMasteredTopics.push(topicOrder);
    }

    const topicScores = { ...(apt.topicScores || {}) };
    if (!topicScores[topicOrder]) topicScores[topicOrder] = { best: score, latest: score };
    else {
      topicScores[topicOrder].latest = score;
      if (score > topicScores[topicOrder].best) topicScores[topicOrder].best = score;
    }

    await db.collection('progress').updateOne(
      { userId: req.userObjectId },
      {
        $set: {
          'aptitude.masteredTopics': newMasteredTopics,
          'aptitude.topicScores': topicScores,
          'aptitude.currentOrder': mastered ? topicOrder + 1 : topicOrder,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    await db.collection('testAttempts').insertOne({
      userId: req.userObjectId,
      topicId,
      score,
      correct,
      total,
      timeSpent,
      weakAreas,
      answers,
      patternScores,
      mastered,
      createdAt: new Date(),
    });

    res.json({ success: true, mastered, nextTopic: mastered ? topicOrder + 1 : topicOrder });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Communication lesson complete
app.post('/functions/communication/lesson/complete', authMiddleware, async (req, res) => {
  try {
    const { lessonId } = req.body;
    await db.collection('progress').updateOne(
      { userId: req.userObjectId },
      { $addToSet: { 'communication.completedLessons': lessonId }, $set: { updatedAt: new Date() } },
      { upsert: true }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Communication session save
app.post('/functions/communication/session', authMiddleware, async (req, res) => {
  try {
    const { topic, category, duration, attemptNumber, selfRating, feedback, improvementFocus, audioData } = req.body;

    const progress = await db.collection('progress').findOne({ userId: req.userObjectId });
    const comm = progress?.communication || { sessionsCompleted: 0, totalTime: 0, bestDuration: 0, streak: 0 };

    const newSessions = comm.sessionsCompleted + 1;
    const newTotalTime = (comm.totalTime || 0) + duration;
    const newAvg = Math.round(newTotalTime / newSessions);
    const newBest = Math.max(comm.bestDuration || 0, duration);

    await db.collection('progress').updateOne(
      { userId: req.userObjectId },
      {
        $set: {
          'communication.sessionsCompleted': newSessions,
          'communication.totalTime': newTotalTime,
          'communication.averageDuration': newAvg,
          'communication.bestDuration': newBest,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    await db.collection('speakingSessions').insertOne({
      userId: req.userObjectId,
      topic,
      category,
      duration,
      attemptNumber,
      selfRating,
      feedback,
      improvementFocus,
      audioData,
      createdAt: new Date(),
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// History
app.get('/functions/history', authMiddleware, async (req, res) => {
  try {
    const type = req.query.type || 'all';
    let aptitude = [], communication = [];

    if (type === 'aptitude' || type === 'all') {
      aptitude = await db.collection('testAttempts').find({ userId: req.userObjectId }).sort({ createdAt: -1 }).limit(50).toArray();
    }
    if (type === 'communication' || type === 'all') {
      communication = await db.collection('speakingSessions').find({ userId: req.userObjectId }).sort({ createdAt: -1 }).limit(50).toArray();
    }

    res.json({ aptitude, communication });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Dare history
app.get('/functions/dare/history', authMiddleware, async (req, res) => {
  try {
    const dares = await db.collection('dareAttempts').find({ userId: req.userObjectId }).sort({ createdAt: -1 }).toArray();
    res.json(dares);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/functions/dare/attempt', authMiddleware, async (req, res) => {
  try {
    const { questionId, dareText, completed } = req.body;
    await db.collection('dareAttempts').insertOne({
      userId: req.userObjectId,
      questionId,
      dareText,
      completed,
      createdAt: new Date(),
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

async function startServer() {
  try {
    await connectDB();
    console.log('DB connected successfully');

    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`Local API server running on http://localhost:${PORT}`);
      console.log('Server address:', server.address());
    });

    server.on('error', (err) => {
      console.error('Server error:', err);
    });

    server.on('listening', () => {
      console.log('Server listening event fired');
    });

    server.on('connection', (socket) => {
      console.log('New connection from:', socket.remoteAddress);
    });

    // Keep process alive
    setInterval(() => { }, 1000);

  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
}

startServer();