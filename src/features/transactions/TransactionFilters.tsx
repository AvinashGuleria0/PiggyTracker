import { useAppStore } from '@/store/useAppStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { exportToCSV } from '@/utils/exportUtils';

export function TransactionFilters() {
  const { filters, setFilters, transactions } = useAppStore();

  const handleExport = () => {
    exportToCSV(transactions);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Input 
          placeholder="Search transactions..." 
          value={filters.searchQuery}
          onChange={(e) => setFilters({ searchQuery: e.target.value })}
          className="text-base font-bold"
        />
      </div>
      
      <div className="flex gap-4">
        <select 
          className="h-11 border-2 border-border bg-card text-foreground px-4 py-2 text-sm font-bold shadow-neo-sm focus-visible:outline-none focus-visible:ring-0 uppercase tracking-wide"
          value={filters.type}
          onChange={(e) => setFilters({ type: e.target.value as any })}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        
        <select 
          className="h-11 border-2 border-border bg-card text-foreground px-4 py-2 text-sm font-bold shadow-neo-sm focus-visible:outline-none focus-visible:ring-0 uppercase tracking-wide"
          value={filters.category}
          onChange={(e) => setFilters({ category: e.target.value })}
        >
          <option value="all">All Categories</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Salary">Salary</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Housing">Housing</option>
          <option value="Side Hustle">Side Hustle</option>
          <option value="Other">Other</option>
        </select>
        
        <Button onClick={handleExport} className="gap-2 font-black uppercase tracking-wider shadow-neo-sm border-2 border-border">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>
    </div>
  );
}