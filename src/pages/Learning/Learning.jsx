// import { useState } from "react";
// import {
//   ArrowRight, BookOpen, BrainCircuit, Check, ChevronDown, CirclePlay,
//   Clock3, Code2, Database, Flame, Layers3, LockKeyhole, MonitorPlay,
//   Network, Play, Plus, Rocket, Sparkles, Target, TimerReset, Trophy,
//   X, Youtube, FileText, GraduationCap
// } from "lucide-react";

// const paths = [
//   { name: "React.js", topic: "Server Components & Suspense", progress: 76, hours: 38, target: 50, difficulty: "Advanced", icon: Code2, color: "#61dafb", active: true },
//   { name: "Next.js", topic: "App Router & Data Fetching", progress: 42, hours: 21, target: 50, difficulty: "Intermediate", icon: Layers3, color: "#f9fafb" },
//   { name: "TypeScript", topic: "Generics & Utility Types", progress: 100, hours: 32, target: 32, difficulty: "Intermediate", icon: FileText, color: "#3178c6", completed: "Completed 16 Jun 2026" },
//   { name: "System Design", topic: "Designing a URL Shortener", progress: 18, hours: 9, target: 50, difficulty: "Advanced", icon: Network, color: "#f59e0b" },
// ];

// const journey = [
//   ["React.js", "Streaming UI with Suspense", "52 min", "+80 XP", "10:42 AM", "#61dafb"],
//   ["Next.js", "Server Actions", "1h 12m", "+100 XP", "Yesterday", "#f9fafb"],
//   ["TypeScript", "Conditional Types", "45 min", "+65 XP", "Yesterday", "#3178c6"],
//   ["System Design", "Caching strategies", "35 min", "+50 XP", "Jul 08", "#f59e0b"],
// ];

// const roadmap = [
//   ["HTML", "done"], ["CSS", "done"], ["JavaScript", "done"],
//   ["React", "current"], ["Redux", "open"], ["Next.js", "locked"],
// ];

// const resources = [
//   [Youtube, "YouTube", "#ff4e45"], [FileText, "MDN", "#f9fafb"],
//   [Code2, "React Docs", "#61dafb"], [Database, "Node Docs", "#68a063"],
//   [Layers3, "MongoDB", "#00ed64"], [GraduationCap, "freeCodeCamp", "#f9fafb"],
// ];

// export default function LearningStudio() {
//   const [expanded, setExpanded] = useState("React.js");
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState({ technology: "", category: "Frontend", difficulty: "Intermediate", hours: "", resource: "", notes: "", date: "" });
//   const update = (key) => (event) => setForm({ ...form, [key]: event.target.value });

//   return (
//     <main className="min-h-screen overflow-hidden bg-[#0B1120] px-4 py-5 text-[#F9FAFB] sm:px-7 lg:px-10">
//       <style>{`
//         @keyframes studio-float { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-13px) rotate(3deg)} }
//         @keyframes studio-drift { 0%{transform:translate3d(-4%,0,0) scale(1)} 50%{transform:translate3d(6%,-5%,0) scale(1.14)} 100%{transform:translate3d(-4%,0,0) scale(1)} }
//         @keyframes studio-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(245,158,11,.35)} 50%{box-shadow:0 0 0 11px rgba(245,158,11,0)} }
//         @keyframes studio-line { from{height:0} to{height:100%} }
//         @keyframes studio-fill { from{width:0} }
//         .studio-float{animation:studio-float 5s ease-in-out infinite}.studio-drift{animation:studio-drift 13s ease-in-out infinite}.studio-pulse{animation:studio-pulse 2.4s ease-in-out infinite}.studio-line{animation:studio-line 1.25s ease-out both}.studio-fill{animation:studio-fill 1.1s cubic-bezier(.2,.8,.2,1) both}.library-item:hover{transform:translateY(-3px);border-color:rgba(245,158,11,.45);box-shadow:0 18px 38px rgba(0,0,0,.22),0 0 24px rgba(245,158,11,.07)}
//       `}</style>

//       {/* Learning Studio hero */}
//       <section className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-[#1F2937] bg-[#0F172A] px-6 py-8 shadow-2xl shadow-black/20 sm:px-10 sm:py-11">
//         <div className="studio-drift absolute -left-24 -top-28 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
//         <div className="studio-drift absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-orange-600/10 blur-3xl [animation-delay:-5s]" />
//         <div className="studio-float absolute right-[18%] top-10 hidden rounded-2xl border border-white/10 bg-white/5 p-3 text-amber-300 backdrop-blur md:block"><BrainCircuit size={24}/></div>
//         <div className="studio-float absolute right-8 bottom-10 hidden rounded-full border border-white/10 bg-[#111827]/80 p-3 text-amber-400 backdrop-blur lg:block [animation-delay:-1.8s]"><BookOpen size={21}/></div>
//         <div className="relative grid gap-8 lg:grid-cols-[1.5fr_.8fr] lg:items-end">
//           <div>
//             <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-amber-400"><Sparkles size={14}/> Your learning studio</div>
//             <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">Good morning, Sridh.<br/><span className="text-amber-400">Build your edge.</span></h1>
//             <p className="mt-5 max-w-xl text-sm leading-6 text-[#9CA3AF]">Your current focus is React architecture. You’re one focused session away from a stronger week.</p>
//             <div className="mt-8 flex flex-wrap gap-3">
//               <div className="rounded-2xl border border-white/10 bg-[#111827]/70 px-4 py-3 backdrop-blur"><p className="text-xs text-[#6B7280]">Learning XP</p><p className="mt-1 text-lg font-semibold">2,480 <span className="text-xs font-medium text-amber-400">+180 today</span></p></div>
//               <div className="rounded-2xl border border-white/10 bg-[#111827]/70 px-4 py-3 backdrop-blur"><p className="text-xs text-[#6B7280]">Current streak</p><p className="mt-1 flex items-center gap-1 text-lg font-semibold"><Flame size={17} className="fill-amber-400 text-amber-400"/> 14 days</p></div>
//               <div className="rounded-2xl border border-white/10 bg-[#111827]/70 px-4 py-3 backdrop-blur"><p className="text-xs text-[#6B7280]">Today</p><p className="mt-1 text-lg font-semibold">2h 15m</p></div>
//             </div>
//           </div>
//           <div className="relative overflow-hidden rounded-[26px] border border-amber-400/20 bg-gradient-to-br from-amber-400/15 to-transparent p-6">
//             <p className="text-xs uppercase tracking-[.15em] text-amber-300">Current focus</p><h2 className="mt-3 text-2xl font-semibold">React.js</h2><p className="mt-1 text-sm text-[#9CA3AF]">Server Components & Suspense</p>
//             <div className="mt-7 flex items-end justify-between"><div><p className="text-3xl font-semibold">76<span className="text-lg text-amber-400">%</span></p><p className="text-xs text-[#9CA3AF]">38 of 50 hours complete</p></div><button className="rounded-xl bg-amber-400 p-3 text-[#0B1120] transition hover:bg-amber-300"><Play size={18} className="fill-current"/></button></div>
//           </div>
//         </div>
//       </section>

//       <div className="mx-auto max-w-7xl space-y-20 py-16">
//         {/* Learning Library */}
//         <section>
//           <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-amber-400">Your collection</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Learning Library</h2><p className="mt-2 text-sm text-[#9CA3AF]">Paths you’re deliberately growing, at your own pace.</p></div><button onClick={() => setShowModal(true)} className="group flex items-center gap-2 rounded-2xl bg-amber-400 px-5 py-3 text-sm font-semibold text-[#0B1120] shadow-lg shadow-amber-500/15 transition hover:bg-amber-300"><Plus size={18} className="transition group-hover:rotate-90"/> Add Learning Path</button></div>
//           <div className="space-y-3">
//             {paths.map((path) => { const Icon = path.icon; const isOpen = expanded === path.name; return <article key={path.name} className="library-item overflow-hidden rounded-[24px] border border-[#1F2937] bg-[#111827] transition duration-300">
//               <button className="flex w-full items-center gap-4 p-5 text-left sm:gap-6 sm:p-6" onClick={() => setExpanded(isOpen ? "" : path.name)}>
//                 <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#0F172A]" style={{color:path.color}}><Icon size={24}/></span>
//                 <span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2"><strong className="text-base">{path.name}</strong>{path.completed && <em className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] not-italic font-semibold uppercase text-amber-300"><Check size={11} className="mr-1 inline"/>Completed</em>}</span><span className="mt-1 block truncate text-sm text-[#9CA3AF]">{path.topic}</span></span>
//                 <span className="hidden text-right sm:block"><strong className="text-sm">{path.progress}%</strong><span className="mt-1 block text-xs text-[#6B7280]">{path.hours} / {path.target} hrs</span></span><ChevronDown size={19} className={`shrink-0 text-[#9CA3AF] transition ${isOpen ? "rotate-180" : ""}`}/>
//               </button>
//               {isOpen && <div className="border-t border-[#1F2937] px-5 pb-6 pt-5 sm:px-6"><div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end"><div><div className="mb-2 flex justify-between text-xs text-[#9CA3AF]"><span>Path progress</span><span>{path.hours} hours studied · {path.difficulty}</span></div><div className="h-2 overflow-hidden rounded-full bg-[#0B1120]"><div className="studio-fill h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300" style={{width:`${path.progress}%`}}/></div>{path.completed && <p className="mt-3 text-xs text-amber-300">{path.completed}</p>}</div><button className="flex items-center justify-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2.5 text-sm font-medium text-amber-300 transition hover:bg-amber-400 hover:text-[#0B1120]"><CirclePlay size={17}/> Resume learning</button></div></div>}
//             </article>})}
//           </div>
//         </section>

