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
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic, i) => (
            <div key={i} className={`neo-card p-6 flex flex-col justify-between hover:bg-black/5 dark:hover:bg-white/5 hover:-translate-y-2 transition-all duration-300 ${getTopicBorder(topic.title)} ${topic.locked ? "opacity-50 grayscale" : "cursor-pointer"}`}>
              <div>
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-black text-lg uppercase tracking-tight">{topic.title}</h3>
                  <span className="font-black text-xs px-2 py-1 bg-foreground text-background rounded-sm">{topic.progress}%</span>
                </div>
                <div className="w-full h-4 bg-muted/20 border-2 border-border rounded-full overflow-hidden mb-8">
                  <div 
                    className={`h-full ${topic.color} transition-all duration-700 ease-out`} 
                    style={{ width: `${topic.progress}%` }}
                  ></div>
                </div>
              </div>
              <button 
                onClick={() => !topic.locked && openModal("Learning Module", topic)}
                className={`neo-button w-full flex items-center justify-center gap-2 text-xs py-2 ${
                  topic.locked ? "bg-muted/30 text-muted cursor-not-allowed border-border" : 
                  topic.progress === 100 ? "bg-brand-green text-black" : "bg-card hover:bg-brand-yellow text-foreground hover:text-black"
                }`}
                disabled={topic.locked}
              >
                {topic.locked ? "LOCKED" : topic.progress === 100 ? "REVIEW" : "START LEARNING"} 
                {!topic.locked && <Play size={14} fill="currentColor" />}
              </button>
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
