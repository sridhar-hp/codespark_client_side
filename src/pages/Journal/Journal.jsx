import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  BookOpen, Terminal, Code, Zap, Star, Brain, Clock, ChevronDown,
  CheckCircle2, Search, X, Share2, Download, Archive, Edit3, MessageSquare,
  Command, Mic, Maximize2, Minimize2, Activity, Target, Sparkles, Filter,
  TrendingUp, Layout, Calendar, AlertCircle, Quote, ChevronRight, Hash, Eye, EyeOff
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell
} from 'recharts';

// --- DESIGN SYSTEM & CONSTANTS ---
const COLORS = {
  bg: '#0B1120',
  card: '#111827',
  surface: '#0F172A',
  border: '#1F2937',
  textPrimary: '#F9FAFB',
  textSecondary: '#9CA3AF',
  amber: '#F59E0B',
  orange: '#F97316',
  cyan: '#06B6D4',
  green: '#10B981',
  red: '#EF4444'
};

const MOODS = [
  { emoji: '😀', label: 'Great', color: COLORS.green },
  { emoji: '🙂', label: 'Good', color: COLORS.cyan },
  { emoji: '😐', label: 'Okay', color: COLORS.amber },
  { emoji: '😓', label: 'Stressed', color: COLORS.orange },
  { emoji: '🔥', label: 'Flow State', color: COLORS.red }
];

const KNOWLEDGE_TAGS = [
  'React', 'Node.js', 'Vite', 'Tailwind CSS', 'MongoDB', 
  'System Design', 'DSA', 'AI Agents', 'MERN Stack', 'Cybersecurity'
];

const ANALYTICS_DATA = [
  { day: 'Mon', words: 450, focus: 4 },
  { day: 'Tue', words: 620, focus: 5 },
  { day: 'Wed', words: 300, focus: 3 },
  { day: 'Thu', words: 800, focus: 6 },
  { day: 'Fri', words: 550, focus: 4 },
  { day: 'Sat', words: 900, focus: 7 },
  { day: 'Sun', words: 750, focus: 5 }
];

const TIMELINE_EVENTS = [
  {
    id: 1,
    time: 'Morning',
    tech: 'DSA / LeetCode',
    duration: '2h 15m',
    reflection: 'Focused on optimizing sliding window algorithms.',
    lessons: 'Always check edge cases for empty arrays before iterating.',
    mistakes: 'Initially used O(n^2) approach before realizing a hash map works in O(n).',
    achievements: 'Solved 2 Mediums.'
  },
  {
    id: 2,
    time: 'Afternoon',
    tech: 'React / Tailwind',
    duration: '3h 45m',
    reflection: 'Built out the sliding panel animations for the Leave Management System dashboard.',
    lessons: 'Framer Motion AnimatePresence requires keys on direct children to work smoothly.',
    mistakes: 'Forgot to clean up event listeners in useEffect causing a memory leak.',
    achievements: 'Completed feature branch and merged to dev.'
  },
  {
    id: 3,
    time: 'Evening',
    tech: 'Python / AI',
    duration: '1h 30m',
    reflection: 'Worked through the AI Agents intensive module.',
    lessons: 'Multi-agent systems require strict state management to prevent circular loops.',
    mistakes: 'None today.',
    achievements: 'Deployed custom tool on Kaggle environment.'
  },
  {
    id: 4,
    time: 'Night',
    tech: 'Cybersecurity',
    duration: '1h 00m',
    reflection: 'Drafted educational presentation structure on Dark Web awareness for students.',
    lessons: 'Analogies work best when explaining complex onion routing to beginners.',
    mistakes: 'Got sidetracked reading obscure RFCs.',
    achievements: 'Outline completed.'
  }
];

const RECENT_JOURNALS = [
  {
    id: 1,
    date: 'Today',
    mood: '🔥',
    tags: ['React', 'MERN Stack'],
    tech: 'Vite, Tailwind',
    summary: 'Crushed the dashboard layout. Flow state achieved early.',
    duration: '6h 30m'
  },
  {
    id: 2,
    date: 'Yesterday',
    mood: '🙂',
    tags: ['DSA', 'System Design'],
    tech: 'JavaScript',
    summary: 'Struggled slightly with dynamic programming concepts but made progress.',
    duration: '4h 15m'
  },
  {
    id: 3,
    date: 'Oct 28',
    mood: '😀',
    tags: ['AI Agents', 'Python'],
    tech: 'Kaggle',
    summary: 'Fascinating dive into autonomous multi-agent pipelines.',
    duration: '5h 00m'
  }
];

