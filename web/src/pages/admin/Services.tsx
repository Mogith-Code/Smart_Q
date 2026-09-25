import { useState } from 'react';
import { Plus, Settings } from 'lucide-react';
import { AddServiceModal } from '../../components/modals/AddServiceModal';
import { EditServiceModal } from '../../components/modals/EditServiceModal';

export const AdminServices = () => {
  const [serviceCards, setServiceCards] = useState([
    {
      id: 1,
      title: 'OPD',
      category: 'Healthcare',
      status: 'Active',
      capacity: 100,
      booked: 82,
      remaining: 18,
      usedPercent: 82,
      remainingColor: '#10B981',
    },
    {
      id: 2,
      title: 'Cardiology',
      category: 'Healthcare',
      status: 'Active',
      capacity: 40,
      booked: 36,
      remaining: 4,
      usedPercent: 90,
      remainingColor: '#DC2626',
    },
    {
      id: 3,
      title: 'Laboratory',
      category: 'Healthcare',
      status: 'Active',
      capacity: 80,
      booked: 58,
      remaining: 22,
      usedPercent: 73,
      remainingColor: '#10B981',
    },
    {
      id: 4,
      title: 'Pharmacy',
      category: 'Healthcare',
      status: 'Active',
      capacity: 150,
      booked: 130,
      remaining: 20,
      usedPercent: 87,
      remainingColor: '#10B981',
    },
    {
      id: 5,
      title: 'Dental',
      category: 'Healthcare',
      status: 'Paused',
      capacity: 30,
      booked: 22,
      remaining: 8,
      usedPercent: 73,
      remainingColor: '#DC2626',
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  const handleAddService = (newService: any) => {
    setServiceCards([...serviceCards, newService]);
  };

  const handleUpdateService = (updatedService: any) => {
    setServiceCards(serviceCards.map(s => s.id === updatedService.id ? updatedService : s));
  };

  const handleDeleteService = (id: number) => {
    setServiceCards(serviceCards.filter(s => s.id !== id));
  };

  const toggleStatus = (id: number) => {
    setServiceCards(serviceCards.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'Active' ? 'Paused' : 'Active';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  return (
    <div>
      {/* Top Action Header */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          style={{
            backgroundColor: '#123B66',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontWeight: 600,
            fontSize: '13px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}
        >
          <Plus size={16} /> Add Service
        </button>
      </div>

      {/* Services Grid (2 Columns) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {serviceCards.map((service) => (
          <div 
            key={service.id} 
            className="dashboard-card"
            style={{ padding: '24px' }}
          >
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F2742' }}>{service.title}</h3>
                <span style={{ fontSize: '12px', color: '#64748B', display: 'block', marginTop: '2px' }}>
                  {service.category}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span 
                  className={service.status === 'Active' ? 'badge-active' : 'badge-paused'}
                  onClick={() => toggleStatus(service.id)}
                  title="Click to toggle Active/Paused"
                >
                  {service.status}
                </span>
                <button 
                  onClick={() => setEditingService(service)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', display: 'flex', alignItems: 'center' }}
                  title="Configure Service"
                >
                  <Settings size={18} />
                </button>
              </div>
            </div>

            {/* 3 Metric Boxes */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr 1fr', 
              gap: '12px', 
              marginTop: '20px', 
              marginBottom: '20px' 
            }}>
              {/* Box 1: Capacity */}
              <div style={{ backgroundColor: '#F8FAFC', padding: '12px', borderRadius: '8px', textAlign: 'center', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>Capacity</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#0F2742', marginTop: '4px' }}>{service.capacity}</div>
              </div>

              {/* Box 2: Booked */}
              <div style={{ backgroundColor: '#F8FAFC', padding: '12px', borderRadius: '8px', textAlign: 'center', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>Booked</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#0F2742', marginTop: '4px' }}>{service.booked}</div>
              </div>

              {/* Box 3: Remaining */}
              <div style={{ backgroundColor: '#F8FAFC', padding: '12px', borderRadius: '8px', textAlign: 'center', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>Remaining</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: service.remainingColor, marginTop: '4px' }}>{service.remaining}</div>
              </div>
            </div>

            {/* Capacity Used Progress Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748B', marginBottom: '8px' }}>
                <span>Capacity used</span>
                <span style={{ fontWeight: 600 }}>{service.usedPercent}%</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  width: `${service.usedPercent}%`, 
                  backgroundColor: '#D97706', 
                  borderRadius: '4px' 
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add & Edit Modals */}
      <AddServiceModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddService} 
      />

      <EditServiceModal 
        isOpen={!!editingService} 
        service={editingService} 
        onClose={() => setEditingService(null)} 
        onSave={handleUpdateService} 
        onDelete={handleDeleteService} 
      />
    </div>
  );
};
