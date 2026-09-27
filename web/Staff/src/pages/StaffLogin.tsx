import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export const StaffLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('perera.d@hospital.lk');
  const [password, setPassword] = useState('••••••••');

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between items-center p-6">
      <div className="w-full max-w-6xl flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="SmartQ Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold text-[#0F172A] text-sm">SmartQ</span>
          <span className="text-xs text-slate-400 ml-1">Staff Portal</span>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          System Online
        </span>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-[#0A1E34] p-8 text-center text-white">
          <img src="/logo.png" alt="SmartQ Logo" className="w-14 h-14 object-contain mx-auto mb-3 drop-shadow" />
          <h2 className="text-xl font-bold">SmartQ Staff Portal</h2>
          <p className="text-xs text-slate-300 mt-1">City General Hospital — OPD Staff Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Work Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 text-slate-400" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all"
                placeholder="name@hospital.lk"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 text-slate-400" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-[#0D9488] hover:bg-[#0b7c72] text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <span>Log In to Dashboard</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Hospital Queue Management System • SmartQ
        </p>
      </div>
    </div>
  );
};

export default StaffLogin;