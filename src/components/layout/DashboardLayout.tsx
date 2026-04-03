import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { useAppStore } from '@/store/useAppStore';
import { SkeletonLoader } from '../shared/SkeletonLoader';

export const DashboardLayout = () => {
  const { user, isSwitchingRole } = useAppStore();

  // Route protection - If not logged in, boot out to landing page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-background relative">
          {/* Framer Motion transitions can wrap Outlet later in Phase 9 if needed */}
          {isSwitchingRole ? (
            <SkeletonLoader />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};