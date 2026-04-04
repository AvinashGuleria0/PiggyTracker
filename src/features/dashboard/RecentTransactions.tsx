import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { NeoCard } from '@/components/shared/NeoCard';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';
import { ExternalLink, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const RecentTransactions = () => {
  const transactions = useAppStore(state => state.transactions);

  // Get the 5 most recent transactions
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const containerAnimation = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={containerAnimation} initial="hidden" animate="visible" className="h-full">
      <NeoCard className="p-6 flex flex-col min-h-[400px] h-full bg-card">
        <div className="flex items-center justify-between mb-6 border-b-2 border-border pb-4">
          <h3 className="text-xl font-black uppercase tracking-wide">Recent Activity</h3>
          <Button nativeButton={false} render={<NavLink to="/dashboard/transactions" />} variant="outline" size="icon-sm" className="hidden sm:flex border-2 shadow-neo-sm">
            <ExternalLink size={18} />
          </Button>
        </div>

        {recent.length === 0 ? (
          <div className="flex-1 flex items-center justify-center font-bold text-muted-foreground text-center">
            Nothing to display yet. Let's add some data!
          </div>
        ) : (
          <div className="space-y-4 flex-1">
            {recent.map((tx) => (
              <motion.div 
                key={tx.id} 
                variants={itemAnimation}
                className="flex items-center justify-between bg-background border-2 border-border p-4 shadow-neo-sm hover:-translate-y-1 transition-transform gap-2"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className={cn(
                    "p-2 rounded-full border-2 border-border shadow-neo-sm hidden sm:flex items-center justify-center shrink-0",
                    tx.type === 'income' ? 'bg-[#86EFAC] text-black' : 'bg-[#FCA5A5] text-black'
                  )}>
                    {tx.type === 'income' ? <ArrowUpRight size={20} className="shrink-0" /> : <ArrowDownRight size={20} className="shrink-0" />}
                  </div>
                  <div className="min-w-0">
                     <p className="font-black text-base truncate max-w-full leading-tight" title={tx.title}>{tx.title}</p>
                     <p className="text-xs text-muted-foreground font-bold mt-1 truncate">
                        {formatDate(tx.date)}
                     </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0 pl-2">
                  <span className={cn(
                    "font-black text-lg tracking-tight",
                    tx.type === 'income' ? 'text-[#059669] dark:text-[#34D399]' : 'text-destructive'
                  )}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </span>
                  <Badge className="text-[10px] py-0.5 px-3 font-bold uppercase tracking-wider bg-[#E9D5FF] text-[#5B21B6] border-2 border-border shadow-neo-sm dark:bg-[#6B21A8] dark:text-[#F3E8FF]">
                      {tx.category}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </NeoCard>
    </motion.div>
  );
};