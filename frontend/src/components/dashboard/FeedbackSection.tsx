"use client";

import { useState } from "react";
import { MessageSquare, Send, ThumbsUp, Star } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";

export default function FeedbackSection() {
  const { showToast } = useDashboard();
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      showToast("Thank you for your feedback! We're building for you. 🚀", "success");
      setFeedback("");
      setRating(0);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="h-full">
      <div className="neo-card bg-brand-yellow/10 border-brand-yellow p-8 relative overflow-hidden group h-full">
        {/* Background Accent */}
        <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
          <MessageSquare size={240} />
        </div>

        <div className="relative z-10 w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-brand-yellow border-2 border-black rounded-md flex items-center justify-center shadow-[3px_3px_0px_#000]">
              <ThumbsUp size={24} className="text-black" />
            </div>
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-foreground leading-none">Your Arena, Your Voice</h2>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mt-1">Help us build the ultimate learning experience</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest opacity-70">Rate your experience</label>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    className={`w-10 h-10 border-2 border-black flex items-center justify-center transition-all ${
                      rating >= s ? "bg-brand-yellow scale-110 shadow-[3px_3px_0px_#000]" : "bg-card hover:bg-brand-yellow/30"
                    }`}
                  >
                    <Star size={18} fill={rating >= s ? "black" : "none"} className={rating >= s ? "text-black" : "text-muted"} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest opacity-70">What can we improve?</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us about your experience, report a bug, or suggest a new feature..."
                className="w-full h-32 bg-background border-2 border-black p-4 font-bold text-sm focus:outline-none focus:shadow-[4px_4px_0px_#ca8a04] transition-all resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !feedback.trim()}
              className="neo-button bg-black text-white px-8 py-4 flex items-center gap-3 font-black uppercase tracking-widest text-sm hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed shadow-[6px_6px_0px_rgba(0,0,0,0.3)]"
            >
              {isSubmitting ? "TRANSMITTING..." : (
                <>
                  SEND FEEDBACK <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
