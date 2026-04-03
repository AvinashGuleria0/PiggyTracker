import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/shared/EmptyState';
import { TransactionModal } from './TransactionModal';
import { toast } from 'react-toastify';
import { FileWarning, Trash, Edit } from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/formatters';
import type { Transaction } from '@/types';

export function TransactionTable() {
  const { transactions, filters, user, deleteTransaction } = useAppStore();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  
  // Apply filters in memory
  const filteredData = transactions.filter(t => {
    let match = true;
    if (filters.searchQuery && !t.title.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      match = false;
    }
    if (filters.type !== 'all' && t.type !== filters.type) {
      match = false;
    }
    if (filters.category !== 'all' && t.category !== filters.category) {
      match = false;
    }
    return match;
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
      toast.error('Transaction Deleted', { className: 'border-2 border-border shadow-neo' });
    }
  };

  return (
    <div className="border-2 border-border bg-card shadow-neo overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-[#F3F4F6] dark:bg-[#1F2937] border-b-2 border-border font-bold text-foreground">
            <tr>
              <th className="px-6 py-4">Transaction</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Category</th>
              {user?.role === 'admin' && (
                <th className="px-6 py-4 text-right">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y-[3px] divide-black">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8">
                  <EmptyState 
                    icon={FileWarning} 
                    title="No Transactions Found" 
                    description="There are currently no transactions matching your active filters. Try adjusting your search or add a new transaction." 
                  />
                </td>
              </tr>
            ) : (
              filteredData.map((t) => (
                <tr key={t.id} className="bg-card hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 font-black text-base">{t.title}</td>
                  <td className="px-6 py-4 font-semibold">{formatDate(t.date)}</td>
                  <td className={`px-6 py-4 text-xl font-black ${t.type === 'income' ? 'text-[#059669] dark:text-[#34D399]' : 'text-destructive'}`}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={`uppercase font-bold text-xs border-2 shadow-neo-sm px-3 py-1 ${t.type === 'income' ? 'bg-[#86EFAC] text-black dark:bg-[#065F46] dark:text-[#D1FAE5]' : 'bg-[#FCA5A5] text-black dark:bg-[#7F1D1D] dark:text-[#FEE2E2]'}`}>
                      {t.type}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className="bg-[#E9D5FF] text-[#5B21B6] border-2 border-border font-bold text-xs shadow-neo-sm px-3 py-1 dark:bg-[#6B21A8] dark:text-[#F3E8FF]">
                      {t.category}
                    </Badge>
                  </td>
                  {user?.role === 'admin' && (
                     <td className="px-6 py-4 text-right flex justify-end gap-2">
                       <Button size="icon" variant="outline" className="h-8 w-8 text-black dark:text-white dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:border-neutral-500" onClick={() => setEditingTransaction(t)}>
                         <Edit className="h-4 w-4" />
                       </Button>
                       <Button size="icon" variant="destructive" className="h-8 w-8 bg-red-400 text-black border-border" onClick={() => handleDelete(t.id)}>
                         <Trash className="h-4 w-4" />
                       </Button>
                     </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {editingTransaction && (
         <TransactionModal 
            isOpen={true} 
            onClose={() => setEditingTransaction(null)} 
            transaction={editingTransaction} 
         />
      )}
    </div>
  );
}