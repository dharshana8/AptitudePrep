import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@services/api';
import { communicationLessons } from '@data/communicationContent';

const categoryTitles = {
    techniques: 'Speaking Techniques',
    vocabulary: 'Vocabulary',
    impromptu: 'Impromptu Speaking',
    fluency: 'Fluency',
};

export default function CommunicationLessonsPage() {
    const [completedLessons, setCompletedLessons] = useState([]);

    useEffect(() => {
        api.get('/communication/progress')
            .then(response => setCompletedLessons(response.data.completedLessons || []))
            .catch(() => setCompletedLessons([]));
    }, []);

    const categories = [...new Set(communicationLessons.map(lesson => lesson.category))];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <Link to="/communication" className="text-sm text-slate-500 hover:text-slate-700">
                    ← Back to Communication
                </Link>
                <div className="mt-6 flex items-end justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Communication Lessons</h1>
                        <p className="text-slate-500 mt-1">Build confidence, structure, vocabulary, and fluency step by step.</p>
                    </div>
                    <span className="text-sm text-slate-400 whitespace-nowrap">
                        {completedLessons.length}/{communicationLessons.length} complete
                    </span>
                </div>
            </div>

            <div className="space-y-8">
                {categories.map(category => (
                    <section key={category}>
                        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                            {categoryTitles[category] || category}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {communicationLessons
                                .filter(lesson => lesson.category === category)
                                .map(lesson => {
                                    const completed = completedLessons.includes(lesson.id);
                                    const summary = lesson.explanation.split('\n').find(line => line.trim() && !line.startsWith('**'));
                                    return (
                                        <Link
                                            key={lesson.id}
                                            to={`/communication/learn/${lesson.id}`}
                                            className={`block p-5 rounded-xl border transition-colors ${completed
                                                ? 'border-green-200 bg-green-50 hover:border-green-300'
                                                : 'border-slate-200 bg-white hover:border-blue-300'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <h3 className="font-semibold text-slate-800">{lesson.title}</h3>
                                                    <p className="text-sm text-slate-500 mt-2 leading-6">{summary}</p>
                                                </div>
                                                <span className={`text-xs font-medium whitespace-nowrap ${completed ? 'text-green-600' : 'text-blue-600'}`}>
                                                    {completed ? 'Completed' : 'Start lesson'}
                                                </span>
                                            </div>
                                        </Link>
                                    );
                                })}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
