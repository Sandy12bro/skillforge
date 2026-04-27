"use client";

import React from "react";
import { 
  Home, 
  BookOpen, 
  Zap, 
  Trophy, 
  Bot, 
  History,
  Settings,
  LogOut
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  activeSection?: number;
  scrollTo?: (idx: number) => void;
}

export default function Sidebar({ activeSection = 0, scrollTo }: SidebarProps) {
  const { logout } = useAuth();
  
  const navItems = [
    { icon: Home, label: "Home", idx: 0 },
    { icon: BookOpen, label: "Learning", idx: 1 },
    { icon: Zap, label: "Actions", idx: 2 },
    { icon: Trophy, label: "Daily", idx: 3 },
    { icon: Bot, label: "Mentor", idx: 4 },
    { icon: History, label: "Social", idx: 5 }
  ];

  return (
    <aside className="w-20 lg:w-24 border-r-4 border-black bg-background flex flex-col items-center py-8 shrink-0 z-50">
      {/* Logo Area */}
      <div className="w-12 h-12 bg-brand-yellow border-2 border-black flex items-center justify-center font-black text-xl shadow-[3px_3px_0px_#000] text-black mb-12">
        CA
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col gap-6">
        {navItems.map((item) => (
          <button
            key={item.idx}
            onClick={() => scrollTo?.(item.idx)}
            className={`group relative p-3 rounded-md transition-all duration-200 ${
              activeSection === item.idx 
                ? "bg-brand-blue text-white border-2 border-black shadow-[3px_3px_0px_#000] -translate-y-1 scale-110" 
                : "text-muted hover:bg-card hover:text-foreground border-2 border-transparent"
            }`}
          >
            <item.icon size={24} />
            <span className="absolute left-full ml-4 px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap rounded-sm pointer-events-none z-50">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="flex flex-col gap-4 mt-auto">
        <button className="p-3 text-muted hover:text-brand-blue transition-colors">
          <Settings size={24} />
        </button>
        <button 
          onClick={logout}
          className="p-3 text-muted hover:text-brand-red transition-colors"
        >
          <LogOut size={24} />
        </button>
      </div>
    </aside>
  );
}
