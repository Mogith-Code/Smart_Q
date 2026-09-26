import { useState } from 'react';
import { 
  BrainCircuit, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  Users,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export const AdminMIS = () => {
  const [forecastScenario, setForecastScenario] = useState<'Standard' | 'Optimized'>('Standard');

  // Demand Forecast Data
  const forecastDataStandard = [
    { month: 'Jul', actual: 9000, forecast: null },
    { month: 'Aug', actual: 9400, forecast: null },
    { month: 'Sep', actual: 9700, forecast: 9700 },
    { month: 'Oct', actual: null, forecast: 9900 },
    { month: 'Nov', actual: null, forecast: 10200 },
    { month: 'Dec', actual: null, forecast: 9100 },
  ];

  const forecastDataOptimized = [
    { month: 'Jul', actual: 9000, forecast: null },
    { month: 'Aug', actual: 9400, forecast: null },
    { month: 'Sep', actual: 9700, forecast: 9700 },
    { month: 'Oct', actual: null, forecast: 8500 },
    { month: 'Nov', actual: null, forecast: 8700 },
    { month: 'Dec', actual: null, forecast: 7900 },
  ];

  const handleApplyShiftReallocation = () => {
    alert('AI Action Applied: 1 counter staff temporarily reassigned from Pharmacy to Cardiology (10:00 AM – 1:00 PM). Expected wait time reduced by 14 mins.');
  };

  return (
    <>
      {/* AI Banner Header */}
      <div className="ai-banner">
        <div className="ai-banner-icon">
          <BrainCircuit size={24} />
        </div>
        <div>
          <div className="ai-banner-title">AI-Driven Management Insights</div>
          <div className="ai-banner-desc">
            Analysis based on operational data from the last 90 days. Tomorrow's forecast: <strong>1,310 visitors</strong> · Expected peak: <strong>10:00 AM – 12:00 PM</strong>
          </div>
        </div>
      </div>

      {/* 4 Insights Grid */}
      <div className="insights-grid">
        {/* Insight 1 */}
        <div 
          className="dashboard-card insight-card" 
          style={{ cursor: 'pointer' }}
          onClick={() => alert('Peak Demand Insight: Automatically adjusting token dispatch rates between 10:00 AM – 12:00 PM.')}
        >
          <div className="insight-icon-wrap" style={{ background: '#FEF3C7', color: '#D97706' }}>
            <TrendingUp size={20} />
          </div>
          <div>
            <div className="insight-title">Peak Demand Window</div>
            <div className="insight-body">
              Queue demand is consistently highest between 10:00 AM – 12:00 PM. Average: 218 visitors during peak hours.
            </div>
          </div>
        </div>

        {/* Insight 2 */}
        <div 
          className="dashboard-card insight-card" 
          style={{ cursor: 'pointer' }}
          onClick={handleApplyShiftReallocation}
        >
          <div className="insight-icon-wrap" style={{ background: '#FEE2E2', color: '#DC2626' }}>
            <Clock size={20} />
          </div>
          <div>
            <div className="insight-title">High Wait Time: Cardiology</div>
            <div className="insight-body">
              Cardiology has the highest average wait time at 41 minutes — <u>click to deploy additional counter staff</u>.
            </div>
          </div>
        </div>

        {/* Insight 3 */}
        <div 
          className="dashboard-card insight-card" 
          style={{ cursor: 'pointer' }}
          onClick={() => alert('Demand Growth Analysis: +8.4% increase driven by remote Flutter app bookings.')}
        >
          <div className="insight-icon-wrap" style={{ background: '#ECFDF5', color: '#10B981' }}>
            <ArrowUpRight size={20} />
          </div>
          <div>
            <div className="insight-title">Demand Growth</div>
            <div className="insight-body">
              Visitor volume has increased 8.4% compared to the same period last month.
            </div>
          </div>
        </div>

        {/* Insight 4 */}
        <div 
          className="dashboard-card insight-card" 
          style={{ cursor: 'pointer' }}
          onClick={() => alert('Counter Utilization Peak: 94% counter utilization detected. Recommendation logged in Roster.')}
        >
          <div className="insight-icon-wrap" style={{ background: '#E0F2FE', color: '#0284C7' }}>
            <Users size={20} />
          </div>
          <div>
            <div className="insight-title">Counter Utilization</div>
            <div className="insight-body">
              Counter utilization peaks at 94% between 10:00 AM – 12:00 PM. Recommend staffing 2 additional counters during this window.
            </div>
          </div>
        </div>
      </div>

      {/* Demand Forecast Line Chart Card */}
      <div className="dashboard-card">
        <div className="card-title-bar">
          <h2 className="card-title">Demand Forecast — Next 3 Months</h2>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button 
              onClick={() => setForecastScenario(forecastScenario === 'Standard' ? 'Optimized' : 'Standard')}
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#123B66',
                backgroundColor: '#E8F4FA',
                padding: '4px 12px',
                borderRadius: '12px',
                border: '1px solid #BAE6FD',
                cursor: 'pointer'
              }}
            >
              Scenario: {forecastScenario} Model
            </button>
          </div>
        </div>

        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer>
            <LineChart 
              data={forecastScenario === 'Standard' ? forecastDataStandard : forecastDataOptimized} 
              margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
              <YAxis domain={[0, 12000]} ticks={[0, 3000, 6000, 9000, 12000]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }} 
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                name="Actual"
                stroke="#123B66" 
                strokeWidth={2.5} 
                dot={{ fill: '#123B66', r: 4 }} 
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                name="Forecast"
                stroke="#159A9C" 
                strokeWidth={2} 
                strokeDasharray="4 4" 
                dot={{ fill: '#159A9C', r: 4 }} 
                connectNulls={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '-10px', fontSize: '13px', fontWeight: 600 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#123B66' }}>
            <span style={{ width: '12px', height: '3px', backgroundColor: '#123B66', borderRadius: '2px' }} />
            Actual
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#159A9C' }}>
            <span style={{ width: '12px', height: '3px', borderTop: '2px dashed #159A9C' }} />
            Forecast ({forecastScenario})
          </div>
        </div>
      </div>

      {/* Service Performance Summary */}
      <div className="dashboard-card">
        <div className="card-title-bar">
          <h2 className="card-title">Service Performance Summary & AI Actions</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontWeight: 700, fontSize: '14px' }}>
              <CheckCircle2 size={18} /> Staffing Optimal
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', marginTop: '6px' }}>
              Laboratory & Pharmacy operating at peak efficiency with &lt;18 min wait times.
            </p>
          </div>

          <div 
            style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0', cursor: 'pointer' }}
            onClick={handleApplyShiftReallocation}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F59E0B', fontWeight: 700, fontSize: '14px' }}>
              <AlertCircle size={18} /> Shift Reallocation Needed
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', marginTop: '6px' }}>
              Reassign 1 counter staff from Pharmacy to Cardiology between 10:00 AM – 1:00 PM. <u>Click to Apply</u>.
            </p>
          </div>

          <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#123B66', fontWeight: 700, fontSize: '14px' }}>
              <BrainCircuit size={18} /> Predicted Capacity Peak
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', marginTop: '6px' }}>
              High demand expected on Monday morning due to post-weekend backlog (+18%).
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
