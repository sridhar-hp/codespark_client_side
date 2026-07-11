// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
// import {
//   BookOpen, Terminal, Code, Zap, Star, Brain, Clock, ChevronDown,
//   CheckCircle2, Search, X, Share2, Download, Archive, Edit3, MessageSquare,
//   Command, Mic, Maximize2, Minimize2, Activity, Target, Sparkles, Filter,
//   TrendingUp, Layout, Calendar, AlertCircle, Quote, ChevronRight, Hash, Eye, EyeOff
// } from 'lucide-react';
// import { 
//   AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
//   BarChart, Bar, Cell
// } from 'recharts';

// // --- DESIGN SYSTEM & CONSTANTS ---
// const COLORS = {
//   bg: '#0B1120',
//   card: '#111827',
//   surface: '#0F172A',
//   border: '#1F2937',
//   textPrimary: '#F9FAFB',
//   textSecondary: '#9CA3AF',
//   amber: '#F59E0B',
//   orange: '#F97316',
//   cyan: '#06B6D4',
//   green: '#10B981',
//   red: '#EF4444'
// };

// const MOODS = [
//   { emoji: '😀', label: 'Great', color: COLORS.green },
//   { emoji: '🙂', label: 'Good', color: COLORS.cyan },
//   { emoji: '😐', label: 'Okay', color: COLORS.amber },
//   { emoji: '😓', label: 'Stressed', color: COLORS.orange },
//   { emoji: '🔥', label: 'Flow State', color: COLORS.red }
// ];

// const KNOWLEDGE_TAGS = [
//   'React', 'Node.js', 'Vite', 'Tailwind CSS', 'MongoDB', 
//   'System Design', 'DSA', 'AI Agents', 'MERN Stack', 'Cybersecurity'
// ];

// const ANALYTICS_DATA = [
//   { day: 'Mon', words: 450, focus: 4 },
//   { day: 'Tue', words: 620, focus: 5 },
//   { day: 'Wed', words: 300, focus: 3 },
//   { day: 'Thu', words: 800, focus: 6 },
//   { day: 'Fri', words: 550, focus: 4 },
//   { day: 'Sat', words: 900, focus: 7 },
//   { day: 'Sun', words: 750, focus: 5 }
// ];

// const TIMELINE_EVENTS = [
//   {
//     id: 1,
//     time: 'Morning',
//     tech: 'DSA / LeetCode',
//     duration: '2h 15m',
//     reflection: 'Focused on optimizing sliding window algorithms.',
//     lessons: 'Always check edge cases for empty arrays before iterating.',
//     mistakes: 'Initially used O(n^2) approach before realizing a hash map works in O(n).',
//     achievements: 'Solved 2 Mediums.'
//   },
//   {
//     id: 2,
//     time: 'Afternoon',
//     tech: 'React / Tailwind',
//     duration: '3h 45m',
//     reflection: 'Built out the sliding panel animations for the Leave Management System dashboard.',
//     lessons: 'Framer Motion AnimatePresence requires keys on direct children to work smoothly.',
//     mistakes: 'Forgot to clean up event listeners in useEffect causing a memory leak.',
//     achievements: 'Completed feature branch and merged to dev.'
//   },
//   {
//     id: 3,
//     time: 'Evening',
//     tech: 'Python / AI',
//     duration: '1h 30m',
//     reflection: 'Worked through the AI Agents intensive module.',
//     lessons: 'Multi-agent systems require strict state management to prevent circular loops.',
//     mistakes: 'None today.',
//     achievements: 'Deployed custom tool on Kaggle environment.'
//   },
//   {
//     id: 4,
//     time: 'Night',
//     tech: 'Cybersecurity',
//     duration: '1h 00m',
//     reflection: 'Drafted educational presentation structure on Dark Web awareness for students.',
//     lessons: 'Analogies work best when explaining complex onion routing to beginners.',
//     mistakes: 'Got sidetracked reading obscure RFCs.',
//     achievements: 'Outline completed.'
//   }
// ];

// const RECENT_JOURNALS = [
//   {
//     id: 1,
//     date: 'Today',
//     mood: '🔥',
//     tags: ['React', 'MERN Stack'],
//     tech: 'Vite, Tailwind',
//     summary: 'Crushed the dashboard layout. Flow state achieved early.',
//     duration: '6h 30m'
//   },
//   {
//     id: 2,
//     date: 'Yesterday',
//     mood: '🙂',
//     tags: ['DSA', 'System Design'],
//     tech: 'JavaScript',
//     summary: 'Struggled slightly with dynamic programming concepts but made progress.',
//     duration: '4h 15m'
//   },
//   {
//     id: 3,
//     date: 'Oct 28',
//     mood: '😀',
//     tags: ['AI Agents', 'Python'],
//     tech: 'Kaggle',
//     summary: 'Fascinating dive into autonomous multi-agent pipelines.',
//     duration: '5h 00m'
//   }
// ];

// // --- HELPER COMPONENTS ---

// const Card = ({ children, className = '', noPadding = false, ...props }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//     className={`bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden shadow-lg ${!noPadding && 'p-6'} ${className}`}
//     {...props}
//   >
//     {children}
//   </motion.div>
// );

// const AnimatedCounter = ({ value, prefix = '', suffix = '' }) => {
//   const [count, setCount] = useState(0);
  
//   useEffect(() => {
//     let start = 0;
//     const end = parseInt(value);
//     if (start === end) return;
    
//     const duration = 1500;
//     const incrementTime = (duration / end);
    
//     const timer = setInterval(() => {
//       start += 1;
//       setCount(start);
//       if (start === end) clearInterval(timer);
//     }, incrementTime);
    
//     return () => clearInterval(timer);
//   }, [value]);

//   return <span>{prefix}{count}{suffix}</span>;
// };

// const Modal = ({ isOpen, onClose, title, children }) => {
//   useEffect(() => {
//     if (isOpen) document.body.style.overflow = 'hidden';
//     else document.body.style.overflow = 'unset';
//     return () => { document.body.style.overflow = 'unset'; };
//   }, [isOpen]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1120]/80 backdrop-blur-md"
//           onClick={onClose}
//         >
//           <motion.div
//             initial={{ scale: 0.95, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.95, opacity: 0 }}
//             onClick={(e) => e.stopPropagation()}
//             className="bg-[#111827] border border-[#1F2937] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative"
//           >
//             <div className="flex items-center justify-between p-4 border-b border-[#1F2937]">
//               <h3 className="text-lg font-semibold text-[#F9FAFB]">{title}</h3>
//               <button onClick={onClose} className="p-1 text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors rounded-lg hover:bg-[#1F2937]">
//                 <X size={20} />
//               </button>
//             </div>
//             <div className="p-6">
//               {children}
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// // --- MAIN COMPONENT ---

// export default function Journal() {
//   // State
//   const [journalText, setJournalText] = useState('');
//   const [activeMood, setActiveMood] = useState(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const [focusMode, setFocusMode] = useState(false);
//   const [expandedTimeline, setExpandedTimeline] = useState([1]);
//   const [expandedJournals, setExpandedJournals] = useState([]);
  
//   // Modals
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [exportOpen, setExportOpen] = useState(false);
//   const [shareOpen, setShareOpen] = useState(false);
//   const [archiveSuccess, setArchiveSuccess] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
  
//   // Refs
//   const editorRef = useRef(null);
//   const { scrollYProgress } = useScroll();
//   const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

//   // Keyboard Shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
//         e.preventDefault();
//         setSearchOpen(true);
//       }
//       if (e.key === 'Escape') {
//         setSearchOpen(false);
//         setExportOpen(false);
//         setShareOpen(false);
//         if (focusMode) setFocusMode(false);
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [focusMode]);

