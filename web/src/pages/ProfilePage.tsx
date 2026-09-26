import React from 'react';
import {
  ArrowLeft,
  Bell,
  Globe,
  Lock,
  HelpCircle,
  FileText,
  ChevronRight,
  LogOut,
  Home,
  Clock,
  History,
  User,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const user = {
    fullName: 'Kasun Perera',
    initials: 'KP',
    email: 'kasun@email.com',
    mobile: '+94 71 234 5678',
    memberSince: 'Jan 2026',
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans max-w-md mx-auto shadow-2xl border-x border-slate-200">
      {/* 1. Header (Dark Navy) */}
      <header className="bg-[#102A45] text-white px-5 pt-6 pb-6">
        <button className="flex items-center gap-2 text-sm text-slate-200 mb-5 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* User Info Avatar Row */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#159A9C] text-white font-extrabold text-2xl flex items-center justify-center shrink-0">
            {user.initials}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">{user.fullName}</h1>
            <p className="text-slate-400 text-xs mt-0.5">{user.email}</p>
            <p className="text-slate-400 text-xs mt-0.5">{user.mobile}</p>
          </div>
        </div>
      </header>

      {/* 2. Main Body Content */}
      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Personal Information Card */}
        <section className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            PERSONAL INFORMATION
          </h2>
          <div className="grid grid-cols-2 gap-4 text-xs pt-1">
            <div>
              <span className="text-slate-400 block font-normal">Full Name</span>
              <span className="text-sm font-bold text-[#123B66] block mt-0.5">
                {user.fullName}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-normal">Mobile</span>
              <span className="text-sm font-bold text-[#123B66] block mt-0.5">{user.mobile}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-normal">Email</span>
              <span className="text-sm font-bold text-[#123B66] block mt-0.5 truncate">
                {user.email}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-normal">Member Since</span>
              <span className="text-sm font-bold text-[#123B66] block mt-0.5">
                {user.memberSince}
              </span>
            </div>
          </div>
        </section>

        {/* Settings Navigation Menu Card */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
          <div className="p-3.5 flex items-center gap-3.5 hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-[#EBF4FA] text-[#123B66] flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
              <p className="text-xs text-slate-500 mt-0.5">Push notifications, alerts</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </div>

          <div className="p-3.5 flex items-center gap-3.5 hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-[#EBF4FA] text-[#123B66] flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-900">Language</h3>
              <p className="text-xs text-slate-500 mt-0.5">English</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </div>

          <div className="p-3.5 flex items-center gap-3.5 hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-[#EBF4FA] text-[#123B66] flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-900">Privacy & Security</h3>
              <p className="text-xs text-slate-500 mt-0.5">Password, 2FA</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </div>

          <div className="p-3.5 flex items-center gap-3.5 hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-[#EBF4FA] text-[#123B66] flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-900">Help & Support</h3>
              <p className="text-xs text-slate-500 mt-0.5">FAQ, contact us</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </div>

          <div className="p-3.5 flex items-center gap-3.5 hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-[#EBF4FA] text-[#123B66] flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-900">Terms & Privacy Policy</h3>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </div>
        </section>

        {/* Sign Out Button */}
        <button className="w-full h-12 bg-white text-red-600 border border-red-500 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-red-50 transition-all text-sm">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>

        {/* Footer Version */}
        <p className="text-center text-xs text-slate-400 py-2">
          SmartQ v2.4.1 · Your Time. Your Queue. Smarter.
        </p>
      </main>

      {/* 3. Bottom Navigation Bar */}
      <nav className="bg-white border-t border-slate-200 py-2 px-6 flex justify-between items-center text-xs">
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <Clock className="w-5 h-5" />
          <span>My Queue</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <History className="w-5 h-5" />
          <span>History</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#123B66] font-bold">
          <User className="w-5 h-5" />
          <span>Profile</span>
          <span className="w-1 h-1 rounded-full bg-[#123B66]"></span>
        </button>
      </nav>
    </div>
  );
};
