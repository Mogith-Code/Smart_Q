import { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Download } from 'lucide-react';

export const AdminAnalytics = () => {
  const [timeFilter, setTimeFilter] = useState<'Week' | 'Month' | 'Quarter'>('Week');

  // Visitor Traffic Data based on filter
  const getVisitorTrafficData = () => {
    switch (timeFilter) {
      case 'Month':
        return [
          { day: 'W1', actual: 1850, target: 1600 },
          { day: 'W2', actual: 2100, target: 1900 },
          { day: 'W3', actual: 2450, target: 2100 },
          { day: 'W4', actual: 2300, target: 2000 },
        ];
      case 'Quarter':
        return [
          { day: 'Jul', actual: 9000, target: 8200 },
          { day: 'Aug', actual: 9400, target: 8800 },
          { day: 'Sep', actual: 9700, target: 9100 },
        ];
      case 'Week':
      default:
        return [
          { day: 'Mon', actual: 310, target: 280 },
          { day: 'Tue', actual: 300, target: 270 },
          { day: 'Wed', actual: 330, target: 310 },
          { day: 'Thu', actual: 290, target: 260 },
          { day: 'Fri', actual: 370, target: 340 },
          { day: 'Sat', actual: 420, target: 380 },
          { day: 'Sun', actual: 180, target: 160 },
        ];
    }
  };

  // Hourly Demand Data
  const hourlyDemandData = [
    { hour: '8AM', count: 45 },
    { hour: '9AM', count: 100 },
    { hour: '10AM', count: 190 },
    { hour: '11AM', count: 215 },
    { hour: '12PM', count: 160 },
    { hour: '1PM', count: 130 },
    { hour: '2PM', count: 148 },
    { hour: '3PM', count: 118 },
    { hour: '4PM', count: 65 },
  ];

  // Average Wait Time Data (Horizontal)
  const waitTimeData = [
    { service: 'OPD', time: 32 },
    { service: 'Cardiology', time: 41 },
    { service: 'Laboratory', time: 18 },
    { service: 'Pharmacy', time: 8 },
    { service: 'Dental', time: 22 },
  ];

  // Service Distribution (Donut)
  const serviceDistData = [
    { name: 'OPD', count: 82, color: '#123B66' },
    { name: 'Cardiology', count: 36, color: '#159A9C' },
    { name: 'Laboratory', count: 58, color: '#22A06B' },
    { name: 'Pharmacy', count: 130, color: '#E8A317' },
    { name: 'Dental', count: 22, color: '#D64545' },
  ];

  const handleExport = () => {
    alert(`Downloading SmartQ Analytics Report (${timeFilter} view) as CSV/PDF...`);
  };

  return (
    <>
      {/* Top Filter Pills & Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="filter-pills">
          {(['Week', 'Month', 'Quarter'] as const).map((filter) => (
            <button
              key={filter}
              className={`filter-pill ${timeFilter === filter ? 'active' : ''}`}
              onClick={() => setTimeFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <button 
          onClick={handleExport}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '8px 16px',
            fontWeight: 600,
            fontSize: '13px',
            color: '#0F2742',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer'
          }}
        >
          <Download size={15} /> Export Report
        </button>
      </div>

      {/* 2x2 Grid of Charts */}
      <div className="two-col-grid">
        {/* Chart 1: Visitor Traffic */}
        <div className="dashboard-card">
          <div className="card-title-bar">
            <h2 className="card-title">Visitor Traffic — This {timeFilter}</h2>
          </div>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={getVisitorTrafficData()} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }} 
                />
                <Line type="monotone" dataKey="actual" stroke="#123B66" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="target" stroke="#159A9C" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Hourly Demand — Today */}
        <div className="dashboard-card">
          <div className="card-title-bar">
            <h2 className="card-title">Hourly Demand — Today</h2>
          </div>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={hourlyDemandData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis domain={[0, 220]} ticks={[0, 55, 110, 165, 220]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }} 
                />
                <Bar dataKey="count" fill="#123B66" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Average Wait Time by Service (Horizontal Bar) */}
        <div className="dashboard-card">
          <div className="card-title-bar">
            <h2 className="card-title">Average Wait Time by Service</h2>
          </div>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <BarChart 
                layout="vertical" 
                data={waitTimeData} 
                margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" domain={[0, 60]} ticks={[0, 15, 30, 45, 60]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis dataKey="service" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip formatter={(value) => [`${value} min`, 'Avg Wait Time']} />
                <Bar dataKey="time" fill="#159A9C" radius={[0, 4, 4, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Service Distribution (Donut Chart) */}
        <div className="dashboard-card">
          <div className="card-title-bar">
            <h2 className="card-title">Service Distribution</h2>
          </div>
          <div style={{ width: '100%', height: 260, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '55%', height: '100%' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={serviceDistData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {serviceDistData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend list */}
            <div style={{ width: '45%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {serviceDistData.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color, display: 'inline-block' }} />
                    <span style={{ color: '#0F2742', fontWeight: 500 }}>{item.name}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: '#0F2742' }}>{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
