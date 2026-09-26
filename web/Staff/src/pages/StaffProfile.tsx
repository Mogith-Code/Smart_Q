import React from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, LogOut, Edit3 } from 'lucide-react';

export const StaffProfile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="bg-[#0A1E34] h-28 relative"></div>

        <div className="px-8 pb-8">
          <div className="relative -mt-12 flex items-end gap-4 mb-6">
            <div className="w-24 h-24 rounded-2xl bg-[#0A2540] border-4 border-white text-white flex items-center justify-center text-2xl font-black shadow-lg relative">
              DP
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0F172A]">Dr. D. Perera</h3>
              <p className="text-xs text-slate-500">Consultant Physician · General OPD</p>
              <p className="text-[11px] text-[#0D9488] font-bold mt-0.5">#MED-8492</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs mb-8">
            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-1">Department</span>
              <span className="font-bold text-[#0F172A]">General Outpatient Department (OPD)</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-1">Assigned Room</span>
              <span className="font-bold text-[#0F172A]">Counter 02 / Consultation Room B</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-1">Official Email</span>
              <span className="font-bold text-[#0F172A]">d.perera@hospital.gov.lk</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-1">Contact Phone</span>
              <span className="font-bold text-[#0F172A]">+94 77 123 4567</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-1">Active Shift</span>
              <span className="font-bold text-[#0F172A]">Morning Shift (08:00 AM – 02:00 PM)</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-1">Patients Served Today</span>
              <span className="font-bold text-[#0F172A]">42 Patients</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-[#0D9488] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-teal-700 transition">
              <Edit3 size={16} /> Edit Profile
            </button>
            <button
              onClick={() => navigate('/change-password')}
              className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition"
            >
              <KeyRound size={16} /> Change Password
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-3 border border-rose-200 text-rose-600 bg-rose-50 rounded-xl text-sm font-semibold hover:bg-rose-100 flex items-center gap-1.5"
            >
              <LogOut size={16} /> Log Out / End Shift
            </button>
          </div>
        </div>
      </div>

      {/* 3 Bottom Summary Pills */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100">
          <p className="text-2xl font-black text-[#0F172A]">42</p>
          <p className="text-xs text-slate-500 mt-1">Consultations Today</p>
        </div>
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
          <p className="text-2xl font-black text-emerald-700">6.8 min</p>
          <p className="text-xs text-slate-500 mt-1">Avg Consult Time</p>
        </div>
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <p className="text-2xl font-black text-amber-700">1h 22m</p>
          <p className="text-xs text-slate-500 mt-1">Shift Remaining</p>
        </div>
      </div>
    </div>
  );
};