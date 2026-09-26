import { User, Settings, Shield, LogOut, Moon, Sun } from 'lucide-react';

interface UserProfileDropdownProps {
  isOpen: boolean;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onClose: () => void;
  onExit: () => void;
}

export const UserProfileDropdown = ({ isOpen, theme, onToggleTheme, onClose, onExit }: UserProfileDropdownProps) => {
  if (!isOpen) return null;

  return (
    <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
      <div className="dropdown-header">
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-dark)' }}>R. Renujaan</div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 400 }}>Administrator · City General Hospital</div>
      </div>

      <div>
        <button className="dropdown-item" onClick={onToggleTheme}>
          {theme === 'light' ? (
            <>
              <Moon size={15} color="var(--text-muted)" /> Dark Mode
            </>
          ) : (
            <>
              <Sun size={15} color="#F59E0B" /> Light Mode
            </>
          )}
        </button>

        <button className="dropdown-item" onClick={() => { alert('Opening Admin Profile Settings...'); onClose(); }}>
          <User size={15} color="var(--text-muted)" /> Profile & Account
        </button>

        <button className="dropdown-item" onClick={() => { alert('Opening Institution Configurations...'); onClose(); }}>
          <Settings size={15} color="var(--text-muted)" /> Institution Settings
        </button>

        <button className="dropdown-item" onClick={() => { alert('Role-Based Access Control matrix'); onClose(); }}>
          <Shield size={15} color="var(--text-muted)" /> Permissions & Roles
        </button>

        <div style={{ borderTop: '1px solid var(--border-color)', margin: '4px 0' }} />

        <button className="dropdown-item" style={{ color: '#DC2626' }} onClick={() => { onClose(); onExit(); }}>
          <LogOut size={15} color="#DC2626" /> Log Out
        </button>
      </div>
    </div>
  );
};
