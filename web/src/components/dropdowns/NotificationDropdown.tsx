import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown = ({ isOpen, onClose }: NotificationDropdownProps) => {
  if (!isOpen) return null;

  const notifications = [
    { id: 1, title: 'Cardiology High Wait Alert', time: '5m ago', type: 'warning', icon: AlertTriangle, color: '#D97706' },
    { id: 2, title: 'Pharmacy Counter #4 Resumed', time: '12m ago', type: 'info', icon: CheckCircle, color: '#10B981' },
    { id: 3, title: 'Peak Demand Window Starting', time: '25m ago', type: 'clock', icon: Clock, color: '#0284C7' },
  ];

  return (
    <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
      <div className="dropdown-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>System Notifications</span>
        <button 
          onClick={onClose} 
          style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '11px' }}
        >
          Clear All
        </button>
      </div>

      <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
        {notifications.map((item) => {
          const IconComp = item.icon;
          return (
            <button key={item.id} className="dropdown-item" onClick={() => { alert(`Notification details: ${item.title}`); onClose(); }}>
              <IconComp size={16} color={item.color} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F2742' }}>{item.title}</div>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>{item.time}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
