"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import roadmapData from "../../data/roadmap.json";
import { Map, ChevronRight, CheckCircle2 } from "lucide-react";

export default function Roadmap() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="min-h-screen bg-background flex justify-center items-center font-bold text-foreground uppercase tracking-widest">Loading CodeArena...</div>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <header className="mb-8 border-b-2 border-border pb-6 flex items-center gap-4">
            <div className="bg-brand-yellow neo-border p-3 text-black">
              <Map size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black uppercase tracking-widest text-foreground drop-shadow-[2px_2px_0px_#FACC15]">
                {roadmapData.title}
              </h1>
              <p className="text-muted font-bold mt-2 text-lg">
                Your path to mastery starts here.
              </p>
            </div>
          </header>

          <div className="space-y-10">
            {roadmapData.levels.map((level) => (
              <div key={level.id} className="relative pl-10 border-l-4 border-brand-yellow">
                
                {/* Level Circle Tracker */}
                <div className="absolute -left-[14px] top-0 w-6 h-6 neo-border rounded-full bg-brand-yellow flex items-center justify-center font-bold text-xs" />
                
                <h2 className="text-3xl font-black text-foreground uppercase tracking-widest drop-shadow-[2px_2px_0px_#EF4444] mb-6">
                  {level.levelName}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {level.skills.map((skill) => (
                    <div key={skill.id} className="neo-card bg-card text-foreground border-brand-blue p-6 hover:-translate-y-2 hover:shadow-[4px_4px_0px_#3B82F6] transition-all">
                      <div className="flex justify-between items-center mb-4 border-b-2 border-[#333] pb-2">
                        <h3 className="text-xl font-bold uppercase text-brand-blue tracking-wider">{skill.name}</h3>
                        <CheckCircle2 className="text-[#333]" size={24} />
                      </div>
                      
                      <ul className="space-y-3">
                        {skill.topics.map((topic, index) => (
                          <li key={index} className="flex items-start gap-2 font-medium text-foreground/90">
                            <ChevronRight size={18} className="text-brand-yellow shrink-0 mt-0.5" />
                            <span className="leading-tight">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
