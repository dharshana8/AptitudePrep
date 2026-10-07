import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '@services/api';
import { communicationLessons } from '@data/communicationContent';

function renderExplanation(text) {
  return text.split('\n').map((line, index) => {
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

export default function CommunicationLearnPage() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLesson();
  }, [lessonId]);

  const loadLesson = async () => {
    const found = communicationLessons.find(l => l.id === lessonId);
    setLesson(found);
    try {
      const res = await api.get('/communication/progress');
      setCompleted(res.data.completedLessons?.includes(lessonId) || false);
    } catch { }
    setLoading(false);
  };

  const handleComplete = async () => {
    try {
      await api.post('/communication/lesson/complete', { lessonId });
      setCompleted(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-slate-400">Loading...</div>;
  if (!lesson) return <div className="text-center py-12">Lesson not found</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Link to="/communication/learn" className="text-sm text-slate-500 hover:text-slate-700">
          ← Back to Lessons
        </Link>
        <button
          onClick={handleComplete}
          disabled={completed}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${completed ? 'bg-green-100 text-green-700 cursor-default' : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
        >
          {completed ? 'Completed ✓' : 'Mark Complete'}
        </button>
      </div>

      <h1 className="text-2xl font-bold text-slate-800 mb-2">{lesson.title}</h1>
      <div className="text-slate-600 mb-8 space-y-2 leading-7">
        {renderExplanation(lesson.explanation)}
      </div>

      {lesson.objective && (
        <section className="mb-8 p-5 bg-slate-800 text-white rounded-xl">
          <p className="text-xs uppercase tracking-wide text-slate-300 mb-2">Lesson Objective</p>
          <p className="leading-6">{lesson.objective}</p>
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">💡 Key Tips</h2>
        <div className="space-y-2">
          {lesson.tips.map((tip, i) => (
            <div key={i} className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800 flex items-start gap-2">
              <span className="mt-1">•</span>
              {tip}
            </div>
          ))}
        </div>
      </section>

      {lesson.modelAnswer && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">🗣️ Model Opening</h2>
          <div className="p-5 bg-green-50 border border-green-200 rounded-lg text-green-900 leading-7">
            “{lesson.modelAnswer}”
          </div>
        </section>
      )}

      {lesson.practiceDrill && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">🎯 Practice Drill</h2>
          <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-900 leading-7">
            {lesson.practiceDrill}
          </div>
        </section>
      )}

      {lesson.selfCheck?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">✅ Self-Check</h2>
          <div className="space-y-2">
            {lesson.selfCheck.map((item, index) => (
              <label key={index} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg text-sm text-slate-700">
                <input type="checkbox" className="mt-1" />
                {item}
              </label>
            ))}
          </div>
        </section>
      )}

      {lesson.youtubeReference && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">🎥 Recommended Video</h2>
          <a
            href={lesson.youtubeReference.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <p className="font-medium text-slate-800">{lesson.youtubeReference.title}</p>
            <p className="text-sm text-slate-500 mt-1">{lesson.youtubeReference.channel}</p>
          </a>
        </section>
      )}

      <Link to="/communication/learn" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors">
        Back to Lessons
      </Link>
    </div>
  );
}