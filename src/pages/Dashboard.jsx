import { useState, useEffect } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { api } from '@services/api';
import DashboardCard from '@components/DashboardCard';
import { APTITUDE_CATEGORIES, MASTERY_THRESHOLD } from '@data/aptitudeTopics';

export default function Dashboard() {
  const { user } = useAuth();
  const [progress, setProgress] = useState(null);
  const [todayTasks, setTodayTasks] = useState([]);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const res = await api.get('/progress');
      setProgress(res.data);
      setTodayTasks(res.data.todayTasks || []);
    } catch (err) {
      // Use default values if API not available
      setProgress({
        aptitude: {
          currentTopic: 'Number System',
          currentSubTopic: 'Basics',
          overallProgress: 0,
          topicsMastered: 0,
          totalTopics: 37,
          latestTestScore: '-',
          bestScore: '-',
          weakAreas: 'None yet',
          learningStage: 'Getting Started',
        },
        communication: {
          sessionsCompleted: 0,
          averageDuration: '0:00',
          bestDuration: '-',
          streak: 0,
          currentFocus: 'Start Speaking',
        },
      });
      setTodayTasks([
        { type: 'aptitude', label: 'Aptitude Practice', completed: false },
        { type: 'communication', label: 'Communication Practice', completed: false },
      ]);
    }
  };

  const aptitudeStats = progress?.aptitude || {
    currentTopic: 'Number System',
    currentSubTopic: 'Basics',
    overallProgress: 0,
    topicsMastered: 0,
    totalTopics: 37,
    latestTestScore: '-',
    bestScore: '-',
    weakAreas: 'None yet',
    learningStage: 'Getting Started',
  };

  const communicationStats = progress?.communication || {
    sessionsCompleted: 0,
    averageDuration: '0:00',
    bestDuration: '-',
    streak: 0,
    currentFocus: 'Start Speaking',
  };

  const completedCount = todayTasks.filter(t => t.completed).length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Welcome back, {user?.name || 'Student'}
        </h1>
        <p className="text-slate-400 mt-1">Here is your preparation overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <DashboardCard
          title="Aptitude"
          icon="🔢"
          color="blue"
          stats={[
            { label: 'Current Topic', value: aptitudeStats.currentTopic },
            { label: 'Current Sub-topic', value: aptitudeStats.currentSubTopic },
            { label: 'Progress', value: `${aptitudeStats.overallProgress}%` },
            { label: 'Topics Mastered', value: `${aptitudeStats.topicsMastered} / ${aptitudeStats.totalTopics}` },
            { label: 'Last Test', value: aptitudeStats.latestTestScore },
            { label: 'Weak Area', value: aptitudeStats.weakAreas },
          ]}
          actionLabel="Continue Aptitude"
          actionTo="/aptitude"
        />

        <DashboardCard
          title="Communication"
          icon="🎤"
          color="green"
          stats={[
            { label: 'Sessions', value: communicationStats.sessionsCompleted },
            { label: 'Average Duration', value: communicationStats.averageDuration },
            { label: 'Best Duration', value: communicationStats.bestDuration },
            { label: 'Streak', value: `${communicationStats.streak} days` },
            { label: 'Current Focus', value: communicationStats.currentFocus },
          ]}
          actionLabel="Start Speaking"
          actionTo="/communication"
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
          Today's Progress
        </h3>
        <div className="space-y-3">
          {todayTasks.map((task, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs ${
                task.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-slate-300'
              }`}>
                {task.completed && '✓'}
              </span>
              <span className={`text-sm ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                {task.label}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-4">
          {completedCount} / {todayTasks.length} Completed
        </p>
      </div>
    </div>
  );
}
