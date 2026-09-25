import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Clock, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 mb-3">
            <Users size={20} />
          </div>
          <h3 className="text-3xl font-extrabold text-[#0F172A]">187</h3>
          <p className="text-xs text-slate-500 mt-1">Today's Bookings</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-amber-200 bg-amber-50/20">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mb-3">
            <Clock size={20} />
          </div>
          <h3 className="text-3xl font-extrabold text-[#0F172A]">18</h3>
          <p className="text-xs text-slate-500 mt-1">Currently Waiting</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-emerald-200 bg-emerald-50/20">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
            <CheckCircle2 size={20} />
          </div>
          <h3 className="text-3xl font-extrabold text-[#0F172A]">142</h3>
          <p className="text-xs text-slate-500 mt-1">Completed</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-rose-200 bg-rose-50/20">
          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 mb-3">
            <AlertTriangle size={20} />
          </div>
          <h3 className="text-3xl font-extrabold text-[#0F172A]">7</h3>
          <p className="text-xs text-slate-500 mt-1">No-Shows</p>
        </div>
      </div>

      {/* Main Grid: Live Queue & Performance */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-base text-[#0F172A]">Live Queue — OPD Room 02</h3>
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                <p className="text-xs text-slate-500 font-medium">Now Serving</p>
                <p className="text-2xl font-black text-[#0F172A] mt-1">#32</p>
                <p className="text-[11px] text-slate-500 mt-1">Consultation: 04:15 min</p>
              </div>

              <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                <p className="text-xs text-slate-500 font-medium">Waiting</p>
                <p className="text-2xl font-black text-amber-600 mt-1">18</p>
              </div>

              <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                <p className="text-xs text-slate-500 font-medium">Avg Wait</p>
                <p className="text-2xl font-black text-[#0D9488] mt-1">32 min</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/now-calling')}
              className="flex-1 py-3.5 bg-[#0A2540] text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition"
            >
              Call Next
            </button>
            <button className="px-6 py-3.5 border border-amber-200 text-amber-700 bg-amber-50 rounded-xl text-sm font-semibold hover:bg-amber-100 transition">
              Pause Queue
            </button>
            <button
              onClick={() => navigate('/verify-patient')}
              className="px-6 py-3.5 bg-teal-50 text-[#0D9488] border border-teal-200 rounded-xl text-sm font-semibold hover:bg-teal-100 transition"
            >
              Verify
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-[#0F172A] mb-4">Performance</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-500">Avg Consultation Time</span>
                <span className="font-bold text-sm text-[#0F172A]">
                  6.8 min <span className="text-xs text-emerald-600">↓ 0.4 min</span>
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-500">Completion Rate</span>
                <span className="font-bold text-sm text-[#0F172A]">
                  94.2% <span className="text-xs text-emerald-600">↑ 1.1%</span>
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-slate-500">Current Wait Time</span>
                <span className="font-bold text-sm text-[#0F172A]">
                  32 min <span className="text-xs text-emerald-600">↓ 3 min</span>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-purple-50 border border-purple-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700 uppercase tracking-wide">
              <Sparkles size={14} /> AI Prediction Accuracy
            </div>
            <p className="text-2xl font-black text-purple-900 mt-1">93.8%</p>
            <p className="text-[11px] text-purple-600 mt-0.5">±3 mins variance · Today</p>
          </div>
        </div>
      </div>
    </div>
  );
};