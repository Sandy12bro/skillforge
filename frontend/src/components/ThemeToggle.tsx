"use client";

import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`w-full py-3 px-4 border-2 border-black flex items-center justify-between transition-all duration-200 shadow-[4px_4px_0px_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] active:translate-y-0.5 active:shadow-none ${
        theme === "dark" 
          ? "bg-brand-yellow text-black" 
          : "bg-white text-black underline decoration-4 decoration-brand-yellow"
      }`}
    >
      <span className="font-black uppercase tracking-tighter text-sm">
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </span>
      {theme === "dark" ? (
        <Sun size={20} className="fill-current" />
      ) : (
        <Moon size={20} className="fill-current" />
      )}
    </button>
  );
}
