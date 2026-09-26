import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { AddStaffModal } from '../../components/modals/AddStaffModal';

export const AdminStaff = () => {
  const [activeView, setActiveView] = useState<'roster' | 'placeholder'>('placeholder');

  const [staffList, setStaffList] = useState([
    { id: 1, name: 'Dr. Aris Thorne', role: 'Chief Medical Officer', dept: 'OPD', counter: 'Counter 1', status: 'Active', tokens: 42 },
    { id: 2, name: 'Sarah Jenkins', role: 'Senior Pharmacist', dept: 'Pharmacy', counter: 'Counter 5', status: 'Active', tokens: 68 },
    { id: 3, name: 'Michael Chen', role: 'Lab Technician', dept: 'Laboratory', counter: 'Counter 2', status: 'Active', tokens: 35 },
    { id: 4, name: 'Elena Rostova', role: 'Receptionist', dept: 'Cardiology', counter: 'Counter 3', status: 'On Break', tokens: 18 },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddStaff = (newMember: any) => {
    setStaffList([...staffList, newMember]);
    setActiveView('roster');
  };

  const toggleStatus = (id: number) => {
    setStaffList(staffList.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'Active' ? 'On Break' : 'Active';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const filteredStaff = staffList.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.dept.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* View Selector Toggle Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setActiveView('placeholder')}
            className={`filter-pill ${activeView === 'placeholder' ? 'active' : ''}`}
          >
            Module Overview
          </button>
          <button 
            onClick={() => setActiveView('roster')}
            className={`filter-pill ${activeView === 'roster' ? 'active' : ''}`}
          >
            Staff Roster
          </button>
        </div>

        <button 
          onClick={() => setIsAddModalOpen(true)}
          style={{
            backgroundColor: '#123B66',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontWeight: 600,
            fontSize: '13px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer'
          }}
        >
          <Plus size={16} /> Add Staff Member
        </button>
      </div>

      {activeView === 'placeholder' ? (
        /* Matching Image 2 Placeholder Card Structure */
        <div className="dashboard-card" style={{
          minHeight: '380px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '60px 20px',
          borderRadius: '16px'
        }}>
          <div style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 500 }}>
            Management module
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#0F2742', marginTop: '6px' }}>
            Staff Management
          </div>
          <p style={{ fontSize: '12px', color: '#64748B', marginTop: '8px', maxWidth: '320px' }}>
            Configure operator permissions, counter roster schedules, and token fulfillment statistics.
          </p>
          <button 
            onClick={() => setActiveView('roster')}
            style={{ marginTop: '16px', backgroundColor: '#E8F4FA', color: '#123B66', border: '1px solid #BAE6FD', padding: '6px 14px', borderRadius: '8px', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}
          >
            View Active Roster
          </button>
        </div>
      ) : (
        /* Full Interactive Staff Roster View */
        <div className="dashboard-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ position: 'relative', width: '300px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: '#94A3B8' }} />
              <input 
                type="text" 
                placeholder="Search staff members..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  fontSize: '13px',
                  outline: 'none'
                }} 
              />
            </div>
            <button 
              onClick={() => alert('Filter options: Active shift, On break, OPD, Pharmacy, Laboratory.')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#64748B', fontSize: '13px', cursor: 'pointer' }}
            >
              <Filter size={14} /> Filter
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {filteredStaff.length === 0 ? (
              <div style={{ gridColumn: 'span 2', padding: '30px', textAlign: 'center', color: '#94A3B8' }}>
                No staff members match "{searchQuery}"
              </div>
            ) : (
              filteredStaff.map((member) => (
                <div key={member.id} style={{
                  padding: '16px 20px',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#F8FAFC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: '#123B66',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '15px', color: '#0F2742' }}>{member.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                        {member.role} · {member.dept}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span 
                      className={member.status === 'Active' ? 'badge-active' : 'badge-paused'}
                      onClick={() => toggleStatus(member.id)}
                      title="Click to toggle Shift Status"
                    >
                      {member.status}
                    </span>
                    <div style={{ fontSize: '12px', color: '#64748B', marginTop: '6px' }}>
                      Served: <strong>{member.tokens}</strong>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      <AddStaffModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddStaff} 
      />
    </div>
  );
};
