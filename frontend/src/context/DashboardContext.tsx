"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Types
export type Topic = { title: string; progress: number; color: string; locked: boolean };
export type Activity = { text: string; time: string; icon: string; color: string };
export type ToastMessage = { id: string; message: string; type: "success" | "info" | "error" };

interface DashboardContextType {
  xp: number;
  level: string;
  streak: number;
  rank: number;
  accuracy: number;
  topics: Topic[];
  searchQuery: string;
  activities: Activity[];
  activeModal: string | null;
  modalData: any;
  toasts: ToastMessage[];
  lastActiveTopic: string;
  
  // Actions
  dailyTaskActive: boolean;
  dailyTaskCompleted: boolean;
  dailyTaskTimeLeft: number;
  startDailyTask: () => void;
  completeDailyTask: () => void;
  addXP: (amount: number, reason: string) => void;
  updateTopicProgress: (title: string, amount: number) => void;
  setSearchQuery: (query: string) => void;
  openModal: (name: string, data?: any) => void;
  closeModal: () => void;
  showToast: (message: string, type?: "success" | "info" | "error") => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  // Initialize state with default or localStorage values
  const [xp, setXp] = useState(1250);
  const [level, setLevel] = useState("Explorer");
  const [streak, setStreak] = useState(5);
  const [rank, setRank] = useState(42);
  const [accuracy, setAccuracy] = useState(94);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [lastActiveTopic, setLastActiveTopic] = useState<string>("Loops");

  // Daily Task State
  const [dailyTaskActive, setDailyTaskActive] = useState(false);
  const [dailyTaskCompleted, setDailyTaskCompleted] = useState(false);
  const [dailyTaskTimeLeft, setDailyTaskTimeLeft] = useState(180);
  const [lastTaskDate, setLastTaskDate] = useState<string | null>(null);

  const [topics, setTopics] = useState<Topic[]>([
    { title: "Arrays", progress: 0, color: "bg-brand-blue", locked: false },
    { title: "Loops", progress: 0, color: "bg-brand-green", locked: true },
    { title: "Functions", progress: 0, color: "bg-brand-yellow", locked: true },
    { title: "Recursion", progress: 0, color: "bg-brand-red", locked: true },
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    { text: "Completed Arrays lesson", time: "2 hours ago", icon: "CheckCircle", color: "text-brand-green" },
    { text: "Earned Bug Hunter badge", time: "5 hours ago", icon: "Award", color: "text-brand-yellow" },
  ]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedXP = localStorage.getItem("ca_xp");
    if (savedXP) setXp(parseInt(savedXP));
    
    const savedTopics = localStorage.getItem("ca_topics");
    if (savedTopics) setTopics(JSON.parse(savedTopics));

    const savedActivities = localStorage.getItem("ca_activities");
    if (savedActivities) setActivities(JSON.parse(savedActivities));

    const savedLastTopic = localStorage.getItem("ca_last_topic");
    if (savedLastTopic) setLastActiveTopic(savedLastTopic);

    // Daily Task Recovery
    const savedActive = localStorage.getItem("ca_daily_active") === "true";
    const savedCompleted = localStorage.getItem("ca_daily_completed") === "true";
    const savedTime = localStorage.getItem("ca_daily_time");
    const savedDate = localStorage.getItem("ca_daily_date");
    const today = new Date().toDateString();

    if (savedDate !== today) {
      setDailyTaskActive(false);
      setDailyTaskCompleted(false);
      setDailyTaskTimeLeft(180);
      setLastTaskDate(today);
    } else {
      setDailyTaskActive(savedActive);
      setDailyTaskCompleted(savedCompleted);
      if (savedTime) setDailyTaskTimeLeft(parseInt(savedTime));
      setLastTaskDate(savedDate);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("ca_xp", xp.toString());
    localStorage.setItem("ca_topics", JSON.stringify(topics));
    localStorage.setItem("ca_activities", JSON.stringify(activities));
    localStorage.setItem("ca_last_topic", lastActiveTopic);
    
    localStorage.setItem("ca_daily_active", dailyTaskActive.toString());
    localStorage.setItem("ca_daily_completed", dailyTaskCompleted.toString());
    localStorage.setItem("ca_daily_time", dailyTaskTimeLeft.toString());
    if (lastTaskDate) localStorage.setItem("ca_daily_date", lastTaskDate);
  }, [xp, topics, activities, dailyTaskActive, dailyTaskCompleted, dailyTaskTimeLeft, lastTaskDate]);

  // Countdown timer
  useEffect(() => {
    let interval: any = null;
    if (dailyTaskActive && dailyTaskTimeLeft > 0) {
      interval = setInterval(() => {
        setDailyTaskTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (dailyTaskTimeLeft === 0 && dailyTaskActive) {
      setDailyTaskActive(false);
    }
    return () => clearInterval(interval);
  }, [dailyTaskActive, dailyTaskTimeLeft]);

  const startDailyTask = () => {
    setDailyTaskActive(true);
  };

  const completeDailyTask = () => {
    setDailyTaskActive(false);
    setDailyTaskCompleted(true);
    addXP(250, "Completed Daily Challenge!");
  };

  const showToast = (message: string, type: "success" | "info" | "error" = "info") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const addActivity = (text: string, icon: string, color: string) => {
    setActivities((prev) => [{ text, time: "Just now", icon, color }, ...prev].slice(0, 10));
  };

  const addXP = (amount: number, reason: string) => {
    setXp((prev) => {
      const newXp = prev + amount;
      
      // Dynamic Rank: Improve rank as XP grows
      if (Math.floor(newXp / 200) > Math.floor(prev / 200)) {
        setRank(r => Math.max(1, r - 1));
      }

      if (Math.floor(newXp / 1000) > Math.floor(prev / 1000)) {
        setLevel("Advanced Explorer");
        showToast("Level Up! You are now an Advanced Explorer!", "success");
      }
      return newXp;
    });
    showToast(`+${amount} XP: ${reason}`, "success");
    addActivity(`Gained ${amount} XP from ${reason}`, "Star", "text-brand-yellow");
  };

  const updateTopicProgress = (title: string, amount: number) => {
    setLastActiveTopic(title);
    setTopics((prev) => {
      let nextToUnlock: string | null = null;
      const newTopics = prev.map((t, index) => {
        if (t.title === title) {
          const newProgress = Math.min(100, t.progress + amount);
          if (newProgress === 100 && t.progress < 100) {
            showToast(`Completed ${title}!`, "success");
            addXP(100, `Completing ${title}`);
            // Mark next topic to unlock
            if (index < prev.length - 1) {
              nextToUnlock = prev[index + 1].title;
            }
          }
          return { ...t, progress: newProgress };
        }
        return t;
      });

      if (nextToUnlock) {
        showToast(`New Topic Unlocked: ${nextToUnlock}!`, "info");
        return newTopics.map(t => t.title === nextToUnlock ? { ...t, locked: false } : t);
      }

      return newTopics;
    });
  };

  const openModal = (name: string, data?: any) => {
    setModalData(data || null);
    setActiveModal(name);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  return (
    <DashboardContext.Provider
      value={{
        xp, level, streak, rank, accuracy, topics, searchQuery, activities,
        activeModal, modalData, toasts,
        dailyTaskActive, dailyTaskCompleted, dailyTaskTimeLeft,
        startDailyTask, completeDailyTask,
        lastActiveTopic,
        addXP, updateTopicProgress, setSearchQuery, openModal, closeModal, showToast
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be used within DashboardProvider");
  return context;
};
