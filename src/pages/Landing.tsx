import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PiggyBank, TrendingUp, Download, PieChart } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/features/landing/AuthModal';
import { NeoCard } from '@/components/shared/NeoCard';
import { Footer } from '@/components/layout/Footer';
import { ModeToggle } from '@/components/shared/ModeToggle';
import { useAppStore } from '@/store/useAppStore';
import { useRef } from 'react';

const features = [
  {
    title: "Track Expenses",
    description: "Log your daily transactions with ease. Categorize them and stay on top of your budget.",
    icon: TrendingUp,
    color: "bg-[#FFD6E8] dark:bg-[#433043] text-foreground dark:text-[#ffd1ea]",
  },
  {
    title: "Visual Insights",
    description: "Understand your spending habits with clean, easy-to-read charts and smart summaries.",
    icon: PieChart,
    color: "bg-[#A8E6CF] dark:bg-[#243e3c] text-foreground dark:text-[#b7f2e2]",
  },
  {
    title: "Export Data",
    description: "Your data is yours. Export everything to CSV whenever you need it for your own records.",
    icon: Download,
    color: "bg-[#FFF2AE] dark:bg-[#4b4230] text-foreground dark:text-[#fff1b4]",
  }
];

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAppStore();
  const featuresRef = useRef<HTMLElement>(null);

  const handleScrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFFfff] dark:bg-background flex flex-col font-sans overflow-x-hidden transition-colors duration-300">
      {/* Header */}
      <header className="p-4 md:p-6 flex justify-between items-center border-b-2 border-border bg-card z-10">
        <div className="flex items-center gap-2 md:gap-3">
          <PiggyBank className="w-8 h-8 md:w-10 md:h-10 text-foreground fill-[#FF7eb9] dark:fill-[#7dd9cc] shrink-0" />
          <span className="text-xl md:text-3xl font-display tracking-tighter text-foreground truncate">PiggyTracker</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <ModeToggle />
          {user ? (
            <Button 
              onClick={() => navigate('/dashboard/overview')}
              className="font-black px-4 md:px-8 border-2 border-border bg-[#3F6FE6] text-white hover:bg-[#335ECC] uppercase tracking-widest text-xs md:text-sm"
            >
              <span className="hidden sm:inline">Go to Dashboard</span>
              <span className="sm:hidden">App</span>
            </Button>
          ) : (
            <AuthModal>
              <Button variant="outline" className="font-black px-4 md:px-8 border-2 border-border bg-card hover:bg-neutral-100 dark:hover:bg-neutral-800 uppercase tracking-widest text-xs md:text-sm">Login</Button>
            </AuthModal>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <section className="w-full px-6 md:px-16 py-20 md:py-32 flex flex-col items-center">
          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1600px] gap-16 md:gap-8">
            <div className="flex-1 flex flex-col items-start text-left gap-8">
              <motion.h1 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-6xl md:text-8xl font-black uppercase tracking-tight leading-none text-foreground"
              >
                Take Control <br/> of Your <br/>
                <span className="text-[#FF9EBB] dark:text-[#FFB6C1] shadow-neo-text font-display tracking-normal">Piggy</span> 
                <span className="text-[#1D4ED8] dark:text-[#60A5FA] shadow-neo-text ml-4 font-display tracking-normal">Bank</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-2xl font-bold max-w-xl text-neutral-800 dark:text-neutral-200 leading-relaxed"
              >
                The most playful, simple personal finance dashboard. Track spending, visualize habits, and stop wondering where your money went.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                {user ? (
                  <Button 
                    onClick={() => navigate('/dashboard/overview')}
                    size="lg" 
                    className="h-16 px-10 text-xl font-black bg-[#3F6FE6] dark:bg-[#3F5D80] text-white hover:bg-[#335ECC] dark:hover:bg-[#4C6F99] w-full sm:w-64 shadow-neo active:shadow-none border-2 border-border transition-all"
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <AuthModal defaultView="signup">
                    <Button size="lg" className="h-16 px-10 text-xl font-black bg-[#3F6FE6] dark:bg-[#3F5D80] text-white hover:bg-[#335ECC] dark:hover:bg-[#4C6F99] w-full sm:w-64 shadow-neo active:shadow-none border-2 border-border transition-all">
                      Get Started Now
                    </Button>
                  </AuthModal>
                )}
                <Button variant="outline" size="lg" onClick={handleScrollToFeatures} className="h-16 px-10 text-xl font-black bg-card hover:bg-[#A8E6CF] dark:hover:bg-[#2f4c49] hover:text-black dark:hover:text-[#d7f7f0] text-black dark:text-neutral-100 border-2 border-border shadow-neo active:shadow-none transition-all w-full sm:w-64">
                  Learn More
                </Button>
              </motion.div>
            </div>
            
            <div className="flex-1 flex items-center justify-center w-full mt-10 md:mt-0 xl:justify-end">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                className="relative w-full h-auto max-w-[500px] xl:max-w-[650px] flex items-center justify-center z-10"
              >
                <DotLottieReact
                  src="https://lottie.host/f0dbd945-c544-4f00-8924-80d2cc256a81/W5naQjT8P4.lottie"
                  loop
                  autoplay
                  className="w-full h-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="w-full bg-card border-y-2 border-border py-32 px-6 md:px-16 relative mt-20 z-10">
          <div className="max-w-[1600px] mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-center text-foreground mb-24 uppercase drop-shadow-md">What We Do</h2>
            
            <div className="grid md:grid-cols-3 gap-10">
              {features.map((feature, i) => (
                <NeoCard 
                  key={i}
                  className="bg-card p-10 flex flex-col items-center text-center gap-6 hover:-translate-y-4 transition-transform duration-300 border-2 border-border shadow-neo"
                >
                  <div className={`p-6 rounded-full border-2 border-border shadow-neo ${feature.color}`}>
                    <feature.icon size={48} className="text-inherit" />
                  </div>
                  <h3 className="text-3xl font-black mt-4 uppercase tracking-wide text-foreground">{feature.title}</h3>
                  <p className="text-lg font-bold text-neutral-600 dark:text-neutral-300">{feature.description}</p>
                </NeoCard>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}