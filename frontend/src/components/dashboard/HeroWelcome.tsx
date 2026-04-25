"use client";

import { Flame } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";

export default function HeroWelcome({ userName }: { userName: string }) {
  const { xp, level, streak, topics } = useDashboard();
  
  // Find the first unfinished topic to recommend
  const nextTopic = topics.find(t => t.progress < 100 && !t.locked) || topics[0];

  return (
    <div className="p-8 relative overflow-hidden mb-10 rounded-[8px] border-2 border-border shadow-[6px_6px_0px_var(--shadow)] transition-all bg-gradient-to-br from-hero-start to-hero-end">
      {/* Decorative brutalist background element */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-brand-yellow border-l-4 border-b-4 border-border -translate-y-1/4 translate-x-1/4 rotate-12 opacity-90 dark:opacity-40"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)] mb-3 text-white leading-tight">
            Welcome back, <br className="hidden md:block" /> {userName} 👋
          </h1>
          <p className="text-xl font-black mb-8 text-white/90 uppercase tracking-widest drop-shadow-md">
            Level up your skills today.
          </p>
          <a href="#continue-learning" className="neo-button bg-brand-yellow text-black text-lg px-10 py-4 inline-block hover:shadow-[4px_4px_0px_var(--shadow)]">
            Continue {nextTopic.title}
          </a>
        </div>
        
        <div className="flex gap-4 flex-wrap">
          <div className="neo-card p-5 text-center min-w-[120px]">
            <p className="text-muted font-black text-[10px] mb-1 uppercase tracking-widest">Global Rank</p>
            <p className="text-4xl font-black text-foreground">#{level}</p>
          </div>
          <div className="neo-card bg-yellow-300 p-5 text-center min-w-[120px] dark:bg-yellow-500">
            <p className="text-black font-black text-[10px] mb-1 uppercase tracking-widest">Total XP</p>
            <p className="text-4xl font-black text-black">{xp}</p>
          </div>
          <div className="neo-card bg-red-400 p-5 text-center min-w-[120px] flex flex-col items-center dark:bg-red-500">
            <p className="text-white font-black text-[10px] mb-1 uppercase tracking-widest flex items-center gap-1">
              Streak <Flame size={12} fill="white" />
            </p>
            <p className="text-4xl font-black text-white">{streak}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
