import { CheckCircle2, AlertTriangle, Lightbulb, Sparkles } from "lucide-react";

export default function AIFeedbackBox() {
  return (
    <div className="neo-card bg-white p-7 relative border-purple-500 shadow-[6px_6px_0px_#000]">
      {/* Absolute badge */}
      <div className="absolute -top-4 right-6 bg-black border-2 border-white text-white px-4 py-1.5 font-black text-[10px] tracking-[0.25em] shadow-[4px_4px_0px_rgba(0,0,0,0.2)] rotate-2 flex items-center gap-2">
        <Sparkles size={14} className="text-brand-yellow" /> AI MENTOR INSIGHTS
      </div>

      <h2 className="text-xl font-black uppercase tracking-tight text-black mb-8 border-b-2 border-black/10 pb-2">Your Path to Senior</h2>

      <div className="space-y-6">
        <div className="flex items-start gap-5 bg-blue-100 border-2 border-blue-500 p-5 rounded-md shadow-[2px_2px_0px_#000]">
          <div className="bg-white border-2 border-blue-500 p-2 rounded-md shrink-0">
            <CheckCircle2 className="text-blue-600" size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-sm tracking-widest">FOCUS</span>
              <h3 className="font-black text-black uppercase text-xs tracking-wider font-mono">Graph Mastery</h3>
            </div>
            <p className="text-sm font-black text-blue-900/80 leading-relaxed uppercase tracking-tight">Excellent logical reasoning on the graph cycle detection task. You're ready for Advanced DP.</p>
          </div>
        </div>

        <div className="flex items-start gap-5 bg-purple-100 border-2 border-purple-500 p-5 rounded-md shadow-[2px_2px_0px_#000]">
          <div className="bg-white border-2 border-purple-500 p-2 rounded-md shrink-0">
            <AlertTriangle className="text-purple-600" size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-purple-600 text-white text-[9px] font-black px-2 py-0.5 rounded-sm tracking-widest">NEXT STEP</span>
              <h3 className="font-black text-black uppercase text-xs tracking-wider font-mono">Matrix Traversal</h3>
            </div>
            <p className="text-sm font-black text-purple-900/80 leading-relaxed uppercase tracking-tight">Time complexity was O(N^3). Refactor using memoization to hit O(N^2).</p>
          </div>
        </div>

        <div className="flex items-start gap-5 bg-yellow-100 border-2 border-yellow-500 p-5 rounded-md shadow-[2px_2px_0px_#000]">
          <div className="bg-white border-2 border-yellow-500 p-2 rounded-md shrink-0">
            <Lightbulb className="text-yellow-600" size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-yellow-600 text-black text-[9px] font-black px-2 py-0.5 rounded-sm tracking-widest">PRO TIP</span>
              <h3 className="font-black text-black uppercase text-xs tracking-wider font-mono">Bit Math</h3>
            </div>
            <p className="text-sm font-black text-yellow-900/80 leading-relaxed uppercase tracking-tight">Use bitwise operations in aptitude math to shave 150ms off execution time.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
