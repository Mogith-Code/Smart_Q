import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { StaffLogin } from './pages/StaffLogin';
import { Dashboard } from './pages/Dashboard';
import { LiveQueues } from './pages/LiveQueues';
import { NowCalling } from './pages/NowCalling';
import { Counters } from './pages/Counters';
import { VerifyPatient } from './pages/VerifyPatient';
import { Notifications } from './pages/Notifications';
import { StaffProfile } from './pages/StaffProfile';
import { ChangePassword } from './pages/ChangePassword';
import { PasswordSuccess } from './pages/PasswordSuccess';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Unauthenticated Staff Login */}
        <Route path="/login" element={<StaffLogin />} />

        {/* Protected Dashboard Layout with Shared Sidebar & Header */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/live-queues" element={<LiveQueues />} />
          <Route path="/now-calling" element={<NowCalling />} />
          <Route path="/counters" element={<Counters />} />
          <Route path="/verify-patient" element={<VerifyPatient />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<StaffProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/password-success" element={<PasswordSuccess />} />
        </Route>

        {/* Redirect root to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;