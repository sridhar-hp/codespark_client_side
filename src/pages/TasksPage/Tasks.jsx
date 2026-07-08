import React, { useState, useEffect, useRef } from 'react';
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

// --- PREMIUM HARDWARE-ACCELERATED KEYFRAMES ---
const MOTION_STYLES = `
@keyframes float-ambient-slow {
    0%, 100% { transform: translateY(0px) scale(1); opacity: 0.15; }
    50% { transform: translateY(-40px) scale(1.1); opacity: 0.3; }
}
@keyframes float-ambient-medium {
    0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.1; }
    50% { transform: translate(30px, -30px) scale(1.05); opacity: 0.25; }
}
@keyframes particle-burst {
    0% { transform: translate(0, 0) scale(1.2); opacity: 1; }
    100% { transform: translate(var(--mx), var(--my)) scale(0.3); opacity: 0; }
}
@keyframes ring-pulse {
    0%, 100% { filter: drop-shadow(0 0 4px rgba(245,158,11,0.2)); }
    50% { filter: drop-shadow(0 0 15px rgba(245,158,11,0.5)); }
}
@keyframes sweep-shine {
    0% { transform: translateX(-100%); }
    50%, 100% { transform: translateX(100%); }
}
@keyframes check-bounce-elastic {
    0% { transform: scale(0.6); }
    50% { transform: scale(1.25); }
    75% { transform: scale(0.9); }
    100% { transform: scale(1); }
}
@keyframes strike-draw {
    from { width: 0%; }
    to { width: 100%; }
}
@keyframes toast-slide-up-bounce {
    0% { transform: translateY(1.5rem) scale(0.92); opacity: 0; }
    70% { transform: translateY(-0.25rem) scale(1.02); opacity: 0.9; }
    100% { transform: translateY(0) scale(1); opacity: 1; }
}
@keyframes modal-scale-spring {
    0% { transform: scale(0.95) translateY(10px); opacity: 0; }
    70% { transform: scale(1.01) translateY(-2px); opacity: 0.95; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
}
@keyframes float-inbox {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}
@media (prefers-reduced-motion: reduce) {
    * {
        animation-delay: 0s !important;
        animation-duration: 0s !important;
        transition-duration: 0s !important;
        animation-iteration-count: 1 !important;
    }
}
`;

// --- MODERN CARD CURSOR LIGHT SPOTLIGHT WRAPPER ---
function CardGlow({ children, className = "", delay = "0ms", style = {} }) {
    const cardRef = useRef(null);
    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--x', `${x}px`);
        cardRef.current.style.setProperty('--y', `${y}px`);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className={`relative overflow-hidden group/glow ${className}`}
            style={{ ...style, transitionDelay: delay }}
        >
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500 opacity-0 group-hover/glow:opacity-100 bg-[radial-gradient(350px_circle_at_var(--x,50%)_var(--y,50%),rgba(245,158,11,0.06),transparent_80%)]" />
            {children}
        </div>
    );
}

