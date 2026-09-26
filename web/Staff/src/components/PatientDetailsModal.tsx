import React from 'react';
import { X, Phone, Clock, User, FileText, CheckCircle2 } from 'lucide-react';
import { Patient } from '../pages/LiveQueues';

interface Props {
  patient: Patient;
  onClose: () => void;
  onCall: () => void;
}

export const PatientDetailsModal: React.FC<Props> = ({ patient, onClose, onCall }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <span className="text-xs font-bold text-[#0D9488] uppercase tracking-wider">
              Patient Information
            </span>
            <h3 className="text-xl font-black text-[#0F172A] mt-0.5">{patient.token}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg text-slate-400">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4 text-sm">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h4 className="font-bold text-base text-[#0F172A]">{patient.name}</h4>
              <p className="text-xs text-slate-400">
                Age: {patient.age} · Gender: {patient.gender}
              </p>
            </div>
            <span className="px-3 py-1 bg-teal-50 text-[#0D9488] font-bold text-xs rounded-full border border-teal-200">
              {patient.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-1">Phone Number</span>
              <span className="font-bold text-[#0F172A]">{patient.phone}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-1">Booked Time</span>
              <span className="font-bold text-[#0F172A]">{patient.bookedAt}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-1">AI Predicted ETA</span>
              <span className="font-bold text-purple-700">{patient.eta}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-1">Elapsed Wait</span>
              <span className="font-bold text-[#0F172A]">24 mins</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl text-xs space-y-1">
            <span className="text-slate-400 font-semibold block">Reason for Visit</span>
            <p className="font-medium text-slate-700">{patient.reason}</p>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 flex gap-3 bg-slate-50">
          <button
            onClick={onCall}
            className="flex-1 py-3 bg-[#0A2540] text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition"
          >
            Call This Patient
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 border border-slate-300 text-slate-700 bg-white rounded-xl text-sm font-semibold hover:bg-slate-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};