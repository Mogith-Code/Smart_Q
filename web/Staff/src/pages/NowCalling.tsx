import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, CheckCircle2, XCircle } from 'lucide-react';

export const NowCalling: React.FC = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(169); // 02:49

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (total: number) => {
    const m = Math.floor(total / 60)
      .toString()
      .padStart(2, '0');
    const s = (total % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="space-y-6">
      {/* Big Active Calling Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> NOW CALLING
        </span>

        <h1 className="text-7xl font-black text-[#0F172A] tracking-tight">Q-035</h1>
        <p className="text-base text-slate-600 font-medium mt-3">
          Nilufar Rashid · Age 28 · OPD Consultation Room B
        </p>

        <div className="my-8 inline-block bg-slate-50 border border-slate-200 px-8 py-4 rounded-2xl">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
            Consultation Duration
          </span>
          <span className="text-4xl font-black text-[#0F172A] mt-1 block">
            {formatTime(seconds)} <span className="text-sm font-semibold text-slate-400">min</span>
          </span>
        </div>

        <div className="flex justify-center gap-4 max-w-lg mx-auto">
          <button className="flex-1 py-3.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 flex items-center justify-center gap-2">
            <Volume2 size={16} /> Recall Patient
          </button>
          <button
            onClick={() => navigate('/live-queues')}
            className="flex-1 py-3.5 bg-[#0D9488] text-white rounded-xl text-sm font-bold hover:bg-teal-700 transition flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={16} /> Complete Consultation
          </button>
          <button
            onClick={() => navigate('/live-queues')}
            className="py-3.5 px-4 border border-rose-200 text-rose-600 bg-rose-50 rounded-xl text-sm font-semibold hover:bg-rose-100 flex items-center gap-1"
          >
            <XCircle size={16} /> Mark No-Show
          </button>
        </div>
      </div>

      {/* Up Next Strip */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">
          Up Next in Queue
        </span>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/40 flex justify-between items-center">
            <div>
              <span className="text-lg font-black text-[#0F172A]">Q-036</span>
              <p className="text-xs font-semibold text-slate-700 mt-0.5">Kamal Bandara</p>
              <p className="text-[11px] text-purple-700 mt-1">✨ 3:12 PM</p>
            </div>
            <span className="text-xs font-bold text-slate-400">#1 Next</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white flex justify-between items-center">
            <div>
              <span className="text-lg font-black text-[#0F172A]">Q-037</span>
              <p className="text-xs font-semibold text-slate-700 mt-0.5">Dilani Fernando</p>
              <p className="text-[11px] text-purple-700 mt-1">✨ 3:20 PM</p>
            </div>
            <span className="text-xs font-bold text-slate-400">#2 Next</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white flex justify-between items-center">
            <div>
              <span className="text-lg font-black text-[#0F172A]">Q-038</span>
              <p className="text-xs font-semibold text-slate-700 mt-0.5">Ruwan Jayawardena</p>
              <p className="text-[11px] text-purple-700 mt-1">✨ 3:28 PM</p>
            </div>
            <span className="text-xs font-bold text-slate-400">#3 Next</span>
          </div>
        </div>
      </div>
    </div>
  );
};