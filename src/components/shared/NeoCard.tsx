import React from 'react';
import { cn } from '@/lib/utils';

interface NeoCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const NeoCard = React.forwardRef<HTMLDivElement, NeoCardProps>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "border-2 border-border bg-card text-card-foreground rounded-2xl shadow-neo",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

NeoCard.displayName = "NeoCard";