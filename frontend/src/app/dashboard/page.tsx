"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../context/AuthContext";
import { DashboardProvider } from "../../context/DashboardContext";

// New Dashboard Components
import TopNavbar from "../../components/dashboard/TopNavbar";
import HeroWelcome from "../../components/dashboard/HeroWelcome";
import StatsGrid from "../../components/dashboard/StatsGrid";
import ProgressTracker from "../../components/dashboard/ProgressTracker";
import ContinueLearning from "../../components/dashboard/ContinueLearning";
import QuickActions from "../../components/dashboard/QuickActions";
import DailyChallenge from "../../components/dashboard/DailyChallenge";
import MentorSuggestions from "../../components/dashboard/MentorSuggestions";
import ActivityFeed from "../../components/dashboard/ActivityFeed";
import Leaderboard from "../../components/Leaderboard";
import Sidebar from "../../components/Sidebar";
import FeedbackSection from "../../components/dashboard/FeedbackSection";

// Modals and Toasts
import ToastContainer from "../../components/dashboard/Toast";
import ModalContainer from "../../components/dashboard/Modal";

function DashboardContent() {
  const { user } = useAuth();
  const userName = user?.displayName?.split(" ")[0] || "Maker";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { 
      id: "welcome", 
      title: "Home",
      content: (
        <div className="max-w-6xl w-full mx-auto">
          <HeroWelcome userName={userName} />
          <div className="mt-8">
            <StatsGrid />
          </div>
        </div>
      )
    },
    { 
      id: "learning", 
      title: "Learning",
      content: (
        <div className="max-w-6xl w-full mx-auto flex flex-col gap-10">
          <ProgressTracker />
          <ContinueLearning />
        </div>
      )
    },
    { 
      id: "actions", 
      title: "Actions",
      content: (
        <div className="max-w-6xl w-full mx-auto">
          <QuickActions />
        </div>
      )
    },
    { 
      id: "challenge", 
      title: "Daily",
      content: (
        <div className="max-w-4xl w-full mx-auto">
          <DailyChallenge />
        </div>
      )
    },
    { 
      id: "mentor", 
      title: "Mentor",
      content: (
        <div className="max-w-6xl w-full mx-auto">
          <MentorSuggestions />
        </div>
      )
    },
    { 
      id: "social", 
      title: "Social",
      content: (
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1">
            <ActivityFeed />
          </div>
          <div className="lg:col-span-1">
            <FeedbackSection />
          </div>
          <div className="lg:col-span-1 neo-card p-7 h-full">
            <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-brand-blue inline-block"></span>
              Top Performers
            </h2>
            <Leaderboard />
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      // Prevent default to control scrolling behavior
      const isHorizontalScrollable = e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!isHorizontalScrollable) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 2;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        scrollTo(Math.min(activeSection + 1, sections.length - 1));
      } else if (e.key === "ArrowLeft") {
        scrollTo(Math.max(activeSection - 1, 0));
      }
    };

    const onScroll = () => {
      const sectionWidth = el.offsetWidth;
      const current = Math.round(el.scrollLeft / sectionWidth);
      if (current !== activeSection) setActiveSection(current);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", onScroll);
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeSection, sections.length]);

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.offsetWidth,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground font-sans transition-colors duration-500">
      <Sidebar activeSection={activeSection} scrollTo={scrollTo} />
      
      <main className="flex-1 relative flex flex-col min-w-0">
        <div className="absolute top-0 left-0 right-0 z-30 p-10 pointer-events-none">
          <div className="max-w-7xl mx-auto pointer-events-auto">
            <TopNavbar />
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex-1 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar touch-pan-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {sections.map((section, idx) => (
            <section 
              key={section.id}
              className="min-w-full h-full snap-start flex flex-col justify-center px-10 pt-32 pb-24 shrink-0 transition-opacity duration-300"
              style={{ opacity: activeSection === idx ? 1 : 0.4 }}
            >
              <div className="w-full flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {activeSection === idx && (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: -100, filter: "blur(10px)" }}
                      transition={{ duration: 0.5, ease: "circOut" }}
                      className="w-full h-full flex flex-col justify-center"
                    >
                      {section.content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>
          ))}
        </div>

        {/* Navigation Overlay */}
        <div className="absolute bottom-10 left-0 right-0 z-40 px-10 flex items-center justify-between pointer-events-none">
          <div className="flex gap-4 pointer-events-auto">
            <button 
              onClick={() => scrollTo(activeSection - 1)}
              disabled={activeSection === 0}
              className="neo-button bg-card w-14 h-14 flex items-center justify-center p-0 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scrollTo(activeSection + 1)}
              disabled={activeSection === sections.length - 1}
              className="neo-button bg-brand-blue text-white w-14 h-14 flex items-center justify-center p-0 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex items-center gap-3 bg-card/80 backdrop-blur-md px-6 py-4 border-2 border-border rounded-full pointer-events-auto shadow-[4px_4px_0px_#000]">
            {sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => scrollTo(i)}
                className={`group relative flex items-center gap-2 transition-all`}
              >
                <div className={`w-3 h-3 rounded-full border-2 border-black transition-all duration-300 ${activeSection === i ? 'bg-brand-yellow w-8' : 'bg-background hover:bg-brand-blue/30'}`}></div>
                {activeSection === i && (
                  <span className="text-[10px] font-black uppercase tracking-widest">{s.title}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Global Interactive Overlays */}
      <ToastContainer />
      <ModalContainer />
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardProvider>
        <DashboardContent />
      </DashboardProvider>
    </ProtectedRoute>
  );
}
