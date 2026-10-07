import { useState, useEffect } from 'react';
import { api } from '@services/api';
import { APTITUDE_CATEGORIES, getAllTopics } from '@data/aptitudeTopics';

export default function ProgressPage() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const res = await api.get('/progress');
      setProgress(res.data);
    } catch {
      setProgress({
        aptitude: { currentOrder: 1, masteredTopics: [], topicScores: {} },
        communication: { sessionsCompleted: 0, averageDuration: '0:00', bestDuration: '0:00', streak: 0 },
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-slate-400">Loading...</div>;

  const apt = progress?.aptitude || { masteredTopics: [], topicScores: {} };
  const comm = progress?.communication || { sessionsCompleted: 0, averageDuration: '0:00', bestDuration: '0:00', streak: 0 };

  const allTopics = getAllTopics();
  const masteredCount = apt.masteredTopics?.length || 0;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-8">Progress Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-sm text-slate-400 uppercase tracking-wide">Aptitude Mastery</p>
          <p className="text-4xl font-bold text-slate-800 mt-2">{masteredCount} / 37</p>
          <p className="text-sm text-slate-400 mt-1">{(masteredCount / 37 * 100).toFixed(0)}% Complete</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-sm text-slate-400 uppercase tracking-wide">Communication Sessions</p>
          <p className="text-4xl font-bold text-slate-800 mt-2">{comm.sessionsCompleted}</p>
          <p className="text-sm text-slate-400 mt-1">Avg: {comm.averageDuration}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-sm text-slate-400 uppercase tracking-wide">Current Streak</p>
          <p className="text-4xl font-bold text-slate-800 mt-2">{comm.streak}</p>
          <p className="text-sm text-slate-400 mt-1">days</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Aptitude Topic Progress</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {APTITUDE_CATEGORIES.map(category => (
              <div key={category.id} className="space-y-2">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">{category.name}</h3>
                {category.topics.map(topic => {
                  const mastered = apt.masteredTopics?.includes(topic.order);
                  const score = apt.topicScores?.[topic.order];
                  return (
                    <div key={topic.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          mastered ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'
                        }`}>
                          {mastered ? '✓' : topic.order}
                        </span>
                        <span className={`text-sm ${mastered ? 'text-green-700' : 'text-slate-700'}`}>{topic.name}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        {score && (
                          <>
                            <span className="text-slate-500">Best: {score.best}%</span>
                            <span className="text-slate-500">Latest: {score.latest}%</span>
                          </>
                        )}
                        {!score && !mastered && <span className="text-slate-400">Not started</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Communication Progress</h2>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Total Speaking Time</p>
              <p className="text-2xl font-bold text-slate-800">{comm.totalTime || '0:00'}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Best Single Session</p>
              <p className="text-2xl font-bold text-slate-800">{comm.bestDuration}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Average Session</p>
              <p className="text-2xl font-bold text-slate-800">{comm.averageDuration}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Sessions This Week</p>
              <p className="text-2xl font-bold text-slate-800">{comm.sessionsThisWeek || 0}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Current Focus</p>
              <p className="text-slate-700 font-medium">{comm.currentFocus || 'Not set'}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Recent Sessions</h3>
            <div className="space-y-2">
              {(comm.recentSessions || []).slice(0, 5).map((session, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-700">{session.topic}</span>
                  <span className="text-sm text-slate-500">{session.date}</span>
                </div>
              ))}
              {(comm.recentSessions || []).length === 0 && (
                <p className="text-slate-400 text-center py-4">No sessions yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}