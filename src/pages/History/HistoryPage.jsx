import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '@services/api';
import { formatDateTime, formatTime } from '@utils/helpers';

export default function HistoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [history, setHistory] = useState({ aptitude: [], communication: [] });
  const [loading, setLoading] = useState(true);
  const activeTab = searchParams.get('tab') || 'aptitude';

  useEffect(() => {
    loadHistory();
  }, [activeTab]);

  const loadHistory = async () => {
    try {
      const res = await api.get(`/history?type=${activeTab}`);
      setHistory(res.data);
    } catch {
      setHistory({ aptitude: [], communication: [] });
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (tab) => {
    setSearchParams({ tab });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">History</h1>

      <div className="flex gap-2 mb-6 border-b border-slate-200">
        {['aptitude', 'communication'].map(tab => (
          <button
            key={tab}
            onClick={() => switchTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${activeTab === tab
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
          >
            {tab === 'aptitude' ? '🔢 Aptitude Tests' : '🎤 Communication Sessions'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-slate-400">Loading...</div>
      ) : activeTab === 'aptitude' ? (
        <div className="space-y-3">
          {history.aptitude.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <p className="text-slate-400">No aptitude tests taken yet</p>
            </div>
          ) : (
            history.aptitude.map((test, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold text-slate-800">{test.topicName || test.topicId}</p>
                    <p className="text-sm text-slate-400">{formatDateTime(test.createdAt)}</p>
                  </div>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${test.mastered ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                    {test.score}%
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div><p className="text-slate-400">Correct</p><p className="font-medium">{test.correct}</p></div>
                  <div><p className="text-slate-400">Total</p><p className="font-medium">{test.total}</p></div>
                  <div><p className="text-slate-400">Time</p><p className="font-medium">{formatTime(test.timeSpent)}</p></div>
                  <div><p className="text-slate-400">Status</p><p className={`font-medium ${test.mastered ? 'text-green-600' : 'text-red-600'}`}>{test.mastered ? 'Mastered' : 'Retry'}</p></div>
                </div>
                {test.weakAreas?.length > 0 && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-xs text-yellow-800 font-medium">Weak Areas:</p>
                    <p className="text-xs text-yellow-700 mt-1">{[...new Set(test.weakAreas)].join(', ')}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {history.communication.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <p className="text-slate-400">No communication sessions yet</p>
            </div>
          ) : (
            history.communication.map((session, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold text-slate-800">{session.topic}</p>
                    <p className="text-sm text-slate-400">{formatDateTime(session.createdAt)}</p>
                  </div>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
                    {session.category}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div><p className="text-slate-400">Duration</p><p className="font-medium">{formatTime(session.duration)}</p></div>
                  <div><p className="text-slate-400">Attempt</p><p className="font-medium">#{session.attemptNumber}</p></div>
                  <div><p className="text-slate-400">Rating</p><p className="font-medium">{session.selfRating}/5</p></div>
                  <div><p className="text-slate-400">Focus</p><p className="font-medium text-slate-600 truncate max-w-xs">{session.improvementFocus || '-'}</p></div>
                </div>
                {session.audioData && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400 mb-2">Recording</p>
                    <audio controls src={session.audioData} className="w-full" />
                  </div>
                )}
                {session.feedback && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800 font-medium">AI Feedback:</p>
                    <p className="text-xs text-blue-700 mt-1">{session.feedback}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}