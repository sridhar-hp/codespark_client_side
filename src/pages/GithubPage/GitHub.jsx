import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  RefreshCw, 
  GitBranch, 
  GitCommit, 
  GitFork, 
  Star, 
  Info, 
  Trophy, 
  Search, 
  Calendar, 
  MapPin, 
  Building, 
  Link2, 
  ExternalLink, 
  Flame, 
  CheckCircle2, 
  TrendingUp, 
  Code2, 
  BookOpen, 
  Award, 
  Sparkles,
  Inbox,
  AlertCircle,
  Clock,
  Heart,
  Hourglass,
  BarChart3,
  ShieldCheck,
  Zap,
  Activity,
  ChevronRight
} from 'lucide-react';

const MOCK_REPOSITORIES = [
  {
    name: 'codespark-core-engine',
    description: 'The core state hydration and telemetry pipeline for aggregating multi-platform developer footprints, LeetCode milestones, and git trees.',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 142,
    forks: 28,
    issues: 4,
    updatedAt: 'Updated 2 hours ago',
    visibility: 'Public',
    tags: ['Vite', 'TypeScript', 'Tailwind'],
    healthScore: 98,
    lastCommit: 'refactor: optimize dynamic layout hydration',
    lastPush: '2 hours ago'
  },
  {
    name: 'Leave-Management-System',
    description: 'A full-stack enterprise resource planning module with automated validation pipelines, dynamic approval hierarchies, and secure OAuth logins.',
    language: 'React',
    languageColor: '#61dafb',
    stars: 18,
    forks: 6,
    issues: 2,
    updatedAt: 'Updated Today',
    visibility: 'Public',
    tags: ['React', 'Express', 'MongoDB'],
    healthScore: 92,
    lastCommit: 'fix: resolve auth validation schema warnings',
    lastPush: 'Just now'
  },
  {
    name: 'algorithmic-structures',
    description: 'A comprehensive collection of optimized data structures, sorting trees, graph algorithms, and customized dynamic programming templates.',
    language: 'Python',
    languageColor: '#3572A5',
    stars: 35,
    forks: 12,
    issues: 0,
    updatedAt: 'Updated 3 days ago',
    visibility: 'Public',
    tags: ['Python', 'DSA', 'LeetCode'],
    healthScore: 95,
    lastCommit: 'docs: update dynamic programming practice progress',
    lastPush: '3 days ago'
  },
  {
    name: 'micro-frontend-router',
    description: 'Lightweight structural router for micro-frontends supporting dynamic module hydration and sub-app event virtualization.',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: 89,
    forks: 14,
    issues: 1,
    updatedAt: 'Updated July 5, 2026',
    visibility: 'Public',
    tags: ['Vite', 'JavaScript', 'Router'],
    healthScore: 88,
    lastCommit: 'feat: map route parameters dynamically',
    lastPush: '2 days ago'
  },
  {
    name: 'internal-billing-api',
    description: 'Private administrative endpoints implementing Stripe integrations, subscription status checks, and corporate tax reports.',
    language: 'Java',
    languageColor: '#b07219',
    stars: 4,
    forks: 0,
    issues: 5,
    updatedAt: 'Updated June 28, 2026',
    visibility: 'Private',
    tags: ['Spring Boot', 'Stripe', 'API'],
    healthScore: 84,
    lastCommit: 'security: upgrade stripe dependency patches',
    lastPush: '1 week ago'
  },
  {
    name: 'codespark-docs',
    description: 'The official structural and design documentation for the platform layout. Built utilizing high-performance static page structures.',
    language: 'HTML',
    languageColor: '#e34c26',
    stars: 23,
    forks: 7,
    issues: 0,
    updatedAt: 'Updated June 12, 2026',
    visibility: 'Archived',
    tags: ['Tailwind', 'HTML', 'Notion'],
    healthScore: 90,
    lastCommit: 'docs: finalize semantic variables definition list',
    lastPush: '3 weeks ago'
  }
];

const ENHANCED_LANGUAGES = [
  { name: 'JavaScript', percent: 42, color: '#f1e05a', repos: 12, commits: 542, hours: 120 },
  { name: 'TypeScript', percent: 31, color: '#3178c6', repos: 8, commits: 412, hours: 90 },
  { name: 'Python', percent: 15, color: '#3572A5', repos: 6, commits: 182, hours: 45 },
  { name: 'Java', percent: 12, color: '#b07219', repos: 4, commits: 120, hours: 30 }
];

