"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";

export default function MentorSuggestions() {
  const { openModal } = useDashboard();

  const suggestions = [
    { title: "Practice loops today", desc: "You struggled slightly with while loops yesterday.", type: "Focus", modal: "Sandbox" },
    { title: "You are ready for functions", desc: "Your basic syntax knowledge is solid enough to move on.", type: "Next Step", modal: "AI Mentor" },
    { title: "Improve debugging speed", desc: "Try using the Error Explainer on your next bug.", type: "Tip", modal: "Error Explainer" },
  ];

  return (
    <div className="mb-10">
      <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
        <span className="w-2 h-8 bg-brand-blue inline-block"></span>
        AI Mentor Insights
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {suggestions.map((sug, i) => (
          <div 
            key={i} 
            onClick={() => openModal(sug.modal)}
            className="neo-card p-6 border-brand-blue/20 relative overflow-hidden group hover:border-brand-blue hover:-translate-y-2 hover:shadow-[6px_6px_0px_#1d4ed8] cursor-pointer transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-30 transition-opacity text-primary">
              <Sparkles size={48} />
            </div>
            <div className="relative z-10">
              <span className="text-[9px] font-black text-white uppercase bg-primary px-2 py-0.5 rounded-sm inline-block mb-4 tracking-widest">
                {sug.type}
              </span>
              <h3 className="font-black text-lg mb-3 uppercase tracking-tight">{sug.title}</h3>
              <p className="text-xs opacity-60 font-black uppercase tracking-tight leading-relaxed">{sug.desc}</p>
              
              <div className="mt-5 flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0">
                Lauch Module <ArrowRight size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
