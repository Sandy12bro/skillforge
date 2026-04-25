"use client";

import { useState, useEffect } from "react";
import { Timer, ArrowRight, Bug, CheckCircle } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";

export default function DailyChallenge() {
  const { addXP } = useDashboard();
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStart = () => setIsActive(true);

  const handleSubmit = () => {
    setIsActive(false);
    setIsCompleted(true);
    addXP(250, "Completed Daily Challenge!");
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (isCompleted) {
    return (
      <div className="neo-card-red bg-green-500 text-black p-6 mb-8 flex items-center justify-center gap-4">
        <CheckCircle size={32} />
        <h3 className="text-2xl font-black uppercase tracking-tight">Daily Challenge Completed!</h3>
      </div>
    );
  }

  return (
    <div className="neo-card-red p-6 relative overflow-hidden mb-8 transition-colors duration-500">
      <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4">
        <Bug size={200} />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-background text-foreground px-2 py-1 text-xs font-black uppercase border-2 border-border shadow-[2px_2px_0px_var(--border)] rounded-md">Daily Challenge</span>
            <div className="flex items-center gap-1 text-white bg-black px-2 py-1 border-2 border-white text-xs font-black shadow-[2px_2px_0px_rgba(0,0,0,0.5)] rounded-md">
              <Timer size={14} className={isActive ? "animate-pulse text-brand-yellow" : ""} /> 
              {formatTime(timeLeft)}
            </div>
          </div>
          <h3 className="text-2xl font-black mb-2 drop-shadow-[4px_4px_0px_#000000] uppercase tracking-tighter text-white">Fix this Python bug in under 3 minutes</h3>
          <p className="font-black text-white/90 uppercase text-xs tracking-widest">A recursive function is causing a stack overflow. Can you spot the missing base case?</p>
        </div>
        
        <div className="flex flex-col items-center gap-3 min-w-[200px]">
          <div className="text-center">
            <p className="text-xs font-black text-white uppercase tracking-[0.2em] mb-1">Reward</p>
            <p className="text-4xl font-black text-brand-yellow drop-shadow-[4px_4px_0px_#000000]">+250 XP</p>
          </div>
          
          {!isActive ? (
            <button onClick={handleStart} className="neo-button neo-button-white w-full flex items-center justify-center gap-2 group">
              Start Challenge <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button onClick={handleSubmit} className="neo-button bg-brand-yellow text-black border-black w-full flex items-center justify-center gap-2">
              Submit Fix
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
