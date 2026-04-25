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
    <aside className="w-64 min-h-screen bg-card border-r-2 border-border p-6 flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 neo-card neo-card-yellow flex items-center justify-center font-bold text-xl">
          CA
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">CodeArena</h1>
      </div>

      <nav className="flex flex-col gap-4 mt-8 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex items-center gap-3 px-4 py-3 neo-card transition-transform hover:-translate-y-1 ${
                isActive 
                  ? item.activeCard 
                  : `neo-card-dark ${item.hoverBorder}`
              }`}
            >
              <item.icon size={20} className={isActive ? "" : item.iconColor} />
              <span className="font-bold">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-6">
        <ThemeToggle />
        
        <div className="neo-card neo-card-dark p-4 flex flex-col gap-2">
          <p className="font-bold text-sm text-brand-yellow">Level: Explorer</p>
          <div className="w-full bg-background h-3 neo-border rounded-full overflow-hidden">
            <div className="bg-brand-blue h-full w-[45%]"></div>
          </div>
          <p className="text-xs text-muted font-bold text-right">450 / 1000 XP</p>
        </div>
      </div>
    </aside>
  );
}