//         {/* Today + Journey */}
//         <section className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
//           <div className="relative overflow-hidden rounded-[30px] border border-[#1F2937] bg-[#0F172A] p-7"><div className="absolute -right-14 -top-10 h-44 w-44 rounded-full bg-amber-400/10 blur-3xl"/><p className="text-xs font-semibold uppercase tracking-[.16em] text-amber-400">Today’s session</p><h2 className="mt-3 text-2xl font-semibold">Next.js</h2><p className="text-sm text-[#9CA3AF]">App Router & data fetching</p><div className="studio-pulse relative mx-auto mt-9 flex h-44 w-44 items-center justify-center rounded-full border-[9px] border-amber-400/20" style={{borderTopColor:"#F59E0B",borderRightColor:"#F59E0B"}}><div className="text-center"><TimerReset size={19} className="mx-auto text-amber-400"/><p className="mt-2 text-2xl font-semibold">2:15:00</p><p className="text-xs text-[#6B7280]">Today’s focus</p></div></div><div className="mt-9 grid grid-cols-2 gap-3"><Metric label="Today’s XP" value="+180"/><Metric label="Sessions" value="3"/></div></div>
//           <div><p className="text-xs font-semibold uppercase tracking-[.16em] text-amber-400">Momentum</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Learning Journey</h2><div className="relative mt-7 space-y-6 before:absolute before:left-[9px] before:top-2 before:h-[calc(100%-20px)] before:w-px before:bg-[#1F2937]"><div className="studio-line absolute left-[9px] top-2 w-px bg-amber-400" style={{height:"88%"}}/>{journey.map(([tech,topic,duration,xp,time,color]) => <div key={topic} className="relative pl-9"><span className="absolute left-0 top-1.5 h-[19px] w-[19px] rounded-full border-4 border-[#0B1120]" style={{backgroundColor:color}}/><div className="flex flex-wrap items-start justify-between gap-2"><div><p className="font-medium">{topic}</p><p className="mt-1 text-xs text-[#9CA3AF]">{tech} · {duration} · <span className="text-amber-400">{xp}</span></p></div><time className="text-xs text-[#6B7280]">{time}</time></div></div>)}</div></div>
//         </section>

//         {/* Roadmap */}
//         <section className="rounded-[30px] border border-[#1F2937] bg-[#0F172A] p-7 sm:p-9"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-amber-400">Skill map</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Knowledge Roadmap</h2></div><span className="rounded-full border border-[#1F2937] px-3 py-1.5 text-xs text-[#9CA3AF]">Frontend foundations</span></div><div className="mt-10 flex items-center gap-2 overflow-x-auto pb-3">{roadmap.map(([name,state],i) => <div key={name} className="flex shrink-0 items-center gap-2"><div className={`relative w-24 rounded-2xl border p-3 text-center text-xs font-medium ${state === "done" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : state === "current" ? "studio-pulse border-amber-400/50 bg-amber-400/15 text-amber-300" : "border-[#1F2937] bg-[#111827] text-[#6B7280]"}`}>{state === "done" && <Check size={12} className="mx-auto mb-1"/>}{state === "locked" && <LockKeyhole size={12} className="mx-auto mb-1"/>}{name}</div>{i < roadmap.length-1 && <ArrowRight size={16} className={state === "done" ? "text-emerald-400" : "text-[#374151]"}/>}</div>)}</div></section>

//         {/* Resource Dock + Activity */}
//         <section className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-amber-400">One-click access</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Resource Dock</h2><p className="mt-3 max-w-sm text-sm leading-6 text-[#9CA3AF]">Keep your trusted learning resources right where your flow is.</p><div className="mt-8 inline-flex max-w-full gap-2 overflow-x-auto rounded-[24px] border border-[#1F2937] bg-[#111827] p-3">{resources.map(([Icon,label,color]) => <button key={label} title={label} className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0F172A] transition duration-200 hover:-translate-y-2 hover:scale-125 hover:bg-[#172033]" style={{color}}><Icon size={22}/></button>)}</div></div><div className="rounded-[28px] border border-[#1F2937] bg-[#111827] p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-amber-400">Recent learning</p><h2 className="mt-2 text-xl font-semibold">Keep showing up.</h2></div><Rocket className="text-amber-400"/></div><div className="mt-5 divide-y divide-[#1F2937]">{journey.slice(0,3).map(([tech,topic,duration,xp,time,color]) => <div className="flex items-center gap-3 py-4" key={tech}><span className="h-2.5 w-2.5 rounded-full" style={{background:color}}/><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{topic}</p><p className="mt-1 text-xs text-[#6B7280]">{tech} · {duration} · {time}</p></div><span className="text-xs font-semibold text-amber-400">{xp}</span></div>)}</div></div></section>

//         {/* Insights */}
//         <section className="border-t border-[#1F2937] pt-10"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-amber-400">A quiet reflection</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Learning Insights</h2></div><p className="max-w-xs text-sm text-[#9CA3AF]">Consistency is your most valuable learning tool.</p></div><div className="mt-8 flex flex-wrap gap-x-10 gap-y-6">{[["Total hours","186h"],["This week","8h 20m"],["Average session","54m"],["Longest session","2h 40m"],["Learning XP","2,480"],["Favorite","React.js"]].map(([label,value]) => <div key={label} className="min-w-[120px]"><p className="text-xs text-[#6B7280]">{label}</p><p className="mt-1 text-lg font-semibold">{value}</p></div>)}</div></section>
//       </div>

//       {/* Add learning path modal */}
//       {showModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1120]/80 p-4 backdrop-blur-sm"><div className="w-full max-w-xl rounded-[30px] border border-[#374151] bg-[#0F172A] p-6 shadow-2xl shadow-black/50 sm:p-8"><div className="flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-amber-400">New path</p><h2 className="mt-2 text-2xl font-semibold">Add to your library</h2></div><button onClick={() => setShowModal(false)} className="rounded-xl p-2 text-[#9CA3AF] hover:bg-[#111827] hover:text-white"><X size={20}/></button></div><form className="mt-7 grid gap-4 sm:grid-cols-2" onSubmit={(e)=>{e.preventDefault();setShowModal(false)}}><Field label="Technology" value={form.technology} onChange={update("technology")} placeholder="e.g. Docker"/><Select label="Category" value={form.category} onChange={update("category")} options={["Frontend","Backend","DevOps","Career"]}/><Select label="Difficulty" value={form.difficulty} onChange={update("difficulty")} options={["Beginner","Intermediate","Advanced"]}/><Field label="Target hours" value={form.hours} onChange={update("hours")} placeholder="40" type="number"/><Field label="Learning resource" value={form.resource} onChange={update("resource")} placeholder="URL or course"/><Field label="Expected completion" value={form.date} onChange={update("date")} type="date"/><label className="sm:col-span-2"><span className="mb-1.5 block text-xs text-[#9CA3AF]">Notes <span className="text-[#6B7280]">(optional)</span></span><textarea value={form.notes} onChange={update("notes")} placeholder="What do you want to achieve?" className="min-h-20 w-full rounded-xl border border-[#1F2937] bg-[#111827] px-3 py-2.5 text-sm outline-none transition placeholder:text-[#6B7280] focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/10"/></label><button className="sm:col-span-2 mt-2 rounded-xl bg-amber-400 py-3 text-sm font-semibold text-[#0B1120] transition hover:bg-amber-300">Create learning path</button></form></div></div>}
//     </main>
//   );
// }

// function Metric({ label, value }) { return <div className="rounded-2xl border border-[#1F2937] bg-[#111827]/70 p-3"><p className="text-xs text-[#6B7280]">{label}</p><p className="mt-1 text-lg font-semibold">{value}</p></div>; }
// function Field({ label, ...props }) { return <label><span className="mb-1.5 block text-xs text-[#9CA3AF]">{label}</span><input {...props} className="w-full rounded-xl border border-[#1F2937] bg-[#111827] px-3 py-2.5 text-sm outline-none transition placeholder:text-[#6B7280] focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/10"/></label>; }
// function Select({ label, options, ...props }) { return <label><span className="mb-1.5 block text-xs text-[#9CA3AF]">{label}</span><select {...props} className="w-full rounded-xl border border-[#1F2937] bg-[#111827] px-3 py-2.5 text-sm outline-none transition focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/10">{options.map(option => <option key={option}>{option}</option>)}</select></label>; }


//this is v2
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   BookOpen, Sparkles, Flame, Play, Clock, CheckCircle2, ChevronRight,
//   Plus, X, Terminal, Cpu, Database, Network, Code2, Layers, Compass,
//   MonitorPlay, LayoutTemplate, Activity, History, ArrowRight, Zap, Target,
//   Youtube, BookMarked, Monitor, LayoutGrid, FileText, Trophy
// } from 'lucide-react';

