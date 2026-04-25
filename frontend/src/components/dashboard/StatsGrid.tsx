"use client";

import { CheckCircle, Trophy, Clock, Star, Target, Calendar } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";

export default function StatsGrid() {
  const { rank, accuracy, topics, openModal } = useDashboard();
  
  const conceptsCompleted = topics.filter(t => t.progress === 100).length;

  const stats = [
    { title: "Concepts", value: `${conceptsCompleted}/${topics.length}`, icon: CheckCircle, color: "text-brand-green", bg: "neo-card-dark" },
    { title: "Challenges", value: "142", icon: Trophy, color: "text-brand-yellow", bg: "neo-card-dark" },
    { title: "Hours", value: "38.5", icon: Clock, color: "text-brand-blue", bg: "neo-card-dark" },
    { title: "Rank", value: `#${rank}`, icon: Star, color: "text-brand-red", bg: "neo-card-dark" },
    { title: "Accuracy", value: `${accuracy}%`, icon: Target, color: "text-brand-green", bg: "neo-card-dark" },
    { title: "Weekly", value: "+12%", icon: Calendar, color: "text-brand-yellow", bg: "neo-card-dark" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
      {stats.map((stat, i) => (
        <div 
          key={i} 
          onClick={() => openModal("Stat Details", stat)}
          className={`neo-card bg-white p-6 flex items-center gap-5 hover:-translate-y-2 hover:rotate-1 transition-all duration-300 cursor-pointer group shadow-[4px_4px_0px_#000]`}
        >
          <div className="p-4 bg-gray-50 border-2 border-black rounded-md group-hover:bg-white group-hover:scale-110 transition-all">
            <stat.icon size={26} className={stat.color} />
          </div>
          <div>
            <p className="text-black/50 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.title}</p>
            <p className="text-3xl font-black text-black leading-none">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
