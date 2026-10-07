import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '@services/api';
import { numberSystemContent } from '@data/numberSystemContent';
import { getAptitudeContent } from '@data/aptitudeContent';
import { APTITUDE_CATEGORIES } from '@data/aptitudeTopics';

export default function TopicPage() {
  const { topicId } = useParams();
  const [content, setContent] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, [topicId]);

  const loadContent = async () => {
    setContent(topicId === 'number-system' ? numberSystemContent : getAptitudeContent(topicId));
    try {
      const res = await api.get(`/aptitude/progress`);
      setProgress(res.data);
    } catch {
      setProgress({ completedSubTopics: [] });
    }
    setLoading(false);
  };

  const isSubTopicCompleted = (subTopicId) => {
    return progress?.completedSubTopics?.includes(subTopicId);
  };

  const isSubTopicCurrent = (index) => {
    return progress?.currentSubTopic === content?.subTopics[index]?.id;
  };

  if (loading) {
    return <div className="text-slate-400">Loading...</div>;
  }

  if (!content) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h1 className="text-xl font-semibold text-slate-700">Topic Not Found</h1>
        <Link to="/aptitude" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to Journey
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/aptitude" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-6">
        ← Back to Journey
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">{content.title}</h1>
        <p className="text-slate-500 mt-1">{content.description}</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200">
          <nav className="flex overflow-x-auto px-4" role="tablist">
            {content.subTopics.map((sub, index) => {
              const completed = isSubTopicCompleted(sub.id);
              const current = isSubTopicCurrent(index);
              return (
                <Link
                  key={sub.id}
                  to={`/aptitude/topic/${topicId}/lesson/${sub.id}`}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${current
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : completed
                        ? 'text-green-600'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  role="tab"
                  aria-selected={current}
                >
                  <span className="flex items-center gap-1">
                    {completed && <span className="text-green-500">✓ </span>}
                    {sub.title}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {content.subTopics.map((sub, index) => {
            const completed = isSubTopicCompleted(sub.id);
            const current = isSubTopicCurrent(index);
            return (
              <div key={sub.id} className="space-y-6">
                {current && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-700 font-medium">Current Lesson → Start Learning</p>
                  </div>
                )}
                <Link
                  to={`/aptitude/topic/${topicId}/lesson/${sub.id}`}
                  className={`block p-4 rounded-lg border transition-colors ${current
                      ? 'border-blue-200 bg-blue-50'
                      : completed
                        ? 'border-green-100 bg-green-50 hover:border-green-200'
                        : 'border-slate-100 hover:border-slate-200'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${completed
                        ? 'bg-green-500 text-white'
                        : current
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}>
                      {completed ? '✓' : index + 1}
                    </span>
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${completed ? 'text-green-700' : current ? 'text-blue-700' : 'text-slate-700'
                        }`}>
                        {sub.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {completed ? 'Completed' : current ? 'In Progress' : 'Not Started'}
                      </p>
                    </div>
                    <span className="text-slate-400">→</span>
                  </div>
                </Link>
              </div>
            );
          })}

          <div className="pt-4 border-t border-slate-100">
            <Link
              to={`/aptitude/topic/${topicId}/practice`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
            >
              Practice Questions
            </Link>
            <Link
              to={`/aptitude/topic/${topicId}/test`}
              className="ml-3 inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Mastery Test
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}