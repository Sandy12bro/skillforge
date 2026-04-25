"use client";

import Link from "next/link";
import { Terminal, Bug, AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || user) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans overflow-x-hidden">
      {/* Navbar Minimal */}
      <nav className="w-full p-6 flex justify-between items-center border-b-2 border-black max-w-7xl mx-auto shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 neo-card neo-card-yellow flex items-center justify-center font-bold text-xl">
            CA
          </div>
          <span className="text-2xl font-black text-foreground tracking-widest uppercase">CodeArena</span>
        </div>
      </nav>

      {/* Hero Section: dynamically fills remaining screen height */}
      <main className="flex-1 flex flex-col justify-between items-center w-full max-w-7xl mx-auto px-6 py-6 md:py-10">
        
        {/* Sequence 1: Hero Text */}
        <div className="text-center w-full max-w-4xl flex flex-col justify-center shrink-0">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-foreground uppercase tracking-tighter drop-shadow-[4px_4px_0px_#EF4444] leading-tight mb-4">
            See Your Code.<br />Master It.
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-muted font-bold tracking-widest">
            Stop memorizing programming. Start visualizing, debugging, and learning by doing.
          </p>
        </div>

        {/* Sequence 2: Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full my-6 md:my-0 flex-1 content-center">
          <div className="neo-card bg-card border-brand-blue p-6 lg:p-8 hover:-translate-y-2 hover:shadow-[6px_6px_0px_#3B82F6] transition-all flex flex-col justify-center h-full">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-brand-blue border-2 border-black rounded-full flex items-center justify-center mb-4 shadow-[2px_2px_0px_#000]">
              <Terminal className="text-white" size={24} />
            </div>
            <h2 className="text-xl lg:text-2xl font-black text-foreground uppercase tracking-widest mb-3">Execution Visualizer</h2>
            <p className="text-sm lg:text-base text-muted font-bold leading-relaxed">
              Watch your code run line-by-line. Track variables live and step through logic with total clarity.
            </p>
          </div>

          <div className="neo-card bg-card border-brand-yellow p-6 lg:p-8 hover:-translate-y-2 hover:shadow-[6px_6px_0px_#FACC15] transition-all flex flex-col justify-center h-full">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-brand-yellow border-2 border-black rounded-full flex items-center justify-center mb-4 shadow-[2px_2px_0px_#000]">
              <Bug className="text-black" size={24} />
            </div>
            <h2 className="text-xl lg:text-2xl font-black text-foreground uppercase tracking-widest mb-3">Debug Playground</h2>
            <p className="text-sm lg:text-base text-muted font-bold leading-relaxed">
              Fix real-world bugs in an interactive arena. Get hints and level up your problem-solving game.
            </p>
          </div>

          <div className="neo-card bg-card border-brand-red p-6 lg:p-8 hover:-translate-y-2 hover:shadow-[6px_6px_0px_#EF4444] transition-all flex flex-col justify-center h-full">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-brand-red border-2 border-black rounded-full flex items-center justify-center mb-4 shadow-[2px_2px_0px_#000]">
              <AlertTriangle className="text-white" size={24} />
            </div>
            <h2 className="text-xl lg:text-2xl font-black text-foreground uppercase tracking-widest mb-3">Error Explainer</h2>
            <p className="text-sm lg:text-base text-muted font-bold leading-relaxed">
              Stop guessing. Understand exactly why your code failed and get instant fixes for any error.
            </p>
          </div>
        </div>

        {/* Sequence 3: CTA Button */}
        <div className="text-center w-full shrink-0 pt-2">
          <Link
            href="/login"
            className="neo-button bg-brand-yellow text-black inline-block text-xl md:text-2xl py-4 md:py-6 px-8 md:px-12 hover:-translate-y-2 hover:shadow-[8px_8px_0px_#000] rotate-1 transition-all rounded-md font-black shadow-[4px_4px_0px_#000] border-2 border-black"
          >
            🚀 START LEARNING NOW
          </Link>
        </div>
      </main>

      <footer className="border-t-2 border-border p-4 bg-background text-center w-full shrink-0">
        <p className="font-bold text-muted uppercase tracking-widest text-xs md:text-sm">© 2026 CodeArena. Built for learners who want to actually understand code.</p>
      </footer>
    </div>
  );
}