// const STUDIO_ANIMATIONS = `
// @keyframes studio-ambient-drift {
//   0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); opacity: 0.15; }
//   33% { transform: translate(30px, -50px) scale(1.1) rotate(2deg); opacity: 0.25; }
//   66% { transform: translate(-20px, 30px) scale(0.95) rotate(-2deg); opacity: 0.2; }
// }
// @keyframes float-element {
//   0%, 100% { transform: translateY(0px) rotate(0deg); }
//   50% { transform: translateY(-15px) rotate(3deg); }
// }
// @keyframes float-element-reverse {
//   0%, 100% { transform: translateY(0px) rotate(0deg); }
//   50% { transform: translateY(15px) rotate(-3deg); }
// }
// @keyframes draw-path {
//   to { stroke-dashoffset: 0; }
// }
// @keyframes breathe-glow {
//   0%, 100% { filter: drop-shadow(0 0 15px rgba(245,158,11,0.2)); }
//   50% { filter: drop-shadow(0 0 35px rgba(245,158,11,0.5)); }
// }
// @keyframes modal-glass-enter {
//   0% { transform: scale(0.95) translateY(20px); opacity: 0; backdrop-filter: blur(0px); }
//   100% { transform: scale(1) translateY(0); opacity: 1; backdrop-filter: blur(16px); }
// }
// @keyframes slide-fade-up {
//   0% { transform: translateY(30px); opacity: 0; }
//   100% { transform: translateY(0); opacity: 1; }
// }
// .animate-slide-up-stagger {
//   animation: slide-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
//   opacity: 0;
// }
// .timeline-path {
//   stroke-dasharray: 1000;
//   stroke-dashoffset: 1000;
//   animation: draw-path 2.5s cubic-bezier(0.25, 1, 0.5, 1) forwards 0.5s;
// }
// @media (prefers-reduced-motion: reduce) {
//   * { animation: none !important; transition: none !important; }
// }
// `;

// function CardGlow({ children, className = "", delay = "0ms", style = {} }) {
//   const cardRef = useRef(null);
//   const handleMouseMove = (e) => {
//     if (!cardRef.current) return;
//     const rect = cardRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     cardRef.current.style.setProperty('--x', `${x}px`);
//     cardRef.current.style.setProperty('--y', `${y}px`);
//   };

//   return (
//     <div
//       ref={cardRef}
//       onMouseMove={handleMouseMove}
//       className={`relative overflow-hidden group/glow ${className}`}
//       style={{ ...style, transitionDelay: delay }}
//     >
//       <div className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500 opacity-0 group-hover/glow:opacity-100 bg-[radial-gradient(400px_circle_at_var(--x,50%)_var(--y,50%),rgba(245,158,11,0.08),transparent_80%)] z-0" />
//       <div className="relative z-10 h-full">{children}</div>
//     </div>
//   );
// }

// function AnimatedCounter({ value, duration = 1500, suffix = "" }) {
//   const [displayValue, setDisplayValue] = useState(0);

//   useEffect(() => {
//     let startTimestamp = null;
//     const startValue = displayValue;
//     const step = (timestamp) => {
//       if (!startTimestamp) startTimestamp = timestamp;
//       const progress = Math.min((timestamp - startTimestamp) / duration, 1);
//       const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
//       setDisplayValue(Math.floor(easeProgress * (value - startValue) + startValue));
//       if (progress < 1) requestAnimationFrame(step);
//     };
//     requestAnimationFrame(step);
//   }, [value]);

//   return <span>{displayValue}{suffix}</span>;
// }

// // Interactive macOS-style floating dock
// function ResourceDock({ items }) {
//   const [mouseX, setMouseX] = useState(null);

//   return (
//     <div 
//       className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-end gap-2 px-4 py-3 bg-[#111827]/80 backdrop-blur-xl border border-[#1F2937] rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
//       onMouseMove={(e) => setMouseX(e.clientX)}
//       onMouseLeave={() => setMouseX(null)}
//     >
//       {items.map((item, idx) => {
//         const itemRef = useRef(null);
//         const [scale, setScale] = useState(1);

//         useEffect(() => {
//           if (mouseX === null || !itemRef.current) {
//             setScale(1);
//             return;
//           }
//           const rect = itemRef.current.getBoundingClientRect();
//           const itemCenterX = rect.left + rect.width / 2;
//           const distance = Math.abs(mouseX - itemCenterX);
//           // Scale formula: max scale 1.5x, effect radius 150px
//           const maxScale = 1.6;
//           const effectRadius = 120;
//           if (distance < effectRadius) {
//             const scaleValue = 1 + (maxScale - 1) * (1 - distance / effectRadius);
//             setScale(scaleValue);
//           } else {
//             setScale(1);
//           }
//         }, [mouseX]);

//         const Icon = item.icon;
        
//         return (
//           <div key={idx} className="relative group/dock-item flex flex-col items-center">
//             {/* Tooltip */}
//             <div className="absolute -top-12 opacity-0 group-hover/dock-item:opacity-100 transition-opacity duration-200 px-3 py-1.5 bg-[#1F2937] text-white text-[10px] font-bold rounded-lg whitespace-nowrap border border-[#374151] pointer-events-none">
//               {item.label}
//             </div>
            
//             <button
//               ref={itemRef}
//               style={{ 
//                 transform: `scale(${scale})`, 
//                 transformOrigin: 'bottom',
//                 transition: mouseX === null ? 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
//               }}
//               className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1F2937] to-[#111827] border border-[#374151] flex items-center justify-center text-[#9CA3AF] hover:text-amber-400 hover:border-amber-500/50 shadow-lg cursor-pointer z-10 relative overflow-hidden"
//             >
//               <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity" />
//               <Icon className="w-5 h-5 relative z-10" />
//             </button>
//             {/* Active indicator dot */}
//             <div className={`w-1 h-1 rounded-full mt-1.5 transition-all duration-300 ${item.active ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'bg-transparent'}`} />
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// const LIBRARY_PATHS = [
//   { id: 1, name: 'Next.js App Router', category: 'Frontend', logo: LayoutTemplate, targetHours: 40, completedHours: 28, level: 'Intermediate', status: 'In Progress', activeTopic: 'Server Actions & Mutations', color: 'from-blue-500 to-cyan-400' },
//   { id: 2, title: 'Distributed Systems', category: 'System Design', logo: Network, targetHours: 60, completedHours: 60, level: 'Advanced', status: 'Completed', completionDate: 'Jul 2, 2026', color: 'from-amber-500 to-orange-500' },
//   { id: 3, name: 'Node.js Microservices', category: 'Backend', logo: Cpu, targetHours: 50, completedHours: 12, level: 'Advanced', status: 'In Progress', activeTopic: 'Event-Driven Architecture with Kafka', color: 'from-emerald-500 to-green-400' },
//   { id: 4, name: 'Advanced TypeScript', category: 'Language', logo: Code2, targetHours: 30, completedHours: 0, level: 'Expert', status: 'Not Started', activeTopic: 'Generics & Utility Types', color: 'from-blue-600 to-indigo-500' },
//   { id: 5, name: 'Executive Communication', category: 'Soft Skills', logo: Activity, targetHours: 20, completedHours: 18, level: 'Master', status: 'In Progress', activeTopic: 'Technical Architecture Pitching', color: 'from-purple-500 to-pink-500' }
// ];

// const JOURNEY_MILESTONES = [
//   { id: 1, date: 'Today, 2:00 PM', tech: 'Next.js App Router', topic: 'Implementing Optimistic UI Updates', duration: '2h 15m', xp: 180 },
//   { id: 2, date: 'Yesterday, 8:30 PM', tech: 'Executive Communication', topic: 'Mock C-Level Product Pitch', duration: '1h 30m', xp: 120 },
//   { id: 3, date: 'Jul 6, 10:00 AM', tech: 'Node.js Microservices', topic: 'Dockerizing Event Producers', duration: '3h 45m', xp: 300 },
//   { id: 4, date: 'Jul 5, 4:15 PM', tech: 'System Design', topic: 'Caching Strategies (Redis)', duration: '2h 00m', xp: 150 },
// ];

// const ROADMAP_NODES = [
//   { id: 'n1', label: 'HTML/CSS', status: 'completed', x: 10, y: 50 },
//   { id: 'n2', label: 'JavaScript', status: 'completed', x: 30, y: 50 },
//   { id: 'n3', label: 'React.js', status: 'completed', x: 50, y: 30 },
//   { id: 'n4', label: 'State Mgmt', status: 'completed', x: 70, y: 30 },
//   { id: 'n5', label: 'Next.js', status: 'active', x: 90, y: 50 },
//   { id: 'n6', label: 'Performance', status: 'locked', x: 70, y: 70 },
//   { id: 'n7', label: 'Web WebGL', status: 'locked', x: 50, y: 70 },
// ];

// const DOCK_RESOURCES = [
//   { label: 'React Docs', icon: Code2, active: true },
//   { label: 'Next.js Registry', icon: LayoutTemplate, active: false },
//   { label: 'System Design Primer', icon: Network, active: false },
//   { label: 'Tech YouTube Channels', icon: Youtube, active: false },
//   { label: 'MDN Web Docs', icon: BookMarked, active: true },
//   { label: 'Local Notes', icon: FileText, active: false },
// ];

// export default function LearningStudio() {
//   const [isMounted, setIsMounted] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [parallax, setParallax] = useState({ x: 0, y: 0 });
//   const [expandedTile, setExpandedTile] = useState(LIBRARY_PATHS[0].id); // Auto-expand first

//   // Setup mount animations
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // Parallax tracking for Hero Environment
//   const handleHeroParallax = (e) => {
//     const x = (e.clientX / window.innerWidth - 0.5) * 20; // max 20px drift
//     const y = (e.clientY / window.innerHeight - 0.5) * 20;
//     setParallax({ x, y });
//   };

//   return (
//     <div className="min-h-screen bg-[#0B1120] text-[#F9FAFB] font-sans overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200 pb-32">
//       <style dangerouslySetInnerHTML={{ __html: STUDIO_ANIMATIONS }} />

