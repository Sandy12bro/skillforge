"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useDashboard } from "../../context/DashboardContext";
import { 
  X, Upload, Trash2, Play, Square, Search, 
  MessageSquare, Send, Copy, ExternalLink, 
  ChevronRight, Bug, BookOpen, Terminal, Bot
} from "lucide-react";
import React, { useRef, useState } from "react";

import { useAuth } from "../../context/AuthContext";

export default function ModalContainer() {
  const { activeModal, modalData, closeModal, completeLesson } = useDashboard();
  const { user, profilePic, updateProfilePic, logout } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Interactive States
  const [explaining, setExplaining] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [librarySearch, setLibrarySearch] = useState("");

  // Sandbox State
  const [sandboxCode, setSandboxCode] = useState("def calculate_growth(initial, rate):\n  return initial * (1 + rate)\n\nprint(calculate_growth(100, 0.12))");
  const [terminalOutput, setTerminalOutput] = useState<string[]>(["Welcome to the Sandbox Terminal", "Ready for execution..."]);
  const [isRunning, setIsRunning] = useState(false);

  // Debugger State
  const [debugStep, setDebugStep] = useState(0);
  const debugData = [
    { line: 24, code: "def analyze_stream(data):", vars: [
      { name: "is_active", value: "true", type: "bool" },
      { name: "count", value: "0", type: "int" },
      { name: "buffer", value: "nil", type: "pointer" }
    ]},
    { line: 25, code: "  for packet in data:", vars: [
      { name: "packet", value: "'0xAF'", type: "str" },
      { name: "count", value: "0", type: "int" },
      { name: "buffer", value: "nil", type: "pointer" }
    ]},
    { line: 26, code: "    count += 1", vars: [
      { name: "packet", value: "'0xAF'", type: "str" },
      { name: "count", value: "1", type: "int" },
      { name: "buffer", value: "'0xAF...'", type: "pointer" }
    ]},
    { line: 27, code: "    if count > threshold:", vars: [
      { name: "threshold", value: "10", type: "int" },
      { name: "count", value: "1", type: "int" },
      { name: "is_active", value: "true", type: "bool" }
    ]},
    { line: 25, code: "  for packet in data:", vars: [
      { name: "packet", value: "'0xBC'", type: "str" },
      { name: "count", value: "1", type: "int" },
      { name: "buffer", value: "'0xAF...'", type: "pointer" }
    ]},
    { line: 26, code: "    count += 1", vars: [
      { name: "packet", value: "'0xBC'", type: "str" },
      { name: "count", value: "2", type: "int" },
      { name: "buffer", value: "'0xBC...'", type: "pointer" }
    ]},
  ];

  // Visualizer State
  const [vizStep, setVizStep] = useState(0);
  const vizData = [
    { line: 12, code: "for i in range(5):", heap: { i: "0" }, stack: ["main()", "global"] },
    { line: 13, code: "  print(i * 2)", heap: { i: "0" }, stack: ["print()", "main()", "global"] },
    { line: 12, code: "for i in range(5):", heap: { i: "1" }, stack: ["main()", "global"] },
    { line: 13, code: "  print(i * 2)", heap: { i: "1" }, stack: ["print()", "main()", "global"] },
    { line: 12, code: "for i in range(5):", heap: { i: "2" }, stack: ["main()", "global"] },
  ];

  // Mentor Chat State
  const [mentorMessages, setMentorMessages] = useState([
    { role: 'assistant', content: `Hello ${user?.displayName?.split(" ")[0] || "Explorer"}! I'm your AI coding mentor. How can I help you level up today?` }
  ]);

  // Explainer State
  const [explainerCode, setExplainerCode] = useState("");
  const [explainerHints, setExplainerHints] = useState([
    "Check if 'initial' is initialized.",
    "Ensure you are not dividing by zero."
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateProfilePic(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const runSandbox = () => {
    setIsRunning(true);
    setTerminalOutput(prev => [...prev, "> Running script..."]);
    setTimeout(() => {
      setTerminalOutput(prev => [...prev, "> Execution Result: 112.0", "> Process finished with exit code 0"]);
      setIsRunning(false);
    }, 1500);
  };

  const stepDebugger = () => {
    setDebugStep(prev => (prev + 1) % debugData.length);
  };

  const sendMentorMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user' as const, content: chatInput };
    setMentorMessages(prev => [...prev, userMsg]);
    setChatInput("");
    
    setTimeout(() => {
      const aiMsg = { 
        role: 'assistant' as const, 
        content: `That's a great question about "${userMsg.content}". In most languages, this concept is handled by memory management or specific syntax rules. Would you like to see a code example?` 
      };
      setMentorMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  const runExplainer = () => {
    setExplaining(true);
    setTimeout(() => {
      setExplaining(false);
      setExplainerHints([
        "The logic seems sound, but consider edge cases.",
        "Variable naming could be more descriptive.",
        "Complexity is O(n), which is optimal here."
      ]);
    }, 2000);
  };

  if (!activeModal) return null;

  const libraryItems = [
    { title: "Python Standard Library", desc: "Built-in functions and modules", tag: "Python" },
    { title: "Modern JavaScript (ES6+)", desc: "Arrow functions, destructuring...", tag: "JS" },
    { title: "Algorithms Cheat Sheet", desc: "Sorting, Searching, and Trees", tag: "CS" }
  ];

  const filteredLibrary = libraryItems.filter(item => 
    item.title.toLowerCase().includes(librarySearch.toLowerCase()) ||
    item.desc.toLowerCase().includes(librarySearch.toLowerCase()) ||
    item.tag.toLowerCase().includes(librarySearch.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="neo-card bg-[#141414] text-white w-full max-w-3xl max-h-[85vh] flex flex-col relative"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b-2 border-[#333]">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-brand-yellow"></span>
              <h2 className="text-xl font-black uppercase tracking-tighter">{activeModal}</h2>
            </div>
            <button 
              onClick={closeModal}
              className="p-1 neo-card neo-card-red hover:-translate-y-1 transition-transform"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Content Body */}
          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
            
            {activeModal === "Learning Module" && modalData && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                   <div>
                      <h3 className="text-2xl font-black text-brand-blue uppercase italic">{modalData.title}</h3>
                      <p className="text-muted text-[10px] font-black uppercase tracking-widest">Learning Curriculum</p>
                   </div>
                   <div className="text-right">
                      <p className="text-2xl font-black">{modalData.progress}%</p>
                      <p className="text-[8px] font-black uppercase opacity-50">Overall Mastery</p>
                   </div>
                </div>

                <div className="space-y-3">
                  {modalData.lessons.map((lesson: any, i: number) => (
                    <div key={lesson.id} className={`p-5 border-2 rounded-md transition-all ${lesson.completed ? 'bg-brand-green/10 border-brand-green opacity-80 shadow-[4px_4px_0px_rgba(34,197,94,0.2)]' : 'bg-[#111] border-[#333] hover:border-brand-blue group'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                           <span className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-black ${lesson.completed ? 'bg-brand-green text-black' : 'bg-[#333] text-white'}`}>{i + 1}</span>
                           <h4 className={`font-black uppercase text-sm ${lesson.completed ? 'line-through opacity-50' : ''}`}>{lesson.title}</h4>
                        </div>
                        {lesson.completed && (
                          <div className="flex items-center gap-1 text-brand-green">
                            <span className="text-[8px] font-black uppercase">Lesson Passed</span>
                            <CheckCircle size={18} />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted font-bold leading-relaxed mb-4">{lesson.content}</p>
                      {!lesson.completed && (
                        <button 
                          onClick={() => {
                            completeLesson(modalData.title, lesson.id);
                            // Visual feedback (local update since context takes a tick)
                            lesson.completed = true;
                          }}
                          className="w-full py-2.5 bg-brand-blue text-white font-black text-[10px] uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                        >
                          Mark as Completed <ChevronRight size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeModal === "Visualizer" && (
              <div className="space-y-6">
                <div className="bg-[#0a0a0a] border-2 border-[#333] p-4 rounded-md font-mono text-sm relative">
                  <div className={`absolute left-0 w-1 h-6 bg-brand-blue transition-all duration-300`} style={{ top: vizData[vizStep].line === 12 ? '1.25rem' : '2.75rem' }}></div>
                  <p className={`${vizData[vizStep].line === 12 ? 'text-brand-blue font-bold' : 'text-white opacity-50'} mb-1`}>line 12: <span>for i in range(5):</span></p>
                  <p className={`${vizData[vizStep].line === 13 ? 'text-brand-blue font-bold' : 'text-white opacity-50'} ml-4`}>line 13: <span>print(i * 2)</span></p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#111] border-2 border-[#333] rounded-md">
                    <p className="text-[10px] font-black text-muted uppercase mb-3 tracking-widest">Memory Heap</p>
                    <div className="space-y-2">
                      {Object.entries(vizData[vizStep].heap).map(([k, v]) => (
                        <div key={k} className="flex justify-between text-xs">
                          <span className="text-brand-blue font-mono">{k}</span> 
                          <span className="font-bold text-brand-yellow">{v}</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-xs opacity-30"><span className="text-brand-blue">list_data</span> <span className="font-bold">[Ref...]</span></div>
                    </div>
                  </div>
                  <div className="p-4 bg-[#111] border-2 border-[#333] rounded-md">
                    <p className="text-[10px] font-black text-muted uppercase mb-3 tracking-widest">Call Stack</p>
                    <div className="space-y-2">
                      {vizData[vizStep].stack.map((s, i) => (
                        <div key={i} className={`text-xs font-bold ${i === 0 ? 'text-brand-green' : 'opacity-50'}`}>{s}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setVizStep((vizStep + 1) % vizData.length)}
                    className="flex-1 neo-button neo-button-blue flex items-center justify-center gap-2"
                  >
                    <ChevronRight size={18} /> Next Step
                  </button>
                  <button onClick={() => setVizStep(0)} className="p-3 neo-card bg-[#222]"><Play size={18} /></button>
                </div>
              </div>
            )}

            {activeModal === "Debugger" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-[#0a0a0a] border-2 border-[#333] p-2 rounded text-[10px] font-black uppercase tracking-widest text-muted">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1"><Bug size={12} className="text-brand-red"/> Debug Session</span>
                    <span className="text-white">stream_processor.py</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-brand-green">Line: {debugData[debugStep % debugData.length].line}</span>
                    <span className="text-brand-yellow">Step: {debugStep}</span>
                  </div>
                </div>

                <div className="bg-[#0a0a0a] border-2 border-[#333] rounded-md font-mono text-sm overflow-hidden relative">
                  <div className="absolute left-0 top-0 bottom-0 w-10 bg-[#111] border-r border-[#222] flex flex-col items-center pt-3 text-[10px] text-muted select-none">
                    {[22, 23, 24, 25, 26, 27].map(num => (
                      <span key={num} className={`mb-1.5 ${debugData[debugStep % debugData.length].line === num ? 'text-brand-red font-bold' : ''}`}>{num}</span>
                    ))}
                  </div>
                  <div className="pl-12 py-3 space-y-1.5 relative">
                    <div 
                      className="absolute left-10 right-0 bg-brand-red/10 border-l-2 border-brand-red h-6 transition-all duration-300"
                      style={{ top: `${(debugData[debugStep % debugData.length].line - 22) * 1.5 + 0.75}rem` }}
                    ></div>
                    <p className="opacity-40">import time</p>
                    <p className="opacity-40">threshold = 10</p>
                    <p className="text-white">def analyze_stream(data):</p>
                    <p className="text-white pl-4">for packet in data:</p>
                    <p className="text-white pl-8">count += 1</p>
                    <p className="text-white pl-8">if count &gt; threshold:</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-black uppercase text-muted tracking-widest">Variable Watch</p>
                    <button onClick={() => setDebugStep(0)} className="text-[10px] font-black text-brand-blue uppercase hover:underline">Reset</button>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {debugData[debugStep % debugData.length].vars.map((v, i) => (
                      <div key={i} className="flex justify-between p-3 bg-[#111] border-2 border-[#222] rounded text-sm group hover:border-brand-blue transition-all animate-in slide-in-from-right duration-300" style={{ animationDelay: `${i * 50}ms` }}>
                        <div className="flex gap-3 items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue"></span>
                          <span className="font-mono text-brand-blue">{v.name}</span>
                          <span className="text-[10px] font-black text-muted opacity-50 uppercase">{v.type}</span>
                        </div>
                        <span className="font-mono font-bold text-brand-yellow">{v.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={stepDebugger}
                    className="flex-1 neo-button neo-button-red flex items-center justify-center gap-2"
                  >
                    <ChevronRight size={18} /> Step Into (F11)
                  </button>
                  <button className="p-3 neo-card bg-[#222] text-muted cursor-not-allowed opacity-50">
                    <Play size={18} />
                  </button>
                </div>
              </div>
            )}
            
            {activeModal === "Sandbox" && (
              <div className="flex flex-col gap-4 h-full min-h-[400px]">
                <div className="flex-1 bg-[#0a0a0a] border-2 border-[#333] p-4 rounded-md font-mono text-sm relative group focus-within:border-brand-blue transition-colors">
                   <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 bg-[#222] rounded border border-[#444] hover:bg-[#333]"><Copy size={14}/></button>
                   </div>
                   <textarea 
                    value={sandboxCode}
                    onChange={(e) => setSandboxCode(e.target.value)}
                    className="w-full h-full bg-transparent outline-none resize-none text-white overflow-hidden custom-scrollbar leading-relaxed"
                    spellCheck={false}
                   />
                </div>
                <div className="h-32 bg-[#111] border-2 border-[#333] rounded-md p-4 font-mono text-xs overflow-y-auto custom-scrollbar">
                  <p className="text-muted font-bold mb-2 uppercase tracking-tighter">Terminal Output</p>
                  {terminalOutput.map((line, i) => (
                    <p key={i} className={`${line.startsWith(">") ? "text-brand-green" : "text-white opacity-70"} mb-1`}>{line}</p>
                  ))}
                  {isRunning && <p className="text-brand-yellow animate-pulse">_</p>}
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={runSandbox}
                    disabled={isRunning}
                    className={`flex-1 neo-button ${isRunning ? 'opacity-50 grayscale' : 'neo-button-blue'}`}
                  >
                    {isRunning ? "Executing..." : "Run Script"}
                  </button>
                  <button 
                    onClick={() => setTerminalOutput(["Terminal Reset", "Ready..."])}
                    className="neo-button neo-button-white text-black"
                  >
                    <Trash2 size={18}/>
                  </button>
                </div>
              </div>
            )}
            
            {activeModal === "Explainer" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest">Error Trace or Code</label>
                  <textarea 
                    value={explainerCode}
                    onChange={(e) => setExplainerCode(e.target.value)}
                    className="w-full h-32 bg-[#111] border-2 border-[#333] text-white p-4 font-mono text-sm focus:border-brand-red outline-none rounded-md transition-colors"
                    placeholder="Paste your code or error message here..."
                  ></textarea>
                </div>
                
                {explaining ? (
                  <div className="p-4 bg-brand-blue/10 border-2 border-brand-blue rounded-md animate-pulse">
                    <p className="text-sm font-bold flex items-center gap-2">
                      <Bot size={18} className="text-brand-blue" />
                      AI Mentor is analyzing your logic...
                    </p>
                  </div>
                ) : (
                  <button 
                    onClick={runExplainer}
                    className="neo-button neo-button-red w-full flex items-center justify-center gap-2"
                  >
                    <Search size={18} /> Explain Logic
                  </button>
                )}

                <div className="p-5 border-2 border-[#333] bg-[#0d0d0d] rounded-md">
                   <h4 className="font-black text-brand-yellow mb-2 text-xs uppercase tracking-wider">Solution Hints</h4>
                   <ul className="space-y-3 text-sm">
                      {explainerHints.map((hint, i) => (
                        <li key={i} className="flex gap-2 text-white/80 animate-in slide-in-from-left duration-300">
                          <ChevronRight size={14} className="text-brand-blue shrink-0 mt-1"/> {hint}
                        </li>
                      ))}
                   </ul>
                </div>
              </div>
            )}

            {activeModal === "Mentor" && (
              <div className="flex flex-col h-[450px]">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar flex flex-col">
                  {mentorMessages.map((msg, i) => (
                    <div key={i} className={`${msg.role === 'user' ? 'self-end bg-brand-blue text-white border-brand-blue rounded-tr-none' : 'self-start bg-[#222] border-[#333] rounded-tl-none'} p-4 rounded-lg border-2 max-w-[85%] animate-in zoom-in-95 duration-200 shadow-[4px_4px_0px_#000]`}>
                      <p className="text-sm font-bold">{msg.content}</p>
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Explain Recursion", "Python Cheat Sheet", "Optimize my Code"].map(chip => (
                      <button 
                        key={chip} 
                        onClick={() => setChatInput(chip)}
                        className="px-3 py-1.5 bg-[#111] border-2 border-[#333] rounded-full text-[10px] font-black hover:border-brand-blue hover:text-brand-blue transition-all"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 items-center p-2 bg-[#0a0a0a] border-2 border-[#333] rounded-xl shadow-[4px_4px_0px_#000] focus-within:border-brand-blue transition-colors">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMentorMessage()}
                    className="flex-1 bg-transparent border-none px-3 py-2 text-white outline-none font-bold placeholder:opacity-30" 
                    placeholder="Ask a coding question..." 
                  />
                  <button 
                    onClick={sendMentorMessage}
                    className="p-3 neo-card bg-brand-blue text-white hover:scale-110 transition-transform active:scale-95"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            )}

            {activeModal === "Library" && (
              <div className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                  <input 
                    type="text" 
                    value={librarySearch}
                    onChange={(e) => setLibrarySearch(e.target.value)}
                    placeholder="Search docs, snippets, or concepts..."
                    className="w-full bg-[#111] border-2 border-[#333] py-3 pl-10 pr-4 text-white rounded-md focus:border-brand-blue outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {filteredLibrary.length > 0 ? (
                    filteredLibrary.map((doc, i) => (
                      <div key={i} className="p-4 bg-[#111] border-2 border-[#333] rounded-md hover:border-brand-yellow transition-all cursor-pointer group flex justify-between items-center">
                        <div>
                          <p className="font-black text-sm uppercase group-hover:text-brand-yellow">{doc.title}</p>
                          <p className="text-xs text-muted font-bold">{doc.desc}</p>
                        </div>
                        <span className="text-[10px] font-black px-2 py-1 bg-[#222] rounded border border-[#333]">{doc.tag}</span>
                      </div>
                    ))
                  ) : (
                    <div className="py-10 neo-card bg-[#111] border-dashed border-[#333] flex flex-col items-center justify-center opacity-50">
                       <p className="font-black uppercase tracking-widest text-xs">No resources found for "{librarySearch}"</p>
                    </div>
                  )}
                </div>
                <button className="w-full neo-button neo-button-white text-black flex items-center justify-center gap-2">
                  View Full Library <ExternalLink size={16} />
                </button>
              </div>
            )}

            {activeModal === "Stat Details" && modalData && (
              <div className="space-y-8">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-3xl font-black text-brand-yellow uppercase italic tracking-tighter">{modalData.title}</h3>
                    <p className="text-muted font-bold tracking-widest uppercase text-xs">Performance Overview</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black">{modalData.value}</p>
                    <p className="text-xs font-black text-brand-green uppercase">+12% THIS WEEK</p>
                  </div>
                </div>

                <div className="p-6 bg-[#0a0a0a] border-2 border-[#333] rounded-lg">
                  <div className="flex items-end justify-between h-48 gap-2">
                    {[40, 70, 45, 90, 65, 80, 50].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                        <div 
                          className="w-full bg-brand-blue border-2 border-black shadow-[2px_2px_0px_#000] transition-all duration-500 group-hover:bg-brand-yellow group-hover:-translate-y-1"
                          style={{ height: `${height}%` }}
                        ></div>
                        <span className="text-[10px] font-black opacity-40 uppercase">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border-2 border-[#333] rounded-md bg-[#111]">
                    <p className="text-[10px] font-black text-muted uppercase mb-1">Average Daily</p>
                    <p className="text-xl font-black">24.5</p>
                  </div>
                  <div className="p-4 border-2 border-[#333] rounded-md bg-[#111]">
                    <p className="text-[10px] font-black text-muted uppercase mb-1">Peak Performance</p>
                    <p className="text-xl font-black text-brand-blue">90.0</p>
                  </div>
                </div>
              </div>
            )}

            {activeModal === "Notifications" && (
              <div className="space-y-4">
                {[
                  { text: "New challenge available: Debugging Recursion", time: "5m ago", type: "info" },
                  { text: "You earned +100 XP for daily login!", time: "1h ago", type: "success" },
                  { text: "System update scheduled for 2 AM", time: "3h ago", type: "info" }
                ].map((notif, i) => (
                  <div key={i} className="p-4 bg-[#111] border-2 border-[#333] rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-bold">{notif.text}</p>
                      <p className="text-xs text-muted font-bold">{notif.time}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${notif.type === "success" ? "bg-brand-green" : "bg-brand-blue"}`}></div>
                  </div>
                ))}
              </div>
            )}

            {activeModal === "User Profile" && (
              <div className="space-y-6">
                <div className="flex items-center gap-6 p-4 bg-[#111] border-2 border-[#333] rounded-md">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 bg-brand-blue rounded-full border-4 border-black overflow-hidden flex items-center justify-center text-3xl font-black">
                      {profilePic ? (
                        <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        user?.displayName?.charAt(0) || "U"
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="p-1.5 neo-card bg-brand-yellow text-black hover:-translate-y-0.5 transition-all"
                        title="Upload"
                      >
                        <Upload size={14} />
                      </button>
                      {profilePic && (
                        <button 
                          onClick={() => updateProfilePic(null)}
                          className="p-1.5 neo-card bg-brand-red text-white hover:-translate-y-0.5 transition-all"
                          title="Remove"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black">{user?.displayName || "User Explorer"}</h3>
                    <p className="text-muted font-bold">{user?.email || "explorer@example.com"}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#111] border-2 border-[#333] rounded-md">
                    <p className="text-xs text-muted font-bold uppercase">Account Status</p>
                    <p className="font-black text-brand-green">PRO MEMBER</p>
                  </div>
                  <div className="p-4 bg-[#111] border-2 border-[#333] rounded-md">
                    <p className="text-xs text-muted font-bold uppercase">Member Since</p>
                    <p className="font-black">APRIL 2026</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  <button 
                    onClick={() => {
                      logout();
                      closeModal();
                    }}
                    className="neo-button neo-button-red w-full"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
