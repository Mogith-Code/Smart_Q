import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Bot } from 'lucide-react';

export const Layout: React.FC = () => {
  const location = useLocation();

  const getPageMeta = () => {
    switch (location.pathname) {
      case '/dashboard':
        return { title: 'Staff Dashboard' };
      case '/live-queues':
        return { title: 'Live Queue Management' };
      case '/now-calling':
        return { title: 'Live Queue Management' };
      case '/counters':
        return { title: 'Counter & Room Management' };
      case '/verify-patient':
        return { title: 'Verify Patient' };
      case '/notifications':
        return { title: 'System Notifications' };
      case '/profile':
        return { title: 'Staff Profile & Settings' };
      case '/change-password':
      case '/password-success':
        return { title: 'Staff Profile · Security Settings' };
      default:
        return { title: 'Staff Portal' };
    }
  };

  const meta = getPageMeta();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={meta.title} />
        <main className="p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>

        {/* Floating AI Assistant Widget */}
        <div className="fixed bottom-6 right-8 bg-[#0A1E34] text-white px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-xl cursor-pointer hover:bg-slate-800 transition">
          <div className="w-7 h-7 rounded-lg bg-[#0D9488] flex items-center justify-center">
            <Bot size={16} />
          </div>
          <div className="text-left text-xs">
            <p className="font-bold">SmartQ Assistant</p>
            <p className="text-slate-400 text-[10px]">Ask me anything</p>
          </div>
          <span className="w-5 h-5 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center font-bold text-[10px]">
            1
          </span>
        </div>
      </div>
    </div>
  );
};