//       {/* --- DOCK OVERLAY --- */}
//       <ResourceDock items={DOCK_RESOURCES} />

//       {/* --- SECTION 1: IMPRESSIVE STUDIO HERO --- */}
//       <section 
//         className="relative w-full min-h-[60vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden border-b border-[#1F2937]/50"
//         onMouseMove={handleHeroParallax}
//       >
//         {/* Layered Deep Ambient Light Orbs */}
//         <div className="absolute inset-0 pointer-events-none z-0">
//           <div 
//             className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px]"
//             style={{ animation: 'studio-ambient-drift 25s infinite alternate ease-in-out' }}
//           />
//           <div 
//             className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[160px]"
//             style={{ animation: 'studio-ambient-drift 30s infinite alternate-reverse ease-in-out' }}
//           />
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_30%,transparent_100%)] opacity-30" />
//         </div>

//         {/* 3D Floating Developer Elements */}
//         <div 
//           className="absolute inset-0 z-10 pointer-events-none"
//           style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)`, transition: 'transform 0.2s ease-out' }}
//         >
//           <div className="absolute top-[20%] right-[15%] p-4 bg-[#111827]/60 backdrop-blur-xl border border-[#1F2937] rounded-2xl shadow-2xl text-cyan-400" style={{ animation: 'float-element 8s infinite ease-in-out' }}>
//             <MonitorPlay className="w-8 h-8" />
//           </div>
//           <div className="absolute bottom-[25%] left-[20%] p-3 bg-[#111827]/60 backdrop-blur-xl border border-[#1F2937] rounded-2xl shadow-2xl text-amber-500" style={{ animation: 'float-element-reverse 10s infinite ease-in-out' }}>
//             <Database className="w-6 h-6" />
//           </div>
//           <div className="absolute top-[40%] right-[35%] p-2 bg-[#111827]/60 backdrop-blur-xl border border-[#1F2937] rounded-xl shadow-2xl text-emerald-400 opacity-60" style={{ animation: 'float-element 12s infinite ease-in-out' }}>
//             <Terminal className="w-5 h-5" />
//           </div>
//         </div>

//         <div className="relative z-20 max-w-4xl pt-16">
//           <div className="animate-slide-up-stagger" style={{ animationDelay: '100ms' }}>
//             <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
//               <Sparkles className="w-3.5 h-3.5" /> Learning Studio Active
//             </span>
//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 leading-tight">
//               Master the craft.<br />
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">Shape the future.</span>
//             </h1>
//             <p className="text-[#9CA3AF] text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-10">
//               Your personalized cognitive workspace. Track deep learning sessions, explore interconnected technology roadmaps, and build your engineering mastery.
//             </p>
//           </div>

//           {/* Quick Glace HUD Data */}
//           <div className="flex flex-wrap items-center gap-4 animate-slide-up-stagger" style={{ animationDelay: '250ms' }}>
//             <div className="flex items-center gap-3 bg-[#111827]/80 backdrop-blur-lg border border-[#1F2937] px-5 py-3 rounded-2xl shadow-xl">
//               <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
//                 <Target className="w-5 h-5 text-amber-500" />
//               </div>
//               <div>
//                 <p className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-wider">Current Focus</p>
//                 <p className="text-white font-bold">Next.js App Router</p>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-3 bg-[#111827]/80 backdrop-blur-lg border border-[#1F2937] px-5 py-3 rounded-2xl shadow-xl">
//               <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
//                 <Clock className="w-5 h-5 text-emerald-500" />
//               </div>
//               <div>
//                 <p className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-wider">Today's Time</p>
//                 <p className="text-white font-bold"><AnimatedCounter value={2} suffix="h" /> <AnimatedCounter value={15} suffix="m" /></p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3 bg-[#111827]/80 backdrop-blur-lg border border-[#1F2937] px-5 py-3 rounded-2xl shadow-xl">
//               <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
//                 <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
//               </div>
//               <div>
//                 <p className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-wider">Learning Streak</p>
//                 <p className="text-white font-bold"><AnimatedCounter value={42} suffix=" Days" /></p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- MAIN ASYMMETRICAL LAYOUT WORKSPACE --- */}
//       <div className="max-w-[1600px] mx-auto p-6 lg:p-12 space-y-16">

