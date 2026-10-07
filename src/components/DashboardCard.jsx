import { useNavigate } from 'react-router-dom';

export default function DashboardCard({ title, icon, stats, actionLabel, actionTo, color = 'blue' }) {
  const navigate = useNavigate();

  const borderColor = {
    blue: 'border-l-blue-500',
    green: 'border-l-green-500',
    purple: 'border-l-purple-500',
  };

  return (
    <div className={`bg-white rounded-xl border border-slate-200 border-l-4 ${borderColor[color]} p-6`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>

      <div className="space-y-3 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className="flex justify-between items-center">
            <span className="text-sm text-slate-500">{stat.label}</span>
            <span className="text-sm font-medium text-slate-700">{stat.value}</span>
          </div>
        ))}
      </div>

      {actionLabel && (
        <button
          onClick={() => navigate(actionTo)}
          className="w-full py-2.5 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
