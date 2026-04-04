import { motion } from 'framer-motion';
import { SummaryCards } from '@/features/dashboard/SummaryCards';
import { BalanceChart } from '@/features/dashboard/BalanceChart';
import { RecentTransactions } from '@/features/dashboard/RecentTransactions';

export default function Overview() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.3 }}
      className="space-y-6 md:space-y-8 max-w-7xl mx-auto w-full pb-8 px-1 md:px-2"
    >
      <section>
        <SummaryCards />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <BalanceChart />
        </div>
        <div className="lg:col-span-1">
          <RecentTransactions />
        </div>
      </section>

    </motion.div>
  );
}