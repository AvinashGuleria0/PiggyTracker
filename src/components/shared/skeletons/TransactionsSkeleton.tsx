import React from 'react';
import { NeoCard } from '../NeoCard';

export const TransactionsSkeleton = () => {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="border-b-2 border-border pb-4">
        <div className="h-8 w-1/4 bg-muted border-2 border-border rounded mb-2"></div>
        <div className="h-4 w-1/3 bg-muted border-2 border-border rounded"></div>
      </div>

      {/* Filters Skeleton */}
      <NeoCard className="p-6 bg-muted border-2 border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-11 w-full bg-background border-2 border-border rounded"></div>
          ))}
        </div>
      </NeoCard>

      {/* Table Header Skeleton */}
      <NeoCard className="p-6 bg-muted border-2 border-border">
        <div className="grid grid-cols-5 gap-4 pb-4 border-b-2 border-border">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-5 w-full bg-background border-2 border-border rounded"></div>
          ))}
        </div>

        {/* Table Rows Skeleton */}
        <div className="space-y-4 mt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="grid grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((j) => (
                <div key={j} className="h-8 w-full bg-background border-2 border-border rounded"></div>
              ))}
            </div>
          ))}
        </div>
      </NeoCard>
    </div>
  );
};
