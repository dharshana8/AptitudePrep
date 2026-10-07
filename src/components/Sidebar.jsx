import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/aptitude', label: 'Aptitude', icon: '🔢' },
  { to: '/communication', label: 'Communication', icon: '🎤' },
  { to: '/progress', label: 'Progress', icon: '📈' },
  { to: '/history', label: 'History', icon: '📝' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-lg font-bold text-slate-800">AptitudePrep</h1>
        <p className="text-xs text-slate-400 mt-1">Personal Preparation</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
        {user?.role === 'admin' && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`
            }
          >
            <span className="text-base">🛠️</span>
            <span>Admin</span>
          </NavLink>
        )}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
        >
          <span className="text-base">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
