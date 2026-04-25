"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, Terminal } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", activeCard: "neo-card-blue", hoverBorder: "hover:border-brand-blue", iconColor: "text-brand-blue" },
    { href: "/playground", icon: Terminal, label: "Playground", activeCard: "neo-card-yellow", hoverBorder: "hover:border-brand-yellow", iconColor: "text-brand-yellow" },
    { href: "/profile", icon: User, label: "Profile", activeCard: "neo-card-white", hoverBorder: "hover:border-border", iconColor: "text-foreground" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-card border-r-2 border-border p-6 flex flex-col gap-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-yellow border-2 border-black flex items-center justify-center font-black text-xl shadow-[2px_2px_0px_#000] text-black">
          CA
        </div>
        <h1 className="text-2xl font-black tracking-tighter uppercase italic">CodeArena</h1>
      </div>

      <nav className="flex flex-col gap-4 mt-8 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex items-center gap-3 px-4 py-3 neo-card transition-all hover:-translate-y-1 ${
                isActive 
                  ? `${item.activeCard} border-primary` 
                  : `bg-background/50 border-transparent opacity-70 hover:opacity-100 hover:border-border`
              }`}
            >
              <item.icon size={18} className={isActive ? "" : item.iconColor} />
              <span className="font-black text-xs uppercase tracking-widest">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-8">
        <ThemeToggle />
        
        <div className="neo-card-dark p-5 flex flex-col gap-3">
          <p className="font-black text-[10px] text-brand-yellow uppercase tracking-widest">Level: Explorer</p>
          <div className="w-full bg-background/50 h-3 border-2 border-border rounded-full overflow-hidden">
            <div className="bg-brand-blue h-full w-[45%] transition-all duration-1000"></div>
          </div>
          <p className="text-[9px] font-black opacity-50 text-right uppercase tracking-widest">450 / 1000 XP</p>
        </div>
      </div>
    </aside>
  );
}
