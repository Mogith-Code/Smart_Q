import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Monitor, UserCheck, Bell, User, LogOut } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/live-queues', label: 'Live Queues', icon: Users },
    { to: '/counters', label: 'Counters', icon: Monitor },
    { to: '/verify-patient', label: 'Verify Patient', icon: UserCheck },
    { to: '/notifications', label: 'Notifications', icon: Bell, badge: 4 },
    { to: '/profile', label: 'Staff Profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-[#0A1E34] text-white flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div>
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-9 h-9 rounded-lg bg-[#0D9488] flex items-center justify-center font-bold text-white shadow-md">
            SQ
          </div>
          <div>
            <h1 className="font-bold text-base leading-tight tracking-wide">SmartQ</h1>
            <p className="text-xs text-slate-400">Staff Portal</p>
          </div>
        </div>

        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#0D9488] text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-amber-400 text-slate-900 font-bold text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800">
        <NavLink
          to="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-slate-800/40 transition-colors"
        >
          <LogOut size={18} />
          <span>Exit Portal</span>
        </NavLink>
      </div>
    </aside>
  );
};