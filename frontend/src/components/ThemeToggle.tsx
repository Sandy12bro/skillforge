"use client";

import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 neo-card bg-card hover:-translate-y-1 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center border-black shadow-[4px_4px_0px_#000]"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <Moon size={22} className="text-brand-blue fill-brand-blue" />
      ) : (
        <Sun size={22} className="text-brand-yellow fill-brand-yellow" />
      )}
    </button>
  );
}