//         {/* SECTION 2: THE LEARNING LIBRARY (CORE FEATURE) */}
//         <section className="animate-slide-up-stagger" style={{ animationDelay: '400ms' }}>
//           <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
//             <div>
//               <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
//                 <Compass className="w-6 h-6 text-amber-500" />
//                 The Learning Library
//               </h2>
//               <p className="text-[#9CA3AF] mt-1.5 font-medium">Your curated catalog of technological mastery paths.</p>
//             </div>
//             <button 
//               onClick={() => setModalOpen(true)}
//               className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#111827] border border-[#1F2937] hover:border-amber-500/50 hover:bg-[#1F2937]/50 text-white font-bold text-sm transition-all shadow-lg active:scale-95 group"
//             >
//               <Plus className="w-4 h-4 text-amber-500 group-hover:rotate-90 transition-transform" />
//               Add Learning Path
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {LIBRARY_PATHS.map((path) => {
//               const isCompleted = path.status === 'Completed';
//               const isExpanded = expandedTile === path.id;
//               const Icon = path.logo;
//               const progressPct = Math.round((path.completedHours / path.targetHours) * 100);

//               return (
//                 <div 
//                   key={path.id}
//                   onClick={() => setExpandedTile(path.id)}
//                   className={`relative overflow-hidden rounded-3xl border transition-all duration-500 cursor-pointer flex flex-col ${
//                     isCompleted 
//                       ? 'bg-gradient-to-br from-[#111827] to-[#111827] border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.05)]' 
//                       : isExpanded
//                         ? 'bg-[#111827] border-amber-500/60 shadow-[0_10px_40px_rgba(0,0,0,0.4)] scale-[1.02] z-10'
//                         : 'bg-[#111827]/60 border-[#1F2937] hover:border-[#374151] hover:bg-[#111827] opacity-80 hover:opacity-100'
//                   }`}
//                 >
//                   {/* Glassmorphism Header */}
//                   <div className="p-6 pb-4 flex items-start justify-between relative z-10">
//                     <div className="flex gap-4 items-center">
//                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner bg-gradient-to-tr ${path.color} bg-opacity-10 backdrop-blur-md border border-white/10`}>
//                         <Icon className="w-7 h-7 text-white drop-shadow-md" />
//                       </div>
//                       <div>
//                         <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">{path.category}</span>
//                         <h3 className="text-lg font-bold text-white leading-tight">{path.name || path.title}</h3>
//                       </div>
//                     </div>
//                     {isCompleted && (
//                       <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-2 rounded-full" title="Mastered">
//                         <Trophy className="w-4 h-4" />
//                       </div>
//                     )}
//                   </div>

//                   {/* Body Content - Expands cleanly */}
//                   <div className="px-6 flex-1 flex flex-col relative z-10">
//                     <div className="flex justify-between items-end mb-2">
//                       <div className="space-y-1">
//                         <span className="text-3xl font-extrabold text-white tracking-tight">{progressPct}%</span>
//                         <span className="text-xs text-[#6B7280] block font-medium uppercase tracking-wider">{path.level} Level</span>
//                       </div>
//                       <div className="text-right space-y-1">
//                         <span className="text-sm font-bold text-[#D1D5DB]">{path.completedHours} / {path.targetHours}</span>
//                         <span className="text-[10px] text-[#6B7280] block font-medium uppercase tracking-wider">Hours</span>
//                       </div>
//                     </div>

//                     {/* Premium Progress Bar */}
//                     <div className="w-full h-2 bg-[#0B1120] rounded-full overflow-hidden border border-[#1F2937] mb-6">
//                       <div 
//                         className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${path.color}`}
//                         style={{ width: `${progressPct}%` }}
//                       />
//                     </div>

//                     {/* Expandable Action Area */}
//                     <div className={`mt-auto pt-4 border-t border-[#1F2937] transition-all duration-300 overflow-hidden ${isExpanded ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 border-transparent pt-0'}`}>
//                       {isCompleted ? (
//                         <div className="flex items-center justify-between text-amber-500/80 text-xs font-bold bg-amber-500/5 p-3 rounded-xl">
//                           <span>Completed on {path.completionDate}</span>
//                           <CheckCircle2 className="w-4 h-4" />
//                         </div>
//                       ) : (
//                         <div className="space-y-4">
//                           <div>
//                             <span className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider block mb-1">Current Active Topic</span>
//                             <span className="text-sm text-white font-medium">{path.activeTopic}</span>
//                           </div>
//                           <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#0B1120] font-bold text-xs rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] active:scale-[0.98]">
//                             <Play className="w-3.5 h-3.5 fill-current" />
//                             Resume Session
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Aesthetic background glow specifically for completed paths */}
//                   {isCompleted && (
//                     <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none z-0" />
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </section>

//         {/* --- GRID SPLIT: TODAY'S SESSION & ROADMAP --- */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-slide-up-stagger" style={{ animationDelay: '550ms' }}>
          
//           {/* SECTION 4: TODAY'S LEARNING WIDGET (LEFT COL) */}
//           <section className="lg:col-span-5 space-y-6">
//             <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
//               <Zap className="w-5 h-5 text-amber-500" />
//               Active Target Session
//             </h2>

//             <CardGlow className="bg-[#111827] border border-[#1F2937] p-8 rounded-3xl relative">
//               <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              
//               <div className="text-center space-y-2 mb-8 relative z-10">
//                 <span className="inline-block px-3 py-1 rounded-full bg-[#1F2937] border border-[#374151] text-[#D1D5DB] text-[10px] font-bold uppercase tracking-widest">
//                   Currently Learning
//                 </span>
//                 <h3 className="text-2xl font-extrabold text-white">Next.js App Router</h3>
//               </div>

//               {/* Large immersive breathing timer graphic */}
//               <div className="flex justify-center relative z-10 mb-8">
//                 <div className="relative w-48 h-48 flex items-center justify-center">
//                   <div className="absolute inset-0 rounded-full border border-[#1F2937]" />
//                   <div className="absolute inset-2 rounded-full border border-[#1F2937]/50" />
                  
//                   {/* Glowing active ring segment */}
//                   <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none">
//                     <circle 
//                       cx="96" cy="96" r="94" 
//                       className="stroke-amber-500 fill-none" 
//                       strokeWidth="3" 
//                       strokeDasharray="590"
//                       strokeDashoffset="150"
//                       strokeLinecap="round"
//                       style={{ animation: 'breathe-glow 4s infinite ease-in-out' }}
//                     />
//                   </svg>

//                   <div className="text-center">
//                     <span className="block text-4xl font-extrabold text-white tracking-tighter">
//                       2<span className="text-2xl text-[#6B7280]">h</span> 15<span className="text-2xl text-[#6B7280]">m</span>
//                     </span>
//                     <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 mt-1 block">
//                       Time Logged Today
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4 relative z-10">
//                 <div className="bg-[#0B1120] border border-[#1F2937] rounded-2xl p-4 text-center">
//                   <span className="block text-xl font-bold text-amber-400">+180</span>
//                   <span className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider">XP Gained</span>
//                 </div>
//                 <div className="bg-[#0B1120] border border-[#1F2937] rounded-2xl p-4 text-center">
//                   <span className="block text-xl font-bold text-white">3</span>
//                   <span className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider">Sessions</span>
//                 </div>
//               </div>
//             </CardGlow>
//           </section>

//           {/* SECTION 6: KNOWLEDGE ROADMAP (RIGHT COL) */}
//           <section className="lg:col-span-7 space-y-6">
//             <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
//               <Layers className="w-5 h-5 text-amber-500" />
//               Frontend Knowledge Roadmap
//             </h2>

//             <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6 sm:p-10 relative overflow-hidden h-[400px]">
//               <div className="absolute inset-0 bg-[#0B1120]/30" />
              
//               {/* SVG Connector Drawing Canvas */}
//               <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
//                 <path 
//                   d="M 50 80 Q 150 80 150 160 T 250 240 T 400 200 T 550 150 T 700 200" 
//                   fill="none" 
//                   stroke="#1F2937" 
//                   strokeWidth="3" 
//                 />
//                 {/* Active drawing stroke overlay */}
//                 <path 
//                   className="timeline-path"
//                   d="M 50 80 Q 150 80 150 160 T 250 240 T 400 200 T 550 150 T 700 200" 
//                   fill="none" 
//                   stroke="rgba(245, 158, 11, 0.6)" 
//                   strokeWidth="4" 
//                   strokeLinecap="round"
//                 />
//               </svg>

//               <div className="relative z-10 w-full h-full">
//                 {ROADMAP_NODES.map((node) => (
//                   <div
//                     key={node.id}
//                     className={`absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 hover:scale-110 cursor-default`}
//                     style={{ left: `${node.x}%`, top: `${node.y}%` }}
//                   >
//                     <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2 transition-colors duration-300 ${
//                       node.status === 'completed' ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]' :
//                       node.status === 'active' ? 'bg-white border-white text-[#0B1120] shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-pulse' :
//                       'bg-[#111827] border-[#374151] text-[#6B7280]'
//                     }`}>
//                       {node.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}
//                     </div>
//                     <span className={`text-[10px] font-bold px-2 py-1 rounded-md border backdrop-blur-md transition-colors ${
//                       node.status === 'completed' ? 'bg-[#111827]/80 text-amber-400 border-amber-500/20' :
//                       node.status === 'active' ? 'bg-[#111827] text-white border-[#374151]' :
//                       'bg-[#0B1120] text-[#6B7280] border-[#1F2937]'
//                     }`}>
//                       {node.label}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//         </div>

//         {/* --- GRID SPLIT: LEARNING JOURNEY TIMELINE & INSIGHTS --- */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-slide-up-stagger" style={{ animationDelay: '700ms' }}>
          
//           {/* SECTION 5: LEARNING JOURNEY (LEFT COL) */}
//           <section className="lg:col-span-8 space-y-6">
//             <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
//               <History className="w-5 h-5 text-amber-500" />
//               Recent Learning Journey
//             </h2>

//             <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6 sm:p-10">
//               <div className="relative border-l-2 border-[#1F2937] ml-4 sm:ml-6 pl-8 space-y-10">
//                 {JOURNEY_MILESTONES.map((stone, i) => (
//                   <div key={stone.id} className="relative group">
//                     {/* Animated Timeline Node */}
//                     <div className="absolute -left-[42px] w-5 h-5 rounded-full bg-[#0B1120] border-4 border-[#1F2937] group-hover:border-amber-500 transition-colors duration-300 z-10 shadow-[0_0_0_4px_#111827]" />
                    
//                     <div className="bg-[#0B1120]/50 border border-[#1F2937] p-5 rounded-2xl group-hover:bg-[#111827] group-hover:border-[#374151] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
//                       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
//                         <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider bg-[#1F2937]/50 px-2 py-1 rounded-md w-fit">
//                           {stone.date}
//                         </span>
//                         <div className="flex items-center gap-3 text-xs font-bold">
//                           <span className="text-[#9CA3AF] flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {stone.duration}</span>
//                           <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">+{stone.xp} XP</span>
//                         </div>
//                       </div>
                      
//                       <h4 className="text-base font-extrabold text-white mb-1">{stone.tech}</h4>
//                       <p className="text-sm text-[#9CA3AF]">{stone.topic}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <button className="w-full mt-8 py-3 bg-[#0B1120] border border-[#1F2937] hover:bg-[#1F2937]/50 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2">
//                 View Full History <ArrowRight className="w-4 h-4" />
//               </button>
//             </div>
//           </section>

//           {/* SECTION 9: LEARNING INSIGHTS (RIGHT COL) */}
//           <section className="lg:col-span-4 space-y-6">
//             <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
//               <BarChart2 className="w-5 h-5 text-amber-500" />
//               Learning Insights
//             </h2>

//             <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6 sm:p-8 space-y-6">
              
//               <div className="space-y-1">
//                 <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Total Time Invested</span>
//                 <div className="text-4xl font-extrabold text-white tracking-tight"><AnimatedCounter value={312} /> <span className="text-xl text-[#9CA3AF]">Hrs</span></div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex justify-between items-center pb-3 border-b border-[#1F2937]/60">
//                   <span className="text-xs text-[#9CA3AF] font-medium">Weekly Focus Time</span>
//                   <span className="text-sm font-bold text-white">18.5 Hrs</span>
//                 </div>
//                 <div className="flex justify-between items-center pb-3 border-b border-[#1F2937]/60">
//                   <span className="text-xs text-[#9CA3AF] font-medium">Average Session</span>
//                   <span className="text-sm font-bold text-white">1h 15m</span>
//                 </div>
//                 <div className="flex justify-between items-center pb-3 border-b border-[#1F2937]/60">
//                   <span className="text-xs text-[#9CA3AF] font-medium">Longest Focus Sprint</span>
//                   <span className="text-sm font-bold text-amber-400">4h 30m</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-xs text-[#9CA3AF] font-medium">Total Lifetime XP</span>
//                   <span className="text-sm font-bold text-white"><AnimatedCounter value={14200} /></span>
//                 </div>
//               </div>

//               <div className="p-4 bg-[#0B1120] border border-[#1F2937] rounded-2xl flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
//                   <LayoutTemplate className="w-6 h-6 text-blue-400" />
//                 </div>
//                 <div>
//                   <span className="block text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-0.5">Favorite Tech</span>
//                   <span className="block text-sm font-extrabold text-white">Next.js</span>
//                 </div>
//               </div>

//             </div>
//           </section>

//         </div>

//       </div>

//       {/* --- ADD NEW PATH MODAL (GLASSMORPHISM POPUP) --- */}
//       {modalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="absolute inset-0 bg-[#0B1120]/80 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          
//           <div className="relative w-full max-w-lg bg-[#111827]/90 backdrop-blur-2xl border border-[#374151] rounded-3xl p-6 sm:p-8 shadow-[0_30px_60px_rgba(0,0,0,0.6)]" style={{ animation: 'modal-glass-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
//             <button onClick={() => setModalOpen(false)} className="absolute top-6 right-6 text-[#9CA3AF] hover:text-white transition-colors">
//               <X className="w-5 h-5" />
//             </button>
            
//             <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight">Stage New Learning Path</h2>
//             <p className="text-[#9CA3AF] text-xs font-medium mb-8">Establish tracking for a new technological framework, language, or system design methodology.</p>

//             <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setModalOpen(false); }}>
//               <div>
//                 <label className="block text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-1.5 ml-1">Technology Name</label>
//                 <input type="text" placeholder="e.g. Apache Kafka" required className="w-full bg-[#0B1120] border border-[#1F2937] px-4 py-3 rounded-xl text-sm text-white placeholder-[#4B5563] focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all" />
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-1.5 ml-1">Category</label>
//                   <select className="w-full bg-[#0B1120] border border-[#1F2937] px-4 py-3 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500/50 appearance-none">
//                     <option>Frontend</option>
//                     <option>Backend</option>
//                     <option>System Design</option>
//                     <option>DevOps</option>
//                     <option>Soft Skills</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-1.5 ml-1">Target Hours</label>
//                   <input type="number" placeholder="40" required className="w-full bg-[#0B1120] border border-[#1F2937] px-4 py-3 rounded-xl text-sm text-white placeholder-[#4B5563] focus:outline-none focus:border-amber-500/50 transition-all" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-1.5 ml-1">Primary Resource (URL)</label>
//                 <input type="url" placeholder="https://..." className="w-full bg-[#0B1120] border border-[#1F2937] px-4 py-3 rounded-xl text-sm text-white placeholder-[#4B5563] focus:outline-none focus:border-amber-500/50 transition-all" />
//               </div>

//               <div className="flex gap-3 pt-6">
//                 <button type="button" onClick={() => setModalOpen(false)} className="flex-1 px-4 py-3 rounded-xl border border-[#374151] hover:bg-[#1F2937] text-white text-xs font-bold transition-all">Cancel</button>
//                 <button type="submit" className="flex-1 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0B1120] text-xs font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]">Add to Library</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

//v3
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Code, 
  Layers, 
  Cpu, 
  Globe, 
  Clock, 
  Zap, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Lock, 
  Play, 
  Pause, 
  Award, 
  Terminal, 
  ExternalLink, 
  TrendingUp, 
  Sparkles,
  Search,
  BookMarked,
  Hourglass,
  ArrowRight,
  X,
  BarChart3
} from 'lucide-react';

// --- MOCK DATA FOR THE STUDIO ---
const INITIAL_TECHNOLOGIES = [
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend Framework',
    progress: 68,
    targetHours: 40,
    hoursCompleted: 27.2,
    level: 'Intermediate',
    status: 'In Progress',
    activeTopic: 'App Router Server Actions & Optimistic Updates',
    color: 'from-black to-slate-800',
    accentColor: 'rgb(56, 189, 248)',
    icon: Layers,
    topics: [
      { name: 'Routing & Layouts', completed: true },
      { name: 'Data Fetching & Caching', completed: true },
      { name: 'Server Actions', completed: false },
      { name: 'Advanced Middleware', completed: false },
    ]
  },
  {
    id: 'system-design',
    name: 'System Design',
    category: 'Architecture',
    progress: 35,
    targetHours: 60,
    hoursCompleted: 21,
    level: 'Beginner',
    status: 'In Progress',
    activeTopic: 'Horizontal vs Vertical Scaling & Load Balancers',
    color: 'from-indigo-900 to-slate-900',
    accentColor: 'rgb(129, 140, 248)',
    icon: Cpu,
    topics: [
      { name: 'Scaling Fundamentals', completed: true },
      { name: 'Load Balancing Algorithms', completed: false },
      { name: 'Caching Strategies (Redis)', completed: false },
      { name: 'Database Sharding', completed: false },
    ]
  },
  {
    id: 'react-advanced',
    name: 'React.js Mastery',
    category: 'Frontend',
    progress: 100,
    targetHours: 50,
    hoursCompleted: 50,
    level: 'Advanced',
    status: 'Completed',
    completionDate: 'June 24, 2026',
    activeTopic: 'All Core Milestones Finished',
    color: 'from-cyan-950 to-slate-900',
    accentColor: 'rgb(34, 211, 238)',
    icon: Code,
    topics: [
      { name: 'Concurrent Rendering', completed: true },
      { name: 'Custom Hooks Architecture', completed: true },
      { name: 'State Machine Integration', completed: true },
      { name: 'Fiber Architecture Deep Dive', completed: true },
    ]
  },
  {
    id: 'docker',
    name: 'Docker & Containers',
    category: 'DevOps',
    progress: 0,
    targetHours: 25,
    hoursCompleted: 0,
    level: 'Beginner',
    status: 'Not Started',
    activeTopic: 'Introduction to Containerization',
    color: 'from-blue-950 to-slate-900',
    accentColor: 'rgb(96, 165, 250)',
    icon: Terminal,
    topics: [
      { name: 'Images & Containers Basics', completed: false },
      { name: 'Dockerfile Optimization', completed: false },
      { name: 'Docker Compose Orchestration', completed: false },
      { name: 'Multi-stage Builds', completed: false },
    ]
  }
];

