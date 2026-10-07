import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@services/api';
import { APTITUDE_CATEGORIES, MASTERY_THRESHOLD } from '@data/aptitudeTopics';

export default function AptitudeJourney() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const res = await api.get('/aptitude/progress');
      setProgress(res.data);
    } catch {
      setProgress({
        currentOrder: 1,
        currentSubTopic: 'basics',
        masteredTopics: [],
        topicScores: {},
      });
    } finally {
      setLoading(false);
    }
  };

  const isTopicUnlocked = (order) => {
    if (!progress) return order === 1;
    if (order === 1) return true;
    return progress.masteredTopics?.includes(order - 1);
  };

  const isTopicCurrent = (order) => {
    return progress?.currentOrder === order;
  };

  const isTopicMastered = (order) => {
    return progress?.masteredTopics?.includes(order);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Aptitude Journey</h1>
        <p className="text-slate-400 mt-1">Learn, practice, master, and unlock the next topic</p>
      </div>

      <div className="space-y-8">
        {APTITUDE_CATEGORIES.map(category => (
          <div key={category.id}>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
              {category.name}
            </h2>
            <div className="space-y-2">
              {category.topics.map(topic => {
                const unlocked = isTopicUnlocked(topic.order);
                const current = isTopicCurrent(topic.order);
                const mastered = isTopicMastered(topic.order);
                const score = progress?.topicScores?.[topic.order];

                return (
                  <div
                    key={topic.id}
                    className={`rounded-xl border p-4 transition-all ${
                      current
                        ? 'border-blue-300 bg-blue-50 ring-1 ring-blue-200'
                        : mastered
                        ? 'border-green-200 bg-green-50'
                        : unlocked
                        ? 'border-slate-200 bg-white hover:border-slate-300'
                        : 'border-slate-100 bg-slate-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          mastered
                            ? 'bg-green-500 text-white'
                            : current
                            ? 'bg-blue-500 text-white'
                            : unlocked
                            ? 'bg-slate-200 text-slate-600'
                            : 'bg-slate-100 text-slate-400'
                        }`}>
                          {mastered ? '✓' : !unlocked ? '🔒' : topic.order}
                        </span>
                        <div>
                          <p className={`text-sm font-medium ${
                            mastered ? 'text-green-700' : current ? 'text-blue-700' : unlocked ? 'text-slate-700' : 'text-slate-400'
                          }`}>
                            {topic.name}
                          </p>
                          {score && (
                            <p className="text-xs text-slate-400 mt-0.5">
                              Best: {score.best}% | Latest: {score.latest}%
                            </p>
                          )}
                        </div>
                      </div>

                      {unlocked && (
                        <Link
                          to={`/aptitude/topic/${topic.id}`}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            current
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : mastered
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {mastered ? 'Revise' : current ? 'Continue' : 'Review'}
                        </Link>
                      )}

                      {!unlocked && (
                        <span className="text-xs text-slate-400">Locked</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
