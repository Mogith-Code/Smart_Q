import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle = 'City General Hospital · OPD Counter 02',
}) => {
  const navigate = useNavigate();

  return (
    <header className="h-20 bg-white border-b border-[#E2E8F0] px-8 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h2 className="text-xl font-bold text-[#0F172A]">{title}</h2>
        <p className="text-xs text-[#64748B] mt-0.5">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/notifications')}
          className="relative w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition"
        >
          <Bell size={18} className="text-slate-600" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-amber-400"></span>
        </button>

        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-3 pl-2 pr-3 py-1.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition"
        >
          <div className="w-8 h-8 rounded-lg bg-[#0A1E34] text-white flex items-center justify-center text-xs font-bold">
            DP
          </div>
          <span className="text-sm font-semibold text-[#0F172A]">Dr. D. Perera</span>
          <ChevronDown size={14} className="text-slate-400" />
        </button>
      </div>
    </header>
  );
};