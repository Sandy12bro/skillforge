"use client";

import { CheckCircle, Trophy, Clock, Star, Target, Calendar } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";

export default function StatsGrid() {
  const { rank, accuracy, topics, xp, openModal } = useDashboard();
  
  const conceptsCompleted = topics.filter(t => t.progress === 100).length;
  // Dynamic stats based on XP and progress
  const challengesDone = 24 + (conceptsCompleted * 8) + Math.floor(xp / 500);
  const hoursSpent = (12.5 + (xp / 200)).toFixed(1);
  const dynamicAccuracy = Math.min(98, 85 + (conceptsCompleted * 2) + (xp / 1000)).toFixed(1);

  const stats = [
    { title: "Concepts", value: `${conceptsCompleted}/${topics.length}`, icon: CheckCircle, color: "text-brand-green", bg: "neo-card-dark" },
    { title: "Challenges", value: challengesDone.toString(), icon: Trophy, color: "text-brand-yellow", bg: "neo-card-dark" },
    { title: "Hours", value: hoursSpent, icon: Clock, color: "text-brand-blue", bg: "neo-card-dark" },
    { title: "Rank", value: `#${rank}`, icon: Star, color: "text-brand-red", bg: "neo-card-dark" },
    { title: "Accuracy", value: `${dynamicAccuracy}%`, icon: Target, color: "text-brand-green", bg: "neo-card-dark" },
    { title: "Weekly", value: `+${(xp / 100).toFixed(0)}%`, icon: Calendar, color: "text-brand-yellow", bg: "neo-card-dark" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
      {stats.map((stat, i) => (
        <div 
          key={i} 
          onClick={() => openModal("Stat Details", stat)}
          className={`neo-card p-6 flex items-center gap-5 hover:-translate-y-2 hover:rotate-1 transition-all duration-300 cursor-pointer group hover:shadow-[6px_6px_0px_currentColor] ${stat.color.replace('text-', 'shadow-')}`}
        >
          <div className="p-4 bg-background border-2 border-border rounded-md group-hover:bg-card group-hover:scale-110 transition-all">
            <stat.icon size={26} className={stat.color} />
          </div>
          <div>
            <p className="opacity-60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.title}</p>
            <p className="text-3xl font-black leading-none">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
