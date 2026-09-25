import { useState } from 'react';
import { Users, CheckCircle2, Clock, AlertTriangle, Activity } from 'lucide-react';
import { TokenListModal } from '../../components/modals/TokenListModal';
import { useLanguage } from '../../context/LanguageContext';

export const AdminDashboard = () => {
  const { t } = useLanguage();
  const [selectedTokenDept, setSelectedTokenDept] = useState<string | null>(null);

  const [servicePerformance] = useState([
    { name: 'OPD', avgTime: '32 min avg', count: '82/85', progress: 96.4 },
    { name: 'Cardiology', avgTime: '41 min avg', count: '36/40', progress: 90.0 },
    { name: 'Laboratory', avgTime: '18 min avg', count: '58/80', progress: 72.5 },
    { name: 'Pharmacy', avgTime: '130/150', progress: 86.6, avgLabel: '8 min avg' },
    { name: 'Dental', avgTime: '22 min avg', count: '22/30', progress: 73.3 },
  ]);

  const [liveQueueStatus, setLiveQueueStatus] = useState([
    { id: 1, name: 'OPD', serving: `${t('serving')} #32 · 3 ${t('counters')}`, waiting: `18 ${t('waiting')}`, status: 'active' },
    { id: 2, name: 'Cardiology', serving: `${t('serving')} #14 · 2 ${t('counters')}`, waiting: `8 ${t('waiting')}`, status: 'active' },
    { id: 3, name: 'Laboratory', serving: `${t('serving')} #21 · 4 ${t('counters')}`, waiting: `12 ${t('waiting')}`, status: 'active' },
    { id: 4, name: 'Pharmacy', serving: `${t('serving')} #45 · 5 ${t('counters')}`, waiting: `24 ${t('waiting')}`, status: 'active' },
    { id: 5, name: 'Dental', serving: `${t('serving')} #9 · 2 ${t('counters')}`, waiting: `5 ${t('waiting')}`, status: 'paused' },
  ]);

  const toggleQueueStatus = (id: number) => {
    setLiveQueueStatus(prev => prev.map(q => {
      if (q.id === id) {
        const nextStatus = q.status === 'active' ? 'paused' : 'active';
        return { ...q, status: nextStatus };
      }
      return q;
    }));
  };

  return (
    <>
      {/* 4 Top Metric Cards */}
      <div className="metrics-grid">
        {/* Card 1 */}
        <div 
          className="dashboard-card metric-card" 
          style={{ cursor: 'pointer' }}
          onClick={() => alert('Total Visitors Today: 1,247 patients and customers registered across all 16 counters.')}
        >
          <div>
            <div className="metric-icon-box" style={{ background: '#E8F4FA', color: '#123B66' }}>
              <Users size={22} />
            </div>
            <div className="metric-val">1,247</div>
            <div className="metric-label">{t('totalVisitors')}</div>
          </div>
          <span className="metric-tag tag-green">+12%</span>
        </div>

        {/* Card 2 */}
        <div 
          className="dashboard-card metric-card" 
          style={{ cursor: 'pointer' }}
          onClick={() => alert('Completed Services: 1,142 tickets successfully fulfilled today (91.5% completion rate).')}
        >
          <div>
            <div className="metric-icon-box" style={{ background: '#ECFDF5', color: '#10B981' }}>
              <CheckCircle2 size={22} />
            </div>
            <div className="metric-val">1,142</div>
            <div className="metric-label">{t('completedServices')}</div>
          </div>
          <span className="metric-tag tag-green">+8%</span>
        </div>

        {/* Card 3 */}
        <div 
          className="dashboard-card metric-card" 
          style={{ cursor: 'pointer' }}
          onClick={() => alert('Average Waiting Time: 28 min across all departments (decreased by 4 mins compared to last week).')}
        >
          <div>
            <div className="metric-icon-box" style={{ background: '#E0F2FE', color: '#0284C7' }}>
              <Clock size={22} />
            </div>
            <div className="metric-val">28 min</div>
            <div className="metric-label">{t('avgWaitTime')}</div>
          </div>
          <span className="metric-tag tag-green-simple">↓ 4 min</span>
        </div>

        {/* Card 4 */}
        <div 
          className="dashboard-card metric-card" 
          style={{ cursor: 'pointer' }}
          onClick={() => alert('No-show Rate: 3.8% (47 visitors abandoned tokens due to long wait times).')}
        >
          <div>
            <div className="metric-icon-box" style={{ background: '#FEF3C7', color: '#D97706' }}>
              <AlertTriangle size={22} />
            </div>
            <div className="metric-val">3.8%</div>
            <div className="metric-label">{t('noShowRate')}</div>
          </div>
          <span className="metric-tag tag-green-simple">↓ 0.4%</span>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="two-col-grid">
        {/* Service Performance Today */}
        <div className="dashboard-card">
          <div className="card-title-bar">
            <h2 className="card-title">{t('servicePerformanceToday')}</h2>
            <Activity size={18} color="var(--text-muted)" />
          </div>

          <div>
            {servicePerformance.map((item, idx) => (
              <div 
                key={idx} 
                className="perf-item" 
                style={{ cursor: 'pointer' }}
                onClick={() => alert(`${item.name} Performance details: ${item.count} tickets processed today (${item.avgTime}).`)}
              >
                <div className="perf-header">
                  <span className="perf-name">{item.name}</span>
                  <div className="perf-stats">
                    <span className="perf-avg">{item.avgTime}</span>
                    <span className="perf-ratio">{item.count}</span>
                  </div>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${item.progress}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Queue Status */}
        <div className="dashboard-card">
          <div className="card-title-bar">
            <h2 className="card-title">{t('liveQueueStatus')}</h2>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Click queue status to pause/resume</span>
          </div>

          <div>
            {liveQueueStatus.map((item) => (
              <div key={item.id} className="queue-status-item">
                <div>
                  <div className="queue-dept-name">{item.name}</div>
                  <div className="queue-dept-sub">{item.serving}</div>
                </div>
                <div className="queue-right">
                  <span 
                    className="waiting-count" 
                    title="Click to view waiting tokens drawer"
                    onClick={() => setSelectedTokenDept(item.name)}
                  >
                    {item.waiting}
                  </span>
                  <span 
                    className={item.status === 'active' ? 'badge-active' : 'badge-paused'}
                    onClick={() => toggleQueueStatus(item.id)}
                    title="Click to toggle active/paused"
                  >
                    {item.status === 'active' ? t('active') : t('paused')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Token List Drawer Modal */}
      <TokenListModal 
        isOpen={!!selectedTokenDept} 
        deptName={selectedTokenDept || ''} 
        onClose={() => setSelectedTokenDept(null)} 
      />
    </>
  );
};
