import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/useAppStore';
import { Mail, UploadCloud, User } from 'lucide-react';
import { toast } from 'react-toastify';
import { cn } from '@/lib/utils';

export const AuthModal = ({ children, defaultView = 'login' }: { children: React.ReactNode; defaultView?: 'login' | 'signup' }) => {
  const [view, setView] = useState<'login' | 'signup'>(defaultView);
  const [isOpen, setIsOpen] = useState(false);
  const login = useAppStore((state) => state.login);
  const navigate = useNavigate();

  // Login form state
  const [loginName, setLoginName] = useState('');
  const [loginSelectedRole, setLoginSelectedRole] = useState<'admin' | 'viewer'>('admin');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'viewer'>('admin');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName.trim()) {
      toast.error('Please enter your name', { className: 'border-2 border-border shadow-neo' });
      return;
    }
    toast.success('Login successful!', { className: 'border-2 border-border shadow-neo' });
    login(loginName, loginSelectedRole);
    setIsOpen(false);
    navigate('/dashboard/overview');
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim()) {
      toast.error('Please enter your name', { className: 'border-2 border-border shadow-neo' });
      return;
    }
    if (!signupEmail.trim()) {
      toast.error('Please enter your email', { className: 'border-2 border-border shadow-neo' });
      return;
    }
    toast.success('Account created successfully!', { className: 'border-2 border-border shadow-neo' });
    login(signupName, selectedRole);
    setIsOpen(false);
    navigate('/dashboard/overview');
  };

  const switchToSignup = () => {
    setLoginName('');
    setLoginSelectedRole('admin');
    setView('signup');
  };

  const switchToLogin = () => {
    setLoginName('');
    setLoginSelectedRole('admin');
    setSignupName('');
    setSignupEmail('');
    setSelectedRole('admin');
    setView('login');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={children as any} />
      <DialogContent className="sm:max-w-[425px] border-2 border-border shadow-neo">
        {view === 'login' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-black">Welcome Back</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleLoginSubmit} className="grid gap-6 py-4">
              <div className="space-y-3">
                <label htmlFor="login-name" className="text-sm font-bold uppercase tracking-wide">Your Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="login-name" 
                    value={loginName} 
                    onChange={(e) => setLoginName(e.target.value)} 
                    placeholder="John Doe" 
                    className="pl-10 text-lg placeholder:font-normal font-bold"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="font-black text-foreground text-sm uppercase">Select Role</label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    onClick={() => setLoginSelectedRole('admin')}
                    className={cn(
                      'h-12 font-black text-base border-2 shadow-neo active:shadow-none transition-all uppercase tracking-wide',
                      loginSelectedRole === 'admin' 
                        ? 'bg-[#3F6FE6] text-white border-border hover:bg-[#335ECC]' 
                        : 'bg-neutral-200 dark:bg-neutral-700 text-foreground border-border hover:bg-neutral-300 dark:hover:bg-neutral-600'
                    )}
                  >
                    Admin
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setLoginSelectedRole('viewer')}
                    className={cn(
                      'h-12 font-black text-base border-2 shadow-neo active:shadow-none transition-all uppercase tracking-wide',
                      loginSelectedRole === 'viewer' 
                        ? 'bg-[#A8E6CF] text-foreground border-border hover:bg-[#7dd9cc]' 
                        : 'bg-neutral-200 dark:bg-neutral-700 text-foreground border-border hover:bg-neutral-300 dark:hover:bg-neutral-600'
                    )}
                  >
                    Viewer
                  </Button>
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full text-lg shadow-neo active:shadow-none font-black"
              >
                Login
              </Button>
            </form>

            <div className="text-center border-t-2 border-border pt-4">
              <p className="text-sm font-bold text-muted-foreground">
                New to Platform?{' '}
                <button 
                  onClick={switchToSignup}
                  className="text-[#A3C4F3] underline hover:text-[#5B41DF] font-black cursor-pointer"
                >
                  Sign up
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-black">Join PiggyTracker</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSignupSubmit} className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto">
              {/* Profile Photo Upload */}
              <div className="space-y-2">
                <label className="font-black text-foreground text-sm uppercase">Profile Photo (Optional)</label>
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-border bg-background hover:bg-[#A8E6CF]/20 cursor-pointer transition-colors">
                  <div className="flex flex-col items-center justify-center pt-4 pb-4 text-foreground">
                    <UploadCloud className="w-6 h-6 mb-2" />
                    <p className="text-xs font-bold"><span className="underline">Click to upload</span></p>
                    <p className="text-xs font-semibold mt-1 text-muted-foreground">SVG, PNG, JPG</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="signup-name" className="font-black text-foreground text-sm uppercase">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="signup-name" 
                    value={signupName} 
                    onChange={(e) => setSignupName(e.target.value)} 
                    placeholder="John Doe" 
                    className="pl-10 text-lg placeholder:font-normal font-bold"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="signup-email" className="font-black text-foreground text-sm uppercase">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="signup-email" 
                    type="email"
                    value={signupEmail} 
                    onChange={(e) => setSignupEmail(e.target.value)} 
                    placeholder="john@example.com" 
                    className="pl-10 text-lg placeholder:font-normal font-bold"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-3">
                <label className="font-black text-foreground text-sm uppercase">Select Role</label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    onClick={() => setSelectedRole('admin')}
                    className={cn(
                      'h-12 font-black text-base border-2 shadow-neo active:shadow-none transition-all uppercase tracking-wide',
                      selectedRole === 'admin' 
                        ? 'bg-[#3F6FE6] text-white border-border hover:bg-[#335ECC]' 
                        : 'bg-neutral-200 dark:bg-neutral-700 text-foreground border-border hover:bg-neutral-300 dark:hover:bg-neutral-600'
                    )}
                  >
                    Admin
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setSelectedRole('viewer')}
                    className={cn(
                      'h-12 font-black text-base border-2 shadow-neo active:shadow-none transition-all uppercase tracking-wide',
                      selectedRole === 'viewer' 
                        ? 'bg-[#A8E6CF] text-foreground border-border hover:bg-[#7dd9cc]' 
                        : 'bg-neutral-200 dark:bg-neutral-700 text-foreground border-border hover:bg-neutral-300 dark:hover:bg-neutral-600'
                    )}
                  >
                    Viewer
                  </Button>
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full h-12 text-lg shadow-neo active:shadow-none font-black bg-[#A8E6CF] hover:bg-[#7dd9cc] text-foreground border-2 border-border uppercase tracking-wider"
              >
                Create Account
              </Button>
            </form>

            <div className="text-center border-t-2 border-border pt-4">
              <p className="text-sm font-bold text-muted-foreground">
                Already have an account?{' '}
                <button 
                  onClick={switchToLogin}
                  className="text-[#A3C4F3] underline hover:text-[#5B41DF] font-black cursor-pointer"
                >
                  Login
                </button>
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};