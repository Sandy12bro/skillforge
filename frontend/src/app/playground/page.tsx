"use client";

import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Play, LogOut, User as UserIcon, Globe, AlertCircle, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../components/ProtectedRoute";
import Sidebar from "../../components/Sidebar";
import ExecutionVisualizer from "../../components/ExecutionVisualizer";
import { useTheme } from "../../context/ThemeContext";

export default function CodePlayground() {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();
  
  // Core State
  const [code, setCode] = useState("// Write your JavaScript code here...\nfunction factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\nconsole.log(factorial(5));");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(false);
  
  // Simulation State (AI Generated)
  const [trace, setTrace] = useState<any[]>([]);

  // Constants
  const LANGUAGES = [
    { id: "javascript", name: "JavaScript" },
    { id: "python", name: "Python" }
  ];

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("AI is analyzing and executing your code...");
    setError("");

    const validationError = validateCode(language, code);
    if (validationError) {
      setError(validationError);
      setIsRunning(false);
      return;
    }

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
      const apiUrl = `${apiBase.replace(/\/$/, "")}/simulate`;
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language })
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Simulation failed");
      }

      const result = await response.json();
      setOutput(result.finalOutput || "Code executed successfully.");
      setTrace(result.trace || []);
    } catch (err: any) {
      setError(`Simulation Error: ${err.message}. Please ensure NEXT_PUBLIC_API_URL is set correctly in Vercel.`);
    } finally {
      setIsRunning(false);
    }
  };

  const validateCode = (lang: string, source: string) => {
    const trimmed = source.trim();
    if (!trimmed) return "❌ Code cannot be empty.";
    if (lang === "javascript" && trimmed.includes("print(") && !trimmed.includes("console.log")) return "❌ Language Mismatch: You used 'print()'. Switch to Python or use 'console.log()'.";
    if (lang === "python" && trimmed.includes("console.log")) return "❌ Language Mismatch: You used 'console.log()'. Switch to JavaScript or use 'print()'.";
    return null;
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
        <Sidebar />
        
        <div className="flex-1 flex flex-col min-w-0 relative">
          
          {/* Header */}
          <header className="h-14 border-b-2 border-black bg-card px-6 flex items-center justify-between shadow-lg z-20">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-background border border-border px-3 py-1.5 rounded-md text-xs font-bold uppercase outline-none cursor-pointer"
                >
                  {LANGUAGES.map(lang => <option key={lang.id} value={lang.id}>{lang.name}</option>)}
                </select>
                <button onClick={handleRun} disabled={isRunning} className="bg-brand-yellow text-black px-6 py-1.5 rounded-md font-black text-xs uppercase tracking-widest hover:-translate-y-0.5 transition-all shadow-[3px_3px_0px_#000]">
                  {isRunning ? "Running..." : "Run Code"}
                </button>
                <button 
                  onClick={async () => {
                    if (trace.length === 0) await handleRun();
                    setShowVisualizer(true);
                  }}
                  className="bg-brand-blue text-white px-4 py-1.5 rounded-md font-black text-xs uppercase tracking-widest hover:-translate-y-0.5 transition-all shadow-[3px_3px_0px_#000] flex items-center gap-2 border-2 border-black"
                >
                  <Globe size={14} />
                  Visualize Execution
                </button>
              </div>
            </div>
            <button onClick={handleLogout} className="text-muted hover:text-brand-red"><LogOut size={20} /></button>
          </header>

          <div className="flex-1 flex overflow-hidden">
            {/* Editor Area */}
            <div className="flex-1 flex flex-col border-r-2 border-black bg-background">
              <Editor
                height="100%"
                language={language}
                theme={theme === "dark" ? "vs-dark" : "vs-light"}
                value={code}
                onChange={(val) => setCode(val || "")}
                options={{ fontSize: 14, minimap: { enabled: false }, automaticLayout: true, padding: { top: 20 } }}
              />
            </div>
            
            {/* Output Area */}
            <div className="w-[40%] flex flex-col bg-background p-6 font-mono text-sm overflow-y-auto no-scrollbar">
              <h3 className="text-[10px] font-black uppercase text-muted mb-4 border-b border-border pb-2 tracking-[0.2em]">Live Output</h3>
              {error && (
                <div className="bg-brand-red/10 border-l-4 border-brand-red p-4 rounded mb-4 animate-in slide-in-from-top duration-300">
                  <p className="text-brand-red font-bold text-xs uppercase leading-relaxed">{error}</p>
                </div>
              )}
              {output && (
                <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-4 rounded animate-in slide-in-from-top duration-300">
                  <pre className="text-emerald-400 whitespace-pre-wrap text-xs">{output}</pre>
                </div>
              )}
              {!output && !error && (
                <div className="flex-1 flex flex-col items-center justify-center opacity-10">
                  <Play size={48} />
                  <p className="mt-4 text-xs font-black uppercase tracking-widest">Ready for Run</p>
                </div>
              )}
            </div>
          </div>

          {/* New Neo-Brutalist Visualizer Overlay */}
          {showVisualizer && trace.length > 0 && (
            <ExecutionVisualizer
              code={code}
              language={language}
              trace={trace}
              onClose={() => setShowVisualizer(false)}
            />
          )}
          
        </div>
      </div>
    </ProtectedRoute>
  );
}
