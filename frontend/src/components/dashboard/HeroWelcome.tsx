"use client";

import { Flame } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";

export default function HeroWelcome({ userName }: { userName: string }) {
  const { xp, level, streak, topics } = useDashboard();
  
  // Find the first unfinished topic to recommend
  const nextTopic = topics.find(t => t.progress < 100 && !t.locked) || topics[0];

  return (
    <div className="p-8 relative overflow-hidden mb-10 rounded-[8px] border-2 border-black shadow-[6px_6px_0px_#000] transition-all bg-brand-blue">
      {/* Decorative brutalist background element */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-brand-yellow border-l-4 border-b-4 border-black -translate-y-1/4 translate-x-1/4 rotate-12 opacity-90"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter drop-shadow-[4px_4px_0px_#000000] mb-3 text-white leading-tight">
            Welcome back, <br className="hidden md:block" /> {userName} 👋
          </h1>
          <p className="text-xl font-black mb-8 text-white/90 uppercase tracking-widest">
            Level up your skills today.
          </p>
          <a href="#continue-learning" className="neo-button neo-button-yellow text-lg px-10 py-4 inline-block hover:shadow-[4px_4px_0px_#000]">
            Continue {nextTopic.title}
          </a>
        </div>
        
        <div className="flex gap-4 flex-wrap">
          <div className="neo-card p-5 text-center min-w-[120px]">
            <p className="opacity-60 font-black text-[10px] mb-1 uppercase tracking-widest">Global Rank</p>
            <p className="text-4xl font-black">#{level}</p>
          </div>
          <div className="neo-card-yellow p-5 text-center min-w-[120px]">
            <p className="text-black font-black text-[10px] mb-1 uppercase tracking-widest">Total XP</p>
            <p className="text-4xl font-black text-black">{xp}</p>
          </div>
          <div className="neo-card-red p-5 text-center min-w-[120px] flex flex-col items-center">
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
