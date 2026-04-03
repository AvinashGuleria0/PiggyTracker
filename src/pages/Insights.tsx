import { useMemo } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { CategoryPieChart } from '@/features/insights/CategoryPieChart';
import { MonthlyBarChart } from '@/features/insights/MonthlyBarChart';
import { formatCurrency } from '@/utils/formatters';

export default function Insights() {
  const { transactions } = useAppStore();

  const { topCategory, savingsRate, avgMonthlyExpense } = useMemo(() => {
    let income = 0;
    let expense = 0;
    const catMap: Record<string, number> = {};
    const monthMap: Set<string> = new Set();

    transactions.forEach(t => {
      const dateStr = new Date(t.date).toISOString().slice(0, 7); // yyyy-mm
      monthMap.add(dateStr);

      if (t.type === 'income') {
        income += t.amount;
      } else {
        expense += t.amount;
        catMap[t.category] = (catMap[t.category] || 0) + t.amount;
      }
    });

    const categories = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
    const topCategoryStr = categories.length > 0 ? categories[0][0] : 'None';

    const calcRate = income > 0 ? ((income - expense) / income) * 100 : 0;
    const numMonths = Math.max(monthMap.size, 1);
    
    return {
      topCategory: topCategoryStr,
      savingsRate: calcRate.toFixed(1) + '%',
      avgMonthlyExpense: expense / numMonths
    };
  }, [transactions]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b-2 border-border pb-4">
        <h1 className="text-3xl font-black uppercase tracking-tight">Financial Insights</h1>
        <p className="text-muted-foreground font-semibold mt-1">
          A deep dive into your spending and saving habits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border-2 border-border bg-[#E9D5FF] dark:bg-[#6B21A8] text-[#5B21B6] dark:text-[#F3E8FF] shadow-neo">
          <p className="text-sm font-bold uppercase mb-1 opacity-90 dark:text-[#E9D5FF]">Top Expense Category</p>
          <div className="text-2xl font-black">{topCategory}</div>
        </div>
        <div className="p-4 border-2 border-border bg-[#D1FAE5] dark:bg-[#065F46] text-[#065F46] dark:text-[#D1FAE5] shadow-neo flex flex-col justify-between">
          <p className="text-sm font-bold uppercase mb-1 opacity-90 dark:text-[#A7F3D0]">Savings Rate</p>
          <div className="text-2xl font-black">{savingsRate}</div>
        </div>
        <div className="p-4 border-2 border-border bg-[#FEE2E2] dark:bg-[#7F1D1D] text-[#7F1D1D] dark:text-[#FEE2E2] shadow-neo">
          <p className="text-sm font-bold uppercase mb-1 opacity-90 dark:text-[#FECACA]">Avg Monthly Expense</p>
          <div className="text-xl font-black">{formatCurrency(avgMonthlyExpense)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryPieChart />
        <MonthlyBarChart />
      </div>
    </div>
  );
}