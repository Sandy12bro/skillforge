"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../context/AuthContext";
import { DashboardProvider } from "../../context/DashboardContext";

// Components
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
import FeedbackSection from "../../components/dashboard/FeedbackSection";

// Overlays
import ToastContainer from "../../components/dashboard/Toast";
import ModalContainer from "../../components/dashboard/Modal";

function DashboardContent() {
  const { user } = useAuth();
  const userName = user?.displayName?.split(" ")[0] || "Maker";
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-yellow selection:text-black transition-colors duration-500 overflow-x-hidden">
      <main className="w-full p-4 md:p-10">
        <div className="max-w-7xl mx-auto space-y-10 relative">
          
          {/* Header */}
          <TopNavbar />

          {/* Hero & Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            <HeroWelcome userName={userName} />
            <StatsGrid />
          </motion.div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left Column - Core Learning & Challenges */}
            <div className="lg:col-span-2 space-y-10">
              <section id="progress">
                <ProgressTracker />
              </section>
              <section id="challenge">
                <DailyChallenge />
              </section>
              <section id="learning">
                <ContinueLearning />
              </section>
              <section id="actions">
                <QuickActions />
              </section>
              <section id="suggestions">
                <MentorSuggestions />
              </section>
              <section id="feedback">
                <FeedbackSection />
              </section>
            </div>

            {/* Right Column - Social & Competitive */}
            <div className="lg:col-span-1 space-y-10">
              <section id="activity">
                <ActivityFeed />
              </section>
              <section id="leaderboard" className="neo-card p-7">
                <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
                  <span className="w-2 h-8 bg-brand-blue inline-block"></span>
                  Top Performers
                </h2>
                <Leaderboard />
              </section>
            </div>
          </div>

          {/* Footer Area */}
          <footer className="py-12 border-t-2 border-border mt-20 opacity-40">
            <div className="text-center">
              <p className="font-black uppercase tracking-widest text-xs">CodeArena // Next-Gen Learning Engine</p>
            </div>
          </footer>
        </div>
      </main>

      {/* Overlays */}
      <ToastContainer />
      <ModalContainer />

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 neo-button bg-brand-yellow text-black w-12 h-12 flex items-center justify-center p-0 rounded-full shadow-[4px_4px_0px_#000]"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
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
