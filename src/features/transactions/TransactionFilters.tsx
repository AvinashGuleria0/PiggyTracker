import { useAppStore } from '@/store/useAppStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { exportToCSV } from '@/utils/exportUtils';

// Category mapping by type
const categoryByType: { [key: string]: string[] } = {
  income: ['Salary', 'Side Hustle', 'Freelance', 'Bonus', 'Investment', 'Other'],
  expense: ['Food', 'Rent', 'Entertainment', 'Housing', 'Utilities', 'Other'],
  all: ['Food', 'Rent', 'Salary', 'Side Hustle', 'Freelance', 'Bonus', 'Investment', 'Entertainment', 'Housing', 'Utilities', 'Other'],
};

export function TransactionFilters() {
  const { filters, setFilters, transactions } = useAppStore();

  const handleExport = () => {
    exportToCSV(transactions);
  };

  // Get available categories based on selected type
  const availableCategories = filters.type === 'all' 
    ? categoryByType.all 
    : categoryByType[filters.type] || categoryByType.all;

  // Handle type change - reset category to "all" when type changes
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setFilters({ 
      type: newType as any,
      category: 'all'
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Input 
          placeholder="Search transactions..." 
          value={filters.searchQuery}
          onChange={(e) => setFilters({ searchQuery: e.target.value })}
          className="text-base font-bold w-full"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-auto">
        <select 
          className="h-11 border-2 border-border bg-card text-foreground px-2 sm:px-4 py-2 text-xs sm:text-sm font-bold shadow-neo-sm focus-visible:outline-none focus-visible:ring-0 uppercase tracking-wide w-full sm:w-[160px] md:w-[200px]"
          value={filters.type}
          onChange={handleTypeChange}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        
        <select 
          className="h-11 border-2 border-border bg-card text-foreground px-2 sm:px-4 py-2 text-xs sm:text-sm font-bold shadow-neo-sm focus-visible:outline-none focus-visible:ring-0 uppercase tracking-wide w-full sm:w-[160px] md:w-[200px]"
          value={filters.category}
          onChange={(e) => setFilters({ category: e.target.value })}
        >
          <option value="all">All Categories</option>
          {availableCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        
        <Button onClick={handleExport} className="w-full sm:w-auto gap-2 font-black uppercase tracking-wider shadow-neo-sm border-2 border-border h-11">
          <Download className="w-4 h-4" />
          <span className="inline">Export</span>
        </Button>
      </div>
    </div>
  );
}