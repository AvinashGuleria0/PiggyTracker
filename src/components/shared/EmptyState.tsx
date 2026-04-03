import React from 'react';

interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-border bg-card shadow-neo animate-in fade-in zoom-in duration-300">
      <div className="bg-[#FFFF00] p-4 border-2 border-border shadow-neo mb-6">
        <Icon className="w-12 h-12 text-black" />
      </div>
      <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{title}</h3>
      <p className="text-muted-foreground font-semibold mb-6 max-w-md">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}