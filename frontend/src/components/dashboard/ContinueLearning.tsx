"use client";

import { Play } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";

export default function ContinueLearning() {
  const { topics, updateTopicProgress, searchQuery } = useDashboard();

  // Filter based on global search
  const filteredTopics = topics.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const getTopicBorder = (title: string) => {
    switch (title.toLowerCase()) {
      case 'loops': return 'border-t-4 border-green-500';
      case 'functions': return 'border-t-4 border-yellow-400';
      case 'arrays': return 'border-t-4 border-blue-500';
      case 'recursion': return 'border-t-4 border-red-500';
      default: return 'border-t-4 border-brand-blue';
    }
  };

  return (
    <div className="mb-10" id="continue-learning">
      <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
        <span className="w-2 h-8 bg-brand-yellow inline-block"></span>
        Continue Learning
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTopics.map((topic, i) => (
          <div key={i} className={`neo-card p-6 flex flex-col justify-between hover:bg-card-hover hover:-translate-y-2 transition-all duration-300 ${getTopicBorder(topic.title)} ${topic.locked ? "opacity-50 grayscale" : "cursor-pointer"}`}>
            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-black text-lg uppercase tracking-tight text-foreground">{topic.title}</h3>
                <span className="font-black text-xs px-2 py-1 bg-foreground text-background rounded-sm">{topic.progress}%</span>
              </div>
              <div className="w-full h-4 bg-background border-2 border-border rounded-full overflow-hidden mb-8">
                <div 
                  className={`h-full ${topic.color} transition-all duration-700 ease-out`} 
                  style={{ width: `${topic.progress}%` }}
                ></div>
              </div>
            </div>
            <button 
              onClick={() => updateTopicProgress(topic.title, 10)}
              className={`neo-button w-full flex items-center justify-center gap-2 text-xs py-2 ${
                topic.locked ? "bg-muted text-card cursor-not-allowed border-border" : 
                topic.progress === 100 ? "bg-brand-green text-black" : "bg-card hover:bg-brand-yellow text-foreground hover:text-black"
              }`}
              disabled={topic.locked || topic.progress === 100}
            >
              {topic.locked ? "LOCKED" : topic.progress === 100 ? "COMPLETE" : "RESUME"} 
              {!topic.locked && topic.progress < 100 && <Play size={14} fill="currentColor" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
