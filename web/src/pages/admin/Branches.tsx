import { useState } from 'react';
import { GitBranch, MapPin, Plus } from 'lucide-react';
import { AddBranchModal } from '../../components/modals/AddBranchModal';

export const AdminBranches = () => {
  const [activeView, setActiveView] = useState<'overview' | 'list'>('overview');

  const [branchesList, setBranchesList] = useState([
    { id: 1, name: 'City General Hospital (Main Branch)', address: '124 Healthcare Boulevard, City Center', counters: 16, activeVisitors: 1247, isPrimary: true },
    { id: 2, name: 'Metro West Outpatient Clinic', address: '88 Westside Avenue, District 4', counters: 8, activeVisitors: 420, isPrimary: false },
    { id: 3, name: 'Northside Pediatric & Diagnostic Hub', address: '52 North Parkway, Sector B', counters: 6, activeVisitors: 285, isPrimary: false },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddBranch = (newBranch: any) => {
    setBranchesList([...branchesList, newBranch]);
    setActiveView('list');
  };

  const togglePrimary = (id: number) => {
    setBranchesList(branchesList.map(b => ({
      ...b,
      isPrimary: b.id === id
    })));
  };

  return (
    <div>
      {/* View Selector Toggle Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setActiveView('overview')}
            className={`filter-pill ${activeView === 'overview' ? 'active' : ''}`}
          >
            Module Overview
          </button>
          <button 
            onClick={() => setActiveView('list')}
            className={`filter-pill ${activeView === 'list' ? 'active' : ''}`}
          >
            Branch Locations
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
          <Plus size={16} /> Add Branch
        </button>
      </div>

      {activeView === 'overview' ? (
        /* Matching Image 3 Placeholder Card Structure */
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
            Branch Management
          </div>
          <p style={{ fontSize: '12px', color: '#64748B', marginTop: '8px', maxWidth: '320px' }}>
            Configure multi-tenant virtual queue endpoints, regional centers, and counter routing.
          </p>
          <button 
            onClick={() => setActiveView('list')}
            style={{ marginTop: '16px', backgroundColor: '#E8F4FA', color: '#123B66', border: '1px solid #BAE6FD', padding: '6px 14px', borderRadius: '8px', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}
          >
            View Active Branches ({branchesList.length})
          </button>
        </div>
      ) : (
        /* Full Interactive Branch List View */
        <div className="dashboard-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {branchesList.map((branch) => (
              <div key={branch.id} style={{
                padding: '20px',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    backgroundColor: '#E8F4FA',
                    color: '#123B66',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <GitBranch size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '15px', color: '#0F2742', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {branch.name}
                      {branch.isPrimary ? (
                        <span style={{ fontSize: '11px', backgroundColor: '#E0F2FE', color: '#0284C7', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>
                          Primary
                        </span>
                      ) : (
                        <button 
                          onClick={() => togglePrimary(branch.id)}
                          style={{ background: 'none', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '2px 8px', fontSize: '11px', color: '#64748B', cursor: 'pointer' }}
                        >
                          Make Primary
                        </button>
                      )}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} /> {branch.address}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '24px', fontSize: '13px' }}>
                  <div>
                    <div style={{ color: '#64748B', fontSize: '11px' }}>Counters</div>
                    <div style={{ fontWeight: 700, color: '#0F2742', marginTop: '2px' }}>{branch.counters} active</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748B', fontSize: '11px' }}>Today Visitors</div>
                    <div style={{ fontWeight: 700, color: '#123B66', marginTop: '2px' }}>{branch.activeVisitors}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Branch Modal */}
      <AddBranchModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddBranch} 
      />
    </div>
  );
};
