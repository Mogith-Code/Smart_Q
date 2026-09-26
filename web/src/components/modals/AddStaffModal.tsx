import { useState } from 'react';
import { X } from 'lucide-react';

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newMember: any) => void;
}

export const AddStaffModal = ({ isOpen, onClose, onAdd }: AddStaffModalProps) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Counter Operator');
  const [dept, setDept] = useState('OPD');
  const [counter, setCounter] = useState('Counter 1');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      id: Date.now(),
      name,
      role,
      dept,
      counter,
      status: 'Active',
      tokens: 0
    });

    setName('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Register Staff Member</h3>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Dr. Amanda Vance"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="Chief Medical Officer">Chief Medical Officer</option>
                <option value="Senior Pharmacist">Senior Pharmacist</option>
                <option value="Lab Technician">Lab Technician</option>
                <option value="Counter Operator">Counter Operator</option>
                <option value="Receptionist">Receptionist</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Department</label>
                <select className="form-control" value={dept} onChange={(e) => setDept(e.target.value)}>
                  <option value="OPD">OPD</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Dental">Dental</option>
                </select>
              </div>

              <div className="form-group">
                <label>Counter Number</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={counter} 
                  onChange={(e) => setCounter(e.target.value)} 
                  required 
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Save Staff Roster</button>
          </div>
        </form>
      </div>
    </div>
  );
};
