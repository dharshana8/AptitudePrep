import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@services/api';
import { communicationLessons, getLessonsByCategory } from '@data/communicationContent';
import { speakingCategories } from '@data/speakingTopics';

export default function CommunicationPage() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const res = await api.get('/communication/progress');
      setProgress(res.data);
    } catch {
      setProgress({
        sessionsCompleted: 0,
        averageDuration: '0:00',
        bestDuration: '-',
        streak: 0,
        currentFocus: 'Start Speaking',
        completedLessons: [],
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-slate-400">Loading...</div>;

  const isLessonCompleted = (id) => progress?.completedLessons?.includes(id);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Communication</h1>
        <p className="text-slate-400 mt-1">Build fluency, confidence, and clarity in speaking</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link to="/communication/learn" className="bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-300 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📚</span>
            <h3 className="text-lg font-semibold text-slate-800">Learn</h3>
          </div>
          <p className="text-slate-500 text-sm mb-4">Speaking techniques, vocabulary, and frameworks</p>
          <div className="text-sm text-slate-400">
            {communicationLessons.length} lessons available
          </div>
        </Link>

        <Link to="/communication/practice" className="bg-white rounded-xl border border-slate-200 p-6 hover:border-green-300 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🎤</span>
            <h3 className="text-lg font-semibold text-slate-800">Practice</h3>
          </div>
          <p className="text-slate-500 text-sm mb-4">Random speaking topics with 2-minute timer</p>
          <div className="text-sm text-slate-400">
            {speakingCategories.length} categories
          </div>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-2xl font-bold text-slate-800">{progress.sessionsCompleted}</p>
            <p className="text-xs text-slate-400">Sessions</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{progress.averageDuration}</p>
            <p className="text-xs text-slate-400">Avg Duration</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{progress.bestDuration}</p>
            <p className="text-xs text-slate-400">Best Duration</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{progress.streak}</p>
            <p className="text-xs text-slate-400">Day Streak</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Learn - Techniques</h3>
          <div className="space-y-2">
            {getLessonsByCategory('techniques').slice(0, 3).map(lesson => (
              <Link
                key={lesson.id}
                to={`/communication/learn/${lesson.id}`}
                className={`block p-4 rounded-lg border transition-colors ${
                  isLessonCompleted(lesson.id)
                    ? 'border-green-100 bg-green-50'
                    : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      isLessonCompleted(lesson.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}>
                      {isLessonCompleted(lesson.id) ? '✓' : '📖'}
                    </span>
                    <span className="font-medium text-slate-700">{lesson.title}</span>
                  </div>
                  {isLessonCompleted(lesson.id) && (
                    <span className="text-xs text-green-600">Completed</span>
                  )}
                </div>
              </Link>
            ))}
            <Link
              to="/communication/learn"
              className="block text-center text-sm text-blue-600 hover:underline py-2"
            >
              View all lessons →
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Practice - Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {speakingCategories.map(cat => (
              <Link
                key={cat.id}
                to={`/communication/practice?category=${cat.id}`}
                className="p-3 rounded-lg border border-slate-100 hover:border-slate-300 transition-colors text-center"
              >
                <span className="text-xl block mb-1">{cat.icon}</span>
                <span className="text-sm font-medium text-slate-700">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}