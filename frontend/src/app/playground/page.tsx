"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Play, LogOut, Globe } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../components/ProtectedRoute";
import TopNavbar from "../../components/dashboard/TopNavbar";
import ExecutionVisualizer from "../../components/ExecutionVisualizer";
import { useTheme } from "../../context/ThemeContext";

export default function CodePlayground() {
  type TraceStep = {
    line: number;
    message: string;
    variables: Array<{ name: string; value: string }>;
  };

  const { theme } = useTheme();
  const { logout } = useAuth();
  const router = useRouter();
  
  // Core State
  const [code, setCode] = useState("// Write your JavaScript code here...\nfunction factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\nconsole.log(factorial(5));");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(false);
  
  // Simulation State (AI Generated)
  const [trace, setTrace] = useState<TraceStep[]>([]);

  // Constants
  const LANGUAGES = [
    { id: "javascript", name: "JavaScript" },
    { id: "python", name: "Python" }
  ];

  const buildSimulationUrls = () => {
    const configuredApiBase = process.env.NEXT_PUBLIC_API_URL?.trim();
    const urls = new Set<string>();
    const addBase = (base: string) => {
      const normalized = base.replace(/\/$/, "");
      if (normalized === "") {
        urls.add("/simulate");
        urls.add("/api/simulate");
      } else {
        urls.add(`${normalized}/simulate`);
        urls.add(`${normalized}/api/simulate`);
      }
    };

    // 1. Critical Localhost Priority
    if (typeof window !== "undefined") {
      if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        addBase("http://localhost:5000");
        addBase("http://127.0.0.1:5000");
      }
    }

    // 2. High Priority: Explicitly configured URL
    if (configuredApiBase) {
      addBase(configuredApiBase);
      return Array.from(urls);
    }

    // 3. Current Origins
    if (typeof window !== "undefined") {
      addBase(window.location.origin);
    }

    // 4. Relative Fallbacks
    addBase("");
    addBase("/api");

    return Array.from(urls);
  };

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
      const simulationUrls = buildSimulationUrls();
      console.log(">>> [CodeArena] Attempting simulation with URLs:", simulationUrls);
      
      let lastError: Error | null = null;
      let response: Response | null = null;

      for (const url of simulationUrls) {
        try {
          console.log(`>>> [CodeArena] Trying: ${url}`);
          response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, language })
          });

          if (response.ok) {
            console.log(`>>> [CodeArena] SUCCESS at: ${url}`);
            lastError = null;
            break;
          }

          const status = response.status;
          const result = await response.json().catch(() => ({}));
          console.warn(`>>> [CodeArena] FAILED (${status}) at: ${url}`, result);
          
          lastError = new Error(result.error || `Simulation failed (${status})`);
          response = null;
        } catch (attemptError: unknown) {
          console.error(`>>> [CodeArena] NETWORK ERROR at: ${url}`, attemptError);
          lastError = attemptError instanceof Error ? attemptError : new Error("Network request failed");
          response = null;
        }
      }

      if (!response) {
        throw lastError || new Error("Unable to reach simulation API after trying multiple endpoints.");
      }

      const result = await response.json();
      setOutput(result.finalOutput || "Code executed successfully.");
      setTrace(result.trace || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(`Simulation Error: ${message}. Check browser console (F12) for details.`);
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
      <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
        <div className="max-w-7xl mx-auto p-4 md:p-10 flex flex-col h-screen">
          <TopNavbar />
          
          <div className="flex-1 flex flex-col min-w-0 relative bg-card border-2 border-border rounded-xl overflow-hidden shadow-[8px_8px_0px_#000] mb-8">
            {/* Header */}
            <header className="h-14 border-b-2 border-border bg-background px-6 flex items-center justify-between z-20">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-background border border-border px-3 py-1.5 rounded-md text-xs font-bold uppercase outline-none cursor-pointer"
                >
                  {LANGUAGES.map(lang => <option key={lang.id} value={lang.id}>{lang.name}</option>)}
                </select>
                <button onClick={handleRun} disabled={isRunning} className="bg-brand-yellow text-black px-6 py-1.5 rounded-md font-black text-xs uppercase tracking-widest hover:-translate-y-0.5 transition-all shadow-[3px_3px_0px_var(--border)]">
                  {isRunning ? "Running..." : "Run Code"}
                </button>
                <button 
                  onClick={async () => {
                    if (trace.length === 0) await handleRun();
                    setShowVisualizer(true);
                  }}
                  className="bg-brand-blue text-foreground px-4 py-1.5 rounded-md font-black text-xs uppercase tracking-widest hover:-translate-y-0.5 transition-all shadow-[3px_3px_0px_var(--border)] flex items-center gap-2 border-2 border-border"
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
            <div className="flex-1 flex flex-col border-r-2 border-border bg-background">
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
      </div>
    </ProtectedRoute>
  );
}
