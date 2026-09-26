import React, { useState } from 'react';
import { ArrowLeft, Zap, Check, Clock, XCircle } from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  tokenNumber: string;
  isRead: boolean;
  type: 'approachingTurn' | 'joinedQueue' | 'positionUpdated' | 'serviceCompleted' | 'bookingCancelled';
}

export const NotificationsPage: React.FC = () => {
  const [items, setItems] = useState<NotificationItem[]>([
    {
      id: '1',
      title: "You're Approaching Your Turn",
      message: '5 people ahead of you in OPD queue. Your arrival window starts at 3:00 PM.',
      time: '2:47 PM',
      tokenNumber: 'Q-047',
      isRead: false,
      type: 'approachingTurn',
    },
    {
      id: '2',
      title: 'Queue Joined Successfully',
      message: 'You have joined OPD at City General Hospital. Token Q-047 has been issued.',
      time: '2:18 PM',
      tokenNumber: 'Q-047',
      isRead: false,
      type: 'joinedQueue',
    },
    {
      id: '3',
      title: 'Queue Position Updated',
      message: 'Now serving Q-030. You are 17 people ahead. Estimated wait: 45 minutes.',
      time: '2:10 PM',
      tokenNumber: 'Q-047',
      isRead: true,
      type: 'positionUpdated',
    },
    {
      id: '4',
      title: 'Service Completed',
      message: 'Your ABC Bank – General Banking service has been completed. Thank you!',
      time: 'Yesterday',
      tokenNumber: 'Q-008',
      isRead: true,
      type: 'serviceCompleted',
    },
    {
      id: '5',
      title: 'Booking Cancelled',
      message: 'Your booking at Divisional Secretariat – Birth Certificates was cancelled.',
      time: '20 Sep',
      tokenNumber: 'Q-034',
      isRead: true,
      type: 'bookingCancelled',
    },
  ]);

  const unreadCount = items.filter((item) => !item.isRead).length;

  const markAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
    );
  };

  const renderIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'approachingTurn':
        return (
          <div className="w-10 h-10 rounded-xl bg-[#159A9C] text-white flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 fill-current" />
          </div>
        );
      case 'joinedQueue':
      case 'serviceCompleted':
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-5 h-5 stroke-[3]" />
          </div>
        );
      case 'positionUpdated':
        return (
          <div className="w-10 h-10 rounded-xl bg-[#123B66] text-white flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        );
      case 'bookingCancelled':
        return (
          <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0">
            <XCircle className="w-5 h-5" />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans max-w-md mx-auto shadow-2xl border-x border-slate-200">
      {/* 1. Header (Dark Navy) */}
      <header className="bg-[#102A45] text-white px-5 pt-6 pb-6">
        <button className="flex items-center gap-2 text-sm text-slate-200 mb-4 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Notifications</h1>
            <p className="text-slate-400 text-xs mt-1">{unreadCount} unread</p>
          </div>
          <button
            onClick={markAllRead}
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors pb-0.5"
          >
            Mark all read
          </button>
        </div>
      </header>

      {/* 2. List of Notifications */}
      <main className="flex-1 p-4 space-y-3 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => markAsRead(item.id)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
              item.isRead
                ? 'bg-white border-slate-200 shadow-sm'
                : 'bg-[#EBF4FA] border-[#D0E8F5] shadow-sm'
            }`}
          >
            {renderIcon(item.type)}

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <h2 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h2>
                {!item.isRead && (
                  <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0 mt-1"></span>
                )}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">{item.message}</p>
              <div className="flex items-center gap-3 mt-2.5 text-xs">
                <span className="text-slate-400">{item.time}</span>
                <span className="font-extrabold text-[#123B66]">{item.tokenNumber}</span>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};
