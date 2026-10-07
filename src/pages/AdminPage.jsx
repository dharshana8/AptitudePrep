import { useEffect, useState } from 'react';
import { api } from '@services/api';

const emptyQuestions = JSON.stringify([
    {
        question: 'What is 10% of 200?',
        options: ['10', '20', '30', '40'],
        correctAnswer: '20',
        explanation: '10/100 x 200 = 20',
        topic: 'custom',
        subTopic: 'percentage',
        difficulty: 'Easy',
    },
], null, 2);

export default function AdminPage() {
    const [members, setMembers] = useState([]);
    const [results, setResults] = useState([]);
    const [tests, setTests] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(30);
    const [questions, setQuestions] = useState(emptyQuestions);
    const [message, setMessage] = useState('');

    const loadAdminData = async () => {
        try {
            const [membersResponse, resultsResponse, testsResponse] = await Promise.all([
                api.get('/admin/members'),
                api.get('/admin/results'),
                api.get('/admin/tests'),
            ]);
            setMembers(membersResponse.data);
            setResults(resultsResponse.data);
            setTests(testsResponse.data);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Unable to load admin data');
        }
    };

    useEffect(() => {
        loadAdminData();
    }, []);

    const createTest = async event => {
        event.preventDefault();
        setMessage('');
        try {
            const parsedQuestions = JSON.parse(questions);
            await api.post('/admin/tests', { title, description, duration, questions: parsedQuestions });
            setTitle('');
            setDescription('');
            setQuestions(emptyQuestions);
            setMessage('Test created successfully');
            loadAdminData();
        } catch (error) {
            setMessage(error.response?.data?.message || 'Questions must be valid JSON');
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
                <p className="text-slate-500 mt-1">Manage members, create tests, and review performance.</p>
            </div>

            {message && <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-sm">{message}</div>}

            <section className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Create a Custom Test</h2>
                <form onSubmit={createTest} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input value={title} onChange={event => setTitle(event.target.value)} placeholder="Test title" required className="border border-slate-300 rounded-lg px-3 py-2 text-sm" />
                        <input value={description} onChange={event => setDescription(event.target.value)} placeholder="Description" className="border border-slate-300 rounded-lg px-3 py-2 text-sm" />
                        <input type="number" min="1" value={duration} onChange={event => setDuration(Number(event.target.value))} placeholder="Duration (minutes)" className="border border-slate-300 rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <textarea value={questions} onChange={event => setQuestions(event.target.value)} rows="12" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono" aria-label="Test questions JSON" />
                    <button type="submit" className="px-5 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700">Create Test</button>
                </form>
            </section>

            <section>
                <h2 className="text-lg font-semibold text-slate-800 mb-3">Members and Progress</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {members.map(member => (
                        <div key={member._id} className="bg-white rounded-xl border border-slate-200 p-5">
                            <div className="flex justify-between gap-3">
                                <div><h3 className="font-semibold text-slate-800">{member.name}</h3><p className="text-sm text-slate-500">{member.email}</p></div>
                                <span className="text-xs text-slate-400">{member.createdAt ? new Date(member.createdAt).toLocaleDateString() : ''}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3 mt-5 text-sm">
                                <div><p className="text-slate-400">Tests</p><p className="font-semibold">{member.testsTaken}</p></div>
                                <div><p className="text-slate-400">Avg score</p><p className="font-semibold">{member.averageTestScore}%</p></div>
                                <div><p className="text-slate-400">Speaking</p><p className="font-semibold">{member.speakingSessions}</p></div>
                            </div>
                            <p className="text-xs text-slate-500 mt-4">Completed lessons: {member.progress?.communication?.completedLessons?.length || 0}</p>
                            <p className="text-xs text-slate-500">Mastered topics: {member.progress?.aptitude?.masteredTopics?.length || 0}</p>
                        </div>
                    ))}
                    {members.length === 0 && <p className="text-sm text-slate-400">No members found.</p>}
                </div>
            </section>

            <section className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Test Results</h2>
                <div className="space-y-2">
                    {results.map(result => (
                        <div key={result._id} className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 py-3 text-sm">
                            <div><p className="font-medium text-slate-700">{result.member?.name} · {result.topicId}</p><p className="text-xs text-slate-400">{result.member?.email}</p></div>
                            <span className={result.mastered ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>{result.score}% · {result.mastered ? 'Mastered' : 'Retry'}</span>
                        </div>
                    ))}
                    {results.length === 0 && <p className="text-sm text-slate-400">No test results yet.</p>}
                </div>
            </section>

            <section className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Custom Tests</h2>
                <div className="space-y-2">
                    {tests.map(test => <div key={test._id} className="flex justify-between border-b border-slate-100 py-3 text-sm"><span className="font-medium text-slate-700">{test.title}</span><span className="text-slate-400">{test.questions?.length || 0} questions · {test.duration} min</span></div>)}
                    {tests.length === 0 && <p className="text-sm text-slate-400">No custom tests created yet.</p>}
                </div>
            </section>
        </div>
    );
}
