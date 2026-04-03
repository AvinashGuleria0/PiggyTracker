import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, PieChart } from 'lucide-react';
import { PiPiggyBankFill, PiPiggyBank } from 'react-icons/pi';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const navLinks = [
    { name: 'Overview', path: '/dashboard/overview', icon: LayoutDashboard },
    { name: 'Transactions', path: '/dashboard/transactions', icon: ReceiptText },
    { name: 'Insights', path: '/dashboard/insights', icon: PieChart },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 border-r-2 border-border bg-card shadow-neo z-10">
      <div className="p-6 border-b-2 border-border flex items-center gap-3">
        <PiPiggyBank size={35} className="text-[#E85DA1] dark:text-[#F39AC7] drop-shadow-sm shrink-0" />
        <h1 className="text-[1.70rem] leading-none font-black tracking-tighter text-[#D9468D] dark:text-[#FBCFE8]">PiggyTracker</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-3">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 font-bold text-lg transition-all border-2 border-transparent outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring",
                isActive 
                  ? "bg-primary text-primary-foreground border-border shadow-neo -translate-y-[2px]" 
                  : "text-muted-foreground hover:bg-muted hover:border-border hover:text-foreground dark:hover:border-white"
              )}
            >
              <Icon size={24} />
              {link.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};