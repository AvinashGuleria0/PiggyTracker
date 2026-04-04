import { useMemo } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/utils/formatters';
import { useTheme } from '@/components/providers/ThemeProvider';

export function MonthlyBarChart() {
  const { transactions } = useAppStore();
  const { theme } = useTheme();

  const isDark =
    theme === 'dark' ||
    (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const axisColor = isDark ? '#cbd5e1' : '#000';
  const gridColor = isDark ? '#334155' : '#000';
  const incomeColor = isDark ? '#86EFAC' : '#22C55E';
  const expenseColor = isDark ? '#FCA5A5' : '#F87171';
  const barStrokeColor = isDark ? '#1e293b' : '#000';

  const data = useMemo(() => {
    const monthlyData: Record<string, { month: string; income: number; expense: number }> = {};

    transactions.forEach(t => {
      const date = new Date(t.date);
      // Format as "Jan 2026"
      const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });

      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { month: monthYear, income: 0, expense: 0 };
      }

      if (t.type === 'income') {
        monthlyData[monthYear].income += t.amount;
      } else {
        monthlyData[monthYear].expense += t.amount;
      }
    });

    // Sort chronologically (rough sort based on string format for simplicity, ideally map back to Date)
    return Object.values(monthlyData).sort((a, b) => {
      const numA = new Date(a.month).getTime();
      const numB = new Date(b.month).getTime();
      return numA - numB;
    });
  }, [transactions]);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] border-2 border-border bg-card shadow-neo">
        <p className="font-bold text-muted-foreground">No monthly data available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 border-2 border-border bg-card shadow-neo">
      <h3 className="text-xl font-black mb-4 uppercase">Cash Flow (Monthly)</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="month" stroke={axisColor} tick={{ fill: axisColor, fontWeight: 'bold' }} />
            <YAxis stroke={axisColor} tick={{ fill: axisColor, fontWeight: 'bold' }} tickFormatter={(val) => `₹${val}`} width={60} />
            <Tooltip 
              formatter={(value) => [formatCurrency(typeof value === 'number' ? value : Number(value || 0)), '']}
              contentStyle={{
                border: isDark ? '2px solid #475569' : '3px solid black',
                borderRadius: isDark ? '12px' : '0',
                background: isDark ? '#1e293b' : '#fff',
                color: isDark ? '#e2e8f0' : '#000',
                boxShadow: isDark ? '0 8px 24px rgba(0, 0, 0, 0.35)' : '4px 4px 0px 0px rgba(0,0,0,1)'
              }}
            />
            <Legend wrapperStyle={{ fontWeight: 'bold', color: axisColor }} />
            <Bar dataKey="income" name="Income" fill={incomeColor} stroke={barStrokeColor} strokeWidth={3} />
            <Bar dataKey="expense" name="Expense" fill={expenseColor} stroke={barStrokeColor} strokeWidth={3} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}