//   // Auto-resize editor & Auto-save simulation
//   const handleTextChange = (e) => {
//     setJournalText(e.target.value);
//     if (editorRef.current) {
//       editorRef.current.style.height = 'auto';
//       editorRef.current.style.height = editorRef.current.scrollHeight + 'px';
//     }
    
//     setIsSaving(true);
//     const timeout = setTimeout(() => setIsSaving(false), 1000);
//     return () => clearTimeout(timeout);
//   };

//   const wordCount = journalText.trim() === '' ? 0 : journalText.trim().split(/\s+/).length;
//   const charCount = journalText.length;

//   const toggleTimeline = (id) => {
//     setExpandedTimeline(prev => 
//       prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
//     );
//   };

//   const toggleJournal = (id) => {
//     setExpandedJournals(prev => 
//       prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
//     );
//   };

//   const handleArchive = () => {
//     setArchiveSuccess(true);
//     setTimeout(() => setArchiveSuccess(false), 2000);
//   };

//   return (
//     <div className="min-h-screen  text-[#F9FAFB] font-sans selection:bg-[#06B6D4]/30">
      
//       {/* SEARCH MODAL */}
//       <Modal isOpen={searchOpen} onClose={() => setSearchOpen(false)} title="Search Journal">
//         <div className="relative">
//           <Search className="absolute left-3 top-3 text-[#9CA3AF]" size={20} />
//           <input 
//             type="text" 
//             autoFocus
//             placeholder="Search entries, tags, technologies..." 
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full bg-[#0F172A] border border-[#1F2937] text-[#F9FAFB] rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] transition-all"
//           />
//         </div>
//         <div className="mt-6 flex flex-col gap-2">
//           <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Recent Searches</p>
//           <button className="flex items-center gap-3 text-sm text-[#F9FAFB] hover:bg-[#1F2937] p-2 rounded-lg transition-colors text-left">
//             <Clock size={16} className="text-[#9CA3AF]" /> System Design Patterns
//           </button>
//           <button className="flex items-center gap-3 text-sm text-[#F9FAFB] hover:bg-[#1F2937] p-2 rounded-lg transition-colors text-left">
//             <Clock size={16} className="text-[#9CA3AF]" /> React Custom Hooks
//           </button>
//         </div>
//       </Modal>

//       {/* EXPORT MODAL */}
//       <Modal isOpen={exportOpen} onClose={() => setExportOpen(false)} title="Export Journal">
//         <div className="flex flex-col gap-4">
//           <button className="w-full flex items-center justify-between p-4 rounded-xl border border-[#1F2937] hover:border-[#06B6D4] bg-[#0F172A] transition-colors group">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-[#06B6D4]/10 rounded-lg text-[#06B6D4] group-hover:scale-110 transition-transform">
//                 <Download size={20} />
//               </div>
//               <div className="text-left">
//                 <p className="font-medium text-[#F9FAFB]">Export as PDF</p>
//                 <p className="text-xs text-[#9CA3AF]">Beautifully formatted document</p>
//               </div>
//             </div>
//             <ChevronRight size={18} className="text-[#9CA3AF]" />
//           </button>
//           <button className="w-full flex items-center justify-between p-4 rounded-xl border border-[#1F2937] hover:border-[#F59E0B] bg-[#0F172A] transition-colors group">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-[#F59E0B]/10 rounded-lg text-[#F59E0B] group-hover:scale-110 transition-transform">
//                 <Code size={20} />
//               </div>
//               <div className="text-left">
//                 <p className="font-medium text-[#F9FAFB]">Export as Markdown</p>
//                 <p className="text-xs text-[#9CA3AF]">Raw text format</p>
//               </div>
//             </div>
//             <ChevronRight size={18} className="text-[#9CA3AF]" />
//           </button>
//         </div>
//       </Modal>

//       {/* SHARE MODAL */}
//       <Modal isOpen={shareOpen} onClose={() => setShareOpen(false)} title="Share Reflection">
//         <div className="space-y-4">
//           <p className="text-sm text-[#9CA3AF]">Generate a public link to share your knowledge.</p>
//           <div className="flex gap-2">
//             <input 
//               readOnly 
//               value="https://codespark.dev/j/8f92a1" 
//               className="flex-1 bg-[#0F172A] border border-[#1F2937] rounded-lg px-3 py-2 text-sm text-[#F9FAFB]"
//             />
//             <button className="bg-[#06B6D4] text-[#0B1120] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#06B6D4]/90 transition-colors">
//               Copy
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* FLOATING ACTION DOCK */}
//       <motion.div 
//         initial={{ y: 100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 1, type: "spring" }}
//         className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
//       >
//         <div className="bg-[#111827]/80 backdrop-blur-xl border border-[#1F2937] p-2 rounded-2xl flex items-center gap-2 shadow-2xl">
//           <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="p-3 text-[#9CA3AF] hover:text-[#06B6D4] hover:bg-[#0F172A] rounded-xl transition-all group relative">
//             <Edit3 size={20} className="group-hover:scale-110 transition-transform" />
//             <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1F2937] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">New Entry</span>
//           </button>
//           <button onClick={() => setSearchOpen(true)} className="p-3 text-[#9CA3AF] hover:text-[#F59E0B] hover:bg-[#0F172A] rounded-xl transition-all group relative">
//             <Search size={20} className="group-hover:scale-110 transition-transform" />
//             <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1F2937] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Search (⌘K)</span>
//           </button>
//           <div className="w-px h-8 bg-[#1F2937] mx-1"></div>
//           <button onClick={() => setExportOpen(true)} className="p-3 text-[#9CA3AF] hover:text-[#10B981] hover:bg-[#0F172A] rounded-xl transition-all group relative">
//             <Download size={20} className="group-hover:scale-110 transition-transform" />
//             <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1F2937] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Export</span>
//           </button>
//           <button onClick={() => setShareOpen(true)} className="p-3 text-[#9CA3AF] hover:text-[#F97316] hover:bg-[#0F172A] rounded-xl transition-all group relative">
//             <Share2 size={20} className="group-hover:scale-110 transition-transform" />
//             <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1F2937] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Share</span>
//           </button>
//           <button onClick={handleArchive} className={`p-3 rounded-xl transition-all group relative ${archiveSuccess ? 'text-[#10B981] bg-[#10B981]/10' : 'text-[#9CA3AF] hover:text-[#EF4444] hover:bg-[#0F172A]'}`}>
//             {archiveSuccess ? <CheckCircle2 size={20} /> : <Archive size={20} className="group-hover:scale-110 transition-transform" />}
//             <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1F2937] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//               {archiveSuccess ? 'Archived' : 'Archive'}
//             </span>
//           </button>
//         </div>
//       </motion.div>

//       {/* EPIC HERO SECTION */}
//       <motion.section 
//         style={{ y: heroY, opacity: heroOpacity }}
//         className="relative pt-32 pb-20 px-6 overflow-hidden flex flex-col items-center text-center border-b border-[#1F2937]"
//       >
//         <div className="absolute inset-0 z-0 pointer-events-none">
//           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#06B6D4]/5 rounded-full blur-[100px]" />
//           <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#F59E0B]/5 rounded-full blur-[100px]" />
//           {/* Floating Particles Simulation */}
//           {[...Array(15)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-1 h-1 bg-[#F9FAFB]/20 rounded-full"
//               initial={{ x: Math.random() * window.innerWidth, y: Math.random() * 500 }}
//               animate={{ 
//                 y: [null, Math.random() * 500],
//                 x: [null, Math.random() * window.innerWidth],
//                 opacity: [0.1, 0.5, 0.1] 
//               }}
//               transition={{ duration: 10 + Math.random() * 20, repeat: Infinity, ease: "linear" }}
//             />
//           ))}
//         </div>

