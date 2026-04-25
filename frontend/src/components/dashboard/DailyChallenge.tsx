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
      <div className="bg-green-400 text-black px-6 py-6 border-2 border-black shadow-[4px_4px_0px_#000] rounded-md mb-10 flex items-center justify-center gap-6 animate-in fade-in zoom-in duration-500">
        <div className="bg-white border-2 border-black p-2 rounded-full">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-2xl font-black uppercase tracking-tighter">Challenge Conquered! +250 XP</h3>
      </div>
    );
  }

  return (
    <div className="bg-green-400 border-2 border-black shadow-[4px_4px_0px_#000] rounded-md p-6 relative overflow-hidden mb-10 group">
      <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-500">
        <Bug size={180} />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest border-2 border-white shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">🔥 DAILY HOT FIX</span>
            <div className="flex items-center gap-2 text-black bg-white/40 px-3 py-1 border-2 border-black text-xs font-black">
              <Timer size={16} className={isActive ? "animate-pulse text-red-600" : ""} /> 
              {formatTime(timeLeft)}
            </div>
          </div>
          <h3 className="text-3xl font-black mb-3 uppercase tracking-tighter text-black leading-tight">Spot the Logic Leak: Python Recursion</h3>
          <p className="font-black text-black/80 uppercase text-xs tracking-[0.15em]">A recursive function is missing its exit condition. Find it before the stack overflows.</p>
        </div>
        
        <div className="flex flex-col items-center gap-4 min-w-[240px]">
          <div className="text-center bg-white/30 border-2 border-black/20 p-3 rounded-md w-full">
            <p className="text-[10px] font-black text-black/60 uppercase tracking-widest mb-1">Potential Reward</p>
            <p className="text-4xl font-black text-black">+250 XP</p>
          </div>
          
          {!isActive ? (
            <button onClick={handleStart} className="neo-button bg-white text-black w-full flex items-center justify-center gap-3 group text-sm font-black py-3">
              START MISSION <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
          ) : (
            <button onClick={handleSubmit} className="neo-button bg-black text-white border-white w-full flex items-center justify-center gap-3 text-sm font-black py-3">
              SUBMIT CODE <CheckCircle size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
