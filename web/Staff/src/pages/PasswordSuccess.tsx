import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

export const PasswordSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-sm">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
          <Check size={32} strokeWidth={3} />
        </div>

        <h3 className="text-xl font-black text-[#0F172A]">Password Changed Successfully!</h3>
        <p className="text-xs text-slate-500 mt-2 mb-6 leading-relaxed">
          Your password for <strong>Dr. D. Perera</strong> (ID: <strong>#STF-2026-042</strong>) has been updated. You can now use your new password for future logins.
        </p>

        <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-400 mb-6">
          Last updated: Just now · IP: 192.168.1.42
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="w-full py-3.5 bg-[#0A2540] text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};