//         <motion.div 
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="relative z-10 max-w-4xl mx-auto space-y-6"
//         >
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#06B6D4] text-xs font-medium mb-4">
//             <Sparkles size={14} /> Developer Reflection Workspace
//           </div>
//           <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
//             Every Great Developer <br/>
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#F59E0B]">
//               Has A Story.
//             </span>
//           </h1>
//           <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB]">Write Yours.</h2>
//           <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto font-light leading-relaxed">
//             Document ideas, track growth, record achievements, and improve every day. 
//             A premium editorial studio designed exclusively for software engineers.
//           </p>
//         </motion.div>
//       </motion.section>

//       {/* MAIN CONTENT GRID */}
//       <main className="max-w-7xl mx-auto px-6 py-12 space-y-12 relative z-10">
        
//         {/* TOP ROW: WRITING STUDIO & MOOD */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
//           {/* WRITING STUDIO */}
//           <div className={`lg:col-span-2 transition-all duration-500 ${focusMode ? 'fixed inset-0 z-50 p-6 md:p-20 bg-[#0B1120]/95 backdrop-blur-xl overflow-y-auto' : ''}`}>
//             <Card className={`h-full flex flex-col ${focusMode ? 'max-w-4xl mx-auto w-full min-h-[80vh] shadow-2xl border-[#06B6D4]/30' : ''}`}>
//               <div className="flex items-center justify-between mb-4 border-b border-[#1F2937] pb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-[#06B6D4]/10 rounded-lg">
//                     <Terminal size={20} className="text-[#06B6D4]" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg flex items-center gap-2">
//                       Today's Journal
//                       <span className="flex h-2 w-2">
//                         <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#10B981] opacity-75"></span>
//                         <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
//                       </span>
//                     </h3>
//                     <p className="text-xs text-[#9CA3AF]">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <AnimatePresence>
//                     {isSaving && (
//                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1 text-xs text-[#9CA3AF]">
//                         <Activity size={12} className="animate-spin text-[#06B6D4]" /> Saving...
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                   <button 
//                     onClick={() => setFocusMode(!focusMode)} 
//                     className="p-2 hover:bg-[#1F2937] rounded-lg transition-colors text-[#9CA3AF] hover:text-[#F9FAFB] flex items-center gap-2 text-sm"
//                   >
//                     {focusMode ? <><Minimize2 size={16} /> Exit Focus</> : <><Maximize2 size={16} /> Focus Mode</>}
//                   </button>
//                 </div>
//               </div>

//               <div className="flex-1 relative group cursor-text" onClick={() => editorRef.current?.focus()}>
//                 <textarea
//                   ref={editorRef}
//                   value={journalText}
//                   onChange={handleTextChange}
//                   placeholder="What did you build today? What bugs did you crush? Any new patterns learned?"
//                   className="w-full bg-transparent resize-none outline-none text-[#F9FAFB] placeholder-[#9CA3AF]/50 text-lg leading-relaxed min-h-[200px]"
//                 />
//               </div>

//               <div className="mt-4 pt-4 border-t border-[#1F2937] flex items-center justify-between text-xs text-[#9CA3AF]">
//                 <div className="flex gap-4">
//                   <span className="flex items-center gap-1"><Hash size={12}/> Markdown Supported</span>
//                 </div>
//                 <div className="flex gap-4 font-mono">
//                   <span>{wordCount} words</span>
//                   <span>{charCount} chars</span>
//                 </div>
//               </div>
//             </Card>
//           </div>

//           {/* MOOD & GOALS */}
//           <div className="space-y-8">
//             <Card>
//               <h3 className="text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider mb-4 flex items-center gap-2">
//                 <Target size={16} /> State of Mind
//               </h3>
//               <div className="flex justify-between items-center gap-2">
//                 {MOODS.map((mood, idx) => (
//                   <motion.button
//                     key={mood.label}
//                     whileHover={{ scale: 1.1, y: -2 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setActiveMood(mood.label)}
//                     className={`flex flex-col items-center gap-2 p-2 rounded-xl transition-all relative ${
//                       activeMood === mood.label ? 'bg-[#1F2937]' : 'hover:bg-[#1F2937]/50'
//                     }`}
//                   >
//                     <span className="text-3xl filter drop-shadow-md">{mood.emoji}</span>
//                     <span className="text-[10px] font-medium" style={{ color: activeMood === mood.label ? mood.color : '#9CA3AF' }}>
//                       {mood.label}
//                     </span>
//                     {activeMood === mood.label && (
//                       <motion.div layoutId="moodIndicator" className="absolute -bottom-1 w-1 h-1 rounded-full" style={{ backgroundColor: mood.color }} />
//                     )}
//                   </motion.button>
//                 ))}
//               </div>
//             </Card>

//             <Card>
//               <h3 className="text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider mb-4 flex items-center gap-2">
//                 <TrendingUp size={16} /> Daily Goals
//               </h3>
//               <div className="space-y-4">
//                 <div>
//                   <div className="flex justify-between text-xs mb-1">
//                     <span className="text-[#F9FAFB]">Reflection Goal (Words)</span>
//                     <span className="text-[#06B6D4] font-mono">{wordCount} / 500</span>
//                   </div>
//                   <div className="h-1.5 w-full bg-[#0F172A] rounded-full overflow-hidden">
//                     <motion.div 
//                       className="h-full bg-[#06B6D4]" 
//                       initial={{ width: 0 }}
//                       animate={{ width: `${Math.min((wordCount / 500) * 100, 100)}%` }}
//                       transition={{ duration: 0.5 }}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex justify-between text-xs mb-1">
//                     <span className="text-[#F9FAFB]">Current Streak</span>
//                     <span className="text-[#F59E0B] font-mono flex items-center gap-1"><Zap size={10} /> 12 Days</span>
//                   </div>
//                   <div className="h-1.5 w-full bg-[#0F172A] rounded-full overflow-hidden">
//                     <div className="h-full bg-[#F59E0B] w-3/4" />
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </div>

//         {/* SUMMARY STATS & ACHIEVEMENTS */}
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
//           {[
//             { label: 'Hours Focused', value: '6.5', icon: Clock, color: COLORS.cyan },
//             { label: 'Deep Work', value: '4.2', icon: Brain, color: COLORS.amber },
//             { label: 'Commits', value: '14', icon: Code, color: COLORS.green },
//             { label: 'XP Earned', value: '850', icon: Star, color: COLORS.orange },
//             { label: 'Modules', value: '2', icon: BookOpen, color: COLORS.red, hiddenOnMd: true }
//           ].map((stat, idx) => (
//             <motion.div 
//               key={stat.label}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ delay: idx * 0.1 }}
//               className={`bg-[#111827] border border-[#1F2937] p-5 rounded-2xl relative overflow-hidden group hover:border-[${stat.color}] transition-colors ${stat.hiddenOnMd ? 'hidden lg:block' : ''}`}
//             >
//               <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity`} style={{ color: stat.color }}>
//                 <stat.icon size={48} />
//               </div>
//               <p className="text-xs text-[#9CA3AF] mb-1 font-medium">{stat.label}</p>
//               <p className="text-2xl font-bold text-[#F9FAFB]"><AnimatedCounter value={stat.value} /></p>
//             </motion.div>
//           ))}
//         </div>