// --- DECIMAL-SAFE INTERPOLATED EASING COUNTER ---
function AnimatedCounter({ value, prefix = "", suffix = "" }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let startTimestamp = null;
        const startValue = displayValue;
        const endValue = value;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / 1000, 1);
            const easeOutQuad = progress * (2 - progress);
            const current = Math.floor(easeOutQuad * (endValue - startValue) + startValue);

            setDisplayValue(current);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                setDisplayValue(endValue);
            }
        };

        requestAnimationFrame(step);
    }, [value]);

    return <span>{prefix}{displayValue.toLocaleString()}{suffix}</span>;
}

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
    const [searchFocused, setSearchFocused] = useState(false);

    // Staggered page arrival lock
    const [isMounted, setIsMounted] = useState(false);

    // Dynamic sparkles array for particle animation
    const [particles, setParticles] = useState([]);

    // Custom Toast state for dynamic interactions feedback
    const [toasts, setToasts] = useState([]);

    // Stats calculations derived from state to support live reactive mock updates
    const totalTasksCount = tasks.length;
    const completedTasksCount = tasks.filter(t => t.status === 'Completed').length;
    const completionRate = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

    // Calculate simulated XP earned today
    const [animatedProgress, setAnimatedProgress] = useState(0);

    useEffect(() => {
        setIsMounted(true);
    }, []);

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

    const toggleTaskStatus = (taskId, event) => {
        setTasks(prevTasks => {
            return prevTasks.map(task => {
                if (task.id === taskId) {
                    const isCompleting = task.status !== 'Completed';
                    const nextStatus = isCompleting ? 'Completed' : 'Pending';

                    if (isCompleting) {
                        triggerToast(`+${task.xpReward} XP Earned! "${task.title}" Completed.`, 'xp');

                        // Fire modular sparkle burst around event target
                        if (event) {
                            const rect = event.currentTarget.getBoundingClientRect();
                            const originX = rect.left + rect.width / 2 + window.scrollX;
                            const originY = rect.top + rect.height / 2 + window.scrollY;

                            const sparks = Array.from({ length: 12 }).map((_, i) => ({
                                id: `spark-${Date.now()}-${i}`,
                                x: originX,
                                y: originY,
                                mx: (Math.cos((i / 12) * 2 * Math.PI) * (40 + Math.random() * 40)).toFixed(1),
                                my: (Math.sin((i / 12) * 2 * Math.PI) * (40 + Math.random() * 40)).toFixed(1),
                                color: i % 2 === 0 ? '#F59E0B' : '#10B981'
                            }));
                            setParticles(prev => [...prev, ...sparks]);
                            setTimeout(() => {
                                setParticles(prev => prev.filter(p => !sparks.find(s => s.id === p.id)));
                            }, 800);
                        }
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

    const toggleRoutineItem = (itemId, event) => {
        setRoutine(prev => prev.map(item => {
            if (item.id === itemId) {
                const nextState = !item.done;
                if (nextState) {
                    triggerToast(`Daily Routine: +${item.xp} XP!`, 'xp');

                    if (event) {
                        const rect = event.currentTarget.getBoundingClientRect();
                        const originX = rect.left + rect.width / 2 + window.scrollX;
                        const originY = rect.top + rect.height / 2 + window.scrollY;

                        const sparks = Array.from({ length: 8 }).map((_, i) => ({
                            id: `routine-spark-${Date.now()}-${i}`,
                            x: originX,
                            y: originY,
                            mx: (Math.cos((i / 8) * 2 * Math.PI) * (30 + Math.random() * 30)).toFixed(1),
                            my: (Math.sin((i / 8) * 2 * Math.PI) * (30 + Math.random() * 30)).toFixed(1),
                            color: '#F59E0B'
                        }));
                        setParticles(prev => [...prev, ...sparks]);
                        setTimeout(() => {
                            setParticles(prev => prev.filter(p => !sparks.find(s => s.id === p.id)));
                        }, 800);
                    }
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
        <div className="min-h-screen bg-[#0B1120] text-[#F9FAFB] font-sans antialiased relative overflow-hidden">
            <style dangerouslySetInnerHTML={{ __html: MOTION_STYLES }} />

            {/* Floating Subtle Ambient Gradients */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div
                    className="absolute w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[130px]"
                    style={{
                        top: '15%',
                        left: '5%',
                        animation: 'float-ambient-slow 20s infinite ease-in-out'
                    }}
                />
                <div
                    className="absolute w-[400px] h-[400px] bg-orange-600/[0.02] rounded-full blur-[110px]"
                    style={{
                        bottom: '20%',
                        right: '8%',
                        animation: 'float-ambient-medium 25s infinite ease-in-out'
                    }}
                />
            </div>

            {/* Sparkle Emitter Canvas */}
            <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
                {particles.map(p => (
                    <div
                        key={p.id}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                            left: p.x,
                            top: p.y,
                            backgroundColor: p.color,
                            '--mx': `${p.mx}px`,
                            '--my': `${p.my}px`,
                            animation: 'particle-burst 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards'
                        }}
                    />
                ))}
            </div>

            {/* Toast Notification Container */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl relative overflow-hidden ${toast.type === 'xp'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                            : toast.type === 'success'
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                : 'bg-[#111827] border-[#1F2937] text-white'
                            }`}
                        style={{
                            animation: 'toast-slide-up-bounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
                        }}
                    >
                        <div className="absolute bottom-0 left-0 h-[3px] bg-amber-500/40 animate-[toast-progress_4s_linear_forwards]" />
                        <div className="flex-shrink-0">
                            {toast.type === 'xp' ? <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" /> : <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                        </div>
                        <p className="text-xs font-semibold tracking-wide">{toast.message}</p>
                    </div>
                ))}
            </div>

            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 relative z-10">

                {/* HEADER SECTION */}
                <div
                    className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1F2937]/60 pb-6 transition-all duration-700 transform ${isMounted ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                        }`}
                >
                    <div className="space-y-1">
                        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2 group">
                            <span className="p-1.5 rounded-xl bg-[#111827] border border-[#1F2937] group-hover:border-amber-500/30 transition-colors">
                                <CheckSquare className="w-8 h-8 text-amber-500 transition-transform duration-300 group-hover:rotate-6" />
                            </span>
                            Tasks
                        </h1>
                        <p className="text-sm text-[#9CA3AF] font-medium tracking-wide flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                            Plan. Build. Complete. Level Up.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-[#0B1120] font-bold text-sm rounded-xl transition-all shadow-[0_4px_20px_rgba(245,158,11,0.15)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.25)] hover:scale-102 cursor-pointer active:scale-95 group"
                    >
                        <Plus className="w-4.5 h-4.5 stroke-[3px] transition-transform duration-300 group-hover:rotate-90" />
                        New Task
                    </button>
                </div>

                {/* PROGRESS RING AND KEY METRICS ROW */}
                <div
                    className={`grid grid-cols-1 lg:grid-cols-3 gap-6 transition-all duration-700 delay-100 transform ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}
                >
                    {/* Circular Progress Layout card */}
                    <CardGlow className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6 shadow-xl relative overflow-hidden group hover:border-amber-500/20 transition-all">
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
                                    style={{ animation: completionRate === 100 ? 'ring-pulse 2s infinite ease-in-out' : 'none' }}
                                    strokeWidth="8"
                                    fill="none"
                                    strokeDasharray="251.2"
                                    strokeDashoffset={251.2 - (251.2 * animatedProgress) / 100}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-extrabold text-white flex items-center">
                                    <AnimatedCounter value={completionRate} />%
                                </span>
                                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Completed</span>
                            </div>
                        </div>

                        <div className="space-y-3 text-center sm:text-left flex-grow">
                            <div className="space-y-1">
                                <h4 className="text-white font-bold text-base">Daily Sprint Progress</h4>
                                <p className="text-xs text-[#9CA3AF] font-medium">
                                    <AnimatedCounter value={completedTasksCount} /> / <AnimatedCounter value={totalTasksCount} /> Tasks Completed
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-start">
                                <div className="bg-amber-500/10 text-amber-400 text-xs px-2.5 py-1 rounded-lg border border-amber-500/20 font-bold flex items-center gap-1 select-none animate-pulse">
                                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                    +320 Today's XP
                                </div>
                                <div className="bg-orange-500/10 text-orange-400 text-xs px-2.5 py-1 rounded-lg border border-orange-500/20 font-bold flex items-center gap-1 select-none">
                                    <Flame className="w-3.5 h-3.5 animate-bounce" />
                                    42 Days Active
                                </div>
                            </div>
                        </div>
                    </CardGlow>

                    {/* Mini Stat Cards Segment */}
                    <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">

                        {/* Stat Card 1: Completed Today */}
                        <CardGlow className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-amber-500/20 hover:scale-[1.02] hover:shadow-[0_4px_25px_rgba(245,158,11,0.04)] group">
                            <div className="flex items-center justify-between text-[#6B7280]">
                                <span className="text-xs font-semibold uppercase tracking-wider group-hover:text-white transition-colors">Completed</span>
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 transition-transform group-hover:scale-110" />
                            </div>
                            <div className="mt-4">
                                <span className="block text-2xl font-extrabold text-white tracking-tight">
                                    <AnimatedCounter value={completedTasksCount} />
                                </span>
                                <span className="text-[10px] text-[#9CA3AF] font-medium">Tasks resolved</span>
                            </div>
                        </CardGlow>

                        {/* Stat Card 2: Pending Tasks */}
                        <CardGlow className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-amber-500/20 hover:scale-[1.02] hover:shadow-[0_4px_25px_rgba(245,158,11,0.04)] group">
                            <div className="flex items-center justify-between text-[#6B7280]">
                                <span className="text-xs font-semibold uppercase tracking-wider group-hover:text-white transition-colors">Pending</span>
                                <Clock className="w-4 h-4 text-amber-500 transition-transform group-hover:rotate-12 duration-300" />
                            </div>
                            <div className="mt-4">
                                <span className="block text-2xl font-extrabold text-white tracking-tight">
                                    <AnimatedCounter value={tasks.filter(t => t.status !== 'Completed').length} />
                                </span>
                                <span className="text-[10px] text-[#9CA3AF] font-medium">Tasks in backlog</span>
                            </div>
                        </CardGlow>

                        {/* Stat Card 3: Today's XP */}
                        <CardGlow className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-amber-500/20 hover:scale-[1.02] hover:shadow-[0_4px_25px_rgba(245,158,11,0.04)] group">
                            <div className="flex items-center justify-between text-[#6B7280]">
                                <span className="text-xs font-semibold uppercase tracking-wider group-hover:text-white transition-colors">Today's XP</span>
                                <Sparkles className="w-4 h-4 text-amber-400 transition-transform group-hover:scale-115" />
                            </div>
                            <div className="mt-4">
                                <span className="block text-2xl font-extrabold text-white tracking-tight">
                                    +<AnimatedCounter value={320} />
                                </span>
                                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5">
                                    <TrendingUp className="w-3 h-3" /> +12% vs avg
                                </span>
                            </div>
                        </CardGlow>

                        {/* Stat Card 4: Current Streak */}
                        <CardGlow className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-amber-500/20 hover:scale-[1.02] hover:shadow-[0_4px_25px_rgba(245,158,11,0.04)] group">
                            <div className="flex items-center justify-between text-[#6B7280]">
                                <span className="text-xs font-semibold uppercase tracking-wider group-hover:text-white transition-colors">Streak</span>
                                <Flame className="w-4 h-4 text-orange-500 animate-pulse group-hover:scale-110" />
                            </div>
                            <div className="mt-4">
                                <span className="block text-2xl font-extrabold text-white tracking-tight">
                                    <AnimatedCounter value={42} /> Days
                                </span>
                                <span className="text-[10px] text-[#9CA3AF] font-medium">Highest: 56 Days</span>
                            </div>
                        </CardGlow>

                    </div>
                </div>

                {/* SEARCH AND TAB TIMELINE FILTERS CONTAINER */}
                <div
                    className={`flex flex-col xl:flex-row gap-4 items-stretch justify-between bg-[#111827]/40 border border-[#1F2937]/80 p-4 rounded-2xl transition-all duration-700 delay-200 transform ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}
                >
                    {/* Tab filters list */}
                    <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
                        {['all', 'today', 'upcoming', 'completed', 'overdue'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setSelectedFilter(tab)}
                                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-95 ${selectedFilter === tab
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
                            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors duration-250 ${searchFocused ? 'text-amber-500' : 'text-[#6B7280]'}`} />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl pl-10 pr-4 py-2 text-xs font-semibold text-white placeholder-[#6B7280] focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all duration-300"
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
                                className="flex items-center justify-center gap-1.5 px-3 py-2 border border-dashed border-[#1F2937] rounded-xl text-[#9CA3AF] hover:text-white hover:border-amber-500/30 text-xs font-bold transition-all cursor-pointer active:scale-95"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>

                {/* CATEGORY CHIPS PANEL */}
                <div
                    className={`space-y-2 transition-all duration-700 delay-250 transform ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}
                >
                    <span className="block text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Filter by Category</span>
                    <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
                        {INITIAL_CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 hover:scale-105 ${selectedCategory === cat.name
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

                {/* DOUBLE COLUMN CORE GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left main task feed column */}
                    <div
                        className={`lg:col-span-8 space-y-4 transition-all duration-700 delay-300 transform ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}
                    >
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
                                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto text-slate-700" style={{ animation: 'float-inbox 3s infinite ease-in-out' }}>
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
                                    className="px-4 py-2 bg-slate-800 text-white hover:bg-slate-750 text-xs font-bold rounded-xl transition-all cursor-pointer active:scale-95"
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
                                        <CardGlow
                                            key={task.id}
                                            delay={`${idx * 40}ms`}
                                            className={`relative bg-[#111827]/80 backdrop-blur-md border p-5 rounded-2xl flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-all duration-300 group hover:scale-[1.005] hover:-translate-y-0.5 ${isCompleted
                                                ? 'border-[#1F2937]/50 opacity-60 hover:opacity-80'
                                                : isOverdue
                                                    ? 'border-rose-500/20 hover:border-rose-500/35 shadow-[0_4px_15px_rgba(239,68,68,0.02)]'
                                                    : 'border-[#1F2937] hover:border-amber-500/20'
                                                }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                {/* Checkbox implementation */}
                                                <button
                                                    onClick={(e) => toggleTaskStatus(task.id, e)}
                                                    aria-label={`Toggle completion state of task: ${task.title}`}
                                                    className={`mt-1 h-5 w-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-all cursor-pointer active:scale-90 ${isCompleted
                                                        ? 'bg-amber-500 border-amber-500 text-[#0B1120]'
                                                        : 'bg-slate-900 border-[#1F2937] hover:border-amber-500/60'
                                                        }`}
                                                    style={{ animation: isCompleted ? 'check-bounce-elastic 0.4s forwards' : 'none' }}
                                                >
                                                    {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3.5px]" />}
                                                </button>

                                                <div className="space-y-1.5 max-w-lg relative">
                                                    <h3 className={`text-base font-bold transition-colors relative inline-block ${isCompleted ? 'text-[#6B7280]' : 'text-white group-hover:text-amber-400'
                                                        }`}>
                                                        {task.title}
                                                        {isCompleted && (
                                                            <span
                                                                className="absolute top-[50%] left-0 h-[1.5px] bg-[#6B7280]"
                                                                style={{ animation: 'strike-draw 0.35s ease-out forwards' }}
                                                            />
                                                        )}
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
                                                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md transition-transform duration-300 group-hover:scale-105 ${task.priority === 'High'
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
                                                    <span className={`text-xs font-extrabold px-2 py-0.5 rounded-lg transition-transform duration-300 group-hover:scale-110 ${isCompleted ? 'bg-slate-800/40 text-[#4B5563]' : 'bg-amber-500/10 text-amber-400 border border-amber-500/15 shadow-inner'
                                                        }`}>
                                                        +{task.xpReward} XP
                                                    </span>
                                                </div>

                                                {/* Mid dates metadata info */}
                                                <div className="space-y-1 text-left sm:text-right">
                                                    <div className="text-[10px] text-[#6B7280] font-bold flex items-center sm:justify-end gap-1.5 uppercase transition-colors group-hover:text-slate-400">
                                                        <Calendar className="w-3 h-3" />
                                                        <span>Due: {task.dueDate}</span>
                                                    </div>
                                                    <div className="text-[10px] text-[#6B7280] font-bold flex items-center sm:justify-end gap-1.5 uppercase transition-colors group-hover:text-slate-400">
                                                        <Clock className="w-3 h-3" />
                                                        <span>Estimated: {task.estimatedTime} min</span>
                                                    </div>
                                                </div>

                                                {/* Status visual box badge */}
                                                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg w-fit sm:ml-auto border transition-colors duration-300 ${isCompleted
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
                                        </CardGlow>
                                    );
                                })}
                            </div>
                        )}

                        {/* COMPREHENSIVE PLATFORM STATISTICS TABLE */}
                        <div className="bg-[#111827]/40 border border-[#1F2937]/80 rounded-2xl p-6 space-y-4">
                            <h3 className="text-white font-extrabold text-sm uppercase tracking-wider flex items-center gap-2">
                                <SlidersHorizontal className="w-4 h-4 text-amber-500" />
                                Platform Statistics
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                <CardGlow className="bg-[#111827] border border-[#1F2937]/60 p-4 rounded-xl text-center group hover:border-amber-500/20 transition-all">
                                    <span className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider group-hover:text-[#9CA3AF]">Total Backlog</span>
                                    <span className="block text-xl font-extrabold text-white mt-1">
                                        <AnimatedCounter value={totalTasksCount} />
                                    </span>
                                </CardGlow>
                                <CardGlow className="bg-[#111827] border border-[#1F2937]/60 p-4 rounded-xl text-center group hover:border-amber-500/20 transition-all">
                                    <span className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider group-hover:text-[#9CA3AF]">Resolved</span>
                                    <span className="block text-xl font-extrabold text-emerald-400 mt-1">
                                        <AnimatedCounter value={completedTasksCount} />
                                    </span>
                                </CardGlow>
                                <CardGlow className="bg-[#111827] border border-[#1F2937]/60 p-4 rounded-xl text-center group hover:border-amber-500/20 transition-all">
                                    <span className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider group-hover:text-[#9CA3AF]">Resolution Rate</span>
                                    <span className="block text-xl font-extrabold text-amber-400 mt-1">
                                        <AnimatedCounter value={completionRate} />%
                                    </span>
                                </CardGlow>
                                <CardGlow className="bg-[#111827] border border-[#1F2937]/60 p-4 rounded-xl text-center group hover:border-amber-500/20 transition-all">
                                    <span className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider group-hover:text-[#9CA3AF]">Total XP Earned</span>
                                    <span className="block text-xl font-extrabold text-white mt-1">
                                        <AnimatedCounter value={2840} /> XP
                                    </span>
                                </CardGlow>
                                <CardGlow className="bg-[#111827] border border-[#1F2937]/60 p-4 rounded-xl text-center col-span-2 md:col-span-1 group hover:border-amber-500/20 transition-all">
                                    <span className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider group-hover:text-[#9CA3AF]">Streak Target</span>
                                    <span className="block text-xl font-extrabold text-orange-400 mt-1">
                                        <AnimatedCounter value={42} /> Days
                                    </span>
                                </CardGlow>
                            </div>
                        </div>

                    </div>

                    {/* Right column (sidebar assets & routine) */}
                    <div
                        className={`lg:col-span-4 space-y-6 transition-all duration-700 delay-350 transform ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}
                    >

                        {/* Daily Routine checklist card */}
                        <div className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/10 transition-colors duration-300">
                            <div className="p-5 border-b border-[#1F2937] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Trophy className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
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
                                        onClick={(e) => toggleRoutineItem(item.id, e)}
                                        className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0B1120]/40 border border-[#1F2937]/60 hover:bg-[#111827] hover:border-amber-500/20 text-left transition-all duration-200 group cursor-pointer active:scale-[0.98]"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`h-4.5 w-4.5 rounded-md border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${item.done
                                                ? 'bg-amber-500 border-amber-500 text-[#0B1120]'
                                                : 'bg-slate-900 border-[#1F2937] group-hover:border-amber-500'
                                                }`}
                                                style={{ animation: item.done ? 'check-bounce-elastic 0.4s forwards' : 'none' }}
                                            >
                                                {item.done && <Check className="w-3 h-3 stroke-[3.5px]" />}
                                            </div>
                                            <span className={`text-xs font-semibold transition-all relative ${item.done ? 'text-[#6B7280]' : 'text-white'
                                                }`}>
                                                {item.text}
                                                {item.done && (
                                                    <span
                                                        className="absolute top-[50%] left-0 h-[1.5px] bg-[#6B7280]"
                                                        style={{ animation: 'strike-draw 0.3s ease-out forwards' }}
                                                    />
                                                )}
                                            </span>
                                        </div>

                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg transition-transform duration-300 group-hover:scale-105 ${item.done ? 'bg-[#1F2937] text-[#4B5563]' : 'bg-amber-500/10 text-amber-400'
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
                        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-6 rounded-2xl space-y-3 relative overflow-hidden group hover:border-amber-500/35 transition-colors duration-300">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
                            <div className="flex items-center gap-2 text-amber-400">
                                <Sparkles className="w-5 h-5 animate-pulse" />
                                <h4 className="font-extrabold text-xs uppercase tracking-wider">Developer Consistency Pro Tip</h4>
                            </div>
                            <p className="text-xs text-[#D1D5DB] leading-relaxed transition-colors group-hover:text-white">
                                Breaking tasks down to slots under 90 minutes reduces cognitive loads. Checking tasks awards points contributing to your weekly Spark Level achievements.
                            </p>
                        </div>

                    </div>

                </div>

            </div>

            {/* CREATE OBJECTIVE PORTAL */}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1120]/80 backdrop-blur-md">
            {/* Backdrop clickable zone */}
            <div className="absolute inset-0" onClick={onClose} />

            <div
                className="bg-[#111827] border border-[#1F2937] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative"
                style={{
                    animation: 'modal-scale-spring 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.15) forwards',
                    boxShadow: '0 0 50px rgba(0, 0, 0, 0.4), 0 0 25px rgba(245, 158, 11, 0.05)'
                }}
            >
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
                    <div className="space-y-1 transition-all duration-300" style={{ animation: 'toast-slide-in-bounce 0.4s ease-out forwards', animationDelay: '50ms' }}>
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
                    <div className="space-y-1" style={{ animation: 'toast-slide-in-bounce 0.4s ease-out forwards', animationDelay: '100ms' }}>
                        <label htmlFor="modal-desc" className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">
                            Description
                        </label>
                        <textarea
                            id="modal-desc"
                            rows={3}
                            placeholder="Provide a short description of goals and metrics..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-4 py-2.5 text-xs font-semibold text-white placeholder-[#6B7280] focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all resize-none font-medium h-20"
                        />
                    </div>

                    {/* Category & Priority parameters split group */}
                    <div className="grid grid-cols-2 gap-4" style={{ animation: 'toast-slide-in-bounce 0.4s ease-out forwards', animationDelay: '150ms' }}>

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
                    <div className="grid grid-cols-2 gap-4" style={{ animation: 'toast-slide-in-bounce 0.4s ease-out forwards', animationDelay: '200ms' }}>

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
                    <div className="grid grid-cols-2 gap-4" style={{ animation: 'toast-slide-in-bounce 0.4s ease-out forwards', animationDelay: '250ms' }}>

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
                    <div className="space-y-1" style={{ animation: 'toast-slide-in-bounce 0.4s ease-out forwards', animationDelay: '300ms' }}>
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
                    <div className="flex gap-3 pt-4 border-t border-[#1F2937] mt-6" style={{ animation: 'toast-slide-in-bounce 0.4s ease-out forwards', animationDelay: '350ms' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer active:scale-95 hover:scale-[1.02] shadow-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-[#0B1120] font-bold text-xs rounded-xl transition-all shadow-[0_2px_15px_rgba(245,158,11,0.1)] cursor-pointer active:scale-95 hover:scale-[1.02]"
                        >
                            Create Task
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}