import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  BrainCircuit, 
  Layers, 
  Users, 
  GitBranch, 
  LogOut, 
  Bell, 
  ChevronDown,
  Moon,
  Sun
} from 'lucide-react';
import { NotificationDropdown } from '../components/dropdowns/NotificationDropdown';
import { UserProfileDropdown } from '../components/dropdowns/UserProfileDropdown';
import { ExitModal } from '../components/modals/ExitModal';

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('smartq_theme') as 'light' | 'dark') || 'light';
  });

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('smartq_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/analytics':
        return 'Analytics';
      case '/mis':
        return 'Management Information System';
      case '/services':
        return 'Services Management';
      case '/staff':
        return 'Staff Roster';
      case '/branches':
        return 'Branches & Locations';
      case '/':
      case '/dashboard':
      default:
        return 'Admin Dashboard';
    }
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    alert('Logged out of SmartQ Admin Portal.');
    navigate('/');
  };

  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <NavLink to="/" className="logo-brand" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <img 
              src="/logo.png" 
              alt="SmartQ Logo" 
              style={{ 
                height: '36px', 
                width: 'auto',
                objectFit: 'contain' 
              }} 
            />
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.3px', lineHeight: 1.1 }}>
                SmartQ
              </div>
              <div style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255, 255, 255, 0.65)', marginTop: '2px' }}>
                Admin Portal
              </div>
            </div>
          </NavLink>
        </div>

        <nav className="sidebar-nav">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard className="nav-icon" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink 
            to="/analytics" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <BarChart3 className="nav-icon" />
            <span>Analytics</span>
          </NavLink>

          <NavLink 
            to="/mis" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <BrainCircuit className="nav-icon" />
            <span>MIS & Insights</span>
          </NavLink>

          <NavLink 
            to="/services" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Layers className="nav-icon" />
            <span>Services</span>
          </NavLink>

          <NavLink 
            to="/staff" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Users className="nav-icon" />
            <span>Staff</span>
          </NavLink>

          <NavLink 
            to="/branches" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <GitBranch className="nav-icon" />
            <span>Branches</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button 
            type="button" 
            className="nav-item" 
            onClick={() => setShowExitModal(true)}
          >
            <LogOut className="nav-icon" />
            <span>Exit Portal</span>
          </button>
        </div>
      </aside>

      {/* Main Content View */}
      <div className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <div className="header-title-group">
            <h1>{getPageTitle()}</h1>
            <p>City General Hospital - Administrator</p>
          </div>

          <div className="header-actions">
            {/* Theme Toggle Button */}
            <button 
              className="icon-button" 
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              onClick={toggleTheme}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} color="#F59E0B" />}
            </button>

            {/* Notification Bell Button */}
            <div style={{ position: 'relative' }}>
              <button 
                className="icon-button" 
                title="Notifications"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserDropdown(false);
                }}
              >
                <Bell size={18} />
                <span className="notification-badge"></span>
              </button>

              <NotificationDropdown 
                isOpen={showNotifications} 
                onClose={() => setShowNotifications(false)} 
              />
            </div>

            {/* User Profile Dropdown Pill */}
            <div style={{ position: 'relative' }}>
              <div 
                className="user-profile-pill"
                onClick={() => {
                  setShowUserDropdown(!showUserDropdown);
                  setShowNotifications(false);
                }}
              >
                <div className="user-avatar">RR</div>
                <span className="user-name">R.Renujaan</span>
                <ChevronDown size={14} color="var(--text-muted)" />
              </div>

              <UserProfileDropdown 
                isOpen={showUserDropdown} 
                theme={theme}
                onToggleTheme={toggleTheme}
                onClose={() => setShowUserDropdown(false)} 
                onExit={() => setShowExitModal(true)}
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-body">
          <Outlet />
        </main>
      </div>

      {/* Exit Modal */}
      <ExitModal 
        isOpen={showExitModal} 
        onClose={() => setShowExitModal(false)} 
        onConfirm={handleConfirmExit}
      />
    </div>
  );
};
