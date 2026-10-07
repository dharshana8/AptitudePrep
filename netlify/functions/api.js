const { MongoClient } = require('mongodb');

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI not set');
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('aptitude-prep');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

function createResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    },
    body: JSON.stringify(body),
  };
}

function getToken(event) {
  const auth = event.headers.authorization || event.headers.Authorization;
  if (auth && auth.startsWith('Bearer ')) {
    return auth.substring(7);
  }
  return null;
}

function verifyToken(token) {
  const jwt = require('jsonwebtoken');
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

exports.handler = async function (event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return createResponse(200, {});
  }

  try {
    const { client, db } = await connectToDatabase();
    const path = event.path.replace('/.netlify/functions/api', '');
    const method = event.httpMethod;

    // Parse body
    let body = {};
    if (event.body) {
      try {
        body = JSON.parse(event.body);
      } catch { }
    }

    // Auth routes (no token required)
    if (path === '/auth/login' && method === 'POST') {
      const { email, password } = body;

      // Simple auth - in production use proper password hashing
      const user = await db.collection('users').findOne({ email });

      if (!user || user.password !== password) {
        return createResponse(401, { message: 'Invalid credentials' });
      }

      const jwt = require('jsonwebtoken');
      const secret = process.env.JWT_SECRET || 'your-secret-key';
      const token = jwt.sign({ userId: user._id, email: user.email }, secret, { expiresIn: '7d' });

      return createResponse(200, {
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role || 'member' },
      });
    }

    if (path === '/auth/signup' && method === 'POST') {
      const { name, email, password } = body;

      if (!name || !email || !password) {
        return createResponse(400, { message: 'All fields are required' });
      }

      if (password.length < 6) {
        return createResponse(400, { message: 'Password must be at least 6 characters' });
      }

      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser) {
        return createResponse(400, { message: 'Email already registered' });
      }

      const result = await db.collection('users').insertOne({
        name,
        email,
        password,
        role: 'member',
        createdAt: new Date(),
      });

      const jwt = require('jsonwebtoken');
      const secret = process.env.JWT_SECRET || 'your-secret-key';
      const token = jwt.sign({ userId: result.insertedId.toString(), email }, secret, { expiresIn: '7d' });

      return createResponse(201, {
        token,
        user: { id: result.insertedId, name, email, role: 'member' },
      });
    }

    if (path === '/auth/me' && method === 'GET') {
      const token = getToken(event);
      if (!token) return createResponse(401, { message: 'No token' });

      const decoded = verifyToken(token);
      if (!decoded) return createResponse(401, { message: 'Invalid token' });

      const user = await db.collection('users').findOne({ _id: new require('mongodb').ObjectId(decoded.userId) });
      if (!user) return createResponse(404, { message: 'User not found' });

      return createResponse(200, { user: { id: user._id, name: user.name, email: user.email, role: user.role || 'member' } });
    }

    // All other routes require auth
    const token = getToken(event);
    if (!token) return createResponse(401, { message: 'Authentication required' });

    const decoded = verifyToken(token);
    if (!decoded) return createResponse(401, { message: 'Invalid token' });

    const userId = decoded.userId;
    const userObjectId = new require('mongodb').ObjectId(userId);

    const currentUser = await db.collection('users').findOne({ _id: userObjectId });
    if (path.startsWith('/admin/')) {
      if (!currentUser || currentUser.role !== 'admin') return createResponse(403, { message: 'Admin access required' });

      if (path === '/admin/members' && method === 'GET') {
        const members = await db.collection('users').find({ role: { $ne: 'admin' } }, { projection: { password: 0 } }).sort({ createdAt: -1 }).toArray();
        const result = await Promise.all(members.map(async member => {
          const progress = await db.collection('progress').findOne({ userId: member._id });
          const tests = await db.collection('testAttempts').find({ userId: member._id }).toArray();
          const speakingSessions = await db.collection('speakingSessions').countDocuments({ userId: member._id });
          return { ...member, progress: progress || null, testsTaken: tests.length, averageTestScore: tests.length ? Math.round(tests.reduce((sum, test) => sum + test.score, 0) / tests.length) : 0, speakingSessions };
        }));
        return createResponse(200, result);
      }

      if (path === '/admin/results' && method === 'GET') {
        const results = await db.collection('testAttempts').aggregate([
          { $sort: { createdAt: -1 } }, { $limit: 200 },
          { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'member' } },
          { $unwind: '$member' }, { $project: { password: 0, 'member.password': 0 } },
        ]).toArray();
        return createResponse(200, results);
      }

      if (path === '/admin/tests' && method === 'GET') {
        return createResponse(200, await db.collection('customTests').find({}).sort({ createdAt: -1 }).toArray());
      }

      if (path === '/admin/tests' && method === 'POST') {
        const { title, description, duration, questions } = body;
        if (!title || !Array.isArray(questions) || questions.length === 0) return createResponse(400, { message: 'Title and at least one question are required' });
        const test = { title, description: description || '', duration: Number(duration) || 30, questions, createdBy: currentUser._id, createdAt: new Date() };
        const result = await db.collection('customTests').insertOne(test);
        return createResponse(201, { ...test, _id: result.insertedId });
      }
    }

    // Progress routes
    if (path === '/progress' && method === 'GET') {
      const progress = await db.collection('progress').findOne({ userId: userObjectId });
      return createResponse(200, progress || {
        aptitude: { currentOrder: 1, currentSubTopic: 'basics', masteredTopics: [], topicScores: {}, completedSubTopics: [] },
        communication: { sessionsCompleted: 0, averageDuration: '0:00', bestDuration: '0:00', streak: 0, currentFocus: 'Start Speaking', completedLessons: [], totalTime: '0:00', sessionsThisWeek: 0, recentSessions: [] },
        todayTasks: [
          { type: 'aptitude', label: 'Aptitude Practice', completed: false },
          { type: 'communication', label: 'Communication Practice', completed: false },
        ],
      });
    }

    if (path === '/aptitude/progress' && method === 'GET') {
      const progress = await db.collection('progress').findOne({ userId: userObjectId });
      return createResponse(200, progress?.aptitude || {
        currentOrder: 1, currentSubTopic: 'basics', masteredTopics: [], topicScores: {}, completedSubTopics: []
      });
    }

    if (path === '/communication/progress' && method === 'GET') {
      const progress = await db.collection('progress').findOne({ userId: userObjectId });
      return createResponse(200, progress?.communication || {
        sessionsCompleted: 0, averageDuration: '0:00', bestDuration: '0:00', streak: 0, currentFocus: 'Start Speaking', completedLessons: [], totalTime: '0:00', sessionsThisWeek: 0, recentSessions: []
      });
    }

    // Aptitude subtopic complete
    if (path === '/aptitude/subtopic/complete' && method === 'POST') {
      const { topicId, subTopicId } = body;
      await db.collection('progress').updateOne(
        { userId: userObjectId },
        { $addToSet: { 'aptitude.completedSubTopics': subTopicId }, $set: { updatedAt: new Date() } },
        { upsert: true }
      );
      return createResponse(200, { success: true });
    }

    // Aptitude test submit
    if (path === '/aptitude/test/submit' && method === 'POST') {
      const { topicId, score, correct, total, timeSpent, weakAreas, answers, patternScores = {} } = body;
      const topicOrder = parseInt(topicId.replace('number-system', '1').replace('hcf-lcm', '2')); // Simplified

      const progress = await db.collection('progress').findOne({ userId: userObjectId });
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
        { userId: userObjectId },
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

      // Save test attempt
      await db.collection('testAttempts').insertOne({
        userId: userObjectId,
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

      return createResponse(200, { success: true, mastered, nextTopic: mastered ? topicOrder + 1 : topicOrder });
    }

    // Communication lesson complete
    if (path === '/communication/lesson/complete' && method === 'POST') {
      const { lessonId } = body;
      await db.collection('progress').updateOne(
        { userId: userObjectId },
        { $addToSet: { 'communication.completedLessons': lessonId }, $set: { updatedAt: new Date() } },
        { upsert: true }
      );
      return createResponse(200, { success: true });
    }

    // Communication session save
    if (path === '/communication/session' && method === 'POST') {
      const { topic, category, duration, attemptNumber, selfRating, feedback, improvementFocus, audioData } = body;

      const progress = await db.collection('progress').findOne({ userId: userObjectId });
      const comm = progress?.communication || { sessionsCompleted: 0, totalTime: 0, bestDuration: 0, streak: 0 };

      const newSessions = comm.sessionsCompleted + 1;
      const newTotalTime = (comm.totalTime || 0) + duration;
      const newAvg = Math.round(newTotalTime / newSessions);
      const newBest = Math.max(comm.bestDuration || 0, duration);

      await db.collection('progress').updateOne(
        { userId: userObjectId },
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
        userId: userObjectId,
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

      return createResponse(200, { success: true });
    }

    // History
    if (path === '/history' && method === 'GET') {
      const type = event.queryStringParameters?.type || 'all';
      let aptitude = [], communication = [];

      if (type === 'aptitude' || type === 'all') {
        aptitude = await db.collection('testAttempts').find({ userId: userObjectId }).sort({ createdAt: -1 }).limit(50).toArray();
      }
      if (type === 'communication' || type === 'all') {
        communication = await db.collection('speakingSessions').find({ userId: userObjectId }).sort({ createdAt: -1 }).limit(50).toArray();
      }

      return createResponse(200, { aptitude, communication });
    }

    // Dare history
    if (path === '/dare/history' && method === 'GET') {
      const dares = await db.collection('dareAttempts').find({ userId: userObjectId }).sort({ createdAt: -1 }).toArray();
      return createResponse(200, dares);
    }

    if (path === '/dare/attempt' && method === 'POST') {
      const { questionId, dareText, completed } = body;
      await db.collection('dareAttempts').insertOne({
        userId: userObjectId,
        questionId,
        dareText,
        completed,
        createdAt: new Date(),
      });
      return createResponse(200, { success: true });
    }

    return createResponse(404, { message: 'Not found' });

  } catch (error) {
    console.error('API Error:', error);
    return createResponse(500, { message: 'Internal server error', error: error.message });
  }
};