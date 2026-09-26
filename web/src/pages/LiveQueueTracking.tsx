import React, { useState } from 'react';
import { ArrowLeft, Brain, Bell, ArrowRight, Home, Clock, History, User } from 'lucide-react';

export const LiveQueueTracking: React.FC = () => {
  const [nowServing, setNowServing] = useState(32);
  const [peopleAhead, setPeopleAhead] = useState(15);
  const [estWait, setEstWait] = useState(42);
  const [status, setStatus] = useState('Waiting');
  const [arrivalWindow, setArrivalWindow] = useState('3:00 PM – 3:10 PM');

  // Progression grid data generator (Tokens 29 to 48)
  const tokens = Array.from({ length: 20 }, (_, i) => {
    const num = 29 + i;
    if (num < nowServing) return { num, label: `${num}`, type: 'served' };
    if (num === nowServing) return { num, label: `${num}`, type: 'serving' };
    if (num === 47) return { num, label: 'YOU', type: 'user' };
    return { num, label: `${num}`, type: 'waiting' };
  });

  const handleSimulate = () => {
    setNowServing((prev) => prev + 1);
    setPeopleAhead((prev) => Math.max(0, prev - 1));
    setEstWait((prev) => Math.max(0, prev - 3));
    setArrivalWindow('2:55 PM – 3:05 PM');
    setStatus('Arriving Soon');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans max-w-md mx-auto shadow-2xl border-x border-slate-200">
      {/* 1. Header Area */}
      <header className="bg-[#102A45] text-white px-5 pt-6 pb-6 rounded-b-none">
        <button className="flex items-center gap-2 text-sm text-slate-200 hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Live Queue</h1>
            <p className="text-slate-400 text-xs mt-1">City General Hospital · OPD</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0D3328] text-[#22C55E] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            Live
          </span>
        </div>
      </header>

      {/* 2. Main Scrollable Content */}
      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Token Status Hero Card */}
        <section className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-2 gap-3">
            {/* Now Serving */}
            <div className="bg-[#EBF4FA] rounded-xl p-4 text-center">
              <span className="text-xs text-slate-500 font-medium">Now Serving</span>
              <div className="text-3xl font-extrabold text-[#123B66] mt-1">#{nowServing}</div>
            </div>
            {/* Your Token */}
            <div className="bg-[#123B66] text-white rounded-xl p-4 text-center">
              <span className="text-xs text-slate-300 font-medium">Your Token</span>
              <div className="text-3xl font-extrabold text-white mt-1">Q-047</div>
            </div>
          </div>

          <hr className="my-4 border-slate-100" />

          {/* Metrics Bar */}
          <div className="grid grid-cols-3 text-center divide-x divide-slate-100">
            <div>
              <div className="text-xl font-extrabold text-slate-900">{peopleAhead}</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Ahead</div>
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">{estWait} min</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Est. Wait</div>
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">3:05 PM</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">By</div>
            </div>
          </div>
        </section>

        {/* Smart Prediction Card */}
        <section className="bg-[#E8F4FA] rounded-2xl p-4 border border-[#D0E8F5]">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#159A9C]" />
              <h2 className="font-bold text-[#123B66] text-sm">Smart Prediction</h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
              High Confidence
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
            <div>
              <span className="text-slate-500 block">Estimated Wait</span>
              <span className="font-bold text-slate-900 text-sm">{estWait} minutes</span>
            </div>
            <div>
              <span className="text-slate-500 block">Expected Service</span>
              <span className="font-bold text-slate-900 text-sm">3:05 PM</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Based on current queue movement, historical patterns, and 3 active counters.
          </p>
        </section>

        {/* Queue Progression Grid Card */}
        <section className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            QUEUE PROGRESSION
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {tokens.map((token) => {
              let style = 'bg-white text-slate-600 border border-slate-200';
              if (token.type === 'served') style = 'bg-[#E6F4EA] text-[#1E7E34] font-semibold';
              if (token.type === 'serving') style = 'bg-[#123B66] text-white font-extrabold';
              if (token.type === 'user') style = 'bg-[#159A9C] text-white font-extrabold ring-2 ring-[#159A9C]/30';

              return (
                <div
                  key={token.num}
                  className={`h-9 rounded-lg flex items-center justify-center text-xs ${style}`}
                >
                  {token.label}
                </div>
              );
            })}
          </div>
          <div className="text-right text-[11px] text-slate-400 mt-2">Updated 2:18 PM</div>
        </section>

        {/* Notifications Enabled Banner */}
        <section className="bg-[#FFFBEB] rounded-2xl p-4 border border-[#FDE68A] flex items-start gap-3">
          <Bell className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-amber-900 text-xs">Notifications Enabled</h4>
            <p className="text-xs text-amber-800 mt-1 leading-relaxed">
              You'll receive an alert when you're 5 positions away and when your arrival window starts.
            </p>
          </div>
        </section>

        {/* Arrival Window Card */}
        <section className="bg-white rounded-2xl p-4 border border-slate-200 flex justify-between items-center">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Arrival Window</span>
            <span className="text-base font-bold text-slate-900 mt-0.5 block">{arrivalWindow}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500 font-medium block">Status</span>
            <span className="inline-block mt-1 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
              {status}
            </span>
          </div>
        </section>

        {/* Action Button */}
        <button
          onClick={handleSimulate}
          className="w-full h-12 bg-[#159A9C] hover:bg-[#128688] active:scale-[0.99] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#159A9C]/20 transition-all text-sm"
        >
          <span>Simulate Arrival Window</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </main>

      {/* 3. Bottom Navigation Bar */}
      <nav className="bg-white border-t border-slate-200 py-2 px-6 flex justify-between items-center text-xs">
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#123B66] font-bold">
          <Clock className="w-5 h-5" />
          <span>My Queue</span>
          <span className="w-1 h-1 rounded-full bg-[#123B66]"></span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <History className="w-5 h-5" />
          <span>History</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <User className="w-5 h-5" />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
};
