import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export const StaffLogin: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between items-center p-6">
      <div className="w-full max-w-6xl flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-[#0D9488] text-white flex items-center justify-center font-bold text-xs">
            SQ
          </div>
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
          <div className="w-12 h-12 rounded-xl bg-[#0D9488] flex items-center justify-center font-bold mx-auto mb-3 shadow">
            SQ
          </div>
          <h2 className="text-xl font-bold">SmartQ Staff Portal</h2>
          <p className="text-xs text-slate-300 mt-1">City General Hospital — OPD Staff Login</p>
        </div>

        <form
          className="p-8 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            navigate('/dashboard');
          }}
        >
          <div>
            <label className="block text-xs font-bold tracking-wider text-slate-500 uppercase mb-2">
              Staff ID / Email
            </label>
            <input
              type="text"
              defaultValue="STF-2026-042"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
              placeholder="e.g. STF-2026-042 or d.perera@hospital.gov.lk"
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider text-slate-500 uppercase mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                defaultValue="password123"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider text-slate-500 uppercase mb-2">
              Assign Counter
            </label>
            <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] bg-white">
              <option>OPD Counter 02 (General OPD)</option>
              <option>OPD Counter 01 (General OPD)</option>
              <option>OPD Counter 05 (Cardiology OPD)</option>
            </select>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#0D9488]" />
              Remember this device
            </label>
            <a href="#" className="text-[#0D9488] font-semibold hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#0A2540] text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition"
          >
            Sign In to Counter
          </button>

          <p className="text-center text-[11px] text-slate-400 pt-2">
            Authorized hospital medical personnel only
          </p>
        </form>
      </div>

      <div className="text-[11px] text-slate-400 py-3">
        SmartQ · AI-Powered Virtual Queue Management · City General Hospital
      </div>
    </div>
  );
};