"use client";

import { Code, Bug, AlertTriangle, Box, Bot, BookOpen } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";

export default function QuickActions() {
  const { openModal, searchQuery } = useDashboard();

  const actions = [
    { title: "Visualizer", icon: Code, color: "text-blue-600", tint: "bg-blue-50 hover:bg-blue-100", accent: "border-blue-500" },
    { title: "Debugger", icon: Bug, color: "text-red-500", tint: "bg-red-50 hover:bg-red-100", accent: "border-red-500" },
    { title: "Explainer", icon: AlertTriangle, color: "text-yellow-600", tint: "bg-yellow-50 hover:bg-yellow-100", accent: "border-yellow-500" },
    { title: "Sandbox", icon: Box, color: "text-green-600", tint: "bg-green-50 hover:bg-green-100", accent: "border-green-500" },
    { title: "Mentor", icon: Bot, color: "text-purple-600", tint: "bg-purple-50 hover:bg-purple-100", accent: "border-purple-500" },
    { title: "Library", icon: BookOpen, color: "text-blue-600", tint: "bg-blue-50 hover:bg-blue-100", accent: "border-blue-500" },
  ];

  const filtered = actions.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="mb-10">
      <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
        <span className="w-2 h-8 bg-brand-red inline-block"></span>
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {filtered.map((action, i) => (
          <div 
            key={i} 
            onClick={() => openModal(action.title)}
            className={`neo-card ${action.tint} ${action.accent} p-6 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-150 shadow-[2px_2px_0px_#000] hover:-translate-y-2 hover:shadow-[6px_6px_0px_#000] group`}
          >
            <div className="p-3 bg-white border-2 border-black rounded-md group-hover:rotate-6 transition-transform">
              <action.icon size={28} className={action.color} />
            </div>
            <span className="font-black text-[10px] uppercase tracking-[0.2em] text-center text-black/70 group-hover:text-black">{action.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
