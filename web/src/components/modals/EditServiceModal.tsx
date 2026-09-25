import { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';

interface EditServiceModalProps {
  isOpen: boolean;
  service: any;
  onClose: () => void;
  onSave: (updatedService: any) => void;
  onDelete: (id: number) => void;
}

export const EditServiceModal = ({ isOpen, service, onClose, onSave, onDelete }: EditServiceModalProps) => {
  const [capacity, setCapacity] = useState(100);
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    if (service) {
      setCapacity(service.capacity || 100);
      setStatus(service.status || 'Active');
    }
  }, [service]);

  if (!isOpen || !service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const remaining = Math.max(0, capacity - service.booked);
    const usedPercent = Math.round((service.booked / capacity) * 100);

    onSave({
      ...service,
      capacity: Number(capacity),
      remaining,
      usedPercent,
      status,
      remainingColor: remaining < 10 ? '#DC2626' : '#10B981'
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit Service: {service.title}</h3>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Service Status</label>
              <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Active">Active (Serving Tokens)</option>
                <option value="Paused">Paused (Queue On Hold)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Daily Token Capacity</label>
              <input 
                type="number" 
                className="form-control" 
                value={capacity} 
                onChange={(e) => setCapacity(Number(e.target.value))} 
                min={service.booked} 
                required 
              />
              <span style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                Currently booked: {service.booked} tokens
              </span>
            </div>
          </div>

          <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
            <button 
              type="button" 
              onClick={() => { onDelete(service.id); onClose(); }} 
              style={{ background: 'none', border: 'none', color: '#DC2626', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Trash2 size={16} /> Delete Service
            </button>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn-primary">Save Changes</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