// --- HELPER COMPONENTS ---

const Card = ({ children, className = '', noPadding = false, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden shadow-lg ${!noPadding && 'p-6'} ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

const AnimatedCounter = ({ value, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;
    
    const duration = 1500;
    const incrementTime = (duration / end);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value]);

  return <span>{prefix}{count}{suffix}</span>;
};

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1120]/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111827] border border-[#1F2937] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative"
          >
            <div className="flex items-center justify-between p-4 border-b border-[#1F2937]">
              <h3 className="text-lg font-semibold text-[#F9FAFB]">{title}</h3>
              <button onClick={onClose} className="p-1 text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors rounded-lg hover:bg-[#1F2937]">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- MAIN COMPONENT ---

export default function Journal() {
  // State
  const [journalText, setJournalText] = useState('');
  const [activeMood, setActiveMood] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [expandedTimeline, setExpandedTimeline] = useState([1]);
  const [expandedJournals, setExpandedJournals] = useState([]);
  
  // Modals
  const [searchOpen, setSearchOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [archiveSuccess, setArchiveSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Refs
  const editorRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setExportOpen(false);
        setShareOpen(false);
        if (focusMode) setFocusMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusMode]);

  // Auto-resize editor & Auto-save simulation
  const handleTextChange = (e) => {
    setJournalText(e.target.value);
    if (editorRef.current) {
      editorRef.current.style.height = 'auto';
      editorRef.current.style.height = editorRef.current.scrollHeight + 'px';
    }
    
    setIsSaving(true);
    const timeout = setTimeout(() => setIsSaving(false), 1000);
    return () => clearTimeout(timeout);
  };

  const wordCount = journalText.trim() === '' ? 0 : journalText.trim().split(/\s+/).length;
  const charCount = journalText.length;

  const toggleTimeline = (id) => {
    setExpandedTimeline(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleJournal = (id) => {
    setExpandedJournals(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleArchive = () => {
    setArchiveSuccess(true);
    setTimeout(() => setArchiveSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen  text-[#F9FAFB] font-sans selection:bg-[#06B6D4]/30">
      
      {/* SEARCH MODAL */}
      <Modal isOpen={searchOpen} onClose={() => setSearchOpen(false)} title="Search Journal">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-[#9CA3AF]" size={20} />
          <input 
            type="text" 
            autoFocus
            placeholder="Search entries, tags, technologies..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0F172A] border border-[#1F2937] text-[#F9FAFB] rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] transition-all"
          />
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Recent Searches</p>
          <button className="flex items-center gap-3 text-sm text-[#F9FAFB] hover:bg-[#1F2937] p-2 rounded-lg transition-colors text-left">
            <Clock size={16} className="text-[#9CA3AF]" /> System Design Patterns
          </button>
          <button className="flex items-center gap-3 text-sm text-[#F9FAFB] hover:bg-[#1F2937] p-2 rounded-lg transition-colors text-left">
            <Clock size={16} className="text-[#9CA3AF]" /> React Custom Hooks
          </button>
        </div>
      </Modal>

      {/* EXPORT MODAL */}
      <Modal isOpen={exportOpen} onClose={() => setExportOpen(false)} title="Export Journal">
        <div className="flex flex-col gap-4">
          <button className="w-full flex items-center justify-between p-4 rounded-xl border border-[#1F2937] hover:border-[#06B6D4] bg-[#0F172A] transition-colors group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#06B6D4]/10 rounded-lg text-[#06B6D4] group-hover:scale-110 transition-transform">
                <Download size={20} />
              </div>
              <div className="text-left">
                <p className="font-medium text-[#F9FAFB]">Export as PDF</p>
                <p className="text-xs text-[#9CA3AF]">Beautifully formatted document</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-[#9CA3AF]" />
          </button>
          <button className="w-full flex items-center justify-between p-4 rounded-xl border border-[#1F2937] hover:border-[#F59E0B] bg-[#0F172A] transition-colors group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#F59E0B]/10 rounded-lg text-[#F59E0B] group-hover:scale-110 transition-transform">
                <Code size={20} />
              </div>
              <div className="text-left">
                <p className="font-medium text-[#F9FAFB]">Export as Markdown</p>
                <p className="text-xs text-[#9CA3AF]">Raw text format</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-[#9CA3AF]" />
          </button>
        </div>
      </Modal>

      {/* SHARE MODAL */}
      <Modal isOpen={shareOpen} onClose={() => setShareOpen(false)} title="Share Reflection">
        <div className="space-y-4">
          <p className="text-sm text-[#9CA3AF]">Generate a public link to share your knowledge.</p>
          <div className="flex gap-2">
            <input 
              readOnly 
              value="https://codespark.dev/j/8f92a1" 
              className="flex-1 bg-[#0F172A] border border-[#1F2937] rounded-lg px-3 py-2 text-sm text-[#F9FAFB]"
            />
            <button className="bg-[#06B6D4] text-[#0B1120] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#06B6D4]/90 transition-colors">
              Copy
            </button>
          </div>
        </div>
      </Modal>

      {/* FLOATING ACTION DOCK */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
      >
        <div className="bg-[#111827]/80 backdrop-blur-xl border border-[#1F2937] p-2 rounded-2xl flex items-center gap-2 shadow-2xl">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="p-3 text-[#9CA3AF] hover:text-[#06B6D4] hover:bg-[#0F172A] rounded-xl transition-all group relative">
            <Edit3 size={20} className="group-hover:scale-110 transition-transform" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1F2937] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">New Entry</span>
          </button>
          <button onClick={() => setSearchOpen(true)} className="p-3 text-[#9CA3AF] hover:text-[#F59E0B] hover:bg-[#0F172A] rounded-xl transition-all group relative">
            <Search size={20} className="group-hover:scale-110 transition-transform" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1F2937] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Search (⌘K)</span>
          </button>
          <div className="w-px h-8 bg-[#1F2937] mx-1"></div>
          <button onClick={() => setExportOpen(true)} className="p-3 text-[#9CA3AF] hover:text-[#10B981] hover:bg-[#0F172A] rounded-xl transition-all group relative">
            <Download size={20} className="group-hover:scale-110 transition-transform" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1F2937] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Export</span>
          </button>
          <button onClick={() => setShareOpen(true)} className="p-3 text-[#9CA3AF] hover:text-[#F97316] hover:bg-[#0F172A] rounded-xl transition-all group relative">
            <Share2 size={20} className="group-hover:scale-110 transition-transform" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1F2937] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Share</span>
          </button>
          <button onClick={handleArchive} className={`p-3 rounded-xl transition-all group relative ${archiveSuccess ? 'text-[#10B981] bg-[#10B981]/10' : 'text-[#9CA3AF] hover:text-[#EF4444] hover:bg-[#0F172A]'}`}>
            {archiveSuccess ? <CheckCircle2 size={20} /> : <Archive size={20} className="group-hover:scale-110 transition-transform" />}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1F2937] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {archiveSuccess ? 'Archived' : 'Archive'}
            </span>
          </button>
        </div>
      </motion.div>

      {/* EPIC HERO SECTION */}
      <motion.section 
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative pt-32 pb-20 px-6 overflow-hidden flex flex-col items-center text-center border-b border-[#1F2937]"
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#06B6D4]/5 rounded-full blur-[100px]" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#F59E0B]/5 rounded-full blur-[100px]" />
          {/* Floating Particles Simulation */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#F9FAFB]/20 rounded-full"
              initial={{ x: Math.random() * window.innerWidth, y: Math.random() * 500 }}
              animate={{ 
                y: [null, Math.random() * 500],
                x: [null, Math.random() * window.innerWidth],
                opacity: [0.1, 0.5, 0.1] 
              }}
              transition={{ duration: 10 + Math.random() * 20, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#06B6D4] text-xs font-medium mb-4">
            <Sparkles size={14} /> Developer Reflection Workspace
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Every Great Developer <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#F59E0B]">
              Has A Story.
            </span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB]">Write Yours.</h2>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto font-light leading-relaxed">
            Document ideas, track growth, record achievements, and improve every day. 
            A premium editorial studio designed exclusively for software engineers.
          </p>
        </motion.div>
      </motion.section>

      {/* MAIN CONTENT GRID */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12 relative z-10">
        
        {/* TOP ROW: WRITING STUDIO & MOOD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* WRITING STUDIO */}
          <div className={`lg:col-span-2 transition-all duration-500 ${focusMode ? 'fixed inset-0 z-50 p-6 md:p-20 bg-[#0B1120]/95 backdrop-blur-xl overflow-y-auto' : ''}`}>
            <Card className={`h-full flex flex-col ${focusMode ? 'max-w-4xl mx-auto w-full min-h-[80vh] shadow-2xl border-[#06B6D4]/30' : ''}`}>
              <div className="flex items-center justify-between mb-4 border-b border-[#1F2937] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#06B6D4]/10 rounded-lg">
                    <Terminal size={20} className="text-[#06B6D4]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      Today's Journal
                      <span className="flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#10B981] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                      </span>
                    </h3>
                    <p className="text-xs text-[#9CA3AF]">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <AnimatePresence>
                    {isSaving && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1 text-xs text-[#9CA3AF]">
                        <Activity size={12} className="animate-spin text-[#06B6D4]" /> Saving...
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button 
                    onClick={() => setFocusMode(!focusMode)} 
                    className="p-2 hover:bg-[#1F2937] rounded-lg transition-colors text-[#9CA3AF] hover:text-[#F9FAFB] flex items-center gap-2 text-sm"
                  >
                    {focusMode ? <><Minimize2 size={16} /> Exit Focus</> : <><Maximize2 size={16} /> Focus Mode</>}
                  </button>
                </div>
              </div>

              <div className="flex-1 relative group cursor-text" onClick={() => editorRef.current?.focus()}>
                <textarea
                  ref={editorRef}
                  value={journalText}
                  onChange={handleTextChange}
                  placeholder="What did you build today? What bugs did you crush? Any new patterns learned?"
                  className="w-full bg-transparent resize-none outline-none text-[#F9FAFB] placeholder-[#9CA3AF]/50 text-lg leading-relaxed min-h-[200px]"
                />
              </div>

              <div className="mt-4 pt-4 border-t border-[#1F2937] flex items-center justify-between text-xs text-[#9CA3AF]">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><Hash size={12}/> Markdown Supported</span>
                </div>
                <div className="flex gap-4 font-mono">
                  <span>{wordCount} words</span>
                  <span>{charCount} chars</span>
                </div>
              </div>
            </Card>
          </div>

          {/* MOOD & GOALS */}
          <div className="space-y-8">
            <Card>
              <h3 className="text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Target size={16} /> State of Mind
              </h3>
              <div className="flex justify-between items-center gap-2">
                {MOODS.map((mood, idx) => (
                  <motion.button
                    key={mood.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveMood(mood.label)}
                    className={`flex flex-col items-center gap-2 p-2 rounded-xl transition-all relative ${
                      activeMood === mood.label ? 'bg-[#1F2937]' : 'hover:bg-[#1F2937]/50'
                    }`}
                  >
                    <span className="text-3xl filter drop-shadow-md">{mood.emoji}</span>
                    <span className="text-[10px] font-medium" style={{ color: activeMood === mood.label ? mood.color : '#9CA3AF' }}>
                      {mood.label}
                    </span>
                    {activeMood === mood.label && (
                      <motion.div layoutId="moodIndicator" className="absolute -bottom-1 w-1 h-1 rounded-full" style={{ backgroundColor: mood.color }} />
                    )}
                  </motion.button>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider mb-4 flex items-center gap-2">
                <TrendingUp size={16} /> Daily Goals
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#F9FAFB]">Reflection Goal (Words)</span>
                    <span className="text-[#06B6D4] font-mono">{wordCount} / 500</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#0F172A] rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-[#06B6D4]" 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((wordCount / 500) * 100, 100)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#F9FAFB]">Current Streak</span>
                    <span className="text-[#F59E0B] font-mono flex items-center gap-1"><Zap size={10} /> 12 Days</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#0F172A] rounded-full overflow-hidden">
                    <div className="h-full bg-[#F59E0B] w-3/4" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* SUMMARY STATS & ACHIEVEMENTS */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[
            { label: 'Hours Focused', value: '6.5', icon: Clock, color: COLORS.cyan },
            { label: 'Deep Work', value: '4.2', icon: Brain, color: COLORS.amber },
            { label: 'Commits', value: '14', icon: Code, color: COLORS.green },
            { label: 'XP Earned', value: '850', icon: Star, color: COLORS.orange },
            { label: 'Modules', value: '2', icon: BookOpen, color: COLORS.red, hiddenOnMd: true }
          ].map((stat, idx) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-[#111827] border border-[#1F2937] p-5 rounded-2xl relative overflow-hidden group hover:border-[${stat.color}] transition-colors ${stat.hiddenOnMd ? 'hidden lg:block' : ''}`}
            >
              <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity`} style={{ color: stat.color }}>
                <stat.icon size={48} />
              </div>
              <p className="text-xs text-[#9CA3AF] mb-1 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-[#F9FAFB]"><AnimatedCounter value={stat.value} /></p>
            </motion.div>
          ))}
        </div>

        <div className="overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex gap-4 min-w-max">
            {[
              { text: 'Solved 2 Medium Problems', icon: CheckCircle2, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10' },
              { text: 'Completed Feature Branch', icon: Code, color: 'text-[#06B6D4]', bg: 'bg-[#06B6D4]/10' },
              { text: 'Fixed 3 Memory Leaks', icon: AlertCircle, color: 'text-[#EF4444]', bg: 'bg-[#EF4444]/10' },
              { text: 'Finished AI Module', icon: BookOpen, color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10' }
            ].map((achievement, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 bg-[#111827] border border-[#1F2937] rounded-xl py-3 px-4 pr-8"
              >
                <div className={`p-2 rounded-lg ${achievement.bg}`}>
                  <achievement.icon size={16} className={achievement.color} />
                </div>
                <span className="text-sm font-medium text-[#F9FAFB]">{achievement.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MIDDLE SECTION: TIMELINE & AI INSIGHTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* MEMORY TIMELINE */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Layout className="text-[#06B6D4]" /> Memory Timeline
              </h2>
              <button className="text-sm text-[#9CA3AF] hover:text-[#F9FAFB] flex items-center gap-1">
                <Filter size={14} /> Filter
              </button>
            </div>
            
            <div className="space-y-4">
              {TIMELINE_EVENTS.map((event, idx) => (
                <motion.div 
                  key={event.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-6 border-l-2 border-[#1F2937] ml-3"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#111827] border-2 border-[#06B6D4]" />
                  
                  <Card className="hover:border-[#1F2937] cursor-pointer group" noPadding>
                    <div 
                      className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      onClick={() => toggleTimeline(event.id)}
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sm font-semibold text-[#F9FAFB]">{event.time}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-[#0F172A] border border-[#1F2937] text-[#06B6D4]">{event.tech}</span>
                        </div>
                        <p className="text-sm text-[#9CA3AF]">{event.reflection}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[#9CA3AF]">
                        <span className="flex items-center gap-1"><Clock size={14} /> {event.duration}</span>
                        <motion.div
                          animate={{ rotate: expandedTimeline.includes(event.id) ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedTimeline.includes(event.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-[#0F172A]"
                        >
                          <div className="p-5 border-t border-[#1F2937] space-y-4 text-sm">
                            <div>
                              <h4 className="text-[#10B981] font-semibold mb-1 flex items-center gap-1"><CheckCircle2 size={14}/> Achievements</h4>
                              <p className="text-[#F9FAFB]">{event.achievements}</p>
                            </div>
                            <div>
                              <h4 className="text-[#F59E0B] font-semibold mb-1 flex items-center gap-1"><Lightbulb size={14}/> Lessons Learned</h4>
                              <p className="text-[#F9FAFB]">{event.lessons}</p>
                            </div>
                            {event.mistakes !== 'None today.' && (
                              <div>
                                <h4 className="text-[#EF4444] font-semibold mb-1 flex items-center gap-1"><AlertCircle size={14}/> Friction/Mistakes</h4>
                                <p className="text-[#F9FAFB]">{event.mistakes}</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI INSIGHTS & KNOWLEDGE TAGS */}
          <div className="space-y-6">
            
            {/* AI Insight Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-[1px] rounded-2xl overflow-hidden group"
            >
              <motion.div 
                animate={{ 
                  background: [
                    `linear-gradient(0deg, ${COLORS.bg}, ${COLORS.bg})`,
                    `linear-gradient(180deg, ${COLORS.cyan}, ${COLORS.bg})`,
                    `linear-gradient(360deg, ${COLORS.cyan}, ${COLORS.bg})`
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-50"
              />
              <div className="relative bg-[#111827] p-6 rounded-2xl border border-[#1F2937] h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4 text-[#06B6D4]">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                    <Sparkles size={18} />
                  </motion.div>
                  <span className="font-semibold text-sm">AI Reflection Insights</span>
                </div>
                
                <div className="space-y-4 flex-1">
                  <div>
                    <h4 className="text-xs text-[#9CA3AF] mb-1">Pattern Detected</h4>
                    <p className="text-sm text-[#F9FAFB]">You've been consistently spending 3+ hours on React frontend work. Consider balancing with backend concepts to maintain MERN stack proficiency.</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-[#9CA3AF] mb-1">Tomorrow's Focus</h4>
                    <p className="text-sm text-[#F9FAFB]">Review the security implications of the Dark Web outline you drafted today.</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1F2937]">
                  <Quote size={14} className="text-[#F59E0B] mb-2" />
                  <p className="text-xs text-[#9CA3AF] italic">"First, solve the problem. Then, write the code." - John Johnson</p>
                </div>
              </div>
            </motion.div>

            {/* Knowledge Tags */}
            <Card>
              <h3 className="text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Brain size={16} /> Knowledge Network
              </h3>
              <div className="flex flex-wrap gap-2">
                {KNOWLEDGE_TAGS.map((tag, i) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.05, borderColor: COLORS.cyan, color: COLORS.textPrimary }}
                    className="px-3 py-1 bg-[#0F172A] border border-[#1F2937] rounded-full text-xs text-[#9CA3AF] cursor-default transition-colors"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </Card>

          </div>
        </div>

        {/* ANALYTICS SECTION */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Activity className="text-[#F59E0B]" /> Writing Analytics
          </h2>
          <Card className="p-0">
            <div className="p-6 border-b border-[#1F2937] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-2xl font-bold text-[#F9FAFB]">4,070 <span className="text-sm font-normal text-[#9CA3AF]">words this week</span></p>
                <p className="text-xs text-[#10B981] flex items-center gap-1 mt-1"><TrendingUp size={12}/> +12% from last week</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                  <span className="w-2 h-2 rounded-full bg-[#06B6D4]" /> Word Count
                </div>
                <div className="flex items-center gap-2 text-xs text-[#9CA3AF] ml-4">
                  <span className="w-2 h-2 rounded-full bg-[#1F2937]" /> Focus Hours
                </div>
              </div>
            </div>
            <div className="h-72 p-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.cyan} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={COLORS.cyan} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} vertical={false} />
                  <XAxis dataKey="day" stroke={COLORS.textSecondary} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={COLORS.textSecondary} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: COLORS.card, borderColor: COLORS.border, borderRadius: '8px', color: COLORS.textPrimary }}
                    itemStyle={{ color: COLORS.cyan }}
                  />
                  <Area type="monotone" dataKey="words" stroke={COLORS.cyan} strokeWidth={2} fillOpacity={1} fill="url(#colorWords)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* RECENT JOURNALS (MASONRY LAYOUT) */}
        <div className="space-y-6 mb-20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="text-[#10B981]" /> Recent Journals
            </h2>
            <button className="text-sm text-[#06B6D4] hover:text-[#06B6D4]/80 font-medium">View All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {RECENT_JOURNALS.map((journal, idx) => (
              <motion.div
                key={journal.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="hover:border-[#1F2937] transition-colors group h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-[#F9FAFB]">{journal.date}</span>
                    <span className="text-2xl filter drop-shadow">{journal.mood}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {journal.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-[#9CA3AF] mb-4 flex-1 leading-relaxed">
                    "{journal.summary}"
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-[#9CA3AF] pt-4 border-t border-[#1F2937]">
                    <span className="flex items-center gap-1 font-mono"><Clock size={12} /> {journal.duration}</span>
                    <span className="font-mono">{journal.tech}</span>
                  </div>
                  
                  <AnimatePresence>
                    {expandedJournals.includes(journal.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden text-sm text-[#F9FAFB] mt-4 pt-4 border-t border-[#1F2937]/50 border-dashed"
                      >
                        <p>Detailed reflection data goes here. This would typically render the full markdown content of the past journal entry, including code snippets, architectural thoughts, and personal growth metrics tracked on that specific day.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    onClick={() => toggleJournal(journal.id)}
                    className="mt-4 w-full py-2 bg-[#0F172A] hover:bg-[#1F2937] text-[#F9FAFB] text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {expandedJournals.includes(journal.id) ? (
                      <><EyeOff size={14} /> Collapse</>
                    ) : (
                      <><Eye size={14} /> View Full Entry</>
                    )}
                  </button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

// Dummy Icon Component for missing Lucide icon
function Lightbulb(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} {...props}>
      <line x1="9" y1="18" x2="15" y2="18"></line>
      <line x1="10" y1="22" x2="14" y2="22"></line>
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
    </svg>
  )
}