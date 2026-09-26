import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Eye } from 'lucide-react';

export const ChangePassword: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <button
        onClick={() => navigate('/profile')}
        className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
      >
        <ArrowLeft size={16} /> Back to Profile
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <h3 className="text-xl font-bold text-[#0F172A]">Change Account Password</h3>
        <p className="text-xs text-slate-500 mt-1 mb-6">
          Ensure your account is using a strong password for patient data security.
        </p>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            navigate('/password-success');
          }}
        >
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type="password"
                defaultValue="oldpassword"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
              />
              <Eye className="absolute right-3.5 top-3.5 text-slate-400 cursor-pointer" size={18} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type="password"
                defaultValue="newpassword123"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
              />
              <Eye className="absolute right-3.5 top-3.5 text-slate-400 cursor-pointer" size={18} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type="password"
                defaultValue="newpassword123"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
              />
              <Eye className="absolute right-3.5 top-3.5 text-slate-400 cursor-pointer" size={18} />
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl text-xs space-y-2">
            <span className="font-bold text-slate-400 block mb-1">PASSWORD REQUIREMENTS</span>
            <div className="grid grid-cols-2 gap-2 text-slate-600">
              <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <Check size={14} /> At least 8 characters
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <Check size={14} /> Includes a number
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <Check size={14} /> Includes a symbol
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <Check size={14} /> Includes uppercase
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="submit"
              className="flex-1 py-3.5 bg-[#0D9488] text-white rounded-xl text-sm font-bold hover:bg-teal-700 transition"
            >
              Update Password
            </button>
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="px-6 py-3.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};