function AnimatedCounter({ value, duration = 1200, decimals = 0, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const target = parseFloat(value);
    if (isNaN(target)) return;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Beautiful easeOutExpo easing curve
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(easeProgress * target);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{suffix}</span>;
}

function CardGlow({ children, className = "", delay = "0ms" }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden group/glow ${className}`}
      style={{ transitionDelay: delay }}
    >
      <div 
        className={`pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-500 z-10 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(245, 158, 11, 0.08), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}

export default function GitHubDashboard() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncMessage, setSyncMessage] = useState('Synced 2 minutes ago');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [hoveredCell, setHoveredDay] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [toasts, setToasts] = useState([]);
  const [pageMounted, setPageMounted] = useState(false);
  
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setIsLoading(true);
    setSyncProgress(0);
    triggerToast('Initiating workspace synchronization with GitHub...', 'info');

    let currentProg = 0;
    const interval = setInterval(() => {
      currentProg += 10;
      setSyncProgress(currentProg);
      if (currentProg >= 100) {
        clearInterval(interval);
        setIsSyncing(false);
        setIsLoading(false);
        setSyncMessage('Synced just now');
        triggerToast('GitHub trees, commits, and productivity metrics successfully synchronized!', 'success');
      }
    }, 180);
  };

  const filteredRepos = MOCK_REPOSITORIES.filter(repo => {
    if (selectedFilter !== 'All') {
      if (selectedFilter === 'Public' && repo.visibility !== 'Public') return false;
      if (selectedFilter === 'Private' && repo.visibility !== 'Private') return false;
      if (selectedFilter === 'Archived' && repo.visibility !== 'Archived') return false;
      if (selectedFilter === 'Forked' && repo.forks === 0) return false;
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchesName = repo.name.toLowerCase().includes(q);
      const matchesDesc = repo.description.toLowerCase().includes(q);
      const matchesLang = repo.language.toLowerCase().includes(q);
      if (!matchesName && !matchesDesc && !matchesLang) return false;
    }
    return true;
  });

  const generateDeterministicGraph = () => {
    const data = [];
    const endDate = new Date(2026, 6, 7); // July 7, 2026 anchor point
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 371); // 53 weeks

    const taskPool = [
      "Optimized state engine context lifecycle",
      "Merged database indices matching routes",
      "Refactored navigation animation parameters",
      "Pushed hotfix for OAuth callback handler",
      "Implemented beautiful linear ambient gradients",
      "Wrote structured workspace test procedures"
    ];

    for (let i = 0; i < 371; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);
      const dayOfWeek = currentDate.getDay();

      // Cyclical patterns
      const seed = Math.sin(i * 0.04) + Math.cos(i * 0.08) + (dayOfWeek === 0 || dayOfWeek === 6 ? -1.3 : 0.9);
      let level = 0;
      if (seed > 1.8) level = 4;
      else if (seed > 1.1) level = 3;
      else if (seed > 0.3) level = 2;
      else if (seed > -0.4) level = 1;

      const commits = level === 0 ? 0 : level * 2 + (i % 3);
      const xp = level === 0 ? 0 : level * 30 + (i % 4) * 10;
      const score = level === 0 ? 0 : Math.min(100, level * 22 + (i % 5) * 4);

      data.push({
        date: currentDate,
        level,
        commits,
        xp,
        score,
        task: taskPool[i % taskPool.length]
      });
    }
    return data;
  };

  const contributionGraphData = generateDeterministicGraph();

  // Divide into 53 columns
  const columns = [];
  for (let i = 0; i < 53; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      week.push(contributionGraphData[i * 7 + j]);
    }
    columns.push(week);
  }

  const monthLabels = [];
  let lastMonth = '';
  columns.forEach((week, index) => {
    const date = week[0]?.date;
    if (date) {
      const currentMonth = date.toLocaleDateString('en-US', { month: 'short' });
      if (currentMonth !== lastMonth) {
        monthLabels.push({ text: currentMonth, colIndex: index });
        lastMonth = currentMonth;
      }
    }
  });

  const getCellColors = (level, day) => {
    // Adjacent glow neighbors interaction check
    const isNeighborGlow = hoveredCell && Math.abs(day.date.getTime() - hoveredCell.date.getTime()) <= 86400000;
    const baseColors = (() => {
      switch (level) {
        case 1: return 'bg-amber-950/40 border-amber-900/30 hover:border-amber-500/50 hover:bg-amber-900/60';
        case 2: return 'bg-amber-800/40 border-amber-700/40 hover:border-amber-500 hover:bg-amber-800/70';
        case 3: return 'bg-amber-600/70 border-amber-500/40 hover:border-amber-400 hover:bg-amber-600';
        case 4: return 'bg-amber-400 border-amber-300/50 hover:border-white hover:bg-amber-300 shadow-[0_0_6px_rgba(245,158,11,0.3)] hover:shadow-[0_0_12px_rgba(245,158,11,0.6)]';
        default: return 'bg-[#1F2937]/20 border-[#1F2937]/60 hover:bg-[#1F2937]/40 hover:border-[#374151]';
      }
    })();

    return `${baseColors} ${isNeighborGlow && !hoveredCell.date === day.date ? 'brightness-125 border-amber-500/40 scale-105' : ''}`;
  };

  const handleCellMouseEnter = (day, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    setHoveredDay(day);
    setTooltipPos({
      x: rect.left - containerRect.left + (rect.width / 2),
      y: rect.top - containerRect.top - 8
    });
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F9FAFB] font-sans antialiased relative overflow-hidden">
      
      {/* Premium CSS Keyframe Variables Injection */}
      <style>{`
        @keyframes floatSlow1 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.2; }
          50% { transform: translateY(-30px) translateX(15px) scale(1.1); opacity: 0.35; }
        }
        @keyframes floatSlow2 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.15; }
          50% { transform: translateY(25px) translateX(-20px) scale(0.95); opacity: 0.25; }
        }
        @keyframes shimmerSlow {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-float-circle-1 {
          animation: floatSlow1 22s ease-in-out infinite;
        }
        .animate-float-circle-2 {
          animation: floatSlow2 28s ease-in-out infinite;
        }
        .animate-shimmer-progress {
          background: linear-gradient(90deg, transparent 0%, rgba(245, 158, 11, 0.4) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmerSlow 1.8s infinite linear;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-float-circle-1, .animate-float-circle-2, .animate-shimmer-progress, .animate-spin, .animate-ping, .transition-all {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* --- PREMIUM FLOATING AMBIENT SPARK BACKGROUNDS --- */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none animate-float-circle-1" />
      <div className="absolute bottom-20 right-20 w-[450px] h-[400px] bg-orange-600/[0.03] rounded-full blur-[160px] pointer-events-none animate-float-circle-2" />

      {/* Toast Notification Stack */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-xl border shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 transform translate-y-0 scale-100 animate-fade-in ${
              toast.type === 'info' 
                ? 'bg-sky-500/10 border-sky-500/30 text-sky-400' 
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            }`}
          >
            <div className="flex-shrink-0">
              {toast.type === 'info' ? <RefreshCw className="w-5 h-5 text-sky-500 animate-spin" /> : <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            </div>
            <p className="text-xs font-semibold tracking-wide leading-relaxed">{toast.message}</p>
          </div>
        ))}
      </div>

      <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 relative z-10">
        
        {/* PAGE HEADER */}
        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1F2937]/60 pb-6 transition-all duration-700 transform ${
          pageMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
              <Github className="w-8 h-8 text-amber-500 transition-transform duration-500 hover:rotate-12 cursor-pointer" />
              GitHub Integration
            </h1>
            <p className="text-sm text-[#9CA3AF] font-medium tracking-wide">
              Track your coding journey, repositories and contribution history.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Connected
            </span>
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#111827] hover:bg-[#1F2937] text-white border border-[#1F2937] hover:border-[#374151] font-bold text-sm rounded-xl transition-all shadow-xl active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              {isSyncing && <div className="absolute inset-0 animate-shimmer-progress" />}
              <RefreshCw className={`w-4 h-4 transition-transform duration-700 ${isSyncing ? 'animate-spin text-amber-500' : 'group-hover:rotate-180'}`} />
              <span className="relative z-10">{isSyncing ? `Syncing (${syncProgress}%)` : 'Sync Now'}</span>
            </button>
          </div>
        </div>

        {/* TOP LEVEL METRICS GRID */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 delay-100 transform ${
          pageMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          
          {/* Today's Coding Time */}
          <CardGlow className="bg-[#111827]/70 backdrop-blur-md border border-[#1F2937]/80 p-5 rounded-2xl flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_4px_30px_rgba(245,158,11,0.06)] group">
            <div className="flex items-center justify-between text-[#6B7280]">
              <span className="text-[10px] font-bold uppercase tracking-wider">Today's Coding Time</span>
              <Clock className="w-4 h-4 text-amber-500 transition-transform duration-500 group-hover:rotate-12" />
            </div>
            <div className="mt-4 space-y-1">
              <span className="block text-3xl font-extrabold text-white tracking-tight">
                <AnimatedCounter value={4} suffix="h" /> <AnimatedCounter value={32} suffix="m" />
              </span>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12% versus yesterday
              </span>
            </div>
          </CardGlow>

          {/* Weekly Coding Time */}
          <CardGlow className="bg-[#111827]/70 backdrop-blur-md border border-[#1F2937]/80 p-5 rounded-2xl flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_4px_30px_rgba(245,158,11,0.06)] group">
            <div className="flex items-center justify-between text-[#6B7280]">
              <span className="text-[10px] font-bold uppercase tracking-wider">Weekly Output</span>
              <Hourglass className="w-4 h-4 text-amber-500 group-hover:animate-pulse" />
            </div>
            <div className="mt-4 space-y-1">
              <span className="block text-3xl font-extrabold text-white tracking-tight">
                <AnimatedCounter value={28} suffix="h" /> <AnimatedCounter value={15} suffix="m" />
              </span>
              <span className="text-[10px] text-[#9CA3AF] font-medium block">Weekly Target: 30 hours</span>
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-1000 ease-out" style={{ width: pageMounted ? '94%' : '0%' }} />
            </div>
          </CardGlow>

          {/* Total Yearly Commits */}
          <CardGlow className="bg-[#111827]/70 backdrop-blur-md border border-[#1F2937]/80 p-5 rounded-2xl flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_4px_30px_rgba(245,158,11,0.06)] group">
            <div className="flex items-center justify-between text-[#6B7280]">
              <span className="text-[10px] font-bold uppercase tracking-wider">Total Tree Commits</span>
              <GitCommit className="w-4 h-4 text-amber-500 transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="mt-4 space-y-1">
              <span className="block text-3xl font-extrabold text-white tracking-tight">
                <AnimatedCounter value={1842} />
              </span>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +14% vs normal month
              </span>
            </div>
          </CardGlow>

          {/* Long-Term Streaks */}
          <CardGlow className="bg-[#111827]/70 backdrop-blur-md border border-[#1F2937]/80 p-5 rounded-2xl flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_4px_30px_rgba(245,158,11,0.06)] group">
            <div className="flex items-center justify-between text-[#6B7280]">
              <span className="text-[10px] font-bold uppercase tracking-wider">Active Streak</span>
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
            </div>
            <div className="mt-4 space-y-1">
              <span className="block text-3xl font-extrabold text-white tracking-tight">
                <AnimatedCounter value={42} suffix=" Days" />
              </span>
              <span className="text-[10px] text-[#9CA3AF] font-medium">All-time record: 124 Days</span>
            </div>
          </CardGlow>

        </div>

        {/* --- MAIN GRID LAYOUT ARCHITECTURE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* --- LEFT SIDEBAR: Identity, Real Workspace, & Goals --- */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* PROFILE CARD */}
            <CardGlow className={`bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-6 rounded-2xl flex flex-col items-center text-center transition-all duration-700 delay-200 transform ${
              pageMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            } hover:border-amber-500/20`}>
              
              {/* Profile Avatar Frame with glowing halo */}
              <div className="relative mb-4 group-hover:scale-102 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-orange-500 rounded-full blur-[10px] opacity-30 group-hover:opacity-60 transition-opacity animate-pulse" />
                <div className="relative h-24 w-24 rounded-full p-1 bg-gradient-to-tr from-amber-600 via-amber-400 to-orange-500 shadow-xl transition-all duration-500 hover:rotate-6">
                  <div className="h-full w-full bg-[#0B1120] rounded-full flex items-center justify-center font-bold text-2xl text-amber-500 border border-[#0B1120]">
                    SM
                  </div>
                </div>
                {/* Embedded Level Badge */}
                <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-[#0B1120] font-extrabold text-[10px] px-2 py-0.5 rounded-full border-2 border-[#0B1120] shadow-lg">
                  LVL 4
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-white font-extrabold text-lg flex items-center gap-1.5 justify-center">
                  Sridhar Morgan
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                </h3>
                <span className="text-xs text-amber-500 font-semibold uppercase tracking-wider">Staff Engineer • Senior Rank</span>
                <p className="text-xs text-[#9CA3AF] max-w-xs mt-2.5 leading-relaxed">
                  Senior Full-Stack Developer creating interactive telemetry models, clean SaaS modules, and custom developer analytics toolsets.
                </p>
              </div>

              {/* Followers & Repo Metrics Count Row */}
              <div className="grid grid-cols-3 gap-4 w-full border-y border-[#1F2937]/60 py-4 my-5 text-center">
                <div className="space-y-0.5 group/stat cursor-pointer">
                  <span className="block text-[10px] text-[#6B7280] font-bold uppercase tracking-wider group-hover/stat:text-amber-500 transition-colors">Followers</span>
                  <span className="block text-sm font-extrabold text-white group-hover/stat:scale-105 transition-transform"><AnimatedCounter value={1200} /></span>
                </div>
                <div className="space-y-0.5 border-x border-[#1F2937]/60 group/stat cursor-pointer">
                  <span className="block text-[10px] text-[#6B7280] font-bold uppercase tracking-wider group-hover/stat:text-amber-500 transition-colors">Following</span>
                  <span className="block text-sm font-extrabold text-white group-hover/stat:scale-105 transition-transform"><AnimatedCounter value={412} /></span>
                </div>
                <div className="space-y-0.5 group/stat cursor-pointer">
                  <span className="block text-[10px] text-[#6B7280] font-bold uppercase tracking-wider group-hover/stat:text-amber-500 transition-colors">Repos</span>
                  <span className="block text-sm font-extrabold text-white group-hover/stat:scale-105 transition-transform"><AnimatedCounter value={34} /></span>
                </div>
              </div>

              {/* Profile Details Metadata */}
              <div className="w-full space-y-2.5 text-left text-xs font-semibold text-[#9CA3AF] mb-5">
                <div className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                  <MapPin className="w-4 h-4 text-[#6B7280] group-hover:text-amber-500 transition-colors" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                  <Building className="w-4 h-4 text-[#6B7280] group-hover:text-amber-500 transition-colors" />
                  <span>CODESPARK Core Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#6B7280]" />
                  <span>Joined Oct 2021</span>
                </div>
                <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
                  <Link2 className="w-4 h-4 text-[#6B7280] group-hover:text-amber-400 transition-colors" />
                  <span>sridharmorgan.dev</span>
                </div>
              </div>

              <button 
                onClick={() => triggerToast('Redirecting to legacy GitHub profile page.', 'info')}
                className="w-full py-2.5 bg-[#1F2937]/50 hover:bg-[#1F2937] text-white border border-[#1F2937] hover:border-[#374151] rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                View GitHub Profile
                <ExternalLink className="w-3.5 h-3.5 text-[#9CA3AF]" />
              </button>
            </CardGlow>

            {/* CURRENT ACTIVE WORKSPACE CARD */}
            <CardGlow className={`bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-5 rounded-2xl space-y-4 shadow-xl transition-all duration-700 delay-300 transform ${
              pageMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            } hover:border-amber-500/20`}>
              <div className="flex items-center justify-between border-b border-[#1F2937]/60 pb-3">
                <h3 className="text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500 animate-pulse" />
                  Active Workspace
                </h3>
                <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold animate-pulse">
                  Tracking
                </span>
              </div>
              
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280] font-semibold">Active Repository</span>
                  <span className="text-white font-mono font-bold text-amber-500 flex items-center gap-1 hover:underline cursor-pointer">
                    codespark-core-engine
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280] font-semibold">Target Branch</span>
                  <span className="text-white font-mono font-bold flex items-center gap-1.5 group cursor-pointer">
                    <GitBranch className="w-3.5 h-3.5 text-amber-500 transition-transform duration-300 group-hover:rotate-12" />
                    main
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280] font-semibold">Working Time Today</span>
                  <span className="text-white font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    2h 45m
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280] font-semibold">Last Push</span>
                  <span className="text-white font-bold">10 minutes ago</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#1F2937]/40 pt-2.5">
                  <span className="text-[#6B7280] font-semibold">Workspace Pipeline</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Listening Live
                  </span>
                </div>
              </div>
            </CardGlow>

            {/* LIVE SYSTEM STATUS CARD */}
            <CardGlow className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-5 rounded-2xl space-y-4 hover:border-amber-500/20 transition-all duration-300">
              <h3 className="text-white font-extrabold text-sm uppercase tracking-wider flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Sync Integration Status
              </h3>
              
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between border-b border-[#1F2937]/40 pb-2">
                  <span className="text-[#6B7280] font-semibold">Live Pipeline Connection</span>
                  <span className="text-emerald-400 font-bold">Active Connected</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1F2937]/40 pb-2">
                  <span className="text-[#6B7280] font-semibold">Last Synchronization</span>
                  <span className="text-white font-bold">{isSyncing ? 'Synchronizing right now' : syncMessage}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1F2937]/40 pb-2">
                  <span className="text-[#6B7280] font-semibold">Target Repository</span>
                  <span className="text-white font-mono font-bold text-amber-500">codespark-core-engine</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280] font-semibold">Last Processed Commit</span>
                  <span className="text-white font-bold">10 minutes ago</span>
                </div>
              </div>
            </CardGlow>

            {/* CURRENT DEV GOALS */}
            <CardGlow className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-5 rounded-2xl space-y-4 hover:border-amber-500/20 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-extrabold text-sm uppercase tracking-wider">GitHub Milestones</h3>
                <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-bold uppercase">Weekly Focus</span>
              </div>
              
              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#D1D5DB] font-semibold">Push 5 Commits Today</span>
                    <span className="text-amber-400 font-bold">4 / 5</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0B1120] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-1000 ease-out" style={{ width: pageMounted ? '80%' : '0%' }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#D1D5DB] font-semibold">Open Source Commit Pull</span>
                    <span className="text-amber-400 font-bold">1 / 1</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0B1120] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-1000 ease-out" style={{ width: pageMounted ? '100%' : '0%' }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#D1D5DB] font-semibold">Update Repository README docs</span>
                    <span className="text-amber-400 font-bold">0 / 1</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0B1120] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-1000 ease-out" style={{ width: '0%' }} />
                  </div>
                </div>
              </div>
            </CardGlow>

          </div>

          {/* --- RIGHT COLUMN: Interactive Graphs, Stats & Repositories --- */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* HERO LEVEL STATS ROW */}
            <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-700 delay-200 transform ${
              pageMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <CardGlow className="bg-[#111827]/80 border border-[#1F2937] p-5 rounded-2xl flex flex-col justify-between transition-all duration-350 hover:border-amber-500/20 hover:scale-[1.02] hover:shadow-[0_4px_25px_rgba(245,158,11,0.03)] group">
                <div className="flex items-center justify-between text-[#6B7280]">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Workspace Repos</span>
                  <Code2 className="w-4 h-4 text-amber-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                </div>
                <div className="mt-4">
                  <span className="block text-3xl font-extrabold text-white">
                    <AnimatedCounter value={34} />
                  </span>
                  <span className="text-[10px] text-[#9CA3AF] font-medium">26 Public / 8 Private</span>
                </div>
              </CardGlow>

              <CardGlow className="bg-[#111827]/80 border border-[#1F2937] p-5 rounded-2xl flex flex-col justify-between transition-all duration-350 hover:border-amber-500/20 hover:scale-[1.02] hover:shadow-[0_4px_25px_rgba(245,158,11,0.03)] group">
                <div className="flex items-center justify-between text-[#6B7280]">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Contribution Rate</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="mt-4">
                  <span className="block text-3xl font-extrabold text-white">
                    <AnimatedCounter value={92.4} decimals={1} suffix="%" />
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5">
                    <TrendingUp className="w-3.5 h-3.5" /> High Consistency
                  </span>
                </div>
              </CardGlow>

              <CardGlow className="bg-[#111827]/80 border border-[#1F2937] p-5 rounded-2xl flex flex-col justify-between transition-all duration-350 hover:border-amber-500/20 hover:scale-[1.02] hover:shadow-[0_4px_25px_rgba(245,158,11,0.03)] group">
                <div className="flex items-center justify-between text-[#6B7280]">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Stars Acquired</span>
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500/20 transition-transform duration-350 group-hover:rotate-[72deg]" />
                </div>
                <div className="mt-4">
                  <span className="block text-3xl font-extrabold text-white">
                    <AnimatedCounter value={312} />
                  </span>
                  <span className="text-[10px] text-amber-400 font-semibold flex items-center gap-0.5">
                    <Sparkles className="w-3 h-3" /> Popularity milestone
                  </span>
                </div>
              </CardGlow>
            </div>

            {/* CONTRIBUTION HEATMAP REDESIGN */}
            <div 
              ref={containerRef}
              className={`relative bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-6 rounded-2xl flex flex-col gap-5 select-none shadow-2xl overflow-visible transition-all duration-700 delay-300 transform ${
                pageMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              } hover:border-amber-500/10`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F2937]/60 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                    <Github className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm tracking-tight uppercase">Platform Activity Tree</h3>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">Yearly commit clusters and gamified XP rewards</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="flex flex-col text-right">
                    <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider">Yearly Contributions</span>
                    <span className="text-white font-extrabold text-base mt-0.5">
                      <AnimatedCounter value={1842} /> Contributions
                    </span>
                  </div>
                  <div className="w-px h-8 bg-[#1F2937]" />
                  <div className="flex flex-col text-right">
                    <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider">XP Yielded</span>
                    <span className="text-amber-400 font-extrabold text-base mt-0.5">
                      +<AnimatedCounter value={4820} /> XP
                    </span>
                  </div>
                </div>
              </div>

              {/* Matrix Layout Area */}
              <div className="relative w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-2">
                <div className="min-w-[760px] flex flex-col gap-2 relative">
                  
                  {/* Month labels timeline */}
                  <div className="relative h-6 text-[#6B7280] text-[11px] font-semibold tracking-wider">
                    {monthLabels.map((label, index) => (
                      <span 
                        key={index} 
                        className="absolute transition-opacity duration-500"
                        style={{ left: `${(label.colIndex * 13.8) + 28}px` }}
                      >
                        {label.text}
                      </span>
                    ))}
                  </div>

                  {/* Grid Layout Rows + Y-Axis Label Stack */}
                  <div className="flex gap-2.5">
                    <div className="flex flex-col justify-between text-[#6B7280] text-[10px] font-bold py-1.5 w-6 select-none uppercase">
                      <span>Mon</span>
                      <span>Wed</span>
                      <span>Fri</span>
                      <span>Sun</span>
                    </div>

                    {/* Week-by-Week Staggered Core Blocks */}
                    <div className="flex gap-1 flex-1">
                      {columns.map((week, colIdx) => (
                        <div 
                          key={colIdx} 
                          className="flex flex-col gap-1 transition-all duration-500 transform"
                          style={{ 
                            transitionDelay: `${colIdx * 12}ms`,
                            transform: pageMounted ? 'scale(1)' : 'scale(0.8)',
                            opacity: pageMounted ? 1 : 0
                          }}
                        >
                          {week.map((day, rowIdx) => {
                            if (!day) return <div key={rowIdx} className="w-2.5 h-2.5 rounded-sm bg-transparent" />;
                            return (
                              <button
                                key={rowIdx}
                                onMouseEnter={(e) => handleCellMouseEnter(day, e)}
                                onMouseLeave={() => setHoveredDay(null)}
                                className={`w-2.5 h-2.5 rounded-[2px] border transition-all duration-300 ease-out cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500 ${getCellColors(day.level, day)}`}
                                aria-label={`Cell activity level: ${day.level}`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Grid Tooltip Overlay */}
                {hoveredCell && (
                  <div 
                    className="absolute z-50 w-64 bg-[#111827] border border-[#1F2937] rounded-xl p-3.5 shadow-2xl border-t-amber-500/40 pointer-events-none transition-all duration-300 transform scale-100 opacity-100 -translate-x-1/2 -translate-y-full"
                    style={{ 
                      left: `${tooltipPos.x}px`, 
                      top: `${tooltipPos.y}px` 
                    }}
                  >
                    <div className="flex items-center justify-between border-b border-[#1F2937]/50 pb-2">
                      <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF] font-medium">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        <span>{hoveredCell.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                        Level {hoveredCell.level}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center bg-[#0B1120]/40 p-2 rounded-lg border border-[#1F2937]/30">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-wider font-bold text-[#6B7280]">Contributions</span>
                        <span className="text-white text-sm font-extrabold mt-0.5">{hoveredCell.commits} commits</span>
                      </div>
                      <div className="flex flex-col border-l border-[#1F2937]">
                        <span className="text-[9px] uppercase tracking-wider font-bold text-[#6B7280]">Spark Score</span>
                        <span className="text-amber-400 text-sm font-extrabold mt-0.5">{hoveredCell.score}%</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#6B7280]">Most Active Repo task</span>
                      <span className="text-xs text-white truncate font-medium">{hoveredCell.task}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Less vs More Activity Scaled Legend Footer */}
              <div className="flex items-center justify-between border-t border-[#1F2937]/60 pt-4 text-xs text-[#6B7280] font-medium">
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors group">
                  <Info className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                  <span>Learn more about commit hydration ranks</span>
                </div>

                <div className="flex items-center gap-2">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-[2px] border border-[#1F2937]/60 bg-[#1F2937]/20" />
                    <div className="w-2.5 h-2.5 rounded-[2px] border border-amber-900/30 bg-amber-950/40" />
                    <div className="w-2.5 h-2.5 rounded-[2px] border border-amber-700/40 bg-amber-800/40" />
                    <div className="w-2.5 h-2.5 rounded-[2px] border border-amber-500/40 bg-amber-600/70" />
                    <div className="w-2.5 h-2.5 rounded-[2px] border border-amber-300/50 bg-amber-400 shadow-[0_0_4px_rgba(245,158,11,0.3)]" />
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>

            {/* --- CORE DOUBLE SEGMENT: Language Analytics & Productivity Insights --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* LANGUAGE ANALYTICS (SVG DONUT CHART WITH CODING HOURS) */}
              <CardGlow className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-5 rounded-2xl flex flex-col justify-between shadow-xl hover:border-amber-500/20 transition-all duration-300">
                <div>
                  <h3 className="text-white font-extrabold text-sm uppercase tracking-wider mb-1">Language Analytics</h3>
                  <p className="text-xs text-[#9CA3AF] mb-4">Core repository tree compilation splits</p>
                </div>

                <div className="flex items-center justify-around gap-4 py-2">
                  <div className="relative h-28 w-28 flex-shrink-0 group/donut">
                    <svg className="w-full h-full transform -rotate-90 transition-transform duration-500 group-hover/donut:rotate-0" viewBox="0 0 42 42">
                      <circle cx="21" cy="21" r="15.915" fill="none" stroke="#1F2937" strokeWidth="4.2" />
                      {/* React/TS Arc (42%) */}
                      <circle 
                        cx="21" cy="21" r="15.915" fill="none" 
                        stroke="#f1e05a" strokeWidth="4.2" 
                        strokeDasharray={pageMounted ? "42 58" : "0 100"} strokeDashoffset="0" 
                        className="transition-all duration-1000 ease-out"
                      />
                      {/* TypeScript Arc (31%) */}
                      <circle 
                        cx="21" cy="21" r="15.915" fill="none" 
                        stroke="#3178c6" strokeWidth="4.2" 
                        strokeDasharray={pageMounted ? "31 69" : "0 100"} strokeDashoffset="-42" 
                        className="transition-all duration-1000 ease-out"
                      />
                      {/* Python Arc (15%) */}
                      <circle 
                        cx="21" cy="21" r="15.915" fill="none" 
                        stroke="#3572A5" strokeWidth="4.2" 
                        strokeDasharray={pageMounted ? "15 85" : "0 100"} strokeDashoffset="-73" 
                        className="transition-all duration-1000 ease-out"
                      />
                      {/* Java Arc (12%) */}
                      <circle 
                        cx="21" cy="21" r="15.915" fill="none" 
                        stroke="#b07219" strokeWidth="4.2" 
                        strokeDasharray={pageMounted ? "12 88" : "0 100"} strokeDashoffset="-88" 
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-sm font-extrabold text-white">100%</span>
                      <span className="text-[8px] font-bold text-[#6B7280] uppercase tracking-wider">Verified</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs font-bold">
                    {ENHANCED_LANGUAGES.map((lang, idx) => (
                      <div key={idx} className="flex items-center gap-2 group/lang cursor-pointer">
                        <div className="w-2.5 h-2.5 rounded-full transition-transform duration-300 group-hover/lang:scale-125" style={{ backgroundColor: lang.color }} />
                        <span className="text-[#D1D5DB] group-hover/lang:text-white transition-colors">{lang.name} ({lang.percent}%)</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#1F2937]/50 pt-3 mt-3 grid grid-cols-2 gap-2 text-[10px] text-[#9CA3AF] font-bold uppercase tracking-wider">
                  <div>
                    <span>EST. HOURS</span>
                    <span className="block text-xs font-extrabold text-white mt-0.5">
                      <AnimatedCounter value={285} suffix=" Hours" />
                    </span>
                  </div>
                  <div className="border-l border-[#1F2937]/50 pl-3">
                    <span>REPOS LOGGED</span>
                    <span className="block text-xs font-extrabold text-white mt-0.5">
                      <AnimatedCounter value={30} suffix=" Repos" />
                    </span>
                  </div>
                </div>
              </CardGlow>

              {/* PRODUCTIVITY INSIGHTS */}
              <CardGlow className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-5 rounded-2xl space-y-4 shadow-xl hover:border-amber-500/20 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-white font-extrabold text-sm uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-amber-500 animate-pulse" />
                    Productivity Insights
                  </h3>
                  <p className="text-xs text-[#9CA3AF]">Calculated performance telemetry data</p>
                </div>
                
                <div className="space-y-2.5 text-xs font-semibold">
                  <div className="flex items-center justify-between p-2.5 bg-[#0B1120]/60 border border-[#1F2937]/80 rounded-xl transition-all duration-300 hover:bg-[#111827] hover:border-amber-500/10">
                    <span className="text-[#6B7280]">Peak Active Day</span>
                    <span className="text-white font-mono font-bold">Tuesday</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-[#0B1120]/60 border border-[#1F2937]/80 rounded-xl transition-all duration-300 hover:bg-[#111827] hover:border-amber-500/10">
                    <span className="text-[#6B7280]">Peak Active Time</span>
                    <span className="text-white font-bold text-amber-500">6 PM - 10 PM</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-[#0B1120]/60 border border-[#1F2937]/80 rounded-xl transition-all duration-300 hover:bg-[#111827] hover:border-amber-500/10">
                    <span className="text-[#6B7280]">Average Commits / Day</span>
                    <span className="text-white font-bold">5.4 Commits</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-[#0B1120]/60 border border-[#1F2937]/80 rounded-xl transition-all duration-300 hover:bg-[#111827] hover:border-amber-500/10">
                    <span className="text-[#6B7280]">Average Active Hours</span>
                    <span className="text-white font-bold">3.8 Hours/day</span>
                  </div>
                </div>
              </CardGlow>

            </div>

            {/* --- REPOSITORY SEARCH, FILTERS, AND LIST SECTION --- */}
            <div className="space-y-4">
              
              <div className="flex flex-col xl:flex-row gap-4 items-stretch justify-between bg-[#111827]/40 border border-[#1F2937]/80 p-4 rounded-2xl shadow-xl">
                
                {/* Search Text Input container */}
                <div className="relative flex-grow sm:max-w-md group">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#6B7280] group-focus-within:text-amber-500 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search repositories by name, language..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-white placeholder-[#6B7280] focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all duration-300"
                  />
                </div>

                {/* Filter Selector Row */}
                <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
                  {['All', 'Public', 'Private', 'Forked', 'Archived'].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer whitespace-nowrap active:scale-95 ${
                        selectedFilter === filter 
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-extrabold shadow-[0_2px_10px_rgba(245,158,11,0.08)]' 
                          : 'text-[#9CA3AF] border border-transparent hover:text-white hover:bg-slate-800/40'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

              </div>

              {/* SKELETON LOADER FEEDBACK & REPOSITORIES GRID LIST */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(placeholder => (
                    <div key={placeholder} className="bg-[#111827]/40 border border-[#1F2937] p-5 rounded-2xl space-y-4 overflow-hidden relative">
                      <div className="absolute inset-0 animate-shimmer-progress bg-slate-900/10" />
                      <div className="flex items-center justify-between relative z-10">
                        <div className="h-4 bg-slate-800 rounded w-1/2 animate-pulse" />
                        <div className="h-3 bg-slate-800 rounded w-16 animate-pulse" />
                      </div>
                      <div className="h-3 bg-slate-800 rounded w-full animate-pulse relative z-10" />
                      <div className="h-3 bg-slate-800 rounded w-3/4 animate-pulse relative z-10" />
                      <div className="flex gap-2 pt-2 relative z-10">
                        <div className="h-5 bg-slate-800 rounded w-12 animate-pulse" />
                        <div className="h-5 bg-slate-800 rounded w-12 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredRepos.length === 0 ? (
                <div className="bg-[#111827]/40 border border-[#1F2937]/80 p-12 rounded-2xl text-center space-y-4 shadow-xl">
                  <div className="w-16 h-16 bg-[#0B1120] rounded-full flex items-center justify-center mx-auto text-slate-700">
                    <Inbox className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-white font-bold text-base">No repositories found</h4>
                    <p className="text-xs text-[#9CA3AF] max-w-sm mx-auto">
                      Try relaxing your repository status selection filters or adjusting search strings to find elements.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredRepos.map((repo, idx) => (
                    <div 
                      key={idx}
                      className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-5 rounded-2xl flex flex-col justify-between gap-4 transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-500/20 group hover:shadow-[0_8px_32px_rgba(245,158,11,0.06)] transform"
                      style={{ 
                        transitionDelay: `${idx * 50}ms`,
                        animationPlayState: 'running'
                      }}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm sm:text-base font-extrabold text-white group-hover:text-amber-400 transition-colors truncate flex items-center gap-1.5">
                            {repo.name}
                          </h4>
                          <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 border rounded-full transition-transform duration-300 group-hover:scale-105 ${
                            repo.visibility === 'Public'
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                              : repo.visibility === 'Private'
                                ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                                : 'bg-[#1F2937] border-slate-700 text-[#9CA3AF]'
                          }`}>
                            {repo.visibility}
                          </span>
                        </div>

                        <p className="text-xs text-[#9CA3AF] leading-relaxed line-clamp-2 min-h-[32px]">
                          {repo.description}
                        </p>

                        {/* Additional Health and Commit parameters */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#1F2937]/50 text-[10px] text-[#6B7280]">
                          <span className="flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                            Health: <strong className="text-emerald-400 group-hover:underline">{repo.healthScore}%</strong>
                          </span>
                          <span>Last pushed {repo.lastPush}</span>
                        </div>

                        {/* Languages Tag lists */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {repo.tags.map((tag, tagIdx) => (
                            <span key={tagIdx} className="bg-slate-800/40 text-[#D1D5DB] text-[9px] font-bold px-2 py-0.5 rounded-md border border-[#1F2937] transition-all duration-300 hover:border-amber-500/40 hover:text-white cursor-pointer">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Repo Footer Metrics Row */}
                      <div className="flex items-center justify-between border-t border-[#1F2937]/50 pt-3.5 mt-1 text-xs relative overflow-hidden">
                        <div className="flex items-center gap-3 font-semibold text-[#9CA3AF] transition-transform duration-350 group-hover:-translate-y-8">
                          <div className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                            <span>{repo.language}</span>
                          </div>
                          
                          <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer group/stat">
                            <Star className="w-3.5 h-3.5 group-hover/stat:rotate-[72deg] transition-transform" />
                            <span>{repo.stars}</span>
                          </div>

                          <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                            <GitFork className="w-3.5 h-3.5" />
                            <span>{repo.forks}</span>
                          </div>
                        </div>

                        {/* Slide-in View Repository Trigger */}
                        <button 
                          onClick={() => triggerToast(`Opening connection path for ${repo.name}...`, 'info')}
                          className="absolute bottom-0 left-0 text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1 transition-all duration-300 transform translate-y-8 group-hover:translate-y-0 cursor-pointer"
                        >
                          Open Repository <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </button>

                        <span className="text-[10px] text-[#6B7280] font-bold uppercase transition-opacity duration-300 group-hover:opacity-0">{repo.updatedAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* --- RECENT COMMIT TIMELINE --- */}
            <div className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-5 rounded-2xl space-y-5 shadow-xl hover:border-amber-500/10 transition-all duration-500">
              <h3 className="text-white font-extrabold text-sm uppercase tracking-wider border-b border-[#1F2937]/50 pb-3">
                Recent Commit Timeline Feed
              </h3>
              
              <div className="relative border-l-2 border-[#1F2937] ml-3.5 pl-6 space-y-6">
                {MOCK_REPOSITORIES.map((repo, idx) => (
                  <div 
                    key={idx} 
                    className="relative group transition-all duration-500 transform hover:translate-x-1"
                    style={{ transitionDelay: `${idx * 40}ms` }}
                  >
                    <div className="absolute -left-[31px] top-0 h-6.5 w-6.5 rounded-full bg-[#0B1120] border-2 border-[#1F2937] group-hover:border-amber-500 flex items-center justify-center text-amber-500 transition-all duration-300 shadow group-hover:shadow-[0_0_8px_rgba(245,158,11,0.4)]">
                      <GitCommit className="w-3.5 h-3.5 group-hover:scale-115 transition-transform" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold text-amber-500 cursor-pointer hover:underline">{repo.name}</span>
                        <span className="text-[10px] text-[#6B7280] font-bold uppercase">&bull; Just Synced</span>
                      </div>
                      <p className="text-xs text-[#D1D5DB] leading-relaxed font-semibold">
                        {repo.lastCommit || "Pushed new features to main tree. Initialized system architecture design tokens mapping."}
                      </p>
                      <span className="inline-block text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md hover:scale-105 transition-transform cursor-pointer">
                        +40 XP Spark Earned
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}