"use client";

import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  X, 
  Variable, 
  Cpu, 
  Code2,
  RefreshCcw
} from "lucide-react";

interface TraceStep {
  line: number;
  message: string;
  variables: { name: string; value: any }[];
}

interface VisualizerProps {
  code: string;
  language: string;
  trace: TraceStep[];
  onClose: () => void;
}

export default function ExecutionVisualizer({ code, language, trace, onClose }: VisualizerProps) {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [editor, setEditor] = useState<any>(null);

  const step = trace[currentStep] || { line: 1, message: "Initializing...", variables: [] };

  // Handle Auto-Play
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < trace.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 1500);
    } else {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, trace.length]);

  // Handle Line Highlighting in Monaco
  useEffect(() => {
    if (editor && step) {
      const decorations = editor.deltaDecorations([], [
        {
          range: new (window as any).monaco.Range(step.line, 1, step.line, 1),
          options: {
            isWholeLine: true,
            className: "bg-brand-blue/20 border-l-4 border-brand-blue",
            glyphMarginClassName: "bg-brand-blue",
          }
        }
      ]);
      return () => editor.deltaDecorations(decorations, []);
    }
  }, [editor, step]);

  const nextStep = () => setCurrentStep(prev => Math.min(trace.length - 1, prev + 1));
  const prevStep = () => setCurrentStep(prev => Math.max(0, prev - 1));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background flex flex-col font-sans text-foreground overflow-hidden"
    >
      {/* TOP HEADER */}
      <header className="h-14 border-b-4 border-black bg-card px-6 flex items-center justify-between shadow-[0_4px_0_0_#000]">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-brand-blue neo-border shadow-[2px_2px_0_0_#000]">
            <Cpu size={18} className="text-white" />
          </div>
          <h1 className="font-black uppercase tracking-tighter text-lg italic">
            CodeArena <span className="text-brand-blue">Visualizer</span>
          </h1>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-brand-red hover:text-white transition-colors border-2 border-transparent hover:border-black rounded-sm"
        >
          <X size={24} />
        </button>
      </header>

      {/* MAIN 3-PANEL AREA */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL: Code View */}
        <section className="w-[35%] border-r-4 border-black flex flex-col bg-background">
          <div className="h-10 border-b-2 border-black flex items-center px-4 bg-card">
            <Code2 size={14} className="mr-2 text-brand-blue" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted">Source Code</span>
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              language={language}
              theme={theme === "dark" ? "vs-dark" : "vs-light"}
              value={code}
              onMount={(editor) => setEditor(editor)}
              options={{
                readOnly: true,
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: "on",
                glyphMargin: true,
                folding: false,
                lineDecorationsWidth: 10,
                padding: { top: 20 }
              }}
            />
          </div>
        </section>

        {/* CENTER PANEL: Execution Flow */}
        <section className="flex-1 border-r-4 border-black bg-background flex flex-col p-10 relative">
          <div className="absolute top-4 left-4">
             <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-2 py-1 border border-brand-blue/30">Logic Flow</span>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="max-w-xl"
              >
                <div className="mb-6 inline-block bg-brand-blue text-black font-black px-4 py-1 text-sm uppercase skew-x-[-10deg] shadow-[4px_4px_0_0_#000]">
                  Line {step.line}
                </div>
                <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight tracking-tight mb-8">
                  {step.message}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Micro-animation of data moving */}
          <div className="h-24 w-full border-t-2 border-black/20 flex items-center justify-center opacity-30">
            <RefreshCcw className="animate-spin-slow text-brand-blue" size={32} />
          </div>
        </section>

        {/* RIGHT PANEL: Memory / Variables */}
        <section className="w-[30%] bg-background flex flex-col">
          <div className="h-10 border-b-2 border-black flex items-center px-4 bg-card">
            <Variable size={14} className="mr-2 text-brand-yellow" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted">Memory Stack</span>
          </div>
          <div className="flex-1 p-6 overflow-y-auto space-y-4 no-scrollbar">
            <AnimatePresence>
              {step.variables.map((v, i) => (
                <motion.div
                  key={`${v.name}-${currentStep}`}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="bg-card border-2 border-black p-4 shadow-[4px_4px_0_0_#000] relative group hover:-translate-y-1 transition-transform"
                >
                  <div className="absolute top-2 right-2 w-2 h-2 bg-brand-yellow rounded-full animate-pulse" />
                  <div className="text-[10px] font-black text-brand-yellow uppercase tracking-widest mb-1 opacity-50">Variable</div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xl font-black text-brand-blue font-mono">{v.name}</span>
                    <span className="text-2xl font-black text-foreground font-mono">{String(v.value)}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {step.variables.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
                <Variable size={48} className="mb-4" />
                <p className="text-xs font-black uppercase tracking-widest">Stack is empty</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* BOTTOM CONTROLS */}
      <footer className="h-20 border-t-4 border-black bg-card px-10 flex items-center justify-between shadow-[0_-4px_0_0_#000] z-20">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button 
              onClick={prevStep}
              disabled={currentStep === 0}
              className="w-12 h-12 bg-white text-black border-4 border-black shadow-[4px_4px_0_0_#000] flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all active:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 bg-brand-blue text-white border-4 border-black shadow-[4px_4px_0_0_#000] flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-all active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} fill="currentColor" />}
            </button>
            <button 
              onClick={nextStep}
              disabled={currentStep === trace.length - 1}
              className="w-12 h-12 bg-white text-black border-4 border-black shadow-[4px_4px_0_0_#000] flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all active:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          <div className="h-10 w-[2px] bg-black/20 mx-4" />

          <div className="flex flex-col">
            <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Playback Speed</span>
            <span className="font-black text-sm uppercase">1.5s / Step</span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-1">Execution Progress</span>
          <div className="flex items-center gap-4">
            <div className="w-64 h-4 bg-black border-2 border-[#333] rounded-full overflow-hidden p-[2px]">
              <motion.div 
                className="h-full bg-brand-blue"
                animate={{ width: `${((currentStep + 1) / trace.length) * 100}%` }}
              />
            </div>
            <span className="font-black text-xl italic leading-none">
              {currentStep + 1} <span className="text-muted">/ {trace.length}</span>
            </span>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .bg-brand-blue\/20 { background-color: rgba(59, 130, 246, 0.2); }
        .border-brand-blue { border-color: #3b82f6; }
        .bg-brand-blue { background-color: #3b82f6; }
        .animate-spin-slow { animation: spin 3s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </motion.div>
  );
}
