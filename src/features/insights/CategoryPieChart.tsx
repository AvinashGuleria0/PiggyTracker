import { useMemo } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '@/utils/formatters';
import { useTheme } from '@/components/providers/ThemeProvider';

const COLORS = ['#8B5CF6', '#F472B6', '#6366F1', '#06B6D4', '#10B981', '#F97316', '#EC4899'];
const DARK_COLORS = ['#A78BFA', '#F472B6', '#818CF8', '#22D3EE', '#34D399', '#FB923C', '#F472B6'];

export function CategoryPieChart() {
  const { transactions } = useAppStore();
  const { theme } = useTheme();

  const isDark =
    theme === 'dark' ||
    (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const data = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals = expenses.reduce((acc, current) => {
      acc[current.category] = (acc[current.category] || 0) + current.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] border-2 border-border bg-card shadow-neo">
        <p className="font-bold text-muted-foreground">No expense data available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 border-2 border-border bg-card shadow-neo">
      <h3 className="text-xl font-black mb-4 uppercase">Expenses by Category</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              stroke={isDark ? '#334155' : '#000'}
              strokeWidth={3}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={(isDark ? DARK_COLORS : COLORS)[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [formatCurrency(typeof value === 'number' ? value : Number(value || 0)), 'Amount']}
              contentStyle={{
                border: isDark ? '2px solid #475569' : '3px solid black',
                borderRadius: isDark ? '12px' : '0',
                background: isDark ? '#1e293b' : '#fff',
                color: isDark ? '#e2e8f0' : '#000',
                boxShadow: isDark ? '0 8px 24px rgba(0, 0, 0, 0.35)' : '4px 4px 0px 0px rgba(0,0,0,1)'
              }}
            />
            <Legend wrapperStyle={{ fontWeight: 'bold', color: isDark ? '#e2e8f0' : '#000' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}