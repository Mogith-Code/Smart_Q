import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bell, MapPin, QrCode } from 'lucide-react';

export const TokenArrivalWindow: React.FC = () => {
  const [secondsRemaining, setSecondsRemaining] = useState(237); // 3:57
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const strokeDashoffset = 283 - (283 * secondsRemaining) / 600;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans max-w-md mx-auto shadow-2xl border-x border-slate-200">
      {/* 1. Header (Dark Navy) */}
      <header className="bg-[#102A45] text-white px-5 pt-6 pb-6 text-center">
        <button className="flex items-center gap-2 text-sm text-slate-200 mb-4 hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex items-center justify-center gap-2 text-amber-400 text-xs font-bold tracking-wider uppercase mb-1">
          <Bell className="w-4 h-4" />
          <span className="text-white">YOUR ARRIVAL WINDOW HAS STARTED</span>
        </div>

        <h1 className="text-3xl font-extrabold text-white mt-1">Token Q-047</h1>
      </header>

      {/* 2. Main Body */}
      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Countdown Ring Card */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center">
          <p className="text-sm text-slate-500 font-medium mb-5">Please arrive within</p>

          {/* SVG Circular Timer */}
          <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                className="text-slate-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                className="text-[#159A9C] transition-all duration-1000 ease-linear"
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {formatTime(secondsRemaining)}
              </span>
              <span className="text-xs text-slate-400 font-medium">remaining</span>
            </div>
          </div>

          <div className="mt-5 text-xs text-slate-500">
            Arrival window: <strong className="text-[#123B66] font-bold">3:00 PM – 3:10 PM</strong>
          </div>
        </section>

        {/* Institution & Service Card */}
        <section className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs text-slate-400 font-medium block">Institution</span>
              <span className="text-base font-extrabold text-slate-900 block mt-0.5">
                City General Hospital
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 font-medium block">Service</span>
              <span className="text-base font-extrabold text-slate-900 block mt-0.5">OPD</span>
            </div>
          </div>

          <div className="bg-[#EBF4FA] rounded-xl p-3 flex items-center gap-2.5 text-xs text-slate-700">
            <MapPin className="w-4 h-4 text-[#123B66] shrink-0" />
            <span className="truncate">45 Medical Centre Road, Colombo 07</span>
          </div>
        </section>

        {/* Show QR Code Card */}
        <section className="bg-[#E8F4FA] rounded-2xl p-5 border border-[#D0E8F5] text-center">
          <h3 className="text-xs font-extrabold text-[#123B66] uppercase tracking-wider mb-4">
            SHOW QR AT RECEPTION
          </h3>
          <div className="w-36 h-36 bg-white rounded-2xl mx-auto p-4 shadow-sm flex items-center justify-center">
            <QrCode className="w-28 h-28 text-[#123B66]" />
          </div>
          <p className="text-xs text-slate-500 font-medium mt-4">Booking ID: SQ-2026-09247</p>
        </section>

        {/* Action Button */}
        <button
          onClick={() => setArrived(true)}
          className={`w-full h-12 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all text-sm ${
            arrived ? 'bg-emerald-600' : 'bg-[#159A9C] hover:bg-[#128688]'
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span>{arrived ? 'Arrival Confirmed ✓' : 'I Have Arrived'}</span>
        </button>
      </main>
    </div>
  );
};
