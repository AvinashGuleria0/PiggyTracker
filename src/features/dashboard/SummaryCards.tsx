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
      <NeoCard className="p-6 flex items-center justify-between bg-[#A3C4F3] dark:bg-[#1E3A8A] text-foreground dark:text-[#BFDBFE] min-h-[140px] border-2 border-border shadow-neo">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest mb-2 opacity-80 dark:opacity-70">Total Balance</p>
          <h3 className="text-4xl font-black tracking-tight">{formatCurrency(balance)}</h3>
        </div>
        <Wallet size={48} className="text-[#5C2E1F] dark:text-[#93C5FD] opacity-95" />
      </NeoCard>
      
      <NeoCard className="p-6 flex items-center justify-between bg-[#C4F4E4] dark:bg-[#064E3B] text-black dark:text-[#ECFDF5] min-h-[140px] border-2 border-border shadow-neo">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest mb-2 dark:opacity-80">Total Income</p>
          <h3 className="text-4xl font-black tracking-tight">{formatCurrency(income)}</h3>
        </div>
        <ArrowUpCircle size={48} className="dark:text-[#6EE7B7] opacity-90" />
      </NeoCard>
      
      <NeoCard className="p-6 flex items-center justify-between bg-[#FF8E8E] dark:bg-[#7F1D1D] text-black dark:text-[#FEE2E2] min-h-[140px] border-2 border-border shadow-neo">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest mb-2 dark:opacity-80">Total Expenses</p>
          <h3 className="text-4xl font-black tracking-tight">{formatCurrency(expense)}</h3>
        </div>
        <ArrowDownCircle size={48} className="dark:text-[#FECACA] opacity-90" />
      </NeoCard>
    </div>
  );
};