const TIMELINE_MILESTONES = [
  { tech: 'Next.js', topic: 'Implemented Optimistic UI on Form Mutation', duration: '45m', xp: '+60 XP', time: '4:15 PM' },
  { tech: 'Next.js', topic: 'Deep dive into Server Actions secure endpoints', duration: '1h 30m', xp: '+120 XP', time: '11:00 AM' },
  { tech: 'System Design', topic: 'Reviewed Consistent Hashing protocols', duration: '1h 10m', xp: '+90 XP', time: 'Yesterday' },
  { tech: 'React.js Mastery', topic: 'Completed final assignment on Scheduler Profile API', duration: '2h 15m', xp: '+200 XP', time: '3 days ago' },
];

const ROADMAP_STEPS = [
  { id: 1, name: 'HTML & CSS Foundations', status: 'completed' },
  { id: 2, name: 'Modern JavaScript (ES6+)', status: 'completed' },
  { id: 3, name: 'React UI Engineering', status: 'completed' },
  { id: 4, name: 'Next.js Core & SSR', status: 'current' },
  { id: 5, name: 'State Management (Zustand/Redux)', status: 'locked' },
  { id: 6, name: 'Production Architectures', status: 'locked' },
];

const DOCK_RESOURCES = [
  { name: 'React Docs', icon: Code, url: '#' },
  { name: 'Next.js Docs', icon: Layers, url: '#' },
  { name: 'MDN Web Docs', icon: Globe, url: '#' },
  { name: 'YouTube Tech', icon: Play, url: '#' },
  { name: 'DevDocs', icon: BookMarked, url: '#' },
];

