import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, PieChart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PiPiggyBank } from 'react-icons/pi';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar = ({ onClose, isCollapsed, onToggleCollapse }: SidebarProps) => {
  const navLinks = [
    { name: 'Overview', path: '/dashboard/overview', icon: LayoutDashboard },
    { name: 'Transactions', path: '/dashboard/transactions', icon: ReceiptText },
    { name: 'Insights', path: '/dashboard/insights', icon: PieChart },
  ];

  return (
    <aside className={cn(
      "flex flex-col border-r-2 border-border bg-card shadow-neo z-10 h-full relative transition-all duration-300 ease-in-out",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Mobile-only Close Button */}
      {!isCollapsed && (
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 h-8 w-8 z-30 border-2 border-border shadow-neo-sm"
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      <div className={cn(
        "p-6 border-b-2 border-border flex items-center gap-3 transition-all duration-300",
        isCollapsed ? "justify-center px-2" : "justify-between"
      )}>
        <Link to="/" onClick={onClose} className="flex items-center gap-3 hover:opacity-80 transition-opacity overflow-hidden">
          <PiPiggyBank size={35} className="text-[#E85DA1] dark:text-[#F39AC7] drop-shadow-sm shrink-0" />
          {!isCollapsed && (
            <h1 className="text-[1.70rem] leading-none font-black tracking-tighter text-[#D9468D] dark:text-[#FBCFE8] whitespace-nowrap">
              PiggyTracker
            </h1>
          )}
        </Link>
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
                "flex items-center gap-3 font-bold transition-all border-2 border-transparent outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring overflow-hidden",
                isCollapsed ? "px-2 py-3 justify-center text-sm" : "px-4 py-3 text-lg",
                isActive 
                  ? "bg-primary text-primary-foreground border-border shadow-neo -translate-y-[2px]" 
                  : "text-muted-foreground hover:bg-muted hover:border-border hover:text-foreground dark:hover:border-white"
              )}
              title={isCollapsed ? link.name : undefined}
            >
              <Icon size={24} className="shrink-0" />
              {!isCollapsed && <span className="whitespace-nowrap">{link.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle Button (Bottom) */}
      <div className="p-4 border-t-2 border-border mt-auto flex justify-center">
        <button
          onClick={onToggleCollapse}
          className="flex items-center justify-center h-12 w-12 border-2 border-border shadow-neo-sm hover:-translate-y-0.5 transition-all bg-background active:shadow-none hover:bg-muted absolute -right-6 bottom-10 z-20"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>
    </aside>
  );
};