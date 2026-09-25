import { useState } from 'react';
import { X, UserCheck, BellRing, PlusCircle } from 'lucide-react';

interface TokenListModalProps {
  isOpen: boolean;
  deptName: string;
  onClose: () => void;
}

export const TokenListModal = ({ isOpen, deptName, onClose }: TokenListModalProps) => {
  const [tokens, setTokens] = useState([
    { token: '#33', name: 'James Miller', status: 'Waiting', estWait: '4 mins' },
    { token: '#34', name: 'Sophia Patel', status: 'Waiting', estWait: '8 mins' },
    { token: '#35', name: 'David Kim', status: 'Waiting', estWait: '12 mins' },
    { token: '#36', name: 'Emma Watson', status: 'Waiting', estWait: '16 mins' },
    { token: '#37', name: 'Robert Vance', status: 'Waiting', estWait: '20 mins' },
  ]);

  if (!isOpen) return null;

  const handleCallNext = () => {
    if (tokens.length === 0) return;
    const nextToken = tokens[0].token;
    alert(`Calling Token ${nextToken} to Counter 1! Notification pushed to mobile client.`);
    setTokens(tokens.slice(1));
  };

  const handleAddQuickToken = () => {
    const nextNum = 33 + tokens.length;
    const newToken = {
      token: `#${nextNum}`,
      name: 'Walk-in Customer',
      status: 'Waiting',
      estWait: `${tokens.length * 4 + 4} mins`
    };
    setTokens([...tokens, newToken]);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ width: '560px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>Live Tokens — {deptName}</h3>
            <span style={{ fontSize: '12px', color: '#64748B' }}>Currently serving #32 · {tokens.length} in queue</span>
          </div>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <button 
              onClick={handleCallNext}
              style={{
                flex: 1,
                backgroundColor: '#123B66',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '10px',
                fontWeight: 600,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <BellRing size={16} /> Call Next Token
            </button>

            <button 
              onClick={handleAddQuickToken}
              style={{
                backgroundColor: '#ECFDF5',
                color: '#10B981',
                border: '1px solid #A7F3D0',
                borderRadius: '8px',
                padding: '10px 16px',
                fontWeight: 600,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <PlusCircle size={16} /> Issue Walk-in Token
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
            {tokens.length === 0 ? (
              <div style={{ padding: '30px', textAlign: 'center', color: '#94A3B8', fontSize: '13px' }}>
                All tokens in queue have been served!
              </div>
            ) : (
              tokens.map((t, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#F8FAFC'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontWeight: 800, color: '#123B66', fontSize: '14px', width: '40px' }}>{t.token}</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F2742' }}>{t.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#64748B' }}>
                    <span>Est. {t.estWait}</span>
                    <button 
                      onClick={() => alert(`Verified customer identity for Token ${t.token}`)}
                      style={{ background: 'none', border: 'none', color: '#0284C7', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
                    >
                      <UserCheck size={14} /> Verify
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close Drawer</button>
        </div>
      </div>
    </div>
  );
};
