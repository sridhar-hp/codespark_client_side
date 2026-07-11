import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import {
  Trophy, Star, Shield, Lock, Search, Share2, Download, Maximize2, Minimize2,
  CheckCircle, Activity, Code, Layers, Layout, Globe, Target, Flame, BookOpen,
  Briefcase, Calendar, Hash, User, X, ChevronRight, Zap, Eye, Award, Code2, Database, Github
} from 'lucide-react';

// --- THEME CONSTANTS ---
const COLORS = {
  background: '#0B1120',
  cards: '#111827',
  surface: '#0F172A',
  border: '#1F2937',
  primaryText: '#F9FAFB',
  secondaryText: '#9CA3AF',
  amber: '#F59E0B',
  orange: '#F97316',
  cyan: '#06B6D4',
  green: '#10B981',
  red: '#EF4444'
};

const RARITY_COLORS = {
  Common: COLORS.secondaryText,
  Uncommon: COLORS.green,
  Rare: COLORS.cyan,
  Epic: COLORS.orange,
  Legendary: COLORS.amber,
  Mythic: COLORS.red
};

// --- MOCK DATA ---
const PASSPORT_DATA = {
  name: "Developer Passport",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CodeSpark&backgroundColor=0B1120",
  level: 42,
  rank: "Frontend Architect",
  totalXp: 124500,
  nextLevelXp: 150000,
  streak: 35,
  totalAchievements: 128,
  passportNumber: "CS-8492-X7",
  joinedSince: "2023",
  title: "Problem Solver"
};

const CATEGORIES = [
  { id: 'coding', label: 'Coding', icon: Code, unlocked: 45, total: 50, xp: 45000 },
  { id: 'leetcode', label: 'LeetCode', icon: Code2, unlocked: 100, total: 150, xp: 25000 },
  { id: 'learning', label: 'Learning', icon: BookOpen, unlocked: 20, total: 25, xp: 15000 },
  { id: 'career', label: 'Career', icon: Briefcase, unlocked: 5, total: 10, xp: 5000 },
  { id: 'projects', label: 'Projects', icon: Layout, unlocked: 12, total: 15, xp: 12000 }
];

const ACHIEVEMENTS = [
  { id: 1, title: "React Architect", description: "Built a complex UI with React, Vite, and Tailwind CSS.", xp: 5000, difficulty: "Hard", unlockedDate: "2025-11-10", progress: 100, category: "projects", rarity: "Epic", icon: Layout },
  { id: 2, title: "Algorithm Master", description: "Solved 100 Data Structure problems on LeetCode.", xp: 3000, difficulty: "Medium", unlockedDate: "2025-10-25", progress: 100, category: "leetcode", rarity: "Rare", icon: Code2 },
  { id: 3, title: "AI Agent Innovator", description: "Completed the 5-Day AI Agents Intensive Course.", xp: 10000, difficulty: "Extreme", unlockedDate: "2025-09-15", progress: 100, category: "learning", rarity: "Legendary", icon: Zap },
  { id: 4, title: "System Architect", description: "Designed and deployed a full-stack Leave Management System.", xp: 7500, difficulty: "Hard", unlockedDate: "2025-11-05", progress: 100, category: "projects", rarity: "Epic", icon: Database },
  { id: 5, title: "Open Source Contributor", description: "First merged pull request in a major open-source repository.", xp: 2000, difficulty: "Medium", unlockedDate: null, progress: 60, category: "coding", rarity: "Rare", icon: Github },
  { id: 6, title: "Consistency is Key", description: "Maintain a 50-day coding streak.", xp: 1500, difficulty: "Medium", unlockedDate: null, progress: 70, category: "coding", rarity: "Uncommon", icon: Flame },
];

const JOURNEY = [
  { id: 1, title: "First Commit", date: "Jan 2023", description: "Wrote the first lines of code in the CodeSpark ecosystem.", active: true },
  { id: 2, title: "Mastered React & Vite", date: "May 2024", description: "Built and deployed seamless, high-performance UIs.", active: true },
  { id: 3, title: "100 LeetCode Problems", date: "Oct 2025", description: "Conquered core Data Structures and Algorithms.", active: true },
  { id: 4, title: "Submitted MERN Application", date: "Nov 2025", description: "Applied for full-stack role at Across The Globe.", active: true },
  { id: 5, title: "Senior Developer", date: "Future", description: "Lead teams and architect enterprise systems.", active: false }
];

