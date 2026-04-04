import { useState } from 'react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar - responsive classes added */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 lg:flex flex-col ${isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}`}>
        <Sidebar 
          onClose={() => setMobileMenuOpen(false)} 
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        <TopHeader onOpenMenu={() => setMobileMenuOpen(true)} />
        
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