import React, { useState } from 'react';
import { Search, QrCode, CheckCircle2, UserCheck, Send } from 'lucide-react';

export const VerifyPatient: React.FC = () => {
  const [tokenInput, setTokenInput] = useState('Q-035');
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
          Search Patient
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
            <input
              type="text"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
              placeholder="Search by Token, Mobile or NIC..."
            />
          </div>
          <button className="px-5 py-3 border border-slate-200 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-50">
            <QrCode size={18} /> QR Scan
          </button>
          <button className="px-6 py-3 bg-[#0A2540] text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition">
            Search
          </button>
        </div>
      </div>

      {/* 2-Column Result */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column: Patient Details Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-lg text-[#0F172A]">Nilufar Rashid</h4>
                <p className="text-xs text-slate-400 mt-0.5">Age 28 · 070-567-8901</p>
              </div>
              <span className="px-3 py-1 bg-teal-50 text-[#0D9488] font-bold text-xs rounded-full border border-teal-200">
                Approaching
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs mb-6">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block mb-1">Token</span>
                <span className="font-extrabold text-sm text-[#0F172A]">Q-035</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block mb-1">Service</span>
                <span className="font-extrabold text-sm text-[#0F172A]">General OPD</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block mb-1">Booked</span>
                <span className="font-bold text-[#0F172A]">1:55 PM</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block mb-1">Expected</span>
                <span className="font-bold text-[#0F172A]">2:59 PM</span>
              </div>
            </div>

            {isVerified && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 mb-4">
                <CheckCircle2 size={16} /> QR Code Verified
              </div>
            )}
          </div>

          {!isVerified ? (
            <button
              onClick={() => setIsVerified(true)}
              className="w-full py-3.5 bg-[#0D9488] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-teal-700 transition"
            >
              <UserCheck size={18} /> Verify Patient
            </button>
          ) : (
            <button
              onClick={() => alert('Patient admitted to Consultation Room B')}
              className="w-full py-3.5 bg-[#0A2540] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition"
            >
              Admit to Consultation Room
            </button>
          )}
        </div>

        {/* Right Column: Room 02 Queue Status */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-sm text-[#0F172A]">Room 02 Queue Status</h4>
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Live
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-sky-50/60 rounded-xl border border-sky-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Current Serving
                </span>
                <p className="text-xl font-black text-[#0F172A] mt-1">Q-032</p>
                <p className="text-xs text-slate-500">~3 mins remaining</p>
              </div>

              <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-200">
                <span className="text-[10px] font-bold text-[#0D9488] uppercase tracking-wider block">
                  Next in Line
                </span>
                <p className="text-base font-bold text-[#0F172A] mt-1">Q-035 — Nilufar Rashid</p>
                <p className="text-xs text-slate-500">Expected arrival: 2:55 PM – 3:05 PM</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl text-xs">
                <span className="text-slate-400 block mb-1">Priority / Triage Flag</span>
                <p className="font-semibold text-slate-800">Routine Checkup</p>
                <p className="text-[11px] text-slate-400">No urgent flags · Standard consultation</p>
              </div>
            </div>
          </div>

          <button className="w-full py-3.5 bg-[#0D9488] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-teal-700 transition">
            <Send size={16} /> Send Arrival Alert to Doctor
          </button>
        </div>
      </div>
    </div>
  );
};