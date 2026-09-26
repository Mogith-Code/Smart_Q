import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Check, X, PhoneCall } from 'lucide-react';
import { PatientDetailsModal } from '../components/PatientDetailsModal';

export interface Patient {
  token: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  bookedAt: string;
  eta: string;
  status: 'Approaching' | 'Waiting';
  reason: string;
}

const queueData: Patient[] = [
  { token: 'Q-033', name: 'Amara Perera', age: 45, gender: 'Female', phone: '077-234-5678', bookedAt: '1:10 PM', eta: '2:48 PM', status: 'Approaching', reason: 'Blood pressure checkup' },
  { token: 'Q-034', name: 'Thilanka Silva', age: 31, gender: 'Male', phone: '071-345-6789', bookedAt: '1:20 PM', eta: '2:56 PM', status: 'Waiting', reason: 'Skin allergy rash' },
  { token: 'Q-035', name: 'Nilufar Rashid', age: 28, gender: 'Female', phone: '070-567-8901', bookedAt: '1:55 PM', eta: '2:59 PM', status: 'Approaching', reason: 'Severe migraine follow-up' },
  { token: 'Q-036', name: 'Kamal Bandara', age: 52, gender: 'Male', phone: '076-456-7890', bookedAt: '2:00 PM', eta: '3:12 PM', status: 'Waiting', reason: 'Joint pain check' },
  { token: 'Q-037', name: 'Dilani Fernando', age: 38, gender: 'Female', phone: '072-678-9012', bookedAt: '2:05 PM', eta: '3:20 PM', status: 'Waiting', reason: 'Fever consultation' },
  { token: 'Q-038', name: 'Ruwan Jayawardena', age: 60, gender: 'Male', phone: '075-789-0123', bookedAt: '2:10 PM', eta: '3:28 PM', status: 'Waiting', reason: 'Cardio review' },
  { token: 'Q-039', name: 'Sachini Gunawardena', age: 22, gender: 'Female', phone: '078-890-1234', bookedAt: '2:18 PM', eta: '3:36 PM', status: 'Waiting', reason: 'Stomach pain' },
  { token: 'Q-040', name: 'Priyantha Wijesinghe', age: 47, gender: 'Male', phone: '074-901-2345', bookedAt: '2:25 PM', eta: '3:44 PM', status: 'Waiting', reason: 'Chest tightness' },
];

export const LiveQueues: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <div className="space-y-6">
      {/* Top Indicators */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-sky-50/60 border border-sky-100 p-5 rounded-2xl">
          <p className="text-xs text-slate-500 font-semibold">Q-032 (04:15 min)</p>
          <p className="text-sm font-bold text-[#0F172A] mt-1">Now Serving</p>
        </div>
        <div className="bg-amber-50/60 border border-amber-100 p-5 rounded-2xl">
          <p className="text-2xl font-black text-amber-600">6</p>
          <p className="text-xs text-slate-500">Waiting</p>
        </div>
        <div className="bg-teal-50/60 border border-teal-100 p-5 rounded-2xl">
          <p className="text-2xl font-black text-[#0D9488]">2</p>
          <p className="text-xs text-slate-500">Approaching</p>
        </div>
        <div className="bg-emerald-50/60 border border-emerald-100 p-5 rounded-2xl">
          <p className="text-2xl font-black text-emerald-600">142</p>
          <p className="text-xs text-slate-500">Served Today</p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-base text-[#0F172A]">OPD Queue — 27 Sep 2026</h3>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/now-calling')}
              className="px-5 py-2.5 bg-[#0A2540] text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition"
            >
              <PhoneCall size={16} /> Call Next Patient
            </button>
            <button className="px-5 py-2.5 border border-amber-200 text-amber-700 bg-amber-50 rounded-xl text-sm font-semibold hover:bg-amber-100 transition">
              Pause Queue
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Token</th>
                <th className="py-3.5 px-6">Patient</th>
                <th className="py-3.5 px-6">Mobile</th>
                <th className="py-3.5 px-6">Booked At</th>
                <th className="py-3.5 px-6">AI Predicted ETA</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {queueData.map((p) => (
                <tr key={p.token} className="hover:bg-slate-50/70 transition">
                  <td className="py-4 px-6 font-bold text-[#0F172A]">{p.token}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => setSelectedPatient(p)}
                      className="font-bold text-[#0F172A] hover:text-[#0D9488] transition text-left"
                    >
                      {p.name}
                    </button>
                    <p className="text-[11px] text-slate-400">Age {p.age}</p>
                  </td>
                  <td className="py-4 px-6">{p.phone}</td>
                  <td className="py-4 px-6">{p.bookedAt}</td>
                  <td className="py-4 px-6 font-bold text-purple-700">
                    <span className="flex items-center gap-1">
                      <Sparkles size={12} /> {p.eta}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        p.status === 'Approaching'
                          ? 'bg-teal-50 text-[#0D9488] border border-teal-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate('/now-calling')}
                        className="px-3 py-1 bg-[#0A2540] text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
                      >
                        Call
                      </button>
                      <button
                        onClick={() => navigate('/verify-patient')}
                        className="px-3 py-1 bg-teal-50 text-[#0D9488] border border-teal-200 rounded-lg text-xs font-semibold hover:bg-teal-100 flex items-center gap-1"
                      >
                        <Check size={12} /> Verify
                      </button>
                      <button className="px-2 py-1 bg-rose-50 text-rose-600 border border-rose-200 rounded-lg text-xs font-semibold hover:bg-rose-100 flex items-center gap-1">
                        <X size={12} /> No-Show
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <PatientDetailsModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
          onCall={() => navigate('/now-calling')}
        />
      )}
    </div>
  );
};