const XP_DATA = [
  { name: 'GitHub', value: 35000, color: COLORS.cyan },
  { name: 'LeetCode', value: 25000, color: COLORS.amber },
  { name: 'Learning', value: 15000, color: COLORS.green },
  { name: 'Projects', value: 20000, color: COLORS.orange },
  { name: 'Career', value: 5000, color: COLORS.red }
];

const MILESTONES = [
  { id: 1, title: "100 Commits", reward: "Exclusive Avatar Ring", xp: 1000, date: "2024-03-12", image: true },
  { id: 2, title: "React Master", reward: "Profile Badge", xp: 5000, date: "2025-11-10", image: true },
  { id: 3, title: "Internship Ready", reward: "Career Unlock", xp: 2500, date: "2025-11-20", image: true }
];

// --- REUSABLE COMPONENTS ---
const Card = ({ children, className = '', hover = true, onClick, layoutId }) => (
  <motion.div
    layoutId={layoutId}
    onClick={onClick}
    whileHover={hover ? { y: -4, scale: 1.01 } : {}}
    transition={{ type: "spring", stiffness: 400, damping: 30 }}
    className={`bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden relative group ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    {children}
  </motion.div>
);

const Badge = ({ rarity, icon: Icon, className = '' }) => {
  const color = RARITY_COLORS[rarity] || COLORS.secondaryText;
  return (
    <div 
      className={`relative flex items-center justify-center p-3 rounded-xl ${className}`}
      style={{ backgroundColor: `${color}15`, border: `1px solid ${color}40`, color }}
    >
      <Icon size={24} style={{ color }} />
      <div className="absolute inset-0 rounded-xl blur-md opacity-30" style={{ backgroundColor: color }} />
    </div>
  );
};

const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-8">
    <h2 className="text-3xl font-bold text-[#F9FAFB] tracking-tight">{title}</h2>
    {subtitle && <p className="text-[#9CA3AF] mt-2 font-medium">{subtitle}</p>}
  </div>
);

const ProgressBar = ({ progress, color = COLORS.cyan, height = 'h-2' }) => (
  <div className={`w-full bg-[#0F172A] rounded-full overflow-hidden ${height}`}>
    <motion.div 
      initial={{ width: 0 }} 
      whileInView={{ width: `${progress}%` }} 
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="h-full rounded-full relative"
      style={{ backgroundColor: color }}
    >
      <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
    </motion.div>
  </div>
);

// --- MAIN APPLICATION ---
export default function Achievements() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedAchievement, setExpandedAchievement] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'share', 'export', 'compare', 'unlock'
  
  // Handlers
  const handleAction = (action) => {
    setActiveModal(action);
  };

  const closeModal = () => {
    setActiveModal(null);
    setExpandedAchievement(null);
  };

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('achievement-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F9FAFB] font-sans selection:bg-[#06B6D4]/30 pb-32">
      
      {/* Background Ambient Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#06B6D4] blur-[150px] opacity-[0.03] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#F97316] blur-[150px] opacity-[0.03] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 relative z-10 space-y-24">
        
        {/* SECTION 12 & 13: SEARCH AND FILTERS (Top Bar) */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#111827]/80 backdrop-blur-md p-4 rounded-2xl border border-[#1F2937] sticky top-6 z-40 shadow-2xl"
        >
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
            <input 
              id="achievement-search"
              type="text" 
              placeholder="Search achievements... (Ctrl+K)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0F172A] border border-[#1F2937] text-[#F9FAFB] rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-[#06B6D4] transition-colors placeholder:text-[#9CA3AF]/50"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {['All', 'Unlocked', 'Locked', 'Legendary', 'React', 'LeetCode'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeFilter === filter 
                    ? 'bg-[#06B6D4] text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                    : 'bg-[#0F172A] text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* SECTION 1: DEVELOPER PASSPORT */}
        <motion.section 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4]/20 to-[#8B5CF6]/20 rounded-3xl blur-xl opacity-50 animate-pulse" />
          <div className="bg-[#111827]/90 backdrop-blur-xl border border-[#1F2937] rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 group">
            
            {/* Particles */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  animate={{
                    y: [0, -100],
                    x: [0, (Math.random() - 0.5) * 50],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                />
              ))}
            </div>

            {/* Avatar & Progress Ring */}
            <div className="relative flex-shrink-0">
              <svg width="200" height="200" className="transform -rotate-90">
                <circle cx="100" cy="100" r="90" fill="none" stroke="#0F172A" strokeWidth="8" />
                <motion.circle 
                  cx="100" cy="100" r="90" fill="none" 
                  stroke="url(#gradient)" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray="565.48"
                  initial={{ strokeDashoffset: 565.48 }}
                  animate={{ strokeDashoffset: 565.48 * (1 - (PASSPORT_DATA.totalXp / PASSPORT_DATA.nextLevelXp)) }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={COLORS.cyan} />
                    <stop offset="100%" stopColor={COLORS.green} />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full border-4 border-[#111827] overflow-hidden bg-[#0F172A] relative">
                  <img src={PASSPORT_DATA.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#06B6D4] to-[#10B981] text-white font-bold px-4 py-1 rounded-full text-sm shadow-lg border border-white/20 z-10">
                Level {PASSPORT_DATA.level}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 w-full relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <motion.h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#9CA3AF] mb-2 tracking-tight">
                    {PASSPORT_DATA.title}
                  </motion.h1>
                  <div className="flex items-center gap-3 text-[#06B6D4] font-medium text-lg">
                    <Trophy size={20} />
                    {PASSPORT_DATA.rank}
                  </div>
                </div>
                <div className="text-right hidden md:block">
                  <div className="text-sm text-[#9CA3AF] mb-1 uppercase tracking-wider font-semibold">Passport No.</div>
                  <div className="text-lg font-mono text-[#F9FAFB] tracking-widest">{PASSPORT_DATA.passportNumber}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total XP", value: PASSPORT_DATA.totalXp.toLocaleString(), icon: Zap, color: COLORS.amber },
                  { label: "Current Streak", value: `${PASSPORT_DATA.streak} Days`, icon: Flame, color: COLORS.orange },
                  { label: "Achievements", value: PASSPORT_DATA.totalAchievements, icon: Award, color: COLORS.cyan },
                  { label: "Joined", value: PASSPORT_DATA.joinedSince, icon: Calendar, color: COLORS.green }
                ].map((stat, i) => (
                  <div key={i} className="bg-[#0F172A] p-4 rounded-2xl border border-[#1F2937]">
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon size={16} style={{ color: stat.color }} />
                      <span className="text-[#9CA3AF] text-sm font-medium">{stat.label}</span>
                    </div>
                    <div className="text-xl font-bold text-[#F9FAFB]">{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-end">
                <div className="w-full md:w-2/3">
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span className="text-[#9CA3AF]">Progress to Level {PASSPORT_DATA.level + 1}</span>
                    <span className="text-[#F9FAFB]">{PASSPORT_DATA.totalXp.toLocaleString()} / {PASSPORT_DATA.nextLevelXp.toLocaleString()} XP</span>
                  </div>
                  <ProgressBar progress={(PASSPORT_DATA.totalXp / PASSPORT_DATA.nextLevelXp) * 100} height="h-3" />
                </div>
                <button 
                  onClick={() => handleAction('unlock')}
                  className="hidden md:flex bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl items-center gap-2 transition-all group"
                >
                  <Eye size={18} className="text-[#9CA3AF] group-hover:text-white transition-colors" />
                  <span className="text-[#9CA3AF] group-hover:text-white transition-colors font-medium">Simulate Unlock</span>
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 2: LEVEL PROGRESSION */}
        <section>
          <SectionHeading title="Journey Progression" subtitle="Your climb to the top." />
          <div className="relative w-full overflow-x-auto pb-8 scrollbar-hide py-4">
            <div className="flex items-center min-w-[800px]">
              {[1, 10, 20, 30, 42, 50, 75, 100].map((level, i, arr) => {
                const isCurrent = level === PASSPORT_DATA.level;
                const isCompleted = level < PASSPORT_DATA.level;
                return (
                  <div key={level} className="flex items-center flex-1 last:flex-none">
                    <div className="relative flex flex-col items-center group">
                      <motion.div 
                        whileHover={{ scale: 1.2 }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg relative z-10 transition-colors duration-300 ${
                          isCurrent ? 'bg-[#06B6D4] text-white shadow-[0_0_20px_rgba(6,182,212,0.5)]' : 
                          isCompleted ? 'bg-[#10B981] text-white' : 'bg-[#1F2937] text-[#9CA3AF]'
                        }`}
                      >
                        {level}
                        {isCurrent && (
                          <span className="absolute inset-0 rounded-full animate-ping border-2 border-[#06B6D4] opacity-75" />
                        )}
                      </motion.div>
                      <span className={`absolute -bottom-8 whitespace-nowrap text-sm font-medium ${isCurrent ? 'text-[#06B6D4]' : isCompleted ? 'text-[#10B981]' : 'text-[#9CA3AF]'}`}>
                        Level {level}
                      </span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="flex-1 h-1 mx-2 rounded-full overflow-hidden bg-[#1F2937] relative">
                        {isCompleted && (
                          <motion.div 
                            initial={{ width: 0 }} 
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            className={`h-full ${level >= PASSPORT_DATA.level ? 'bg-gradient-to-r from-[#10B981] to-[#1F2937]' : 'bg-[#10B981]'}`}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: ACHIEVEMENT CATEGORIES */}
        <section>
          <SectionHeading title="Domains of Mastery" subtitle="Expand your expertise across all fields." />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div 
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02, borderColor: COLORS.cyan }}
                className="bg-[#111827] border border-[#1F2937] p-6 rounded-2xl cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-[#0F172A] rounded-xl text-[#06B6D4] group-hover:bg-[#06B6D4]/10 transition-colors">
                    <cat.icon size={24} />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#9CA3AF] font-medium">COMPLETION</div>
                    <div className="text-lg font-bold text-[#F9FAFB]">{Math.round((cat.unlocked/cat.total)*100)}%</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-[#06B6D4] transition-colors">{cat.label}</h3>
                <div className="text-[#9CA3AF] text-sm mb-4">{cat.unlocked} / {cat.total} Unlocked</div>
                <ProgressBar progress={(cat.unlocked/cat.total)*100} height="h-1.5" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 4 & 5: ACHIEVEMENT GALLERY & HIDDEN ACHIEVEMENTS */}
        <section>
          <SectionHeading title="Achievement Gallery" subtitle="Your proudest milestones." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {ACHIEVEMENTS.map((ach) => (
                <Card 
                  key={ach.id} 
                  layoutId={`ach-${ach.id}`}
                  onClick={() => setExpandedAchievement(ach)}
                >
                  <div className="p-6 relative">
                    {/* Hover Gradient Spotlight */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
                    
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <Badge rarity={ach.rarity} icon={ach.icon} />
                      <div className="text-right">
                        <div className="text-sm font-bold text-[#F9FAFB] flex items-center gap-1">
                          <Zap size={14} className="text-[#F59E0B]" />
                          {ach.xp.toLocaleString()} XP
                        </div>
                        <div className="text-xs text-[#9CA3AF] font-medium mt-1 px-2 py-0.5 bg-[#0F172A] rounded border border-[#1F2937]">
                          {ach.difficulty}
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#9CA3AF] transition-all">
                        {ach.title}
                      </h3>
                      <p className="text-[#9CA3AF] text-sm mb-6 line-clamp-2 min-h-[40px]">
                        {ach.description}
                      </p>
                      
                      {ach.unlockedDate ? (
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-1.5 text-[#10B981] text-sm font-medium">
                            <CheckCircle size={16} />
                            <span>Unlocked</span>
                          </div>
                          <span className="text-[#9CA3AF] text-xs">{new Date(ach.unlockedDate).toLocaleDateString()}</span>
                        </div>
                      ) : (
                        <div className="mt-auto">
                          <div className="flex justify-between text-xs mb-1.5 font-medium">
                            <span className="text-[#9CA3AF]">Progress</span>
                            <span className="text-[#F9FAFB]">{ach.progress}%</span>
                          </div>
                          <ProgressBar progress={ach.progress} color={COLORS.secondaryText} />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}

              {/* SECTION 5: HIDDEN ACHIEVEMENT */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-[#111827] border border-[#1F2937] border-dashed p-6 rounded-2xl relative overflow-hidden group flex flex-col justify-center items-center text-center cursor-pointer min-h-[220px]"
              >
                <div className="absolute inset-0 bg-[#0F172A]/50 backdrop-blur-[2px] z-0" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#1F2937] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#111827] border border-[#1F2937] transition-colors">
                    <Lock size={28} className="text-[#9CA3AF]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#9CA3AF] mb-2 tracking-widest">???</h3>
                  <p className="text-[#9CA3AF]/70 text-sm">Requirement Hidden. Keep Exploring.</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* SECTION 6: RARITY SYSTEM */}
        <section>
          <SectionHeading title="Rarity Tiers" subtitle="Not all achievements are created equal." />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(RARITY_COLORS).map(([rarity, color], i) => (
              <motion.div
                key={rarity}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-[#111827] p-6 rounded-2xl border text-center relative overflow-hidden group"
                style={{ borderColor: `${color}40` }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: color }} />
                <div 
                  className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4 relative"
                  style={{ backgroundColor: `${color}15`, color }}
                >
                  <Star size={24} />
                  <div className="absolute inset-0 rounded-xl blur-md opacity-40" style={{ backgroundColor: color }} />
                </div>
                <h4 className="font-bold text-sm uppercase tracking-wider" style={{ color }}>{rarity}</h4>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* SECTION 7: DEVELOPER JOURNEY */}
          <section>
            <SectionHeading title="Developer Journey" subtitle="Your timeline of greatness." />
            <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-8">
              <div className="relative border-l-2 border-[#1F2937] ml-4 space-y-12 py-4">
                {JOURNEY.map((step, i) => (
                  <motion.div 
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-8 group"
                  >
                    <div 
                      className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-[#111827] ${
                        step.active ? 'bg-[#06B6D4] shadow-[0_0_10px_rgba(6,182,212,0.6)]' : 'bg-[#1F2937]'
                      } transition-all duration-300 group-hover:scale-125`} 
                    />
                    <div className="text-sm font-bold text-[#06B6D4] mb-1">{step.date}</div>
                    <h4 className={`text-xl font-bold mb-2 ${step.active ? 'text-[#F9FAFB]' : 'text-[#9CA3AF]'}`}>
                      {step.title}
                    </h4>
                    <p className="text-[#9CA3AF] text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 8: XP BREAKDOWN */}
          <section className="flex flex-col">
            <SectionHeading title="XP Breakdown" subtitle="Where your experience comes from." />
            <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-8 flex-1 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#06B6D4]/5 to-transparent rounded-full blur-3xl" />
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={XP_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {XP_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #1F2937', borderRadius: '12px', color: '#F9FAFB' }}
                      itemStyle={{ color: '#F9FAFB' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {XP_DATA.map((data, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#0F172A] p-3 rounded-xl border border-[#1F2937]">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
                    <div className="flex-1">
                      <div className="text-xs text-[#9CA3AF] font-medium">{data.name}</div>
                      <div className="text-sm font-bold text-[#F9FAFB]">{data.value.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* SECTION 9: NEXT ACHIEVEMENTS */}
        <section>
          <SectionHeading title="Up Next" subtitle="Recommended challenges based on your journey." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Maintain 30 Day Streak", category: "Consistency", difficulty: "Medium", reward: 2500, progress: 85 },
              { title: "Build Full-Stack App", category: "Projects", difficulty: "Hard", reward: 5000, progress: 40 },
              { title: "Solve 5 More Problems", category: "LeetCode", difficulty: "Easy", reward: 500, progress: 90 }
            ].map((rec, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-[#0F172A] border border-[#1F2937] p-6 rounded-2xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-xs font-bold px-2 py-1 bg-[#111827] text-[#06B6D4] rounded uppercase tracking-wider">
                      {rec.category}
                    </div>
                    <div className="text-sm font-bold text-[#F59E0B] flex items-center gap-1">
                      <Zap size={14} /> +{rec.reward}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-[#F9FAFB] mb-2">{rec.title}</h4>
                  <div className="text-xs text-[#9CA3AF] mb-6">Estimated completion: Soon</div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2 font-medium">
                    <span className="text-[#9CA3AF]">Progress</span>
                    <span className="text-[#F9FAFB]">{rec.progress}%</span>
                  </div>
                  <ProgressBar progress={rec.progress} color={COLORS.orange} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 10: MILESTONE SHOWCASE */}
        <section>
          <SectionHeading title="Milestone Showcase" subtitle="Moments that define your career." />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {MILESTONES.map((milestone, i) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#111827] border border-[#1F2937] rounded-3xl overflow-hidden group cursor-pointer"
                onClick={() => handleAction('detail')}
              >
                <div className="h-48 bg-[#0F172A] relative overflow-hidden flex items-center justify-center border-b border-[#1F2937]">
                  {/* Mock Screenshot Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent z-10" />
                  <Layout size={64} className="text-[#1F2937] group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-bold text-white flex items-center gap-2">
                    <Calendar size={12} />
                    {new Date(milestone.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-2xl font-bold text-[#F9FAFB] mb-2 group-hover:text-[#06B6D4] transition-colors">{milestone.title}</h4>
                  <div className="flex items-center gap-4 mt-4 text-sm font-medium">
                    <div className="flex items-center gap-1.5 text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1.5 rounded-lg">
                      <Trophy size={16} />
                      {milestone.reward}
                    </div>
                    <div className="flex items-center gap-1.5 text-[#10B981] bg-[#10B981]/10 px-3 py-1.5 rounded-lg">
                      <Zap size={16} />
                      {milestone.xp} XP
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 11: ACHIEVEMENT STATISTICS */}
        <section className="border-t border-[#1F2937] pt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Total XP Earned", value: "124,500", color: COLORS.cyan },
              { label: "Achievements Unlocked", value: "128", color: COLORS.green },
              { label: "Legendary Badges", value: "12", color: COLORS.amber },
              { label: "Completion Rate", value: "64%", color: COLORS.orange }
            ].map((stat, i) => (
              <div key={i}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-4xl md:text-5xl font-black mb-2"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-[#9CA3AF] font-medium tracking-wide uppercase text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* SECTION 14: QUICK ACTIONS (FLOATING DOCK) */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#111827]/90 backdrop-blur-xl border border-[#1F2937] p-2 rounded-2xl flex items-center gap-2 z-40 shadow-2xl"
      >
        {[
          { icon: Share2, label: "Share", action: 'share' },
          { icon: Download, label: "Export", action: 'export' },
          { icon: Layers, label: "Compare", action: 'compare' },
          { icon: Target, label: "Focus", action: 'focus' }
        ].map((item, i) => (
          <button
            key={i}
            onClick={() => handleAction(item.action)}
            className="p-3 rounded-xl hover:bg-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors relative group"
          >
            <item.icon size={20} />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0F172A] border border-[#1F2937] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {item.label}
            </div>
          </button>
        ))}
      </motion.div>

      {/* --- MODALS & OVERLAYS --- */}
      <AnimatePresence>
        
        {/* ACHIEVEMENT DETAIL EXPANSION */}
        {expandedAchievement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              layoutId={`ach-${expandedAchievement.id}`}
              className="bg-[#111827] border border-[#1F2937] rounded-3xl w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#06B6D4]/20 to-transparent" />
              <button onClick={closeModal} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors z-20">
                <X size={20} />
              </button>
              
              <div className="p-10 relative z-10">
                <div className="flex justify-center mb-8">
                  <Badge rarity={expandedAchievement.rarity} icon={expandedAchievement.icon} className="w-24 h-24 [&>svg]:w-12 [&>svg]:h-12" />
                </div>
                <h2 className="text-3xl font-black text-center text-white mb-2">{expandedAchievement.title}</h2>
                <div className="flex justify-center items-center gap-3 mb-6 text-sm font-medium">
                  <span className="text-[#06B6D4] uppercase tracking-wider">{expandedAchievement.rarity}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1F2937]" />
                  <span className="text-[#9CA3AF]">{expandedAchievement.difficulty}</span>
                </div>
                <p className="text-[#9CA3AF] text-center text-lg mb-10 leading-relaxed max-w-lg mx-auto">
                  {expandedAchievement.description}
                </p>
                
                <div className="bg-[#0F172A] border border-[#1F2937] rounded-2xl p-6 mb-8 flex justify-between items-center">
                  <div>
                    <div className="text-[#9CA3AF] text-sm font-medium mb-1">Reward</div>
                    <div className="text-2xl font-bold text-[#F59E0B] flex items-center gap-2">
                      <Zap size={24} /> +{expandedAchievement.xp.toLocaleString()} XP
                    </div>
                  </div>
                  {expandedAchievement.unlockedDate && (
                    <div className="text-right">
                      <div className="text-[#9CA3AF] text-sm font-medium mb-1">Unlocked On</div>
                      <div className="text-lg font-bold text-white">{new Date(expandedAchievement.unlockedDate).toLocaleDateString()}</div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white font-bold py-4 rounded-xl transition-colors">
                    View Associated Module
                  </button>
                  <button className="p-4 bg-[#1F2937] hover:bg-[#374151] rounded-xl text-white transition-colors">
                    <Share2 size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* GENERIC ACTION MODALS (Share, Export, Compare) */}
        {activeModal && !['unlock', 'detail'].includes(activeModal) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#111827] border border-[#1F2937] rounded-2xl w-full max-w-sm p-6 relative z-10 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-[#0F172A] rounded-full mx-auto flex items-center justify-center mb-4 border border-[#1F2937] text-[#06B6D4]">
                {activeModal === 'share' && <Share2 size={28} />}
                {activeModal === 'export' && <Download size={28} />}
                {activeModal === 'compare' && <Layers size={28} />}
                {activeModal === 'focus' && <Target size={28} />}
              </div>
              <h3 className="text-xl font-bold text-white capitalize mb-2">{activeModal} Feature</h3>
              <p className="text-[#9CA3AF] text-sm mb-6">This feature is currently in mock mode for the showcase.</p>
              <button onClick={closeModal} className="w-full bg-[#1F2937] hover:bg-[#374151] text-white font-bold py-3 rounded-xl transition-colors">
                Close
              </button>
            </motion.div>
          </div>
        )}

        {/* UNLOCK ANIMATION MODAL */}
        {activeModal === 'unlock' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0B1120]/95 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, rotateY: -90 }} 
              animate={{ scale: 1, opacity: 1, rotateY: 0 }} 
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Explosion Particles */}
              <div className="absolute inset-0 pointer-events-none">
                 {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#F59E0B] rounded-full"
                    initial={{ x: 0, y: 0, scale: 0 }}
                    animate={{ 
                      x: (Math.random() - 0.5) * 500, 
                      y: (Math.random() - 0.5) * 500,
                      scale: [0, 1.5, 0],
                      opacity: [1, 0]
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                ))}
              </div>

              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-40 h-40 bg-gradient-to-br from-[#F59E0B] to-[#F97316] rounded-3xl p-1 mb-8 shadow-[0_0_100px_rgba(245,158,11,0.5)]"
              >
                <div className="w-full h-full bg-[#111827] rounded-[22px] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                  <Trophy size={64} className="text-[#F59E0B]" />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="text-[#F59E0B] font-bold tracking-widest uppercase mb-2">Achievement Unlocked</div>
                <h2 className="text-4xl font-black text-white mb-4">Legendary Status</h2>
                <div className="inline-flex items-center gap-2 bg-[#0F172A] border border-[#1F2937] px-6 py-3 rounded-full text-xl font-bold text-white mb-10 shadow-lg">
                  <Zap className="text-[#F59E0B]" /> +10,000 XP
                </div>
              </motion.div>

              <motion.button 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                onClick={closeModal} 
                className="bg-white text-black font-bold py-3 px-12 rounded-full hover:scale-105 transition-transform"
              >
                Continue
              </motion.button>
            </motion.div>
          </div>
        )}

      </AnimatePresence>
    </div>
  );
}