//         <div className="overflow-x-auto pb-4 hide-scrollbar">
//           <div className="flex gap-4 min-w-max">
//             {[
//               { text: 'Solved 2 Medium Problems', icon: CheckCircle2, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10' },
//               { text: 'Completed Feature Branch', icon: Code, color: 'text-[#06B6D4]', bg: 'bg-[#06B6D4]/10' },
//               { text: 'Fixed 3 Memory Leaks', icon: AlertCircle, color: 'text-[#EF4444]', bg: 'bg-[#EF4444]/10' },
//               { text: 'Finished AI Module', icon: BookOpen, color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10' }
//             ].map((achievement, idx) => (
//               <motion.div 
//                 key={idx}
//                 whileHover={{ scale: 1.02 }}
//                 className="flex items-center gap-3 bg-[#111827] border border-[#1F2937] rounded-xl py-3 px-4 pr-8"
//               >
//                 <div className={`p-2 rounded-lg ${achievement.bg}`}>
//                   <achievement.icon size={16} className={achievement.color} />
//                 </div>
//                 <span className="text-sm font-medium text-[#F9FAFB]">{achievement.text}</span>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* MIDDLE SECTION: TIMELINE & AI INSIGHTS */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
//           {/* MEMORY TIMELINE */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl font-bold flex items-center gap-2">
//                 <Layout className="text-[#06B6D4]" /> Memory Timeline
//               </h2>
//               <button className="text-sm text-[#9CA3AF] hover:text-[#F9FAFB] flex items-center gap-1">
//                 <Filter size={14} /> Filter
//               </button>
//             </div>
            
//             <div className="space-y-4">
//               {TIMELINE_EVENTS.map((event, idx) => (
//                 <motion.div 
//                   key={event.id}
//                   layout
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: idx * 0.1 }}
//                   className="relative pl-6 border-l-2 border-[#1F2937] ml-3"
//                 >
//                   <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#111827] border-2 border-[#06B6D4]" />
                  
//                   <Card className="hover:border-[#1F2937] cursor-pointer group" noPadding>
//                     <div 
//                       className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
//                       onClick={() => toggleTimeline(event.id)}
//                     >
//                       <div>
//                         <div className="flex items-center gap-3 mb-1">
//                           <span className="text-sm font-semibold text-[#F9FAFB]">{event.time}</span>
//                           <span className="text-xs px-2 py-0.5 rounded bg-[#0F172A] border border-[#1F2937] text-[#06B6D4]">{event.tech}</span>
//                         </div>
//                         <p className="text-sm text-[#9CA3AF]">{event.reflection}</p>
//                       </div>
//                       <div className="flex items-center gap-4 text-sm text-[#9CA3AF]">
//                         <span className="flex items-center gap-1"><Clock size={14} /> {event.duration}</span>
//                         <motion.div
//                           animate={{ rotate: expandedTimeline.includes(event.id) ? 180 : 0 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <ChevronDown size={16} />
//                         </motion.div>
//                       </div>
//                     </div>

//                     <AnimatePresence>
//                       {expandedTimeline.includes(event.id) && (
//                         <motion.div
//                           initial={{ height: 0, opacity: 0 }}
//                           animate={{ height: 'auto', opacity: 1 }}
//                           exit={{ height: 0, opacity: 0 }}
//                           className="overflow-hidden bg-[#0F172A]"
//                         >
//                           <div className="p-5 border-t border-[#1F2937] space-y-4 text-sm">
//                             <div>
//                               <h4 className="text-[#10B981] font-semibold mb-1 flex items-center gap-1"><CheckCircle2 size={14}/> Achievements</h4>
//                               <p className="text-[#F9FAFB]">{event.achievements}</p>
//                             </div>
//                             <div>
//                               <h4 className="text-[#F59E0B] font-semibold mb-1 flex items-center gap-1"><Lightbulb size={14}/> Lessons Learned</h4>
//                               <p className="text-[#F9FAFB]">{event.lessons}</p>
//                             </div>
//                             {event.mistakes !== 'None today.' && (
//                               <div>
//                                 <h4 className="text-[#EF4444] font-semibold mb-1 flex items-center gap-1"><AlertCircle size={14}/> Friction/Mistakes</h4>
//                                 <p className="text-[#F9FAFB]">{event.mistakes}</p>
//                               </div>
//                             )}
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* AI INSIGHTS & KNOWLEDGE TAGS */}
//           <div className="space-y-6">
            
//             {/* AI Insight Card */}
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.95 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               className="relative p-[1px] rounded-2xl overflow-hidden group"
//             >
//               <motion.div 
//                 animate={{ 
//                   background: [
//                     `linear-gradient(0deg, ${COLORS.bg}, ${COLORS.bg})`,
//                     `linear-gradient(180deg, ${COLORS.cyan}, ${COLORS.bg})`,
//                     `linear-gradient(360deg, ${COLORS.cyan}, ${COLORS.bg})`
//                   ]
//                 }}
//                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//                 className="absolute inset-0 opacity-50"
//               />
//               <div className="relative bg-[#111827] p-6 rounded-2xl border border-[#1F2937] h-full flex flex-col">
//                 <div className="flex items-center gap-2 mb-4 text-[#06B6D4]">
//                   <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
//                     <Sparkles size={18} />
//                   </motion.div>
//                   <span className="font-semibold text-sm">AI Reflection Insights</span>
//                 </div>
                
//                 <div className="space-y-4 flex-1">
//                   <div>
//                     <h4 className="text-xs text-[#9CA3AF] mb-1">Pattern Detected</h4>
//                     <p className="text-sm text-[#F9FAFB]">You've been consistently spending 3+ hours on React frontend work. Consider balancing with backend concepts to maintain MERN stack proficiency.</p>
//                   </div>
//                   <div>
//                     <h4 className="text-xs text-[#9CA3AF] mb-1">Tomorrow's Focus</h4>
//                     <p className="text-sm text-[#F9FAFB]">Review the security implications of the Dark Web outline you drafted today.</p>
//                   </div>
//                 </div>

