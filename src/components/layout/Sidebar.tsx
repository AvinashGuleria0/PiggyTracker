import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, PieChart, X } from 'lucide-react';
import { PiPiggyBank } from 'react-icons/pi';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const navLinks = [
    { name: 'Overview', path: '/dashboard/overview', icon: LayoutDashboard },
    { name: 'Transactions', path: '/dashboard/transactions', icon: ReceiptText },
    { name: 'Insights', path: '/dashboard/insights', icon: PieChart },
  ];

  return (
    <aside className="flex flex-col w-64 border-r-2 border-border bg-card shadow-neo z-10 h-full">
      <div className="p-6 border-b-2 border-border flex items-center justify-between gap-3">
        <Link to="/" onClick={onClose} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <PiPiggyBank size={35} className="text-[#E85DA1] dark:text-[#F39AC7] drop-shadow-sm shrink-0" />
          <h1 className="text-[1.70rem] leading-none font-black tracking-tighter text-[#D9468D] dark:text-[#FBCFE8]">PiggyTracker</h1>
        </Link>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onClose}
          className="md:hidden h-8 w-8 shrink-0 border-2 border-border shadow-neo-sm"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onClose}
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