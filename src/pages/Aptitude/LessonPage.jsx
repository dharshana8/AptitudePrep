import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '@services/api';
import { numberSystemContent } from '@data/numberSystemContent';
import { getAptitudeContent } from '@data/aptitudeContent';

function renderExplanation(text) {
  const lines = text.split('\n');
  return lines.map((line, index) => {
    const isBullet = line.startsWith('- ');
    const content = isBullet ? line.slice(2) : line;
    const parts = content.split(/(\*\*.*?\*\*)/g).map((part, partIndex) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    if (!line.trim()) return <div key={index} className="h-2" />;
    if (isBullet) return <li key={index}>{parts}</li>;
    return <p key={index}>{parts}</p>;
  });
}

export default function LessonPage() {
  const { topicId, subTopicId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [subTopic, setSubTopic] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, [topicId, subTopicId]);

  const loadContent = async () => {
    const topicContent = topicId === 'number-system' ? numberSystemContent : getAptitudeContent(topicId);
    setContent(topicContent);
    setSubTopic(topicContent?.subTopics.find(s => s.id === subTopicId));
    try {
      const res = await api.get('/aptitude/progress');
      setCompleted(res.data.completedSubTopics?.includes(subTopicId) || false);
    } catch { }
    setLoading(false);
  };

  const handleComplete = async () => {
    try {
      await api.post('/aptitude/subtopic/complete', { topicId, subTopicId });
      setCompleted(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-slate-400">Loading...</div>;
  if (!subTopic) return <div className="text-center py-12">Sub-topic not found</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Link to={`/aptitude/topic/${topicId}`} className="text-sm text-slate-500 hover:text-slate-700">
          ← {content?.title}
        </Link>
        <button
          onClick={handleComplete}
          disabled={completed}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${completed
            ? 'bg-green-100 text-green-700 cursor-default'
            : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
        >
          {completed ? 'Completed ✓' : 'Mark Complete'}
        </button>
      </div>

      <h1 className="text-2xl font-bold text-slate-800 mb-2">{subTopic.title}</h1>
      <div className="text-slate-600 mb-8 space-y-2 leading-7">
        {renderExplanation(subTopic.explanation)}
      </div>

      {subTopic.keyPoints?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Key Points</h2>
          <div className="space-y-3">
            {subTopic.keyPoints.map((point, i) => (
              <div key={i} className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
                {point}
              </div>
            ))}
          </div>
        </section>
      )}

      {subTopic.examples?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
            💡 Examples
          </h2>
          <div className="space-y-4">
            {subTopic.examples.map((ex, i) => (
              <div key={i} className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-white text-slate-600">
                    {ex.difficulty}
                  </span>
                </div>
                <p className="font-medium text-slate-800 mb-1">Q: {ex.question}</p>
                <p className="text-slate-600 text-sm">A: {ex.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {subTopic.shortcuts?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
            ⚡ Shortcuts
          </h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <ul className="space-y-2">
              {subTopic.shortcuts.map((s, i) => (
                <li key={i} className="text-sm text-yellow-800 flex items-start gap-2">
                  <span className="mt-1">•</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {subTopic.tricks?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
            🎯 Tricks
          </h2>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <ul className="space-y-2">
              {subTopic.tricks.map((t, i) => (
                <li key={i} className="text-sm text-purple-800 flex items-start gap-2">
                  <span className="mt-1">•</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {subTopic.shortcutGuides?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
            Shortcut Guide
          </h2>
          <div className="space-y-4">
            {subTopic.shortcutGuides.map((guide, index) => (
              <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900">{guide.title}</h3>
                <p className="text-sm text-yellow-800 mt-2"><strong>When to use:</strong> {guide.whenToUse}</p>
                <p className="text-sm text-yellow-800 mt-2"><strong>Example:</strong> {guide.example}</p>
                <p className="text-sm text-yellow-900 mt-2"><strong>Placement question:</strong> {guide.placementQuestion}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {subTopic.commonMistakes?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
            ⚠️ Common Mistakes
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <ul className="space-y-2">
              {subTopic.commonMistakes.map((m, i) => (
                <li key={i} className="text-sm text-red-800 flex items-start gap-2">
                  <span className="mt-1">•</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {content?.youtubeReferences?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
            🎥 Recommended Videos
          </h2>
          <div className="space-y-3">
            {content.youtubeReferences.map((ref, i) => (
              <a
                key={i}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <p className="font-medium text-slate-800">{ref.title}</p>
                <p className="text-sm text-slate-500 mt-1">{ref.channel}</p>
                <p className="text-xs text-slate-400 mt-1">{ref.description}</p>
              </a>
            ))}
          </div>
        </section>
      )}

      <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
        <Link
          to={`/aptitude/topic/${topicId}/practice`}
          className="flex-1 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium text-center hover:bg-slate-700 transition-colors"
        >
          Practice Questions
        </Link>
        <Link
          to={`/aptitude/topic/${topicId}/test`}
          className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium text-center hover:bg-slate-50 transition-colors"
        >
          Mastery Test
        </Link>
      </div>
    </div>
  );
}