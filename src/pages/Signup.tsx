import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PiggyBank, UploadCloud, User, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NeoCard } from '@/components/shared/NeoCard';

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate home or to dashboard for mock purposes
    navigate('/dashboard/overview');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="p-6 flex justify-center items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate('/')}
        >
          <PiggyBank size={40} className="text-foreground fill-[#FFD6E8]" />
          <span className="text-3xl font-black tracking-tighter text-foreground">PiggyTracker</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <NeoCard className="w-full max-w-md bg-card border-2 border-border p-8 shadow-neo">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black uppercase text-foreground mb-2 tracking-tight">Sign Up</h1>
            <p className="text-muted-foreground font-bold">Join the Piggy bank revolution today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-black text-foreground">Profile Photo (Optional)</label>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border bg-background hover:bg-[#A8E6CF]/20 cursor-pointer transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-foreground">
                    <UploadCloud className="w-8 h-8 mb-2" />
                    <p className="text-sm font-bold"><span className="underline">Click to upload</span> or drag and drop</p>
                    <p className="text-xs font-semibold mt-1">SVG, PNG, JPG</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>

            <div className="space-y-2 relative">
              <label htmlFor="name" className="font-black text-foreground">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input id="name" placeholder="John Doe" className="pl-10 h-12 border-2 border-border font-bold focus-visible:ring-0 shadow-neo " required />
              </div>
            </div>

            <div className="space-y-2 relative">
              <label htmlFor="email" className="block text-sm font-black text-black">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input id="email" type="email" placeholder="john@example.com" className="pl-10 h-12 border-2 border-border font-bold focus-visible:ring-0 shadow-neo " required />
              </div>
            </div>

            <div className="space-y-2 relative">
              <label htmlFor="password" className="block text-sm font-black text-black">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10 h-12 border-2 border-border font-bold focus-visible:ring-0 shadow-neo " required />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full h-14 text-xl font-black bg-[#A8E6CF] hover:bg-[#00B8CC] text-foreground border-2 border-border shadow-neo active:shadow-none transition-all  uppercase tracking-wider">
              Create Account
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm font-bold text-muted-foreground">
              Already have an account? <a href="/" className="text-[#A3C4F3] underline hover:text-[#5B41DF]">Log in instead</a>
            </p>
          </div>
        </NeoCard>
      </main>
    </div>
  );
}