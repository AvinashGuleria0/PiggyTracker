import { useState } from 'react';
import { PiggyBank, Mail, Globe, MessageSquare, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import { validateEmail, ValidationErrors } from '@/utils/validators';

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (!email.trim()) {
      toast.error(ValidationErrors.REQUIRED_FIELD, { className: 'border-2 border-border shadow-neo' });
      return;
    }

    if (!validateEmail(email)) {
      toast.error(ValidationErrors.INVALID_EMAIL, { className: 'border-2 border-border shadow-neo' });
      return;
    }
    
    toast.success('Successfully subscribed to newsletter!', { className: 'border-2 border-border shadow-neo' });
    setEmail('');
  };

  return (
    <footer className="bg-card border-t-2 border-border pt-16 pb-8 px-6 z-20 relative w-full">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3 mb-2">
              <PiggyBank size={36} className="text-foreground fill-[#FFD6E8]" />
              <span className="text-2xl font-black tracking-tighter text-foreground uppercase">PiggyTracker</span>
            </div>
            <p className="text-muted-foreground font-bold max-w-sm">
              The most playful, simple personal finance dashboard. Track spending, visualize habits, and stop wondering where your money went.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-black uppercase tracking-wider text-foreground">Company</h4>
            <a href="#" className="font-bold text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#" className="font-bold text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#" className="font-bold text-muted-foreground hover:text-foreground transition-colors">Works</a>
            <a href="#" className="font-bold text-muted-foreground hover:text-foreground transition-colors">Career</a>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-black uppercase tracking-wider text-foreground">Help</h4>
            <a href="#" className="font-bold text-muted-foreground hover:text-foreground transition-colors">Customer Support</a>
            <a href="#" className="font-bold text-muted-foreground hover:text-foreground transition-colors">Delivery Details</a>
            <a href="#" className="font-bold text-muted-foreground hover:text-foreground transition-colors">Terms & Conditions</a>
            <a href="#" className="font-bold text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
          </div>

          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
             <h4 className="font-black uppercase tracking-wider text-foreground">Subscribe to Newsletter</h4>
             <div className="flex w-full mt-2 lg:w-[250px]">
               <Input 
                 placeholder="Enter email" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                 className="rounded-r-none border-r-0 focus-visible:ring-0 shadow-neo bg-card h-12 font-bold" 
               />
               <Button 
                 onClick={handleSubscribe}
                 className="rounded-l-none h-12 px-6 bg-black text-white hover:bg-neutral-800 border-l-0"
               >
                 Join
               </Button>
             </div>
             
             <div className="mt-8">
                <p className="text-sm font-black uppercase text-muted-foreground">Call Us</p>
                <p className="font-black text-xl text-foreground">+91 93179966323</p>
             </div>
             <div className="mt-2">
                <p className="text-sm font-black uppercase text-muted-foreground">Email Us</p>
                <p className="font-black text-lg text-foreground">avinashguleria1009@gmail.com</p>
             </div>
          </div>
        </div>
        
        <div className="border-t-2 border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-bold text-muted-foreground text-sm">© Copyright 2026, All Rights Reserved By Avinash Guleria</p>
          <div className="flex gap-6 text-foreground">
            <a href="mailto:avinashguleria1009@gmail.com" target="_blank" rel="noopener noreferrer">
              <Mail className="w-6 h-6 cursor-pointer hover:text-[#A8E6CF] transition-transform hover:-translate-y-1" />
            </a>
            <a href="https://avinash-portfolio-1.netlify.app/" target="_blank" rel="noopener noreferrer">
              <Globe className="w-6 h-6 cursor-pointer hover:text-[#A8E6CF] transition-transform hover:-translate-y-1" />
            </a>
            <a href="https://youtube.com/@avinashcodes?si=-DiTKHkzzSDmsMr1" target="_blank" rel="noopener noreferrer">
              <MessageSquare className="w-6 h-6 cursor-pointer hover:text-[#A8E6CF] transition-transform hover:-translate-y-1" />
            </a>
            <a href="https://youtu.be/dQw4w9WgXcQ?si=PfaELcsClbuBQi47" target="_blank" rel="noopener noreferrer">
              <Heart className="w-6 h-6 cursor-pointer hover:text-[#A8E6CF] transition-transform hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};