import { CheckCircle2, AlertTriangle, Lightbulb, Sparkles } from "lucide-react";

export default function AIFeedbackBox() {
  return (
    <div className="neo-card p-7 relative border-primary shadow-[6px_6px_0px_#000]">
      {/* Absolute badge */}
      <div className="absolute -top-4 right-6 bg-foreground border-2 border-background text-background px-4 py-1.5 font-black text-[10px] tracking-[0.25em] shadow-[4px_4px_0px_rgba(0,0,0,0.2)] rotate-2 flex items-center gap-2">
        <Sparkles size={14} className="text-brand-yellow" /> AI MENTOR INSIGHTS
      </div>

      <h2 className="text-xl font-black uppercase tracking-tight mb-8 border-b-2 border-border/20 pb-2">Your Path to Senior</h2>

      <div className="space-y-6">
        <div className="flex items-start gap-5 bg-blue-500/10 border-2 border-blue-500/50 p-5 rounded-md shadow-[2px_2px_0px_#000]">
          <div className="bg-background border-2 border-blue-500 p-2 rounded-md shrink-0">
            <CheckCircle2 className="text-blue-500" size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-500 text-white text-[9px] font-black px-2 py-0.5 rounded-sm tracking-widest uppercase">FOCUS</span>
              <h3 className="font-black uppercase text-xs tracking-wider font-mono">Graph Mastery</h3>
            </div>
            <p className="text-sm font-black opacity-80 leading-relaxed uppercase tracking-tight">Excellent logical reasoning on the graph cycle detection task. You're ready for Advanced DP.</p>
          </div>
        </div>

        <div className="flex items-start gap-5 bg-brand-blue/5 border-2 border-brand-blue/30 p-5 rounded-md shadow-[3px_3px_0px_#1d4ed8]">
          <div className="bg-background border-2 border-brand-blue p-2 rounded-md shrink-0">
            <AlertTriangle className="text-brand-blue" size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-brand-blue text-white text-[9px] font-black px-2 py-0.5 rounded-sm tracking-widest uppercase">UPGRADE PATH</span>
              <h3 className="font-black uppercase text-xs tracking-wider font-mono">Matrix Traversal</h3>
            </div>
            <p className="text-sm font-black opacity-80 leading-relaxed uppercase tracking-tight">Time complexity was O(N^3). Refactor using memoization to hit O(N^2).</p>
          </div>
        </div>

        <div className="flex items-start gap-5 bg-yellow-500/10 border-2 border-yellow-500/50 p-5 rounded-md shadow-[2px_2px_0px_#000]">
          <div className="bg-background border-2 border-yellow-500 p-2 rounded-md shrink-0">
            <Lightbulb className="text-yellow-500" size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-yellow-500 text-black text-[9px] font-black px-2 py-0.5 rounded-sm tracking-widest uppercase">PRO TIP</span>
              <h3 className="font-black uppercase text-xs tracking-wider font-mono">Bit Math</h3>
            </div>
            <p className="text-sm font-black opacity-80 leading-relaxed uppercase tracking-tight">Use bitwise operations in aptitude math to shave 150ms off execution time.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
