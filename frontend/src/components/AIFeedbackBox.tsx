import { CheckCircle2, AlertTriangle, Lightbulb, Sparkles } from "lucide-react";

export default function AIFeedbackBox() {
  return (
    <div className="neo-card neo-card-dark p-6 relative border-brand-blue">
      {/* Absolute badge */}
      <div className="absolute -top-3 -right-3 bg-brand-blue neo-border rounded-md text-white px-3 py-1 font-bold shadow-[2px_2px_0px_#000000] rotate-3 flex items-center gap-1">
        <Sparkles size={16} /> AI INSIGHT
      </div>

      <h2 className="text-xl font-black uppercase tracking-widest text-foreground mb-6">Recent Performance</h2>

      <div className="space-y-4">
        <div className="flex items-start gap-4 neo-card bg-background border-brand-blue p-4">
          <CheckCircle2 className="text-emerald-400 mt-0.5 shrink-0" size={20} />
          <div>
            <h3 className="font-bold text-emerald-400 uppercase text-sm tracking-wider mb-1">Good</h3>
            <p className="text-sm font-medium text-foreground/90 leading-snug">Excellent logical reasoning on the graph cycle detection task.</p>
          </div>
        </div>

        <div className="flex items-start gap-4 neo-card bg-background border-brand-red p-4">
          <AlertTriangle className="text-brand-red mt-0.5 shrink-0" size={20} />
          <div>
            <h3 className="font-bold text-brand-red uppercase text-sm tracking-wider mb-1">Improve</h3>
            <p className="text-sm font-medium text-foreground/90 leading-snug">Time complexity for matrix traversal was O(N^3). Try dynamic programming.</p>
          </div>
        </div>

        <div className="flex items-start gap-4 neo-card bg-background border-brand-yellow p-4">
          <Lightbulb className="text-brand-yellow mt-0.5 shrink-0" size={20} />
          <div>
            <h3 className="font-bold text-brand-yellow uppercase text-sm tracking-wider mb-1">Suggestion</h3>
            <p className="text-sm font-medium text-foreground/90 leading-snug">Review Bit Manipulation concepts to speed up aptitude math tasks by 20%.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
