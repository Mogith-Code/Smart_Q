import React from 'react';
import { Monitor, Pause, Play, XCircle } from 'lucide-react';

export const Counters: React.FC = () => {
  const counters = [
    { id: '01', doc: 'Dr. D. Perera', service: 'General OPD', served: 48, queue: '4 Waiting', status: 'Active' },
    { id: '02', doc: 'Dr. S. Wickrama', service: 'General OPD', served: 42, queue: '6 Waiting', status: 'Active' },
    { id: '03', doc: 'Dr. K. Fernando', service: 'Pediatrics OPD', served: 31, queue: '0 Waiting', status: 'Paused' },
    { id: '04', doc: 'Unassigned Room', service: '—', served: 0, queue: '—', status: 'Inactive' },
    { id: '05', doc: 'Dr. R. Jayasinghe', service: 'Cardiology OPD', served: 14, queue: '2 Waiting', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h3 className="text-lg font-bold text-[#0F172A]">Counter & OPD Room Management</h3>
        <p className="text-xs text-slate-500">City General Hospital</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {counters.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                    <Monitor size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0F172A]">Counter {c.id}</h4>
                    <p className="text-xs text-slate-500">{c.doc}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{c.service}</p>
                  </div>
                </div>

                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    c.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : c.status === 'Paused'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {c.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 py-3 border-t border-slate-100 text-xs mb-4">
                <div>
                  <span className="text-slate-400 block">Served Today</span>
                  <span className="font-extrabold text-[#0F172A] text-base">{c.served}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Queue</span>
                  <span className="font-extrabold text-[#0F172A] text-base">{c.queue}</span>
                </div>
              </div>
            </div>

            {c.status === 'Active' && (
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl text-xs font-semibold hover:bg-amber-100 flex items-center justify-center gap-1">
                  <Pause size={12} /> Pause
                </button>
                <button className="flex-1 py-2 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold hover:bg-rose-100 flex items-center justify-center gap-1">
                  <XCircle size={12} /> Close
                </button>
              </div>
            )}

            {c.status === 'Paused' && (
              <button className="w-full py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold hover:bg-emerald-100 flex items-center justify-center gap-1">
                <Play size={12} /> Resume
              </button>
            )}

            {c.status === 'Inactive' && (
              <button className="w-full py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50">
                Open Counter
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};