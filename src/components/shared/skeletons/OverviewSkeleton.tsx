import React from 'react';
import { NeoCard } from '../NeoCard';

export const OverviewSkeleton = () => {
  return (
    <div className="w-full space-y-8 animate-pulse pb-8">
      {/* Summary Cards Skeleton */}
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <NeoCard key={i} className="flex flex-col justify-between p-6 bg-muted h-40 border-2 border-border">
            <div className="h-4 w-1/3 bg-background border-2 border-border rounded"></div>
            <div className="h-12 w-1/2 bg-background border-2 border-border rounded mt-4"></div>
          </NeoCard>
        ))}
      </div>

      {/* Balance Trend Chart & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Balance Chart */}
        <NeoCard className="lg:col-span-2 p-8 bg-muted border-2 border-border h-96">
          <div className="h-6 w-1/3 bg-background border-2 border-border rounded mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 w-full bg-background border-2 border-border rounded"></div>
            ))}
          </div>
        </NeoCard>

        {/* Recent Transactions */}
        <NeoCard className="lg:col-span-1 p-8 bg-muted border-2 border-border h-96">
          <div className="h-6 w-2/3 bg-background border-2 border-border rounded mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-14 w-full bg-background border-2 border-border rounded"></div>
            ))}
          </div>
        </NeoCard>
      </div>
    </div>
  );
};
