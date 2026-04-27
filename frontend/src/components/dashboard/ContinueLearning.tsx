"use client";

import { Play } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";

export default function ContinueLearning() {
  const { topics, updateTopicProgress, searchQuery, openModal } = useDashboard();

  // Filter based on global search
  const filteredTopics = topics.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const getTopicBorder = (title: string) => {
    switch (title.toLowerCase()) {
      case 'loops': return 'border-t-4 border-brand-green';
      case 'functions': return 'border-t-4 border-brand-yellow';
      case 'arrays': return 'border-t-4 border-brand-blue';
      case 'recursion': return 'border-t-4 border-brand-red';
      default: return 'border-t-4 border-brand-blue';
    }
  };

  const getTopicShadow = (title: string) => {
    switch (title.toLowerCase()) {
      case 'loops': return 'hover:shadow-[10px_10px_0px_#10b981]';
      case 'functions': return 'hover:shadow-[10px_10px_0px_#facc15]';
      case 'arrays': return 'hover:shadow-[10px_10px_0px_#3b82f6]';
      case 'recursion': return 'hover:shadow-[10px_10px_0px_#ef4444]';
      default: return 'hover:shadow-[10px_10px_0px_var(--primary)]';
    }
  };

  return (
    <div className="mb-10" id="continue-learning">
      <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
        <span className="w-2 h-8 bg-brand-yellow inline-block"></span>
        Continue Learning
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic, i) => (
            <div 
              key={i} 
              className={`neo-card p-8 flex flex-col justify-between hover:bg-black/5 dark:hover:bg-white/5 hover:-translate-y-2 transition-all duration-300 ${getTopicBorder(topic.title)} ${getTopicShadow(topic.title)} ${topic.locked ? "opacity-50 grayscale" : "cursor-pointer"}`}
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-black text-xl uppercase tracking-tighter">{topic.title}</h3>
                  <span className="font-black text-sm px-3 py-1 bg-foreground text-background rounded-md">{topic.progress}%</span>
                </div>
                <div className="w-full h-5 bg-muted/20 border-2 border-border rounded-full overflow-hidden mb-8 shadow-inner">
                  <div 
                    className={`h-full ${topic.color} transition-all duration-700 ease-out`} 
                    style={{ width: `${topic.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => !topic.locked && openModal("Learning Module", topic)}
                  className={`neo-button w-full flex items-center justify-center gap-3 text-sm py-4 rounded-md ${
                    topic.locked ? "bg-muted/30 text-muted cursor-not-allowed border-border" : 
                    topic.progress === 100 ? "bg-brand-green text-black" : "bg-card hover:bg-brand-yellow text-foreground hover:text-black shadow-[3px_3px_0px_#000]"
                  }`}
                  disabled={topic.locked}
                >
                  {topic.locked ? "LOCKED" : topic.progress === 100 ? "REVIEW" : "START MISSION"} 
                  {!topic.locked && <Play size={16} fill="currentColor" />}
                </button>
                {topic.progress > 0 && topic.progress < 100 && !topic.locked && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      updateTopicProgress(topic.title, 10);
                    }}
                    className="text-[10px] font-black uppercase text-brand-blue hover:underline text-center"
                  >
                    Quick Resume (+10%)
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 neo-card bg-muted/5 border-dashed flex flex-col items-center justify-center opacity-50">
            <p className="font-black uppercase tracking-widest text-sm">No topics matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
