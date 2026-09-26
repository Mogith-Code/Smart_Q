import React from 'react';
import { UserCheck, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export const Notifications: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-lg text-[#0F172A]">System Notifications</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs">
              3 unread
            </span>
          </div>
          <button className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-50">
            ✓ Mark All as Read
          </button>
        </div>

        <div className="flex gap-2 mb-6 text-xs">
          <button className="px-4 py-2 rounded-xl bg-[#0A1E34] text-white font-bold">All Alerts</button>
          <button className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">
            Patient Arrival
          </button>
          <button className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">
            Queue Status
          </button>
          <button className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">
            Counter Updates
          </button>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]"></span>
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center">
                <UserCheck size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F172A]">
                  Patient Nilufar Rashid (Token #Q-035) has verified arrival at OPD Counter 02.
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">2 mins ago</p>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#0D9488]"></span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F172A]">
                  OPD Room 02 queue is running at high capacity (18 patients waiting). Consider opening an additional counter.
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">12 mins ago</p>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#0D9488]"></span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F172A]">
                  Consultation completed for Token #Q-032 by Dr. D. Perera. Duration: 6 mins 42 secs.
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">18 mins ago</p>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#0D9488]"></span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 opacity-60">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertCircle size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F172A]">
                  Token #Q-029 marked as No-Show. Next patient (Q-030) has been auto-notified to proceed.
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">35 mins ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};