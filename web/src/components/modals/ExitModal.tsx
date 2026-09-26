import { X, LogOut } from 'lucide-react';

interface ExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ExitModal = ({ isOpen, onClose, onConfirm }: ExitModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ width: '400px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Exit Admin Portal</h3>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ textAlign: 'center', padding: '24px 20px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#FEE2E2',
            color: '#DC2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
            <LogOut size={24} />
          </div>
          <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F2742' }}>Log out of SmartQ?</h4>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '6px' }}>
            Are you sure you want to exit the administrator session? Unsaved queue configurations will be persisted.
          </p>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'center' }}>
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" style={{ backgroundColor: '#DC2626' }} onClick={onConfirm}>Exit Portal</button>
        </div>
      </div>
    </div>
  );
};
