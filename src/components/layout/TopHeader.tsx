import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, Moon, Sun, User, LogOut, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Button } from '@/components/ui/button';
import { exportToCSV } from '@/utils/exportUtils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const TopHeader = () => {
  const { user, transactions, switchRole, logout } = useAppStore();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract page title from URL
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentPage = pathParts.length > 1 
    ? pathParts[1].charAt(0).toUpperCase() + pathParts[1].slice(1) 
    : "Dashboard";

  const handleExport = () => {
    // In a real app we'd pass `filters` too, but for simplicity we'll pass all current transactions 
    // or filtered transactions if we track derived state.
    exportToCSV(transactions);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDicebearUrl = (seed: string) => `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc`;

  return (
    <header className="h-20 border-b-2 border-border bg-card flex items-center justify-between px-6 shadow-neo z-10 sticky top-0">
      <div className="flex items-center">
        <h2 className="text-3xl font-black tracking-tight">{currentPage}</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Export Action */}
        <Button variant="secondary" size="sm" onClick={handleExport} className="hidden sm:flex">
          <Download size={18} />
          Export CSV
        </Button>

        {/* Theme Toggle */}
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </Button>

        {/* Profile Dropdown */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-border p-0 overflow-hidden bg-secondary hover:bg-accent cursor-pointer">
              <img src={getDicebearUrl(user.avatarSeed)} alt="Avatar" className="object-cover" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-2 border-2 border-border shadow-neo " align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground font-semibold flex items-center gap-1">
                      Role: <span className="uppercase text-primary">{user.role}</span>
                    </p>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-border h-[2px]" />
              
              <DropdownMenuItem 
                onClick={() => switchRole(user.role === 'admin' ? 'viewer' : 'admin')}
                className="cursor-pointer font-bold focus:bg-accent focus:text-accent-foreground"
              >
                {user.role === 'admin' ? (
                  <><ShieldCheck className="mr-2 h-4 w-4" /> Switch to Viewer</>
                ) : (
                  <><ShieldAlert className="mr-2 h-4 w-4" /> Switch to Admin</>
                )}
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-border h-[2px]" />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer font-bold text-destructive focus:text-destructive focus:bg-destructive/10">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};