import { useState } from 'react';
import { X } from 'lucide-react';

interface AddBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newBranch: any) => void;
}

export const AddBranchModal = ({ isOpen, onClose, onAdd }: AddBranchModalProps) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [counters, setCounters] = useState(6);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      id: Date.now(),
      name,
      address,
      counters: Number(counters),
      activeVisitors: 0,
      isPrimary: false
    });

    setName('');
    setAddress('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add Hospital Branch</h3>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Branch / Hub Name</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. East Wing Diagnostic Center"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Physical Address</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. 45 East Boulevard, District 2"
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Number of Active Counters</label>
              <input 
                type="number" 
                className="form-control" 
                value={counters} 
                onChange={(e) => setCounters(Number(e.target.value))} 
                min="1" 
                required 
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Register Branch</button>
          </div>
        </form>
      </div>
    </div>
  );
};
