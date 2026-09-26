import { useState } from 'react';
import { X } from 'lucide-react';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newService: any) => void;
}

export const AddServiceModal = ({ isOpen, onClose, onAdd }: AddServiceModalProps) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Healthcare');
  const [capacity, setCapacity] = useState(100);
  const [avgWait, setAvgWait] = useState(15);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      id: Date.now(),
      title,
      category,
      status: 'Active',
      capacity: Number(capacity),
      booked: 0,
      remaining: Number(capacity),
      usedPercent: 0,
      remainingColor: '#10B981',
      avgTime: `${avgWait} min avg`
    });

    setTitle('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add New Service Department</h3>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Service Department Name</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Ophthalmology, X-Ray & Imaging"
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Healthcare">Healthcare</option>
                <option value="Banking & Finance">Banking & Finance</option>
                <option value="Government Services">Government Services</option>
                <option value="Retail & Utility">Retail & Utility</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Daily Token Capacity</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={capacity} 
                  onChange={(e) => setCapacity(Number(e.target.value))} 
                  min="1" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Estimated Wait (mins)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={avgWait} 
                  onChange={(e) => setAvgWait(Number(e.target.value))} 
                  min="1" 
                  required 
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Create Service</button>
          </div>
        </form>
      </div>
    </div>
  );
};
