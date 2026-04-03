import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';
import { NeoCard } from '@/components/shared/NeoCard';
import { useAppStore } from '@/store/useAppStore';
import { formatCurrency } from '@/utils/formatters';

export const SummaryCards = () => {
  const transactions = useAppStore(state => state.transactions);
  
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
    
  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);
    
  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <NeoCard className="p-6 flex items-center justify-between bg-[#A3C4F3] text-foreground min-h-[140px] border-2 border-border shadow-neo">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest mb-2 opacity-80">Total Balance</p>
          <h3 className="text-4xl font-black tracking-tight">{formatCurrency(balance)}</h3>
        </div>
        <Wallet size={48} className="text-[#5C2E1F] dark:text-[#C89474] opacity-95" />
      </NeoCard>
      
      <NeoCard className="p-6 flex items-center justify-between bg-[#C4F4E4] text-black min-h-[140px] border-2 border-border shadow-neo">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest mb-2">Total Income</p>
          <h3 className="text-4xl font-black tracking-tight">{formatCurrency(income)}</h3>
        </div>
        <ArrowUpCircle size={48} className="opacity-90" />
      </NeoCard>
      
      <NeoCard className="p-6 flex items-center justify-between bg-[#FF8E8E] text-black min-h-[140px] border-2 border-border shadow-neo">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest mb-2">Total Expenses</p>
          <h3 className="text-4xl font-black tracking-tight">{formatCurrency(expense)}</h3>
        </div>
        <ArrowDownCircle size={48} className="opacity-90" />
      </NeoCard>
    </div>
  );
};