import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { useAppStore } from '@/store/useAppStore';
import { OverviewSkeleton } from '../shared/skeletons/OverviewSkeleton';
import { TransactionsSkeleton } from '../shared/skeletons/TransactionsSkeleton';
import { InsightsSkeleton } from '../shared/skeletons/InsightsSkeleton';

export const DashboardLayout = () => {
  const { user, isSwitchingRole } = useAppStore();
  const location = useLocation();

  // Route protection - If not logged in, boot out to landing page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Determine which skeleton to show based on current route
  const getSkeleton = () => {
    if (location.pathname.includes('/transactions')) {
      return <TransactionsSkeleton />;
    } else if (location.pathname.includes('/insights')) {
      return <InsightsSkeleton />;
    }
    return <OverviewSkeleton />;
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-background relative">
          {/* Framer Motion transitions can wrap Outlet later in Phase 9 if needed */}
          {isSwitchingRole ? (
            getSkeleton()
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};