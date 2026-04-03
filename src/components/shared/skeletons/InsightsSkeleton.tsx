import React from 'react';
import { NeoCard } from '../NeoCard';

export const InsightsSkeleton = () => {
  return (
    <div className="w-full space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="border-b-2 border-border pb-6">
        <div className="h-8 w-1/4 bg-muted border-2 border-border rounded mb-3"></div>
        <div className="h-4 w-1/3 bg-muted border-2 border-border rounded"></div>
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <NeoCard key={i} className="p-6 bg-muted border-2 border-border h-28">
            <div className="h-4 w-1/2 bg-background border-2 border-border rounded mb-3"></div>
            <div className="h-8 w-1/3 bg-background border-2 border-border rounded"></div>
          </NeoCard>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <NeoCard key={i} className="p-8 bg-muted border-2 border-border h-96">
            <div className="h-6 w-1/3 bg-background border-2 border-border rounded mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="h-16 w-full bg-background border-2 border-border rounded"></div>
              ))}
            </div>
          </NeoCard>
        ))}
      </div>
    </div>
  );
};
