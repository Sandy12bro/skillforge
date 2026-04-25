"use client";

import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 neo-card neo-card-white hover:-translate-y-1 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center shadow-[4px_4px_0px_#000]"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <Moon size={20} className="text-black" />
      ) : (
        <Sun size={20} className="text-black" />
      )}
    </button>
  );
}
