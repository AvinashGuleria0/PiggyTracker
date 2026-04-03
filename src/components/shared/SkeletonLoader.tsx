import React from 'react';
import { NeoCard } from './NeoCard';

export const SkeletonLoader = () => {
  return (
    <div className="w-full space-y-8 animate-pulse p-4">
      {/* Top Header Skeleton */}
      <div className="h-10 w-1/3 bg-muted border-2 border-border shadow-neo"></div>

      {/* Top Cards Skeleton */}
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <NeoCard key={i} className="flex flex-col justify-center gap-4 p-6 bg-muted h-32">
            <div className="h-4 w-1/2 bg-background border-2 border-border"></div>
            <div className="h-10 w-3/4 bg-background border-2 border-border"></div>
          </NeoCard>
        ))}
      </div>
      
      {/* Main Content Skeleton */}
      <NeoCard className="p-8 h-96 bg-muted flex flex-col gap-6">
          <div className="h-12 w-full bg-background border-2 border-border"></div>
          <div className="h-12 w-full bg-background border-2 border-border"></div>
          <div className="h-12 w-full bg-background border-2 border-border"></div>
          <div className="h-12 w-full bg-background border-2 border-border"></div>
      </NeoCard>
    </div>
  );
};