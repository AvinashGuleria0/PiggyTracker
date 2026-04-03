import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TransactionFilters } from '@/features/transactions/TransactionFilters';
import { TransactionTable } from '@/features/transactions/TransactionTable';
import { TransactionModal } from '@/features/transactions/TransactionModal';

export default function Transactions() {
  const { user } = useAppStore();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 border-b-2 border-border pb-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Transactions Hub</h1>
          <p className="text-muted-foreground font-semibold mt-1">
            Manage, filter, and review all local transactions.
          </p>
        </div>
        
        {user?.role === 'admin' && (
          <Button onClick={() => setModalOpen(true)} className="gap-2 bg-green-400 hover:bg-green-500 text-foreground border-border">
            <Plus className="w-5 h-5 font-bold" />
            Add Transaction
          </Button>
        )}
      </div>

      <TransactionFilters />
      
      <TransactionTable />
      
      {isModalOpen && (
        <TransactionModal 
          isOpen={isModalOpen} 
          onClose={() => setModalOpen(false)} 
        />
      )}
    </div>
  );
}