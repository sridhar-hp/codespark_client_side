import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Check, 
  Flame, 
  Trophy, 
  Search, 
  Calendar, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  CheckSquare, 
  Tag, 
  AlertCircle, 
  SlidersHorizontal, 
  RotateCcw, 
  X, 
  Grid, 
  FolderMinus, 
  TrendingUp, 
  Bookmark,
  CheckCircle2,
  Trash2,
  Inbox
} from 'lucide-react';

const INITIAL_CATEGORIES = [
  { id: 'all-cats', name: 'All Categories', icon: '📁' },
  { id: 'dev', name: 'Development', icon: '💻' },
  { id: 'dsa', name: 'DSA', icon: '🧩' },
  { id: 'learn', name: 'Learning', icon: '📚' },
  { id: 'comm', name: 'Communication', icon: '🗣' },
  { id: 'career', name: 'Career', icon: '💼' },
  { id: 'personal', name: 'Personal', icon: '🎯' }
];

const INITIAL_ROUTINE = [
  { id: 1, text: 'GitHub Commit', done: true, xp: 20 },
  { id: 2, text: 'React Practice', done: false, xp: 30 },
  { id: 3, text: 'LeetCode Problem', done: true, xp: 50 },
  { id: 4, text: 'Learning Session', done: false, xp: 40 },
  { id: 5, text: 'Communication Sync', done: false, xp: 15 }
];

const INITIAL_TASKS = [
  {
    id: 1,
    title: 'React Dashboard UI',
    description: 'Structure custom grid blocks, design tokens, and build animated widgets.',
    category: 'Development',
    priority: 'High',
    assignDate: '2026-07-07',
    dueDate: '2026-07-09',
    estimatedTime: 90,
    xpReward: 80,
    status: 'In Progress'
  },
  {
    id: 2,
    title: 'LeetCode Dynamic Programming Practice',
    description: 'Solve the weekly dynamic programming and string pattern matching sets.',
    category: 'DSA',
    priority: 'High',
    assignDate: '2026-07-06',
    dueDate: '2026-07-07',
    estimatedTime: 60,
    xpReward: 100,
    status: 'Pending'
  },
  {
    id: 3,
    title: 'Review System Architecture Draft',
    description: 'Read over the API endpoints design and schema documentation for the backend.',
    category: 'Communication',
    priority: 'Medium',
    assignDate: '2026-07-07',
    dueDate: '2026-07-08',
    estimatedTime: 45,
    xpReward: 50,
    status: 'Completed'
  },
  {
    id: 4,
    title: 'Draft Weekly System Status Report',
    description: 'Document current performance metrics and build latency logs.',
    category: 'Personal',
    priority: 'Low',
    assignDate: '2026-07-07',
    dueDate: '2026-07-07',
    estimatedTime: 30,
    xpReward: 30,
    status: 'Completed'
  },
  {
    id: 5,
    title: 'LinkedIn Portfolio Writeup',
    description: 'Draft an article on implementing micro-frontend architectures with Vite.',
    category: 'Career',
    priority: 'Low',
    assignDate: '2026-07-07',
    dueDate: '2026-07-10',
    estimatedTime: 40,
    xpReward: 40,
    status: 'Pending'
  },
  {
    id: 6,
    title: 'Design System Tokens Alignment',
    description: 'Fix the color preset warnings and map semantic values across components.',
    category: 'Development',
    priority: 'Medium',
    assignDate: '2026-07-05',
    dueDate: '2026-07-06',
    estimatedTime: 120,
    xpReward: 90,
    status: 'Overdue'
  }
];

