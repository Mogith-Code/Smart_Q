import React, { useState } from 'react';
import { ArrowLeft, Home, Clock, History, User } from 'lucide-react';

interface HistoryItem {
  id: string;
  institutionName: string;
  departmentName: string;
  tokenNumber: string;
  date: string;
  time: string;
  status: 'Waiting' | 'Served' | 'Cancelled';
}

export const QueueHistory: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Active' | 'Completed' | 'Cancelled'>('Active');

  const allItems: HistoryItem[] = [
    {
      id: '1',
      institutionName: 'City General Hospital',
      departmentName: 'OPD',
      tokenNumber: 'Q-047',
      date: '25 Sep 2026',
      time: '3:05 PM',
      status: 'Waiting',
    },
    {
      id: '2',
      institutionName: 'City General Hospital',
      departmentName: 'Laboratory',
      tokenNumber: 'Q-021',
      date: '18 Sep 2026',
      time: '10:30 AM',
      status: 'Served',
    },
    {
      id: '3',
      institutionName: 'ABC Bank',
      departmentName: 'General Banking',
      tokenNumber: 'Q-008',
      date: '12 Sep 2026',
      time: '11:15 AM',
      status: 'Served',
    },
    {
      id: '4',
      institutionName: 'Divisional Secretariat',
      departmentName: 'Birth Certificates',
      tokenNumber: 'Q-034',
      date: '05 Sep 2026',
      time: '9:00 AM',
      status: 'Cancelled',
    },
    {
      id: '5',
      institutionName: 'City General Hospital',
      departmentName: 'Cardiology',
      tokenNumber: 'Q-015',
      date: '28 Aug 2026',
      time: '2:00 PM',
      status: 'Served',
    },
  ];

  const filteredItems = allItems.filter((item) => {
    if (activeFilter === 'Active') return item.status === 'Waiting';
    if (activeFilter === 'Completed') return item.status === 'Served';
    if (activeFilter === 'Cancelled') return item.status === 'Cancelled';
    return true;
  });

  const getStatusBadge = (status: HistoryItem['status']) => {
    switch (status) {
      case 'Waiting':
        return <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">Waiting</span>;
      case 'Served':
        return <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">Served</span>;
      case 'Cancelled':
        return <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">Cancelled</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans max-w-md mx-auto shadow-2xl border-x border-slate-200">
      {/* 1. Header (Dark Navy) */}
      <header className="bg-[#102A45] text-white px-5 pt-6 pb-6">
        <button className="flex items-center gap-2 text-sm text-slate-200 mb-4 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-2xl font-bold tracking-tight text-white">Queue History</h1>
      </header>

      {/* 2. Filter Pills Bar */}
      <div className="p-4 overflow-x-auto flex gap-2 scrollbar-none bg-slate-50">
        {(['All', 'Active', 'Completed', 'Cancelled'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeFilter === filter
                ? 'bg-[#123B66] text-white shadow-sm'
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* 3. List of Filtered Items */}
      <main className="flex-1 px-4 pb-4 space-y-3 overflow-y-auto">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3 cursor-pointer hover:border-slate-300 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-base font-bold text-slate-900">{item.institutionName}</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{item.departmentName}</p>
              </div>
              {getStatusBadge(item.status)}
            </div>

            <div className="grid grid-cols-3 text-xs pt-1">
              <div>
                <span className="text-slate-400 block font-normal">Token</span>
                <span className="text-base font-extrabold text-[#123B66] block mt-0.5">
                  {item.tokenNumber}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-normal">Date</span>
                <span className="text-sm font-bold text-[#123B66] block mt-0.5">{item.date}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-normal">Time</span>
                <span className="text-sm font-bold text-[#123B66] block mt-0.5">{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* 4. Bottom Navigation Bar */}
      <nav className="bg-white border-t border-slate-200 py-2 px-6 flex justify-between items-center text-xs">
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <Clock className="w-5 h-5" />
          <span>My Queue</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#123B66] font-bold">
          <History className="w-5 h-5" />
          <span>History</span>
          <span className="w-1 h-1 rounded-full bg-[#123B66]"></span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <User className="w-5 h-5" />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
};