export default function LearningStudio() {
  // States
  const [technologies, setTechnologies] = useState(INITIAL_TECHNOLOGIES);
  const [expandedTile, setExpandedTile] = useState('nextjs');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(8100); // Start at 2h 15m
  const [dockHoveredIndex, setDockHoveredIndex] = useState(null);

  // New path form fields state
  const [newPath, setNewPath] = useState({
    name: '', category: 'Frontend', difficulty: 'Beginner', targetHours: '30', primaryResource: '', notes: '', expectedDate: ''
  });

  // Simple interval effect for the animated countdown/countup timer widget
  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTimer = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  const handleAddPathSubmit = (e) => {
    e.preventDefault();
    if (!newPath.name) return;

    const addedTech = {
      id: newPath.name.toLowerCase().replace(/\s+/g, '-'),
      name: newPath.name,
      category: newPath.category,
      progress: 0,
      targetHours: parseInt(newPath.targetHours) || 30,
      hoursCompleted: 0,
      level: newPath.difficulty,
      status: 'Not Started',
      activeTopic: 'Initial resource: ' + (newPath.primaryResource || 'Documentation'),
      color: 'from-slate-800 to-slate-900',
      accentColor: 'rgb(168, 85, 247)',
      icon: BookOpen,
      topics: [
        { name: 'Introduction Strategy', completed: false },
        { name: 'Core Concepts Sandbox', completed: false },
        { name: 'Milestone Build Execution', completed: false }
      ]
    };

    setTechnologies([addedTech, ...technologies]);
    setIsModalOpen(false);
    setNewPath({ name: '', category: 'Frontend', difficulty: 'Beginner', targetHours: '30', primaryResource: '', notes: '', expectedDate: '' });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden relative pb-32">
      
      {/* BACKGROUND EFFECTS / AMBIENT LIGHTING */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-600/10 to-transparent rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute top-[60vh] right-10 w-[400px] h-[400px] bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/5 to-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* HEADER / NAVIGATION BAR */}
      <header className="border-b border-slate-900 bg-slate-950/40 backdrop-blur-md sticky top-0 z-40 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-black text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">CODESPARK</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 block -mt-1">Studio Core</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/60 rounded-full border border-slate-800">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-slate-300">STUDIO_ENV // LIVE</span>
          </div>
        </div>
      </header>

      {/* MAIN ASYMMETRICAL WORKSPACE CONTAINER */}
      <main className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-8 grid grid-cols-1 xl:grid-cols-12 gap-8 relative z-10">
        
        {/* ==================== LEFT AREA (8 COLUMNS): HERO & CORE BUILDERS ==================== */}
        <div className="xl:col-span-8 flex flex-col gap-10">
          
          {/* SECTION 1: LEARNING STUDIO HERO */}
          <section className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-indigo-950/20 backdrop-blur-xl p-8 lg:p-10 group shadow-2xl">
            {/* Animated backdrop particles / gradient lines simulated via Tailwind */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4 animate-pulse">
                  <Sparkles className="w-3.5 h-3.5" /> Engine Initialized
                </div>
                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">
                  Welcome to your Studio.
                </h1>
                <p className="text-slate-400 max-w-xl text-base leading-relaxed">
                  Synthesizing environments for execution. Your current primary trajectory target is <span className="text-cyan-400 font-semibold underline decoration-cyan-400/30 underline-offset-4">Next.js Framework Architecture</span>.
                </p>
              </div>

              {/* Live Metric Array */}
              <div className="flex items-center gap-4 bg-slate-950/50 backdrop-blur-md p-4 rounded-2xl border border-slate-800/80 min-w-[260px] self-start md:self-auto">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="border-r border-slate-800/80 pr-2">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 block">Streak Engine</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-2xl font-black font-mono text-amber-400 animate-bounce">18</span>
                      <span className="text-xs text-slate-400">days</span>
                    </div>
                  </div>
                  <div className="pl-2">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 block">Accumulated XP</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-2xl font-black font-mono text-indigo-400">4,920</span>
                      <span className="text-xs text-slate-500">XP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Floating Tech Icons */}
            <div className="mt-8 pt-6 border-t border-slate-800/40 flex flex-wrap gap-4 items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"><Code className="w-3.5 h-3.5 animate-spin duration-10000" /> React Engine v19</span>
                <span className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors"><Layers className="w-3.5 h-3.5 animate-bounce duration-5000" /> Vercel Compiler</span>
                <span className="flex items-center gap-1.5 hover:text-purple-400 transition-colors"><Cpu className="w-3.5 h-3.5" /> Node Cluster Node</span>
              </div>
              <div className="text-slate-400 font-mono text-[11px] bg-slate-900/60 px-2.5 py-1 rounded border border-slate-800">
                ACTIVE_FOCUS // PRODUCTION_READY
              </div>
            </div>
          </section>

          {/* SECTION 2 & 3: THE LEARNING LIBRARY (VISUAL CENTERPIECE) */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-400" /> Learning Library
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Macro-architecture paths designated for system mastery</p>
              </div>

              {/* SECTION 3 ACTION BUTTON */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5 group active:translate-y-0"
              >
                <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
                <span>Add Learning Path</span>
              </button>
            </div>

            {/* Premium Expandable Technology Tiles Column */}
            <div className="flex flex-col gap-4">
              {technologies.map((tech) => {
                const isExpanded = expandedTile === tech.id;
                const IconComponent = tech.icon || Code;
                const isCompleted = tech.status === 'Completed';

                return (
                  <div
                    key={tech.id}
                    className={`group relative rounded-2xl transition-all duration-500 ease-out overflow-hidden border ${
                      isExpanded 
                        ? 'bg-slate-900/90 border-slate-700 shadow-2xl shadow-indigo-950/40' 
                        : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60 hover:shadow-lg'
                    }`}
                  >
                    {/* Active/Hover Ambient Subtle Left Indicator Glow */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-[4px] transition-all duration-300"
                      style={{ 
                        backgroundColor: tech.accentColor,
                        opacity: isExpanded ? 1 : 0.3
                      }} 
                    />

                    {/* Main Header Container Row */}
                    <div 
                      onClick={() => setExpandedTile(isExpanded ? null : tech.id)}
                      className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${tech.color} border border-slate-800 flex items-center justify-center p-2.5 shadow-inner group-hover:scale-105 transition-transform duration-300`}>
                          <IconComponent className="w-full h-full" style={{ color: tech.accentColor }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">{tech.name}</h3>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50">{tech.category}</span>
                          </div>
                          <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5 font-mono">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-600" style={{ backgroundColor: tech.accentColor }} />
                            {tech.activeTopic}
                          </p>
                        </div>
                      </div>

                      {/* Right aligned status markers */}
                      <div className="flex items-center justify-between md:justify-end gap-6 border-t border-slate-800/40 md:border-none pt-3 md:pt-0">
                        <div className="flex gap-8 items-center">
                          {/* Hours & Level Details */}
                          <div className="text-right hidden sm:block">
                            <span className="text-[10px] text-slate-500 uppercase block font-bold tracking-wider">Allocation Engine</span>
                            <span className="text-xs font-semibold text-slate-300 font-mono">{tech.hoursCompleted}h <span className="text-slate-500">/ {tech.targetHours}h</span></span>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] text-slate-500 uppercase block font-bold tracking-wider">Status Matrix</span>
                            {isCompleted ? (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 font-mono">
                                <Award className="w-3 h-3" /> Mastered
                              </span>
                            ) : (
                              <span className={`text-xs font-semibold font-mono ${tech.status === 'Not Started' ? 'text-slate-500' : 'text-cyan-400'}`}>
                                {tech.status}
                              </span>
                            )}
                          </div>

                          {/* Interactive Circular/Linear Minimal Progress Display */}
                          <div className="w-24 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800/80 relative">
                            <div 
                              className="h-full bg-gradient-to-r transition-all duration-1000 rounded-full" 
                              style={{ 
                                width: `${tech.progress}%`,
                                backgroundImage: `linear-gradient(to right, ${tech.accentColor}, #a855f7)`
                              }}
                            />
                          </div>
                        </div>

                        {/* Expand Icon */}
                        <div className="text-slate-400 p-1 hover:text-white transition-colors">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Smooth Expandable Content Panel */}
                    <div 
                      className={`transition-all duration-500 ease-in-out border-t border-slate-800/60 bg-slate-950/40 ${
                        isExpanded ? 'max-h-[400px] opacity-100 p-6' : 'max-h-0 opacity-0 pointer-events-none'
                      }`}
                    >
                      {isCompleted ? (
                        <div className="bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 p-4 rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                              <Award className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-amber-300">Technology Fully Mastered</h4>
                              <p className="text-xs text-slate-400">All core criteria verified. Certified optimization complete on {tech.completionDate}.</p>
                            </div>
                          </div>
                          <span className="text-xs font-mono px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-md uppercase tracking-wider font-bold">GOLD_ACCENT_VERIFIED</span>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          
                          {/* Segment Left: Topic Checkbox Syllabus Architecture */}
                          <div className="md:col-span-2 space-y-2.5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Target Curriculum Blocks</h4>
                            {tech.topics.map((topic, idx) => (
                              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 hover:bg-slate-900 transition-colors">
                                <div className="flex items-center gap-2.5">
                                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${topic.completed ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'border-slate-700 bg-slate-950'}`}>
                                    {topic.completed && <CheckCircle2 className="w-3 h-3" />}
                                  </div>
                                  <span className={`text-xs ${topic.completed ? 'text-slate-400 line-through' : 'text-slate-200'}`}>{topic.name}</span>
                                </div>
                                <span className="text-[10px] font-mono text-slate-500">{topic.completed ? 'VERIFIED' : 'PENDING'}</span>
                              </div>
                            ))}
                          </div>

                          {/* Segment Right: Control Hub Action */}
                          <div className="flex flex-col justify-between bg-slate-900/40 border border-slate-800 p-4 rounded-xl">
                            <div>
                              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Current Focus Phase</span>
                              <div className="text-sm font-bold text-slate-200 mt-1">{tech.level} Velocity</div>
                              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Studio tracks metrics automatically based on session activation windows.</p>
                            </div>

                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setTimerRunning(true);
                              }}
                              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white transition-all rounded-xl font-medium text-xs tracking-wider uppercase border border-slate-700 hover:border-indigo-500 group"
                            >
                              <Play className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                              <span>Resume Learning Engine</span>
                            </button>
                          </div>

                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 6: KNOWLEDGE ROADMAP */}
          <section className="bg-slate-900/30 border border-slate-800/60 rounded-3xl p-6 lg:p-8 backdrop-blur-xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" /> Knowledge Roadmap Trajectory
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Sequential node unlocks for standard Fullstack Frontend Engineering track</p>
            </div>

            {/* Map Path Presentation Component */}
            <div className="flex flex-wrap items-center gap-3 py-4 overflow-x-auto">
              {ROADMAP_STEPS.map((step, idx) => {
                const isCompleted = step.status === 'completed';
                const isCurrent = step.status === 'current';
                
                return (
                  <React.Fragment key={step.id}>
                    {/* Node */}
                    <div 
                      className={`px-4 py-3 rounded-xl border relative transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 shadow-inner' 
                          : isCurrent 
                            ? 'bg-indigo-950/50 border-indigo-500 text-white shadow-lg shadow-indigo-500/10 animate-pulse' 
                            : 'bg-slate-900/40 border-slate-800 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isCompleted ? 'bg-emerald-500/20 text-emerald-400' : isCurrent ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-600'
                        }`}>
                          {isCompleted ? '✔' : step.id}
                        </div>
                        <span className="text-xs font-semibold tracking-wide whitespace-nowrap">{step.name}</span>
                      </div>

                      {/* Accent highlight rings */}
                      {isCurrent && (
                        <span className="absolute -inset-px rounded-xl border border-indigo-400 animate-ping opacity-20 pointer-events-none" />
                      )}
                    </div>

                    {/* Separator Arrow */}
                    {idx < ROADMAP_STEPS.length - 1 && (
                      <ArrowRight className={`w-4 h-4 flex-shrink-0 ${isCompleted ? 'text-emerald-600/50' : 'text-slate-700'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </section>

          {/* SECTION 5: LEARNING JOURNEY (TIMELINE METRIC) */}
          <section className="bg-slate-900/20 border border-slate-900 rounded-3xl p-6 lg:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" /> Learning Journey Milestones
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Chronological block completions across paths</p>
            </div>

            {/* Vertical Custom Timeline */}
            <div className="relative border-l-2 border-slate-800 pl-6 space-y-6 ml-2">
              {TIMELINE_MILESTONES.map((milestone, idx) => (
                <div key={idx} className="relative group">
                  {/* Point Indicator Node */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-950 border-2 border-indigo-400 group-hover:bg-indigo-400 transition-colors duration-300" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 transition-all duration-300">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-indigo-400 font-mono">{milestone.tech}</span>
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">{milestone.time}</span>
                      </div>
                      <p className="text-sm text-slate-200 mt-1 font-medium">{milestone.topic}</p>
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-auto text-xs font-mono">
                      <span className="text-slate-400 flex items-center gap-1"><Hourglass className="w-3 h-3" /> {milestone.duration}</span>
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20 font-bold">{milestone.xp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* ==================== RIGHT AREA (4 COLUMNS): LIVE INTERACTIVE HUB & INSIGHTS ==================== */}
        <div className="xl:col-span-4 flex flex-col gap-10">
          
          {/* SECTION 4: TODAY'S LEARNING SESSION */}
          <section className="rounded-3xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-xl p-6 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap className="w-24 h-24 text-indigo-500" />
            </div>

            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 block">Workspace Monitor</span>
              <h2 className="text-lg font-bold text-white">Today's Studio Session</h2>
            </div>

            {/* Dynamic Interactive Timer Widget UI */}
            <div className="flex flex-col items-center justify-center py-6 bg-slate-950/60 rounded-2xl border border-slate-800/80 mb-6">
              
              {/* Circular Graphic Core Frame */}
              <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                {/* SVG Ring Frame Track */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" stroke="#1e293b" strokeWidth="4" fill="transparent" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="44" 
                    stroke="url(#timerGradient)" 
                    strokeWidth="4" 
                    fill="transparent" 
                    strokeDasharray="276" 
                    strokeDashoffset={timerRunning ? "110" : "180"} 
                    className="transition-all duration-1000 ease-in-out"
                  />
                  <defs>
                    <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Internal Metrics Column */}
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Active Engine</span>
                  <span className="text-lg font-black font-mono tracking-tight text-white mt-0.5">{formatTimer(timerSeconds)}</span>
                  <span className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full mt-1.5">+180 XP</span>
                </div>

                {/* Subtle Breathing Ambient Shadow Aura */}
                <div className={`absolute inset-4 rounded-full bg-indigo-500/5 mix-blend-screen pointer-events-none ${timerRunning ? 'animate-ping opacity-30' : 'opacity-0'}`} />
              </div>

              {/* Engine Interaction Controls Toggle Button */}
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-md ${
                  timerRunning 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/10'
                }`}
              >
                {timerRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5" /> <span>Pause Tracking Session</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" /> <span>Initialize Learning Engine</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Session Aggregates */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="bg-slate-950/40 border border-slate-800 p-3 rounded-xl">
                <span className="text-slate-500 text-[10px] block uppercase font-bold">Target Context</span>
                <span className="text-slate-200 font-semibold block mt-0.5">Next.js Framework</span>
              </div>
              <div className="bg-slate-950/40 border border-slate-800 p-3 rounded-xl">
                <span className="text-slate-500 text-[10px] block uppercase font-bold">Session Segment</span>
                <span className="text-slate-200 font-semibold block mt-0.5">3 Iterations</span>
              </div>
            </div>
          </section>

          {/* SECTION 7: LEARNING RESOURCES (MACOS FLOATING DOCK DYNAMIC DESIGN) */}
          <section className="bg-slate-900/20 border border-slate-900 rounded-3xl p-6 flex flex-col items-center">
            <div className="w-full text-left mb-4">
              <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Resource Teleport Dock</h2>
              <p className="text-xs text-slate-500">Hover for magnification micro-interactions</p>
            </div>

            {/* Simulated macOS Dock Container */}
            <div className="bg-slate-950/80 border border-slate-800 px-4 py-3 rounded-2xl flex items-center gap-4 shadow-inner max-w-full overflow-x-auto">
              {DOCK_RESOURCES.map((res, idx) => {
                const ResIcon = res.icon;
                const isHovered = dockHoveredIndex === idx;
                const isNeighbor = dockHoveredIndex !== null && Math.abs(dockHoveredIndex - idx) === 1;
                
                // Calculate size based on simulated proximity hover
                let sizeClass = "w-10 h-10";
                if (isHovered) sizeClass = "w-14 h-14 bg-indigo-600 text-white border-indigo-400";
                else if (isNeighbor) sizeClass = "w-12 h-12 bg-slate-800 text-slate-200 border-slate-700";

                return (
                  <a
                    key={res.name}
                    href={res.url}
                    onMouseEnter={() => setDockHoveredIndex(idx)}
                    onMouseLeave={() => setDockHoveredIndex(null)}
                    className={`rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center p-2.5 transition-all duration-300 ease-out shadow-md group relative ${sizeClass}`}
                    title={res.name}
                  >
                    <ResIcon className="w-full h-full transition-transform group-hover:scale-105" />
                    
                    {/* Tiny tooltips */}
                    {isHovered && (
                      <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-[10px] text-white font-mono whitespace-nowrap shadow-xl">
                        {res.name}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </section>

          {/* SECTION 9: LEARNING INSIGHTS (MINIMAL TYPOGRAPHY APPROACH) */}
          <section className="bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-6">
            <div className="mb-5">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" /> Analytical Architecture Insights
              </h2>
              <p className="text-xs text-slate-500">System performance metrics without boilerplate graphing dashboards</p>
            </div>

            {/* Metric Blueprint Rows */}
            <div className="space-y-4">
              {[
                { label: 'Total Dedicated Matrix Time', val: '98.4 hours', change: 'Optimal Capacity' },
                { label: 'Weekly Velocity Threshold', val: '14.5 hours', change: '+2.1h variance' },
                { label: 'Average Learning Session Span', val: '1h 48m', change: 'Stable Depth' },
                { label: 'Peak Capacity Window Focus', val: 'React.js Mastery', change: '100% Core' }
              ].map((insight, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-900 hover:border-slate-800/60 transition-colors">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wide block">{insight.label}</span>
                    <span className="text-sm font-bold text-slate-200 mt-0.5 block">{insight.val}</span>
                  </div>
                  <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-400">
                    {insight.change}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 8: RECENT LEARNING TELEMETRY FEED */}
          <section className="bg-slate-900/10 border border-slate-900/80 rounded-3xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Stream Activity Log</h3>
            <div className="space-y-3">
              {[
                { label: 'Next.js Routing Engine Matrix', meta: 'Completed 45m session', time: '10m ago', state: 'SUCCESS' },
                { label: 'System Design Redundancy Cache', meta: 'Added 2 markdown documents', time: '4h ago', state: 'APPENDED' },
                { label: 'Docker Multi-stage Architecture', meta: 'Initialized root configuration', time: '1 day ago', state: 'STAGED' }
              ].map((feed, idx) => (
                <div key={idx} className="p-3 bg-slate-950/20 border border-slate-900/60 rounded-xl flex items-start justify-between gap-4 hover:bg-slate-950/60 transition-colors">
                  <div>
                    <div className="text-xs font-bold text-slate-300">{feed.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{feed.meta}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[9px] block font-mono text-slate-600">{feed.time}</span>
                    <span className="text-[9px] font-mono font-bold text-indigo-400 bg-indigo-500/5 px-1 py-0.5 rounded block mt-1">{feed.state}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* ==================== SECTION 3 MODAL: ADD LEARNING PATH OVERLAY ==================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300">
          <div 
            className="w-full max-w-lg bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-6 relative overflow-hidden transform scale-100 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Ambient Corner Light */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-purple-400" /> Catalog New Learning Path
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Define structured long-term target blueprints for CODESPARK tracking</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPathSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Technology Designation Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., TypeScript Architecture, Rust Core, Redis"
                  value={newPath.name}
                  onChange={(e) => setNewPath({...newPath, name: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Category Dimension</label>
                  <select 
                    value={newPath.category}
                    onChange={(e) => setNewPath({...newPath, category: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-all"
                  >
                    <option value="Frontend">Frontend Core</option>
                    <option value="Backend Framework">Backend System</option>
                    <option value="Architecture">Architecture / Design</option>
                    <option value="DevOps">DevOps Infrastructure</option>
                    <option value="Language Mechanics">Language Mechanics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Target Scope Hours</label>
                  <input 
                    type="number" 
                    placeholder="e.g., 40"
                    value={newPath.targetHours}
                    onChange={(e) => setNewPath({...newPath, targetHours: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-all font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Difficulty Baseline</label>
                  <select 
                    value={newPath.difficulty}
                    onChange={(e) => setNewPath({...newPath, difficulty: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-all"
                  >
                    <option value="Beginner">Beginner Tier</option>
                    <option value="Intermediate">Intermediate Matrix</option>
                    <option value="Advanced">Advanced Mastery</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Expected Target Resolution</label>
                  <input 
                    type="date" 
                    value={newPath.expectedDate}
                    onChange={(e) => setNewPath({...newPath, expectedDate: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Primary Learning Resource Core Endpoint</label>
                <input 
                  type="text" 
                  placeholder="e.g., Official Documentation API Guide, Course URL"
                  value={newPath.primaryResource}
                  onChange={(e) => setNewPath({...newPath, primaryResource: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Architectural Notes (Optional)</label>
                <textarea 
                  rows="2"
                  placeholder="Specify particular goals or focus vectors here..."
                  value={newPath.notes}
                  onChange={(e) => setNewPath({...newPath, notes: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-all resize-none"
                />
              </div>

              <div className="flex justify-end items-center gap-3 pt-2 border-t border-slate-800/80 mt-5">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all rounded-xl text-xs font-semibold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all rounded-xl text-xs font-semibold uppercase tracking-wider shadow-md shadow-purple-950/40"
                >
                  Synthesize Strategy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}