export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [routine, setRoutine] = useState(INITIAL_ROUTINE);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom Toast state for dynamic interactions feedback
  const [toasts, setToasts] = useState([]);
  
  // Stats calculations derived from state to support live reactive mock updates
  const totalTasksCount = tasks.length;
  const completedTasksCount = tasks.filter(t => t.status === 'Completed').length;
  const completionRate = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;
  
  // Calculate simulated XP earned today
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    // Smooth progress ring initialization animation
    const timer = setTimeout(() => {
      setAnimatedProgress(completionRate);
    }, 150);
    return () => clearTimeout(timer);
  }, [completionRate]);

  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task.id === taskId) {
          const isCompleting = task.status !== 'Completed';
          const nextStatus = isCompleting ? 'Completed' : 'Pending';
          
          if (isCompleting) {
            triggerToast(`+${task.xpReward} XP Earned! "${task.title}" Completed.`, 'xp');
          } else {
            triggerToast(`Task "${task.title}" marked as Pending.`, 'info');
          }
          
          return { ...task, status: nextStatus };
        }
        return task;
      });
    });
  };

  const handleCreateTask = (newTask) => {
    setTasks(prev => [
      {
        id: Date.now(),
        ...newTask,
        status: newTask.status || 'Pending'
      },
      ...prev
    ]);
    triggerToast(`Task "${newTask.title}" added successfully!`, 'success');
  };

  const toggleRoutineItem = (itemId) => {
    setRoutine(prev => prev.map(item => {
      if (item.id === itemId) {
        const nextState = !item.done;
        if (nextState) {
          triggerToast(`Daily Routine: +${item.xp} XP!`, 'xp');
        }
        return { ...item, done: nextState };
      }
      return item;
    }));
  };

  const filteredTasks = tasks.filter(task => {
    // 1. Category Filter
    if (selectedCategory !== 'All Categories' && task.category !== selectedCategory) {
      return false;
    }

    // 2. Search Query Filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(query);
      const matchesDesc = task.description.toLowerCase().includes(query);
      if (!matchesTitle && !matchesDesc) return false;
    }

    // 3. Status Tab Filter
    switch (selectedFilter) {
      case 'today':
        return task.assignDate === '2026-07-07';
      case 'upcoming':
        return task.dueDate > '2026-07-07' && task.status !== 'Completed';
      case 'completed':
        return task.status === 'Completed';
      case 'overdue':
        return task.status === 'Overdue' || (task.dueDate < '2026-07-07' && task.status !== 'Completed');
      case 'all':
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F9FAFB] font-sans antialiased relative">
      
      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl animate-slide-up duration-300 ${
              toast.type === 'xp' 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                : toast.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-slate-900 border-[#1F2937] text-white'
            }`}
          >
            <div className="flex-shrink-0">
              {toast.type === 'xp' ? <Sparkles className="w-5 h-5 text-amber-500" /> : <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            </div>
            <p className="text-xs font-semibold tracking-wide">{toast.message}</p>
          </div>
        ))}
      </div>

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        
        {}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1F2937]/60 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <CheckSquare className="w-8 h-8 text-amber-500" />
              Tasks
            </h1>
            <p className="text-sm text-[#9CA3AF] font-medium tracking-wide">
              Plan. Build. Complete. Level Up.
            </p>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-[#0B1120] font-bold text-sm rounded-xl transition-all shadow-[0_4px_20px_rgba(245,158,11,0.15)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.25)] hover:scale-102 cursor-pointer active:scale-98"
          >
            <Plus className="w-4.5 h-4.5 stroke-[3px]" />
            New Task
          </button>
        </div>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Circular Progress Layout card */}
          <div className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6 shadow-xl relative overflow-hidden group hover:border-[#1F2937]/80 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.01] rounded-full blur-3xl pointer-events-none" />
            
            {/* SVG Ring Construction */}
            <div className="relative w-32 h-32 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  className="stroke-slate-800" 
                  strokeWidth="8" 
                  fill="none" 
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  className="stroke-amber-500 transition-all duration-1000 ease-out" 
                  strokeWidth="8" 
                  fill="none" 
                  strokeDasharray="251.2" 
                  strokeDashoffset={251.2 - (251.2 * animatedProgress) / 100} 
                  strokeLinecap="round" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold text-white">{completionRate}%</span>
                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Completed</span>
              </div>
            </div>

            <div className="space-y-3 text-center sm:text-left flex-grow">
              <div className="space-y-1">
                <h4 className="text-white font-bold text-base">Daily Sprint Progress</h4>
                <p className="text-xs text-[#9CA3AF] font-medium">
                  {completedTasksCount} / {totalTasksCount} Tasks Completed
                </p>
              </div>
              <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-start">
                <div className="bg-amber-500/10 text-amber-400 text-xs px-2.5 py-1 rounded-lg border border-amber-500/20 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  +320 Today's XP
                </div>
                <div className="bg-orange-500/10 text-orange-400 text-xs px-2.5 py-1 rounded-lg border border-orange-500/20 font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  42 Days Active
                </div>
              </div>
            </div>
          </div>

          {/* Mini Stat Cards Segment */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* Stat Card 1: Completed Today */}
            <div className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-amber-500/20 hover:scale-[1.02] hover:shadow-[0_4px_25px_rgba(245,158,11,0.04)] group">
              <div className="flex items-center justify-between text-[#6B7280]">
                <span className="text-xs font-semibold uppercase tracking-wider">Completed</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="mt-4">
                <span className="block text-2xl font-extrabold text-white tracking-tight">{completedTasksCount}</span>
                <span className="text-[10px] text-[#9CA3AF] font-medium">Tasks resolved</span>
              </div>
            </div>

            {/* Stat Card 2: Pending Tasks */}
            <div className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-amber-500/20 hover:scale-[1.02] hover:shadow-[0_4px_25px_rgba(245,158,11,0.04)] group">
              <div className="flex items-center justify-between text-[#6B7280]">
                <span className="text-xs font-semibold uppercase tracking-wider">Pending</span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <div className="mt-4">
                <span className="block text-2xl font-extrabold text-white tracking-tight">
                  {tasks.filter(t => t.status !== 'Completed').length}
                </span>
                <span className="text-[10px] text-[#9CA3AF] font-medium">Tasks in backlog</span>
              </div>
            </div>

            {/* Stat Card 3: Today's XP */}
            <div className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-amber-500/20 hover:scale-[1.02] hover:shadow-[0_4px_25px_rgba(245,158,11,0.04)] group">
              <div className="flex items-center justify-between text-[#6B7280]">
                <span className="text-xs font-semibold uppercase tracking-wider">Today's XP</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div className="mt-4">
                <span className="block text-2xl font-extrabold text-white tracking-tight">+320</span>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> +12% vs avg
                </span>
              </div>
            </div>

            {/* Stat Card 4: Current Streak */}
            <div className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-amber-500/20 hover:scale-[1.02] hover:shadow-[0_4px_25px_rgba(245,158,11,0.04)] group">
              <div className="flex items-center justify-between text-[#6B7280]">
                <span className="text-xs font-semibold uppercase tracking-wider">Streak</span>
                <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              </div>
              <div className="mt-4">
                <span className="block text-2xl font-extrabold text-white tracking-tight">42 Days</span>
                <span className="text-[10px] text-[#9CA3AF] font-medium">Highest: 56 Days</span>
              </div>
            </div>

          </div>
        </div>

        {}
        <div className="flex flex-col xl:flex-row gap-4 items-stretch justify-between bg-[#111827]/40 border border-[#1F2937]/80 p-4 rounded-2xl">
          
          {/* Tab filters list */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
            {['all', 'today', 'upcoming', 'completed', 'overdue'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  selectedFilter === tab 
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-extrabold shadow-[0_2px_10px_rgba(245,158,11,0.08)]' 
                    : 'text-[#9CA3AF] border border-transparent hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input Container */}
            <div className="relative flex-grow sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#6B7280]" />
              <input 
                type="text" 
                placeholder="Search tasks..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl pl-10 pr-4 py-2 text-xs font-semibold text-white placeholder-[#6B7280] focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all"
              />
            </div>

            {/* Quick reset of category/filters helper button */}
            {(selectedCategory !== 'All Categories' || selectedFilter !== 'all' || searchQuery !== '') && (
              <button 
                onClick={() => {
                  setSelectedCategory('All Categories');
                  setSelectedFilter('all');
                  setSearchQuery('');
                  triggerToast('Filters reset successfully.', 'info');
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2 border border-dashed border-[#1F2937] rounded-xl text-[#9CA3AF] hover:text-white hover:border-amber-500/30 text-xs font-bold transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Horizontal Panel selection */}
        <div className="space-y-2">
          <span className="block text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Filter by Category</span>
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {INITIAL_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.name
                    ? 'bg-[#111827] border-amber-500/60 text-white shadow-[0_0_15px_rgba(245,158,11,0.06)]'
                    : 'bg-[#111827]/40 border-[#1F2937]/80 text-[#9CA3AF] hover:text-white hover:border-[#374151]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Tasks List Segment */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-widest">
                Filtered Tasks ({filteredTasks.length})
              </span>
              <span className="text-xs text-[#9CA3AF] font-medium">
                Showing {selectedCategory}
              </span>
            </div>

            {filteredTasks.length === 0 ? (
              <div className="bg-[#111827]/40 border border-[#1F2937]/80 p-12 rounded-2xl text-center space-y-4">
                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto text-slate-700">
                  <Inbox className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-white font-bold text-base">No tasks matched</h4>
                  <p className="text-xs text-[#9CA3AF] max-w-sm mx-auto">
                    Try relaxing your category selection, search terms, or status filters to find your backlog items.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setSelectedCategory('All Categories');
                    setSelectedFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-slate-800 text-white hover:bg-slate-750 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Reset Active Filters
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map((task, idx) => {
                  const isCompleted = task.status === 'Completed';
                  const isOverdue = task.status === 'Overdue';
                  
                  return (
                    <div 
                      key={task.id}
                      className={`relative bg-[#111827]/80 backdrop-blur-md border p-5 rounded-2xl flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-all duration-300 group hover:scale-[1.005] ${
                        isCompleted 
                          ? 'border-[#1F2937]/50 opacity-60 hover:opacity-80' 
                          : isOverdue 
                            ? 'border-rose-500/20 hover:border-rose-500/35 shadow-[0_4px_15px_rgba(239,68,68,0.02)]'
                            : 'border-[#1F2937] hover:border-amber-500/20'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Checkbox implementation */}
                        <button 
                          onClick={() => toggleTaskStatus(task.id)}
                          aria-label={`Toggle completion state of task: ${task.title}`}
                          className={`mt-1 h-5 w-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-all cursor-pointer ${
                            isCompleted 
                              ? 'bg-amber-500 border-amber-500 text-[#0B1120]' 
                              : 'bg-slate-900 border-[#1F2937] hover:border-amber-500/60'
                          }`}
                        >
                          {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                        </button>

                        <div className="space-y-1.5 max-w-lg">
                          <h3 className={`text-base font-bold transition-colors ${
                            isCompleted ? 'text-[#6B7280] line-through' : 'text-white group-hover:text-amber-400'
                          }`}>
                            {task.title}
                          </h3>
                          <p className={`text-xs leading-relaxed ${isCompleted ? 'text-[#4B5563]' : 'text-[#9CA3AF]'}`}>
                            {task.description}
                          </p>
                          
                          {/* Attributes indicators tags row */}
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <span className="bg-slate-800/60 text-[#D1D5DB] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-slate-700/50 flex items-center gap-1">
                              <Tag className="w-2.5 h-2.5" />
                              {task.category}
                            </span>
                            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                              task.priority === 'High' 
                                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                                : task.priority === 'Medium'
                                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                  : 'bg-slate-800 text-[#9CA3AF]'
                            }`}>
                              {task.priority} Priority
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right metadata / actions panel */}
                      <div className="flex flex-col sm:items-end justify-between gap-3 text-right">
                        
                        {/* Top rewards state */}
                        <div className="flex items-center sm:justify-end gap-2">
                          <span className="text-[#6B7280] text-[10px] font-bold uppercase tracking-wider">Reward</span>
                          <span className={`text-xs font-extrabold px-2 py-0.5 rounded-lg ${
                            isCompleted ? 'bg-slate-800/40 text-[#4B5563]' : 'bg-amber-500/10 text-amber-400 border border-amber-500/15 shadow-inner'
                          }`}>
                            +{task.xpReward} XP
                          </span>
                        </div>

                        {/* Mid dates metadata info */}
                        <div className="space-y-1 text-left sm:text-right">
                          <div className="text-[10px] text-[#6B7280] font-bold flex items-center sm:justify-end gap-1.5 uppercase">
                            <Calendar className="w-3 h-3" />
                            <span>Due: {task.dueDate}</span>
                          </div>
                          <div className="text-[10px] text-[#6B7280] font-bold flex items-center sm:justify-end gap-1.5 uppercase">
                            <Clock className="w-3 h-3" />
                            <span>Estimated: {task.estimatedTime} min</span>
                          </div>
                        </div>

                        {/* Status visual box badge */}
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg w-fit sm:ml-auto border ${
                          isCompleted
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            : isOverdue
                              ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                              : task.status === 'In Progress'
                                ? 'bg-sky-500/10 border-sky-500/20 text-sky-400'
                                : 'bg-slate-800 border-[#1F2937] text-[#9CA3AF]'
                        }`}>
                          {task.status}
                        </span>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Comprehensive General Statistics Table metrics details */}
            <div className="bg-[#111827]/40 border border-[#1F2937]/80 rounded-2xl p-6 space-y-4">
              <h3 className="text-white font-extrabold text-sm uppercase tracking-wider">
                Platform Statistics
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-[#111827] border border-[#1F2937]/60 p-4 rounded-xl text-center">
                  <span className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Total Backlog</span>
                  <span className="block text-xl font-extrabold text-white mt-1">{totalTasksCount}</span>
                </div>
                <div className="bg-[#111827] border border-[#1F2937]/60 p-4 rounded-xl text-center">
                  <span className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Resolved</span>
                  <span className="block text-xl font-extrabold text-emerald-400 mt-1">{completedTasksCount}</span>
                </div>
                <div className="bg-[#111827] border border-[#1F2937]/60 p-4 rounded-xl text-center">
                  <span className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Resolution Rate</span>
                  <span className="block text-xl font-extrabold text-amber-400 mt-1">{completionRate}%</span>
                </div>
                <div className="bg-[#111827] border border-[#1F2937]/60 p-4 rounded-xl text-center">
                  <span className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Total XP Earned</span>
                  <span className="block text-xl font-extrabold text-white mt-1">2,840 XP</span>
                </div>
                <div className="bg-[#111827] border border-[#1F2937]/60 p-4 rounded-xl text-center col-span-2 md:col-span-1">
                  <span className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Streak Target</span>
                  <span className="block text-xl font-extrabold text-orange-400 mt-1">42 Days</span>
                </div>
              </div>
            </div>

          </div>

          {}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Daily Routine checklist card */}
            <div className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] rounded-2xl overflow-hidden shadow-xl">
              <div className="p-5 border-b border-[#1F2937] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4.5 h-4.5 text-amber-500" />
                  <h3 className="text-white font-bold text-sm">Daily Developer Routine</h3>
                </div>
                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                  Checklist
                </span>
              </div>
              
              <div className="p-4 space-y-2">
                {routine.map(item => (
                  <button
                    key={item.id}
                    onClick={() => toggleRoutineItem(item.id)}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0B1120]/40 border border-[#1F2937]/60 hover:bg-[#111827] hover:border-amber-500/20 text-left transition-all duration-200 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-4.5 w-4.5 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors ${
                        item.done 
                          ? 'bg-amber-500 border-amber-500 text-[#0B1120]' 
                          : 'bg-slate-900 border-[#1F2937] group-hover:border-amber-500'
                      }`}>
                        {item.done && <Check className="w-3 h-3 stroke-[3.5px]" />}
                      </div>
                      <span className={`text-xs font-semibold transition-all ${
                        item.done ? 'text-[#6B7280] line-through' : 'text-white group-hover:text-white'
                      }`}>
                        {item.text}
                      </span>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                      item.done ? 'bg-[#1F2937] text-[#4B5563]' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      +{item.xp} XP
                    </span>
                  </button>
                ))}
              </div>

              <div className="bg-[#111827]/40 p-4 border-t border-[#1F2937] text-center">
                <span className="text-[11px] font-semibold text-[#9CA3AF]">
                  Resolved items replenish at midnight.
                </span>
              </div>
            </div>

            {/* Quick Tips Box card layout */}
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-6 rounded-2xl space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-2 text-amber-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <h4 className="font-extrabold text-xs uppercase tracking-wider">Developer Consistency Pro Tip</h4>
              </div>
              <p className="text-xs text-[#D1D5DB] leading-relaxed">
                Breaking tasks down to slots under 90 minutes reduces cognitive loads. Checking tasks awards points contributing to your weekly Spark Level achievements.
              </p>
            </div>

          </div>

        </div>

      </div>

      {}
      {isModalOpen && (
        <AddTaskModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleCreateTask}
        />
      )}

    </div>
  );
}

function AddTaskModal({ onClose, onSubmit }) {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Development');
  const [priority, setPriority] = useState('Medium');
  const [assignDate, setAssignDate] = useState('2026-07-07');
  const [dueDate, setDueDate] = useState('2026-07-09');
  const [estimatedTime, setEstimatedTime] = useState(60);
  const [xpReward, setXpReward] = useState(50);
  const [repeat, setRepeat] = useState('Never');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;
    
    onSubmit({
      title: taskName,
      description,
      category,
      priority,
      assignDate,
      dueDate,
      estimatedTime: Number(estimatedTime),
      xpReward: Number(xpReward),
      repeat,
      status: 'Pending'
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1120]/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#111827] border border-[#1F2937] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative animate-scale-up duration-300">
        
        {/* Modal Window Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-[#1F2937] bg-[#111827]/60">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-extrabold text-white">Create New Task</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close task creation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Window Fields Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-thin">
          
          {/* Task Name field */}
          <div className="space-y-1">
            <label htmlFor="modal-name" className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">
              Task Name
            </label>
            <input 
              id="modal-name"
              type="text"
              required
              placeholder="e.g. Implement OAuth Flow"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-4 py-2.5 text-xs font-semibold text-white placeholder-[#6B7280] focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all"
            />
          </div>

          {/* Description field */}
          <div className="space-y-1">
            <label htmlFor="modal-desc" className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">
              Description
            </label>
            <textarea 
              id="modal-desc"
              rows={3}
              placeholder="Provide a short description of goals and metrics..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-4 py-2.5 text-xs font-semibold text-white placeholder-[#6B7280] focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all resize-none"
            />
          </div>

          {/* Category & Priority parameters split group */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Category dropdown field */}
            <div className="space-y-1">
              <label htmlFor="modal-category" className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">
                Category
              </label>
              <select
                id="modal-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-3 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
              >
                <option value="Development">💻 Development</option>
                <option value="DSA">🧩 DSA</option>
                <option value="Learning">📚 Learning</option>
                <option value="Communication">🗣 Communication</option>
                <option value="Career">💼 Career</option>
                <option value="Personal">🎯 Personal</option>
              </select>
            </div>

            {/* Priority option selection field */}
            <div className="space-y-1">
              <label htmlFor="modal-priority" className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">
                Priority
              </label>
              <select
                id="modal-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-3 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
              >
                <option value="High">🔴 High</option>
                <option value="Medium">🟡 Medium</option>
                <option value="Low">🟢 Low</option>
              </select>
            </div>

          </div>

          {/* Assign Date & Due Date split parameters group */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Assign Date */}
            <div className="space-y-1">
              <label htmlFor="modal-assign" className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">
                Assign Date
              </label>
              <input 
                id="modal-assign"
                type="date"
                required
                value={assignDate}
                onChange={(e) => setAssignDate(e.target.value)}
                className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
              />
            </div>

            {/* Due Date */}
            <div className="space-y-1">
              <label htmlFor="modal-due" className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">
                Due Date
              </label>
              <input 
                id="modal-due"
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
              />
            </div>

          </div>

          {/* Estimated Time & XP Reward parameters split group */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Estimated Time slider/numeric field */}
            <div className="space-y-1">
              <label htmlFor="modal-est" className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">
                Est. Time (min)
              </label>
              <input 
                id="modal-est"
                type="number"
                required
                min={10}
                max={480}
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-4 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
              />
            </div>

            {/* XP Reward field */}
            <div className="space-y-1">
              <label htmlFor="modal-xp" className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">
                XP Reward
              </label>
              <input 
                id="modal-xp"
                type="number"
                required
                min={10}
                max={500}
                value={xpReward}
                onChange={(e) => setXpReward(e.target.value)}
                className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-4 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
              />
            </div>

          </div>

          {/* Repeat frequency selection */}
          <div className="space-y-1">
            <label htmlFor="modal-repeat" className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">
              Repeat Cycle
            </label>
            <select
              id="modal-repeat"
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
              className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-3 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
            >
              <option value="Never">🔁 Never</option>
              <option value="Daily">🔁 Daily</option>
              <option value="Weekly">🔁 Weekly</option>
              <option value="Monthly">🔁 Monthly</option>
            </select>
          </div>

          {/* Modal Action Controls footer row */}
          <div className="flex gap-3 pt-4 border-t border-[#1F2937] mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-[#0B1120] font-bold text-xs rounded-xl transition-all shadow-[0_2px_15px_rgba(245,158,11,0.1)] cursor-pointer"
            >
              Create Task
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}