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
