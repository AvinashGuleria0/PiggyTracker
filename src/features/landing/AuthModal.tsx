import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/useAppStore';

export const AuthModal = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const login = useAppStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (role: 'admin' | 'viewer') => {
    if (!name.trim()) return;
    login(name, role);
    setIsOpen(false);
    navigate('/dashboard/overview');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={children as any} />
      <DialogContent className="sm:max-w-[425px] border-2 border-border  shadow-neo">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">Who's tracking today?</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-3">
            <label htmlFor="name" className="text-sm font-bold uppercase tracking-wide">Your Name</label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g. Satoshi Nakamoto" 
              className="text-lg placeholder:font-normal font-bold"
            />
          </div>
          <div className="flex flex-col gap-4 mt-2">
            <Button 
              onClick={() => handleLogin('admin')} 
              disabled={!name.trim()}
              className="w-full text-lg shadow-neo active:shadow-none"
            >
              Enter as Admin
            </Button>
            <Button 
              onClick={() => handleLogin('viewer')} 
              variant="secondary" 
              disabled={!name.trim()}
              className="w-full text-lg bg-[#b6e3f4] text-foreground border-border shadow-neo active:shadow-none"
            >
              Enter as Viewer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};