//                 <div className="mt-6 pt-4 border-t border-[#1F2937]">
//                   <Quote size={14} className="text-[#F59E0B] mb-2" />
//                   <p className="text-xs text-[#9CA3AF] italic">"First, solve the problem. Then, write the code." - John Johnson</p>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Knowledge Tags */}
//             <Card>
//               <h3 className="text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider mb-4 flex items-center gap-2">
//                 <Brain size={16} /> Knowledge Network
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {KNOWLEDGE_TAGS.map((tag, i) => (
//                   <motion.span
//                     key={tag}
//                     whileHover={{ scale: 1.05, borderColor: COLORS.cyan, color: COLORS.textPrimary }}
//                     className="px-3 py-1 bg-[#0F172A] border border-[#1F2937] rounded-full text-xs text-[#9CA3AF] cursor-default transition-colors"
//                   >
//                     {tag}
//                   </motion.span>
//                 ))}
//               </div>
//             </Card>

//           </div>
//         </div>

//         {/* ANALYTICS SECTION */}
//         <div className="space-y-6">
//           <h2 className="text-xl font-bold flex items-center gap-2">
//             <Activity className="text-[#F59E0B]" /> Writing Analytics
//           </h2>
//           <Card className="p-0">
//             <div className="p-6 border-b border-[#1F2937] flex flex-col md:flex-row md:items-center justify-between gap-4">
//               <div>
//                 <p className="text-2xl font-bold text-[#F9FAFB]">4,070 <span className="text-sm font-normal text-[#9CA3AF]">words this week</span></p>
//                 <p className="text-xs text-[#10B981] flex items-center gap-1 mt-1"><TrendingUp size={12}/> +12% from last week</p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
//                   <span className="w-2 h-2 rounded-full bg-[#06B6D4]" /> Word Count
//                 </div>
//                 <div className="flex items-center gap-2 text-xs text-[#9CA3AF] ml-4">
//                   <span className="w-2 h-2 rounded-full bg-[#1F2937]" /> Focus Hours
//                 </div>
//               </div>
//             </div>
//             <div className="h-72 p-6">
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//                   <defs>
//                     <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor={COLORS.cyan} stopOpacity={0.3}/>
//                       <stop offset="95%" stopColor={COLORS.cyan} stopOpacity={0}/>
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} vertical={false} />
//                   <XAxis dataKey="day" stroke={COLORS.textSecondary} fontSize={12} tickLine={false} axisLine={false} />
//                   <YAxis stroke={COLORS.textSecondary} fontSize={12} tickLine={false} axisLine={false} />
//                   <Tooltip 
//                     contentStyle={{ backgroundColor: COLORS.card, borderColor: COLORS.border, borderRadius: '8px', color: COLORS.textPrimary }}
//                     itemStyle={{ color: COLORS.cyan }}
//                   />
//                   <Area type="monotone" dataKey="words" stroke={COLORS.cyan} strokeWidth={2} fillOpacity={1} fill="url(#colorWords)" />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </Card>
//         </div>

//         {/* RECENT JOURNALS (MASONRY LAYOUT) */}
//         <div className="space-y-6 mb-20">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-bold flex items-center gap-2">
//               <Calendar className="text-[#10B981]" /> Recent Journals
//             </h2>
//             <button className="text-sm text-[#06B6D4] hover:text-[#06B6D4]/80 font-medium">View All</button>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
//             {RECENT_JOURNALS.map((journal, idx) => (
//               <motion.div
//                 key={journal.id}
//                 layout
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: idx * 0.1 }}
//               >
//                 <Card className="hover:border-[#1F2937] transition-colors group h-full flex flex-col">
//                   <div className="flex items-center justify-between mb-4">
//                     <span className="text-sm font-semibold text-[#F9FAFB]">{journal.date}</span>
//                     <span className="text-2xl filter drop-shadow">{journal.mood}</span>
//                   </div>
                  
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {journal.tags.map(tag => (
//                       <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-0.5 rounded">
//                         {tag}
//                       </span>
//                     ))}
//                   </div>

//                   <p className="text-sm text-[#9CA3AF] mb-4 flex-1 leading-relaxed">
//                     "{journal.summary}"
//                   </p>
                  
//                   <div className="flex items-center justify-between text-xs text-[#9CA3AF] pt-4 border-t border-[#1F2937]">
//                     <span className="flex items-center gap-1 font-mono"><Clock size={12} /> {journal.duration}</span>
//                     <span className="font-mono">{journal.tech}</span>
//                   </div>
                  
//                   <AnimatePresence>
//                     {expandedJournals.includes(journal.id) && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: 'auto', opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         className="overflow-hidden text-sm text-[#F9FAFB] mt-4 pt-4 border-t border-[#1F2937]/50 border-dashed"
//                       >
//                         <p>Detailed reflection data goes here. This would typically render the full markdown content of the past journal entry, including code snippets, architectural thoughts, and personal growth metrics tracked on that specific day.</p>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>

//                   <button 
//                     onClick={() => toggleJournal(journal.id)}
//                     className="mt-4 w-full py-2 bg-[#0F172A] hover:bg-[#1F2937] text-[#F9FAFB] text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
//                   >
//                     {expandedJournals.includes(journal.id) ? (
//                       <><EyeOff size={14} /> Collapse</>
//                     ) : (
//                       <><Eye size={14} /> View Full Entry</>
//                     )}
//                   </button>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//       </main>
//     </div>
//   );
// }

// // Dummy Icon Component for missing Lucide icon
// function Lightbulb(props) {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} {...props}>
//       <line x1="9" y1="18" x2="15" y2="18"></line>
//       <line x1="10" y1="22" x2="14" y2="22"></line>
//       <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
//     </svg>
//   )
// }




/// this is v2 of journal jpage 


import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Focus, Search, Share2, Download, Heart, 
  Archive, ChevronDown, ChevronUp, CheckCircle, Zap, Star, 
  Clock, Trophy, Target, ArrowRight, Activity, Sparkles, Brain, 
  Plus, Mic, X, BarChart2, BookOpen
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

// --- MOCK DATA ---
const MOCK_ANALYTICS = [
  { name: 'Mon', words: 400, focus: 2 },
  { name: 'Tue', words: 300, focus: 1.5 },
  { name: 'Wed', words: 650, focus: 3 },
  { name: 'Thu', words: 500, focus: 2.5 },
  { name: 'Fri', words: 800, focus: 4 },
  { name: 'Sat', words: 200, focus: 1 },
  { name: 'Sun', words: 900, focus: 5 },
];

const MOCK_ACHIEVEMENTS = [
  { id: 1, title: 'Solved 3 LeetCode Hard', icon: <Zap size={18} className="text-[#F59E0B]" /> },
  { id: 2, title: 'Shipped User Auth', icon: <CheckCircle size={18} className="text-[#10B981]" /> },
  { id: 3, title: 'Fixed Memory Leak', icon: <Activity size={18} className="text-[#EF4444]" /> },
  { id: 4, title: 'Completed GraphQL Module', icon: <BookOpen size={18} className="text-[#06B6D4]" /> },
  { id: 5, title: '7-Day Streak Maintained', icon: <Star size={18} className="text-[#F97316]" /> },
];

const MOCK_TIMELINE = [
  {
    id: 1,
    time: 'Morning',
    tech: 'React & Vite',
    duration: '2.5 hrs',
    reflection: 'Struggled with Framer Motion layout animations initially, but understanding AnimatePresence fixed the unmounting issues.',
    lessons: 'Always wrap conditional components in AnimatePresence.',
    mistakes: 'Forgot to add unique keys to mapped items.',
    achievements: 'Created a flawless staggered layout.'
  },
  {
    id: 2,
    time: 'Afternoon',
    tech: 'Node.js & MongoDB',
    duration: '3 hrs',
    reflection: 'Deep dive into aggregate pipelines. Managed to optimize a slow query by 400ms.',
    lessons: '$match should always precede $lookup for performance.',
    mistakes: 'Accidentally pushed .env to a local branch (caught before remote).',
    achievements: 'Query optimization complete.'
  },
  {
    id: 3,
    time: 'Evening',
    tech: 'System Design',
    duration: '1.5 hrs',
    reflection: 'Read about distributed caching architectures. Redis cluster setup looks complex but necessary for scale.',
    lessons: 'Cache invalidation is still the hardest problem.',
    mistakes: 'None today.',
    achievements: 'Finished chapter 4 of DDIA.'
  },
  {
    id: 4,
    time: 'Night',
    tech: 'Algorithm Practice',
    duration: '1 hr',
    reflection: 'Solved a dynamic programming problem that previously stumped me. The state transition finally clicked.',
    lessons: 'Memoization top-down is often more intuitive than bottom-up tabulation.',
    mistakes: 'Off-by-one error in array bounds.',
    achievements: 'Accepted solution on first submit.'
  }
];

const MOCK_JOURNALS = [
  {
    id: 1,
    date: 'Oct 24, 2025',
    mood: '🔥',
    tags: ['React', 'Performance'],
    tech: 'React 18',
    summary: 'Refactored the dashboard using useMemo and useCallback. Dropped render times by 30%. Incredible day for performance gains.',
    duration: '4h 15m'
  },
  {
    id: 2,
    date: 'Oct 23, 2025',
    mood: '😓',
    tags: ['Debugging', 'AWS'],
    tech: 'AWS S3, IAM',
    summary: 'Spent 6 hours debugging an IAM permissions issue for S3 bucket uploads. Found out it was a missing wildcard in the ARN.',
    duration: '6h 00m'
  },
  {
    id: 3,
    date: 'Oct 22, 2025',
    mood: '😀',
    tags: ['Learning', 'System Design'],
    tech: 'Kafka',
    summary: 'Built a small event-driven microservice prototype using Kafka and Node.js. Event sourcing is a fascinating pattern.',
    duration: '3h 30m'
  },
  {
    id: 4,
    date: 'Oct 21, 2025',
    mood: '🙂',
    tags: ['UI/UX', 'Tailwind'],
    tech: 'Tailwind CSS',
    summary: 'Created a new dark mode theme for the internal tool. The new color palette feels much more premium.',
    duration: '2h 45m'
  }
];

const KNOWLEDGE_TAGS = ['React', 'Node.js', 'JavaScript', 'MongoDB', 'Express', 'Next.js', 'System Design', 'TypeScript', 'DSA', 'Tailwind', 'GraphQL', 'Docker'];
const MOODS = ['😀', '🙂', '😐', '😓', '🔥'];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

const scaleVariants = {
  hover: { scale: 1.05, transition: { type: 'spring', stiffness: 400, damping: 10 } },
  tap: { scale: 0.95 }
};

// --- COMPONENTS ---

const BackgroundEffects = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[#0B1120]">
      {/* Ambient Lighting */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-[10%] w-[40%] h-[40vh] rounded-full bg-[#F59E0B] blur-[150px]"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50vh] rounded-full bg-[#06B6D4] blur-[150px]"
      />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: ['-10vh', '110vh'],
            x: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
            opacity: [0, 0.5, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
          className="absolute top-0 w-1 h-1 bg-[#F9FAFB] rounded-full opacity-20"
          style={{ left: `${Math.random() * 100}%` }}
        />
      ))}

      {/* Floating Code Snippets */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[15%] font-mono text-xs text-[#06B6D4] select-none"
      >
        {`const reflect = (day) => {\n  return growth;\n}`}
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[30%] left-[10%] font-mono text-xs text-[#F59E0B] select-none"
      >
        {`await commit(changes);\n// Keep pushing`}
      </motion.div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative z-10 pt-16 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center"
    >
      <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-[#111827] border border-[#1F2937] px-4 py-2 rounded-full mb-8 shadow-sm">
        <Sparkles size={16} className="text-[#F59E0B]" />
        <span className="text-[#9CA3AF] text-sm font-medium tracking-wide">CODESPARK EDITORIAL WORKSPACE</span>
      </motion.div>
      
      <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#F9FAFB] tracking-tight mb-4 leading-tight">
        Every Great Developer <br className="hidden md:block"/> Has A Story.
      </motion.h1>
      
      <motion.div variants={itemVariants} className="relative inline-block mb-6">
        <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#10B981]">
          Write Yours.
        </h2>
        <motion.div 
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute -right-5 md:-right-6 bottom-1 w-3 md:w-4 h-8 md:h-10 bg-[#06B6D4]"
        />
      </motion.div>

      <motion.p variants={itemVariants} className="text-base md:text-lg text-[#9CA3AF] max-w-2xl mx-auto mt-6">
        A premium digital journal designed specifically for software engineers to reflect, document breakthroughs, track daily growth, and cultivate engineering excellence.
      </motion.p>
    </motion.section>
  );
};

const PremiumEditor = () => {
  const [text, setText] = useState('');
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const textareaRef = useRef(null);

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const chars = text.length;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(200, textareaRef.current.scrollHeight)}px`;
    }
  }, [text]);

  // Autosave simulation
  useEffect(() => {
    if (text.length > 0) {
      setIsSaving(true);
      const timer = setTimeout(() => {
        setIsSaving(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [text]);

  const EditorContent = (
    <motion.div 
      layout
      className={`relative flex flex-col w-full mx-auto transition-all duration-500 ease-out ${
        isFocusMode 
          ? 'max-w-4xl h-full justify-center p-8' 
          : 'bg-[#111827] border border-[#1F2937] rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden group'
      }`}
    >
      {!isFocusMode && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F2937]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}

      {/* Editor Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 z-10 space-y-4 md:space-y-0">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex bg-[#0F172A] border border-[#1F2937] rounded-full p-1">
            {MOODS.map((mood, idx) => (
              <motion.button
                key={idx}
                whileHover="hover"
                whileTap="tap"
                variants={scaleVariants}
                onClick={() => setSelectedMood(mood)}
                className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full text-lg md:text-xl transition-colors ${
                  selectedMood === mood ? 'bg-[#1F2937] shadow-inner' : 'hover:bg-[#111827]'
                }`}
              >
                {mood}
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {isSaving ? (
              <motion.div 
                key="saving"
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0 }}
                className="flex items-center text-xs text-[#9CA3AF]"
              >
                <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse mr-2" />
                Saving...
              </motion.div>
            ) : text.length > 0 ? (
              <motion.div 
                key="saved"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="flex items-center text-xs text-[#9CA3AF]"
              >
                <CheckCircle size={12} className="mr-1 text-[#10B981]" /> Saved
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        
        <div className="flex items-center space-x-4 text-xs md:text-sm text-[#9CA3AF]">
          <span>{words} Words</span>
          <span className="hidden md:inline">{chars} Characters</span>
          <button 
            onClick={() => setIsFocusMode(!isFocusMode)}
            className={`p-2 rounded-lg transition-all ${isFocusMode ? 'bg-[#F59E0B]/20 text-[#F59E0B]' : 'hover:bg-[#1F2937] text-[#9CA3AF]'}`}
            title="Focus Mode"
          >
            {isFocusMode ? <X size={18} /> : <Focus size={18} />}
          </button>
        </div>
      </div>

      {/* Text Area */}
      <div className="relative z-10 w-full flex-grow">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What did you build, break, or learn today?..."
          className={`w-full bg-transparent text-[#F9FAFB] placeholder-[#9CA3AF]/50 focus:outline-none resize-none overflow-hidden transition-all duration-300 ${
            isFocusMode ? 'text-xl md:text-2xl leading-relaxed min-h-[50vh]' : 'text-base md:text-lg leading-relaxed min-h-[200px]'
          }`}
          spellCheck="false"
        />
      </div>
    </motion.div>
  );

  return (
    <>
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 relative z-10 mt-8 mb-20">
        {EditorContent}
      </div>

      {/* Focus Mode Overlay */}
      <AnimatePresence>
        {isFocusMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0B1120] overflow-y-auto flex items-center justify-center"
          >
            <div className="absolute top-6 right-6 flex items-center space-x-4">
               <span className="text-[#9CA3AF] text-sm">{words} words</span>
               <button 
                  onClick={() => setIsFocusMode(false)}
                  className="bg-[#1F2937] hover:bg-[#111827] text-[#F9FAFB] border border-[#1F2937] px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                  <X size={16} className="mr-2" /> Exit Focus
                </button>
            </div>
            {EditorContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 relative overflow-hidden group shadow-sm"
  >
    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity`} />
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-[#9CA3AF] font-medium text-sm">{title}</h3>
      {icon}
    </div>
    <div className="text-3xl font-bold text-[#F9FAFB]">{value}</div>
  </motion.div>
);

const SummarySection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mb-20 relative z-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#F9FAFB] flex items-center">
          <Activity className="mr-3 text-[#06B6D4]" size={24} /> Today's Telemetry
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Hours Focused" value="6.5" icon={<Clock className="text-[#06B6D4]" size={20} />} color="from-[#06B6D4] to-transparent" />
        <StatCard title="Deep Work" value="4.2h" icon={<Brain className="text-[#F59E0B]" size={20} />} color="from-[#F59E0B] to-transparent" />
        <StatCard title="Learning" value="1.5h" icon={<BookOpen className="text-[#10B981]" size={20} />} color="from-[#10B981] to-transparent" />
        <StatCard title="Commits" value="12" icon={<Terminal className="text-[#F97316]" size={20} />} color="from-[#F97316] to-transparent" />
        <StatCard title="XP Earned" value="+450" icon={<Trophy className="text-[#EF4444]" size={20} />} color="from-[#EF4444] to-transparent" />
      </div>

      {/* Horizontal Sliding Achievements */}
      <div className="mt-8 flex overflow-x-auto space-x-4 pb-4 hide-scrollbar">
        {MOCK_ACHIEVEMENTS.map((ach) => (
          <motion.div 
            key={ach.id}
            whileHover={{ scale: 1.02 }}
            className="flex-shrink-0 bg-[#0F172A] border border-[#1F2937] rounded-xl px-4 py-3 flex items-center space-x-3 cursor-default"
          >
            {ach.icon}
            <span className="text-[#F9FAFB] text-sm font-medium whitespace-nowrap">{ach.title}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const InsightsSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mb-20 relative z-10">
      <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-1 relative overflow-hidden shadow-lg">
        {/* Animated border effect container */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] via-[#F59E0B] to-[#10B981] opacity-20 animate-pulse" />
        
        <div className="relative bg-[#0B1120] rounded-[22px] p-6 md:p-10 h-full flex flex-col lg:flex-row gap-10">
          <div className="lg:w-1/3 lg:border-r border-[#1F2937] lg:pr-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#0F172A] border border-[#1F2937] flex items-center justify-center">
                <Brain className="text-[#06B6D4]" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#F9FAFB]">Reflection AI</h2>
                <p className="text-xs text-[#9CA3AF]">Synthesized Insights</p>
              </div>
            </div>
            <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6">
              Based on today's inputs, you've optimized performance significantly but faced hurdles with IAM roles. Maintain focus on AWS configuration patterns tomorrow.
            </p>
            <div className="bg-[#0F172A] p-4 rounded-xl border border-[#1F2937]">
              <p className="text-[#F9FAFB] text-sm italic">"First, solve the problem. Then, write the code."</p>
              <p className="text-[#9CA3AF] text-xs mt-2">— John Johnson</p>
            </div>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#111827] rounded-xl p-5 border border-[#1F2937]">
              <h3 className="text-[#10B981] font-semibold flex items-center text-sm mb-3">
                <CheckCircle size={16} className="mr-2" /> Today's Wins
              </h3>
              <ul className="text-[#9CA3AF] text-sm space-y-2">
                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>Render time reduced by 30%</span></li>
                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>Kafka microservice prototype running</span></li>
              </ul>
            </div>
            <div className="bg-[#111827] rounded-xl p-5 border border-[#1F2937]">
              <h3 className="text-[#EF4444] font-semibold flex items-center text-sm mb-3">
                <Target size={16} className="mr-2" /> Challenges
              </h3>
              <ul className="text-[#9CA3AF] text-sm space-y-2">
                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>S3 IAM permission wildcard missing</span></li>
                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>Context switching during debugging</span></li>
              </ul>
            </div>
            <div className="bg-[#111827] rounded-xl p-5 border border-[#1F2937]">
              <h3 className="text-[#F59E0B] font-semibold flex items-center text-sm mb-3">
                <Zap size={16} className="mr-2" /> Tomorrow's Focus
              </h3>
              <ul className="text-[#9CA3AF] text-sm space-y-2">
                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>Document IAM setup for team</span></li>
                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>Start GraphQL schema definitions</span></li>
              </ul>
            </div>
            <div className="bg-[#111827] rounded-xl p-5 border border-[#1F2937]">
              <h3 className="text-[#06B6D4] font-semibold flex items-center text-sm mb-3">
                <Sparkles size={16} className="mr-2" /> Improvement
              </h3>
              <ul className="text-[#9CA3AF] text-sm space-y-2">
                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>Use AWS Policy Simulator next time</span></li>
                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>Timeblock 2 hours for deep work</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative pl-8 mb-8 group">
      {/* Line & Node */}
      <div className="absolute left-[11px] top-0 bottom-[-32px] w-[2px] bg-[#1F2937] group-last:bg-transparent" />
      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#0F172A] border-2 border-[#06B6D4] flex items-center justify-center z-10">
        <div className="w-2 h-2 rounded-full bg-[#06B6D4]" />
      </div>

      <div 
        className="bg-[#111827] border border-[#1F2937] rounded-2xl p-4 md:p-5 cursor-pointer hover:border-[#06B6D4]/50 transition-colors shadow-sm"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-2 gap-2 sm:gap-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#F9FAFB] font-semibold">{item.time}</span>
            <span className="text-xs bg-[#0F172A] px-2 py-1 rounded-md border border-[#1F2937] text-[#06B6D4]">
              {item.tech}
            </span>
          </div>
          <div className="flex items-center text-[#9CA3AF] text-sm space-x-3">
            <span className="flex items-center"><Clock size={14} className="mr-1" /> {item.duration}</span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
        
        <p className="text-[#9CA3AF] text-sm leading-relaxed">{item.reflection}</p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-[#1F2937] grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-xs text-[#10B981] font-semibold uppercase tracking-wider mb-2">Lessons Learned</h4>
                  <p className="text-sm text-[#F9FAFB]">{item.lessons}</p>
                </div>
                <div>
                  <h4 className="text-xs text-[#EF4444] font-semibold uppercase tracking-wider mb-2">Mistakes</h4>
                  <p className="text-sm text-[#F9FAFB]">{item.mistakes}</p>
                </div>
                <div>
                  <h4 className="text-xs text-[#F59E0B] font-semibold uppercase tracking-wider mb-2">Achievements</h4>
                  <p className="text-sm text-[#F9FAFB]">{item.achievements}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const MemoryTimeline = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 md:px-6 mb-20 relative z-10">
      <h2 className="text-xl md:text-2xl font-bold text-[#F9FAFB] flex items-center mb-8 md:mb-10">
        <Clock className="mr-3 text-[#F59E0B]" size={24} /> Memory Timeline
      </h2>
      <div className="ml-2">
        {MOCK_TIMELINE.map(item => (
          <TimelineItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

const KnowledgeTags = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mb-20 relative z-10 text-center">
      <h2 className="text-lg md:text-xl font-bold text-[#F9FAFB] mb-6">Knowledge Graph</h2>
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {KNOWLEDGE_TAGS.map((tag, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5, scale: 1.05, backgroundColor: '#0F172A', borderColor: '#06B6D4' }}
            className="bg-[#111827] border border-[#1F2937] text-[#9CA3AF] px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium cursor-pointer transition-colors duration-300"
          >
            {tag}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const WritingAnalytics = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mb-20 relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#F9FAFB] flex items-center">
          <BarChart2 className="mr-3 text-[#10B981]" size={24} /> Productivity Trend
        </h2>
        <div className="flex self-start sm:self-auto space-x-2">
          <span className="px-3 py-1 bg-[#111827] border border-[#1F2937] rounded-lg text-xs text-[#9CA3AF]">This Week</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6">
          <div className="bg-[#111827] border border-[#1F2937] p-5 md:p-6 rounded-2xl shadow-sm">
            <h3 className="text-[#9CA3AF] text-sm mb-1">Words Written</h3>
            <p className="text-2xl md:text-3xl font-bold text-[#F9FAFB]">3,250</p>
            <p className="text-[#10B981] text-xs mt-2 flex items-center"><ArrowRight size={12} className="-rotate-45 mr-1" /> +12% vs last week</p>
          </div>
          <div className="bg-[#111827] border border-[#1F2937] p-5 md:p-6 rounded-2xl shadow-sm">
            <h3 className="text-[#9CA3AF] text-sm mb-1">Journal Streak</h3>
            <p className="text-2xl md:text-3xl font-bold text-[#F9FAFB]">14 Days</p>
            <p className="text-[#F59E0B] text-xs mt-2 flex items-center"><Star size={12} className="mr-1" /> Best: 32 Days</p>
          </div>
          <div className="bg-[#111827] border border-[#1F2937] p-5 md:p-6 rounded-2xl shadow-sm">
            <h3 className="text-[#9CA3AF] text-sm mb-1">Avg Reflection</h3>
            <p className="text-2xl md:text-3xl font-bold text-[#F9FAFB]">15m</p>
            <p className="text-[#06B6D4] text-xs mt-2 flex items-center"><Clock size={12} className="mr-1" /> Per Entry</p>
          </div>
        </div>
        
        <div className="lg:col-span-3 bg-[#111827] border border-[#1F2937] p-5 md:p-6 rounded-2xl h-[350px] md:h-[400px] shadow-sm">
          <h3 className="text-[#F9FAFB] font-medium mb-6">Output Analytics</h3>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={MOCK_ANALYTICS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
              <XAxis dataKey="name" stroke="#9CA3AF" tick={{fill: '#9CA3AF', fontSize: 12}} axisLine={false} tickLine={false} />
              <YAxis stroke="#9CA3AF" tick={{fill: '#9CA3AF', fontSize: 12}} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0B1120', borderColor: '#1F2937', color: '#F9FAFB', borderRadius: '8px' }}
                itemStyle={{ color: '#06B6D4' }}
              />
              <Area type="monotone" dataKey="words" stroke="#06B6D4" strokeWidth={2} fillOpacity={1} fill="url(#colorWords)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

const JournalCard = ({ journal }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5 break-inside-avoid mb-6 hover:border-[#F59E0B]/50 transition-colors shadow-sm"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[#9CA3AF] text-xs font-medium bg-[#0F172A] px-2 py-1 rounded-md border border-[#1F2937]">
            {journal.date}
          </span>
          <h3 className="text-[#F9FAFB] font-semibold mt-3 text-base md:text-lg">{journal.tech}</h3>
        </div>
        <div className="text-xl md:text-2xl bg-[#0F172A] w-10 h-10 rounded-full flex items-center justify-center border border-[#1F2937]">
          {journal.mood}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {journal.tags.map((tag, i) => (
          <span key={i} className="text-[10px] md:text-xs text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-1 rounded-full">
            #{tag}
          </span>
        ))}
      </div>

      <motion.div layout className="relative">
        <p className={`text-[#9CA3AF] text-sm leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}>
          {journal.summary}
        </p>
      </motion.div>

      <div className="mt-5 flex items-center justify-between border-t border-[#1F2937] pt-4">
        <span className="text-[#9CA3AF] text-xs flex items-center"><Clock size={12} className="mr-1"/> {journal.duration}</span>
        <button 
          onClick={() => setExpanded(!expanded)}
          className="text-[#F59E0B] text-xs font-medium flex items-center hover:text-[#F97316] transition-colors"
        >
          {expanded ? 'Collapse' : 'View More'} 
          {expanded ? <ChevronUp size={14} className="ml-1"/> : <ChevronDown size={14} className="ml-1"/>}
        </button>
      </div>
    </motion.div>
  );
};

const RecentJournals = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 pb-32 relative z-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#F9FAFB] flex items-center">
          <Archive className="mr-3 text-[#9CA3AF]" size={24} /> Archive
        </h2>
        
        {/* Filters Mock */}
        <div className="hidden md:flex space-x-3">
          {['Mood', 'Technology', 'Tags', 'Month'].map((filter, i) => (
            <button key={i} className="bg-[#111827] border border-[#1F2937] text-[#9CA3AF] text-sm px-4 py-2 rounded-lg flex items-center hover:bg-[#0F172A] transition-colors">
              {filter} <ChevronDown size={14} className="ml-2" />
            </button>
          ))}
        </div>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {MOCK_JOURNALS.map(journal => (
          <JournalCard key={journal.id} journal={journal} />
        ))}
      </div>
    </section>
  );
};

const FloatingDock = ({ onActionClick }) => {
  const actions = [
    { id: 'new', icon: <Plus size={18} />, label: 'New', color: 'text-[#10B981]' },
    { id: 'voice', icon: <Mic size={18} />, label: 'Voice', color: 'text-[#06B6D4]' },
    { id: 'search', icon: <Search size={18} />, label: 'Search (⌘K)', color: 'text-[#F9FAFB]' },
    { id: 'export', icon: <Download size={18} />, label: 'Export PDF', color: 'text-[#F59E0B]' },
    { id: 'share', icon: <Share2 size={18} />, label: 'Share', color: 'text-[#F97316]' },
    { id: 'fav', icon: <Heart size={18} />, label: 'Favorite', color: 'text-[#EF4444]' },
  ];

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.5 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 flex items-center bg-[#111827]/90 backdrop-blur-xl border border-[#1F2937] p-2 rounded-2xl shadow-2xl space-x-1 md:space-x-2"
    >
      {actions.map((action) => (
        <motion.button
          key={action.id}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onActionClick(action.id)}
          className={`p-2.5 md:p-3 rounded-xl bg-[#0F172A] hover:bg-[#1F2937] transition-colors relative group ${action.color}`}
        >
          {action.icon}
          
          {/* Tooltip */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#0B1120] border border-[#1F2937] text-[#F9FAFB] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden md:block">
            {action.label}
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
};

const SearchOverlay = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#0B1120]/80 backdrop-blur-md flex items-start justify-center pt-[15vh] px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-[#111827] border border-[#1F2937] rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center px-4 py-4 border-b border-[#1F2937]">
              <Search className="text-[#9CA3AF] mr-3" size={20} />
              <input 
                autoFocus
                type="text" 
                placeholder="Search reflections, tags, or code snippets..." 
                className="w-full bg-transparent text-[#F9FAFB] focus:outline-none text-base md:text-lg placeholder-[#9CA3AF]/50"
              />
              <span className="text-[#9CA3AF] text-xs bg-[#0F172A] px-2 py-1 rounded border border-[#1F2937] ml-2 hidden sm:block">ESC</span>
            </div>
            <div className="p-4 bg-[#0B1120] text-center text-[#9CA3AF] text-sm py-12">
              Start typing to search across all journals...
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ActionModal = ({ isOpen, onClose, title, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#0B1120]/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl"
          >
            <div className="w-12 h-12 bg-[#0F172A] border border-[#1F2937] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={24} className="text-[#10B981]" />
            </div>
            <h3 className="text-lg font-bold text-[#F9FAFB] mb-2">{title}</h3>
            <p className="text-[#9CA3AF] text-sm mb-6">{message}</p>
            <button 
              onClick={onClose}
              className="w-full bg-[#1F2937] hover:bg-[#374151] text-[#F9FAFB] py-2 rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function Journal() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, title: '', message: '' });

  // Handle Ctrl+K shortcut for search (available on the page level)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleActionClick = (actionId) => {
    switch (actionId) {
      case 'new':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'search':
        setIsSearchOpen(true);
        break;
      case 'voice':
        setModalState({ isOpen: true, title: 'Voice Note Enabled', message: 'Recording started. Speak your thoughts...' });
        break;
      case 'export':
        setModalState({ isOpen: true, title: 'Exporting PDF', message: 'Your journal is being generated as a beautiful PDF.' });
        break;
      case 'share':
        setModalState({ isOpen: true, title: 'Share Link Created', message: 'A secure link to this reflection has been copied to your clipboard.' });
        break;
      case 'fav':
        setModalState({ isOpen: true, title: 'Saved to Favorites', message: 'This entry has been pinned to your highlights.' });
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative w-full bg-[#0B1120] text-[#F9FAFB] font-sans selection:bg-[#06B6D4]/30 overflow-hidden">
      <BackgroundEffects />
      
      {/* Page Content strictly contained within the Router Outlet boundary */}
      <main className="relative z-10 pt-8 md:pt-12">
        <HeroSection />
        <PremiumEditor />
        <SummarySection />
        <InsightsSection />
        <MemoryTimeline />
        <KnowledgeTags />
        <WritingAnalytics />
        <RecentJournals />
      </main>

      <FloatingDock onActionClick={handleActionClick} />
      
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <ActionModal 
        isOpen={modalState.isOpen} 
        onClose={() => setModalState({ ...modalState, isOpen: false })} 
        title={modalState.title}
        message={modalState.message}
      />
    </div>
  );
}