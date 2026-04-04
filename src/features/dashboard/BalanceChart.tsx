import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { NeoCard } from '@/components/shared/NeoCard';
import { useAppStore } from '@/store/useAppStore';
import { formatCurrency, formatDate } from '@/utils/formatters';

export const BalanceChart = () => {
  const transactions = useAppStore(state => state.transactions);
  const trendColor = '#8B5CF6';

  const chartData = useMemo(() => {
    // Sort transactions by date ascending (oldest first) to map progression
    const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    let currentBalance = 0;
    
    // Add an initial baseline 
    const timeline = [{ date: 'Start', balance: 0 }];

    sorted.forEach(tx => {
      currentBalance += tx.type === 'income' ? tx.amount : -tx.amount;
      timeline.push({
        date: formatDate(tx.date),
        balance: currentBalance
      });
    });

    return timeline;
  }, [transactions]);

  // Framer motion variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible" className="h-full">
      <NeoCard className="p-6 h-[400px] flex flex-col bg-card">
        <h3 className="text-xl font-black uppercase tracking-wide mb-6">Balance Trend</h3>
        
        {transactions.length === 0 ? (
          <div className="flex-1 flex items-center justify-center font-bold text-muted-foreground">
            No data to display. Add some transactions!
          </div>
        ) : (
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={trendColor} stopOpacity={0.75}/>
                    <stop offset="95%" stopColor={trendColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.15} vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="currentColor" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  minTickGap={30}
                  opacity={0.5}
                />
                <YAxis 
                  stroke="currentColor" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => `₹${val}`}
                  width={60}
                  opacity={0.5}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    border: '3px solid currentColor',
                    boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
                    borderRadius: '0px',
                    fontWeight: 'bold',
                    color: 'var(--card-foreground)'
                  }}
                  itemStyle={{ color: trendColor }}
                  formatter={(value) => [formatCurrency(value as number), 'Balance']}
                  labelStyle={{ color: 'var(--muted-foreground)', marginBottom: '5px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke={trendColor}
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorBalance)" 
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </NeoCard>
    </motion.div>
  );
};