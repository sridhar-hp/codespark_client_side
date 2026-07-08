import React, { useState, useEffect, useRef } from 'react';
import {
    Terminal,
    RefreshCw,
    Sparkles,
    Trophy,
    Award,
    Flame,
    Target,
    Clock,
    CheckCircle2,
    Play,
    Pause,
    RotateCcw,
    Zap,
    Code2,
    Hourglass,
    ChevronRight,
    Star,
    Layers,
    Lock,
    Unlock,
    Info,
    CheckSquare,
    Quote,
    Cpu,
    Briefcase,
    History,
    Calendar,
    Database,
    Search,
    Brain,
    LayoutGrid,
    TrendingUp,
    ShieldAlert,
    Timer,
    Compass
} from 'lucide-react';

const MOTION_STYLES = `
@keyframes pulse-ambient-glow {
    0%, 100% { transform: translateY(0px) scale(1); opacity: 0.12; }
    50% { transform: translateY(-30px) scale(1.08); opacity: 0.25; }
}
@keyframes float-ambient-soft {
    0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.08; }
    50% { transform: translate(25px, -25px) scale(1.03); opacity: 0.22; }
}
@keyframes particle-fade-burst {
    0% { transform: translate(0, 0) scale(1.2); opacity: 1; }
    100% { transform: translate(var(--mx), var(--my)) scale(0.3); opacity: 0; }
}
@keyframes ring-shimmer-sweep {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
@keyframes element-entrance {
    0% { opacity: 0; transform: translateY(12px) scale(0.99); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes shimmer-glow {
    0% { transform: translateX(-150%); }
    50%, 100% { transform: translateX(150%); }
}
.animate-entrance {
    animation: element-entrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
            className={`relative overflow-hidden group/glow will-change-transform ${className}`}
            style={{ ...style, transitionDelay: delay }}
        >
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500 opacity-0 group-hover/glow:opacity-100 bg-[radial-gradient(350px_circle_at_var(--x,50%)_var(--y,50%),rgba(245,158,11,0.06),transparent_80%)]" />
            {children}
        </div>
    );
}

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

const INITIAL_TOPIC_MASTERY = [
    { id: 'arrays', name: 'Arrays & Hashing', icon: Layers, pct: 92, solved: 45, xp: 450, easy: 20, med: 20, hard: 5, confidence: 'Mastered', lastDate: 'Today' },
    { id: 'strings', name: 'Strings', icon: Code2, pct: 85, solved: 30, xp: 300, easy: 15, med: 12, hard: 3, confidence: 'Expert', lastDate: 'Yesterday' },
    { id: 'hashmap', name: 'Hash Map & Sets', icon: Cpu, pct: 80, solved: 25, xp: 350, easy: 10, med: 12, hard: 3, confidence: 'Proficient', lastDate: '2 Days Ago' },
    { id: 'linkedlist', name: 'Linked Lists', icon: Target, pct: 75, solved: 15, xp: 200, easy: 5, med: 8, hard: 2, confidence: 'Proficient', lastDate: '4 Days Ago' },
    { id: 'stack', name: 'Stack & Queues', icon: Database, pct: 60, solved: 12, xp: 180, easy: 4, med: 6, hard: 2, confidence: 'Intermediate', lastDate: 'Jul 5, 2026' },
    { id: 'binarysearch', name: 'Binary Search', icon: Search, pct: 70, solved: 11, xp: 180, easy: 3, med: 7, hard: 1, confidence: 'Intermediate', lastDate: 'Jul 4, 2026' },
    { id: 'tree', name: 'Trees & BFS/DFS', icon: Brain, pct: 50, solved: 14, xp: 220, easy: 4, med: 8, hard: 2, confidence: 'Intermediate', lastDate: 'Jul 1, 2026' },
    { id: 'graphs', name: 'Graphs & BFS/DFS', icon: LayoutGrid, pct: 28, solved: 4, xp: 80, easy: 1, med: 3, hard: 0, confidence: 'Beginner', lastDate: 'Jun 28, 2026' },
    { id: 'heap', name: 'Heaps & Priority Qs', icon: Star, pct: 40, solved: 6, xp: 120, easy: 2, med: 4, hard: 0, confidence: 'Intermediate', lastDate: 'Jun 25, 2026' },
    { id: 'greedy', name: 'Greedy Systems', icon: Zap, pct: 35, solved: 5, xp: 100, easy: 2, med: 3, hard: 0, confidence: 'Beginner', lastDate: 'Jun 21, 2026' },
    { id: 'backtracking', name: 'Backtracking Matrix', icon: RotateCcw, pct: 20, solved: 3, xp: 90, easy: 0, med: 2, hard: 1, confidence: 'Beginner', lastDate: 'Jun 15, 2026' },
    { id: 'dp', name: 'Dynamic Programming', icon: Briefcase, pct: 15, solved: 4, xp: 120, easy: 0, med: 3, hard: 1, confidence: 'Beginner', lastDate: 'Jun 10, 2026' }
];

const SUBMISSIONS = [
    { id: 1, name: 'Regular Expression Matching', diff: 'Hard', runtime: '48 ms', memory: '11.2 MB', lang: 'Python', time: '12m ago', status: 'Accepted' },
    { id: 2, name: 'Search in Rotated Sorted Array', diff: 'Medium', runtime: '4 ms', memory: '9.8 MB', lang: 'C++', time: '1h ago', status: 'Accepted' },
    { id: 3, name: 'Valid Parentheses', diff: 'Easy', runtime: '68 ms', memory: '42.1 MB', lang: 'JavaScript', time: '5h ago', status: 'Accepted' },
    { id: 4, name: 'N-Queens II', diff: 'Hard', runtime: '0 ms', memory: '0 MB', lang: 'Java', time: '1d ago', status: 'TLE' },
    { id: 5, name: 'Group Anagrams', diff: 'Medium', runtime: '18 ms', memory: '16.4 MB', lang: 'C++', time: '2d ago', status: 'Accepted' },
    { id: 6, name: 'Merge Two Sorted Lists', diff: 'Easy', runtime: '84 ms', memory: '41.5 MB', lang: 'JavaScript', time: '3d ago', status: 'Wrong Answer' }
];

const RECOMMENDATIONS = [
    { id: 1, topic: 'Subarray Sum Equals K', diff: 'Medium', xp: 50, time: '35 min' },
    { id: 2, topic: 'Reverse Nodes in k-Group', diff: 'Hard', xp: 120, time: '60 min' },
    { id: 3, topic: 'Binary Search Index Node', diff: 'Easy', xp: 30, time: '15 min' }
];

const LANGUAGES = [
    { name: 'JavaScript', solved: 142, pct: 58, color: 'bg-amber-500' },
    { name: 'Python', solved: 62, pct: 25, color: 'bg-sky-500' },
    { name: 'Java', solved: 30, pct: 12, color: 'bg-rose-500' },
    { name: 'C++', solved: 14, pct: 5, color: 'bg-indigo-500' }
];

export default function LeetCode() {
    const [isMounted, setIsMounted] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [toasts, setToasts] = useState([]);
    const [particles, setParticles] = useState([]);
    const [isChallengeStarted, setIsChallengeStarted] = useState(false);

    const [timerActive, setTimerActive] = useState(false);
    const [timerSeconds, setTimerSeconds] = useState(25 * 60);

    const [problemsSolved, setProblemsSolved] = useState(248);
    const [streakCount, setStreakCount] = useState(14);
    const [acceptanceRate, setAcceptanceRate] = useState(68);
    const [contestRating, setContestRating] = useState(1854);
    const [todayGoal, setTodayGoal] = useState({ solved: 1, target: 2 });

    const [topics, setTopics] = useState(INITIAL_TOPIC_MASTERY);
    const [animatedRing, setAnimatedRing] = useState(0);

    useEffect(() => {
        setIsMounted(true);
        const ringTimer = setTimeout(() => {
            setAnimatedRing(68);
        }, 200);
        return () => clearTimeout(ringTimer);
    }, []);

    useEffect(() => {
        let interval = null;
        if (timerActive && timerSeconds > 0) {
            interval = setInterval(() => {
                setTimerSeconds(prev => prev - 1);
            }, 1000);
        } else if (timerSeconds === 0 && timerActive) {
            setTimerActive(false);
            triggerToast('Focus timer complete! Goal updated.', 'success');
            handleSolveTask('Pomodoro challenge');
        }
        return () => clearInterval(interval);
    }, [timerActive, timerSeconds]);

    const formatTimer = () => {
        const mins = Math.floor(timerSeconds / 60);
        const secs = timerSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const triggerToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    };

    const handleSolveTask = (name, xpReward = 50, event) => {
        setTodayGoal(prev => {
            const nextSolved = Math.min(prev.solved + 1, prev.target);
            if (nextSolved === prev.target) {
                triggerToast('Daily goal accomplished! +200 XP gained.', 'success');
            }
            return { ...prev, solved: nextSolved };
        });
        setProblemsSolved(p => p + 1);
        triggerToast(`Objective complete: "${name}"!`, 'xp');

        if (event) {
            const rect = event.currentTarget.getBoundingClientRect();
            const originX = rect.left + rect.width / 2 + window.scrollX;
            const originY = rect.top + rect.height / 2 + window.scrollY;

            const sparks = Array.from({ length: 12 }).map((_, i) => ({
                id: `spark-${Date.now()}-${i}`,
                x: originX,
                y: originY,
                mx: (Math.cos((i / 12) * 2 * Math.PI) * (45 + Math.random() * 45)).toFixed(1),
                my: (Math.sin((i / 12) * 2 * Math.PI) * (45 + Math.random() * 45)).toFixed(1),
                color: i % 2 === 0 ? '#F59E0B' : '#10B981'
            }));
            setParticles(prev => [...prev, ...sparks]);
            setTimeout(() => {
                setParticles(prev => prev.filter(p => !sparks.find(s => s.id === p.id)));
            }, 800);
        }
    };

    const handleLeetCodeSync = () => {
        if (isSyncing) return;
        setIsSyncing(true);
        triggerToast('Synchronizing LeetCode problem solving matrix...', 'info');

        setTimeout(() => {
            setIsSyncing(false);
            setProblemsSolved(p => p + 1);
            setAcceptanceRate(69);
            setContestRating(r => r + 15);
            triggerToast('LeetCode statistics updated successfully!', 'xp');
        }, 3000);
    };

    const handlePracticeTopic = (topicName, id, event) => {
        setTopics(prev => prev.map(t => {
            if (t.id === id) {
                const updatedPct = Math.min(100, t.pct + 5);
                const updatedConfidence = updatedPct === 100 ? 'Mastered' : updatedPct > 80 ? 'Expert' : 'Proficient';
                return {
                    ...t,
                    pct: updatedPct,
                    solved: t.solved + 1,
                    easy: t.easy + 1,
                    confidence: updatedConfidence,
                    lastDate: 'Just Now'
                };
            }
            return t;
        }));
        handleSolveTask(`${topicName} Practice Node`, 50, event);
    };

    return (
        <div className="w-full text-[#F9FAFB] font-sans antialiased relative selection:bg-amber-500/30 selection:text-amber-200">
            <style dangerouslySetInnerHTML={{ __html: MOTION_STYLES }} />

            {/* --- ABSTRACT BACKGROUND GRADIENTS --- */}
            <div className="absolute inset-0 pointer-events-none z-0 rounded-inherit">
                <div
                    className="absolute w-[500px] h-[500px] bg-amber-500/[0.02] rounded-full blur-[130px]"
                    style={{
                        top: '10%',
                        left: '-10%',
                        animation: 'pulse-ambient-glow 18s infinite ease-in-out'
                    }}
                />
                <div
                    className="absolute w-[400px] h-[400px] bg-orange-600/[0.015] rounded-full blur-[110px]"
                    style={{
                        bottom: '20%',
                        right: '5%',
                        animation: 'float-ambient-soft 24s infinite ease-in-out'
                    }}
                />
            </div>

            {/* --- PARTICLES CANVAS --- */}
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
                            animation: 'particle-fade-burst 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards'
                        }}
                    />
                ))}
            </div>

            {/* --- TOAST NOTIFICATIONS OVERLAY --- */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-xl border shadow-2xl relative overflow-hidden ${toast.type === 'xp'
                                ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                                : toast.type === 'success'
                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                    : 'bg-[#111827] border-[#1F2937] text-white'
                            }`}
                        style={{
                            animation: 'slide-up-spring 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
                        }}
                    >
                        <div className="absolute bottom-0 left-0 h-[3px] bg-amber-500/40 animate-[toast-progress_4s_linear_forwards]" style={{ width: '100%' }} />
                        <div className="flex-shrink-0">
                            {toast.type === 'xp' ? <Sparkles className="w-5 h-5 text-amber-500" /> : <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                        </div>
                        <p className="text-xs font-semibold tracking-wide leading-relaxed">{toast.message}</p>
                    </div>
                ))}
            </div>

            {/* --- MAIN PAGE GRAPHICS WRAPPER --- */}
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 relative z-10 ">
                {/* SECTION 1: DEVELOPER HERO COMPONENT */}
                <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-6 transition-all duration-700 transform ${isMounted ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                        }`}
                >
                    {/* Hero Left Segment: Player identity */}
                    <div className="lg:col-span-8 bg-gradient-to-br from-[#111827] via-[#111827] to-amber-950/15 border border-[#1F2937] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.015] rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <span className="text-[10px] text-amber-500 uppercase tracking-widest font-extrabold flex items-center gap-1.5">
                                    <Trophy className="w-3.5 h-3.5" /> Knight Class III Rating
                                </span>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none whitespace-nowrap">
                                    LeetCode Portal
                                </h1>
                            </div>

                            <p className="text-xs text-[#9CA3AF] max-w-md leading-relaxed">
                                Build clean programming models and expand memory structures. Elevate algorithms profiles via real-time dashboard tracking.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
                                <div className="flex items-center gap-1.5 bg-[#0B1120] border border-[#1F2937] px-3 py-1.5 rounded-xl">
                                    <Zap className="w-4 h-4 text-amber-500" />
                                    <span className="text-[#9CA3AF]">Level</span>
                                    <span className="text-white">4</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-[#0B1120] border border-[#1F2937] px-3 py-1.5 rounded-xl">
                                    <Flame className="w-4 h-4 text-orange-500" />
                                    <span className="text-[#9CA3AF]">Streak</span>
                                    <span className="text-white">{streakCount} Days</span>
                                </div>
                                <button
                                    onClick={handleLeetCodeSync}
                                    disabled={isSyncing}
                                    className="flex items-center gap-2 px-4 py-1.5 bg-[#0B1120] hover:bg-[#111827] text-white border border-[#1F2937] hover:border-amber-500/20 text-xs font-bold rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                                >
                                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-amber-500' : ''}`} />
                                    <span>Sync Profile</span>
                                </button>
                            </div>
                        </div>

                        {/* XP Progress Bar Gauge inside Hero Left */}
                        <div className="w-full sm:w-56 space-y-2 bg-[#0B1120]/40 p-4 rounded-2xl border border-[#1F2937]/60">
                            <div className="flex justify-between items-center text-[10px] font-extrabold uppercase text-[#9CA3AF]">
                                <span>Core Level Progress</span>
                                <span className="text-amber-500">74%</span>
                            </div>
                            <div className="w-full h-2 bg-[#0B1120] border border-[#1F2937]/50 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-full" style={{ width: '74%' }} />
                            </div>
                            <span className="block text-[9px] font-semibold text-[#6B7280]">
                                Next tier: Master Rank
                            </span>
                        </div>
                    </div>

                    {/* Hero Right Segment: Solving Target (No trend charts) */}
                    <CardGlow className="lg:col-span-4 bg-gradient-to-br from-[#111827] to-[#0B1120] border border-[#1F2937] rounded-[36px] p-6 flex flex-row items-center justify-between gap-4">
                        <div className="space-y-3">
                            <span className="text-[10px] text-amber-500 uppercase tracking-widest font-extrabold block">Daily Track Target</span>
                            <div>
                                <h3 className="text-2xl font-black text-white leading-tight">
                                    <AnimatedCounter value={todayGoal.solved} /> <span className="text-slate-500">/ {todayGoal.target}</span>
                                </h3>
                                <p className="text-xs text-[#9CA3AF] mt-0.5 font-medium">Problems resolved today</p>
                            </div>
                            <span className="inline-block text-[9px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/25">
                                +200 XP Daily Balance
                            </span>
                        </div>

                        {/* Radial progress ring loader */}
                        <div className="relative w-24 h-24 flex-shrink-0 select-none">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="42" className="stroke-slate-900 fill-none" strokeWidth="6" />
                                <circle
                                    cx="50" cy="50" r="42"
                                    className="stroke-amber-500 fill-none transition-all duration-1000 ease-out"
                                    strokeWidth="6"
                                    strokeDasharray="263.8"
                                    strokeDashoffset={263.8 - (263.8 * animatedRing) / 100}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-base font-extrabold text-white">{acceptanceRate}%</span>
                            </div>
                        </div>
                    </CardGlow>
                </div>

                {/* SECTION 2: HERO STATISTICS */}
                <div
                    className={`grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 delay-75 transform ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}
                >
                    {/* Stat Card 1 */}
                    <CardGlow className="bg-[#111827]/40 backdrop-blur-md border border-[#1F2937] p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-amber-500/20 hover:scale-[1.02] group">
                        <div className="flex items-center justify-between text-[#6B7280]">
                            <span className="text-xs font-semibold uppercase tracking-wider group-hover:text-white transition-colors">Problems Solved</span>
                            <Code2 className="w-5 h-5 text-amber-500 transition-transform group-hover:scale-110" />
                        </div>
                        <div className="mt-4">
                            <span className="block text-3xl font-extrabold text-white tracking-tight">
                                <AnimatedCounter value={problemsSolved} />
                            </span>
                            <span className="text-[10px] text-[#9CA3AF] font-medium">Out of 3,600 baseline questions</span>
                        </div>
                    </CardGlow>

                    {/* Stat Card 2 */}
                    <CardGlow className="bg-[#111827]/40 backdrop-blur-md border border-[#1F2937] p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-amber-500/20 hover:scale-[1.02] group">
                        <div className="flex items-center justify-between text-[#6B7280]">
                            <span className="text-xs font-semibold uppercase tracking-wider group-hover:text-white transition-colors">Streak Speed</span>
                            <Flame className="w-5 h-5 text-orange-500 animate-pulse group-hover:scale-110" />
                        </div>
                        <div className="mt-4">
                            <span className="block text-3xl font-extrabold text-white tracking-tight">
                                <AnimatedCounter value={streakCount} /> Days
                            </span>
                            <span className="text-[10px] text-[#9CA3AF] font-medium">Record: 42 Days</span>
                        </div>
                    </CardGlow>

                    {/* Stat Card 3 */}
                    <CardGlow className="bg-[#111827]/40 backdrop-blur-md border border-[#1F2937] p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-amber-500/20 hover:scale-[1.02] group">
                        <div className="flex items-center justify-between text-[#6B7280]">
                            <span className="text-xs font-semibold uppercase tracking-wider group-hover:text-white transition-colors">Contest Rating</span>
                            <Trophy className="w-5 h-5 text-amber-400 transition-transform group-hover:scale-110" />
                        </div>
                        <div className="mt-4">
                            <span className="block text-3xl font-extrabold text-white tracking-tight">
                                <AnimatedCounter value={contestRating} />
                            </span>
                            <span className="text-[10px] text-[#9CA3AF] font-medium">Global top 1.8% percentile</span>
                        </div>
                    </CardGlow>

                    {/* Stat Card 4 */}
                    <CardGlow className="bg-[#111827]/40 backdrop-blur-md border border-[#1F2937] p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-amber-500/20 hover:scale-[1.02] group">
                        <div className="flex items-center justify-between text-[#6B7280]">
                            <span className="text-xs font-semibold uppercase tracking-wider group-hover:text-white transition-colors">Acceptance Rate</span>
                            <Cpu className="w-5 h-5 text-sky-400 transition-transform group-hover:rotate-12 duration-300" />
                        </div>
                        <div className="mt-4">
                            <span className="block text-3xl font-extrabold text-white tracking-tight">
                                <AnimatedCounter value={acceptanceRate} suffix="%" />
                            </span>
                            <span className="text-[10px] text-[#9CA3AF] font-medium">Global platform average: 48%</span>
                        </div>
                    </CardGlow>
                </div>

                {/* --- DOUBLE ROW MAIN COLUMN COMBINATION LAYOUT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT CONTAINER (8 COLS DESKTOP): PROGRESS, SKILL MASTERIES, REC PRACTICE */}
                    <div
                        className={`lg:col-span-8 space-y-8 transition-all duration-700 delay-150 transform ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}
                    >

                        {/* SECTION 5: THE PREMIUM TOPIC MASTERY DASHBOARD GRID (NO ROADMAPS OR HEATMAPS) */}
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F2937] pb-4">
                                <div>
                                    <h3 className="text-white font-extrabold text-sm uppercase tracking-wider flex items-center gap-2">
                                        <Zap className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
                                        Topic Mastery Dashboard
                                    </h3>
                                    <p className="text-[11px] text-[#6B7280]">Real-time completion analytics and active practice metrics per algorithm family.</p>
                                </div>
                                <span className="text-[10px] text-amber-500 font-extrabold bg-amber-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider border border-amber-500/20 animate-pulse">
                                    Select and level up topics below
                                </span>
                            </div>

                            {/* Dynamic responsive card grid layout (2-4 columns) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                {topics.map((topic, i) => {
                                    const IconComponent = topic.icon;
                                    const isDone = topic.pct === 100;
                                    const isLow = topic.pct < 40;

                                    return (
                                        <CardGlow
                                            key={topic.id}
                                            delay={`${i * 45}ms`}
                                            className="bg-[#111827]/40 border border-[#1F2937] p-5 rounded-2xl flex flex-col justify-between h-[230px] hover:border-amber-500/30 hover:scale-[1.03] hover:-translate-y-1.5 duration-300 relative group transition-all"
                                        >
                                            {/* Glowing complete node indicators */}
                                            {isDone && (
                                                <span className="absolute top-4 right-4 bg-emerald-500/15 text-emerald-400 text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/20">
                                                    Mastered
                                                </span>
                                            )}

                                            {!isDone && (
                                                <span className={`absolute top-4 right-4 text-[9px] font-bold px-2 py-0.5 rounded-full ${isLow ? 'bg-slate-800 text-slate-400' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                    }`}>
                                                    {topic.confidence}
                                                </span>
                                            )}

                                            {/* Header detail */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2.5 rounded-xl bg-[#0B1120] border border-[#1F2937] text-amber-500 group-hover:scale-110 transition-transform duration-300">
                                                        <IconComponent className="w-5 h-5" />
                                                    </div>
                                                    <div className="pr-16">
                                                        <h4 className="text-sm font-extrabold text-white leading-tight">{topic.name}</h4>
                                                        <span className="text-[10px] text-[#6B7280] font-semibold">Active solved: {topic.solved} problems</span>
                                                    </div>
                                                </div>

                                                {/* Mini distribution metrics E / M / H */}
                                                <div className="flex items-center gap-2 pt-1 text-[10px] font-semibold text-slate-400">
                                                    <span className="text-emerald-400">Easy: {topic.easy}</span>
                                                    <span>•</span>
                                                    <span className="text-amber-400">Med: {topic.med}</span>
                                                    <span>•</span>
                                                    <span className="text-rose-400">Hard: {topic.hard}</span>
                                                </div>
                                            </div>

                                            {/* Progress slider bar and footer controls */}
                                            <div className="space-y-3 pt-2">
                                                <div className="space-y-1">
                                                    <div className="flex justify-between items-center text-[10px] font-bold">
                                                        <span className="text-slate-500">Mastery progress</span>
                                                        <span className="text-amber-400">{topic.pct}%</span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-[#0B1120] border border-[#1F2937] rounded-full overflow-hidden relative">
                                                        <div
                                                            className={`h-full rounded-full transition-all duration-1000 ${isDone ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-amber-500 to-orange-500'
                                                                }`}
                                                            style={{ width: `${topic.pct}%` }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between border-t border-[#1F2937]/50 pt-3 text-[10px] font-semibold text-[#6B7280]">
                                                    <span>Last: {topic.lastDate}</span>

                                                    {!isDone && (
                                                        <button
                                                            onClick={(e) => handlePracticeTopic(topic.name, topic.id, e)}
                                                            className="text-[9px] font-extrabold uppercase bg-amber-500 text-[#0B1120] px-3 py-1.5 rounded-lg hover:bg-amber-400 active:scale-95 duration-150 transition-all cursor-pointer shadow-md shadow-amber-500/10"
                                                        >
                                                            Practice
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </CardGlow>
                                    );
                                })}
                            </div>
                        </div>

                        {/* SECTION 3: CIRCULAR PROGRESS & DIFFICULTY */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Solved progress donut ring */}
                            <CardGlow className="bg-[#111827]/40 backdrop-blur-md border border-[#1F2937] p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                                <h3 className="text-white font-extrabold text-sm uppercase tracking-wider mb-4 w-full text-left flex items-center gap-2">
                                    <Target className="w-4.5 h-4.5 text-amber-500" />
                                    Solving Progress
                                </h3>

                                <div className="relative w-36 h-36 mb-4">
                                    {/* Shimmer sweep */}
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="42" className="stroke-slate-800 fill-none" strokeWidth="6" />
                                        <circle
                                            cx="50" cy="50" r="42"
                                            className="stroke-amber-500 fill-none transition-all duration-1000 ease-out"
                                            style={{ animation: problemsSolved > 248 ? 'ring-pulse 2s infinite ease-in-out' : 'none' }}
                                            strokeWidth="6"
                                            strokeDasharray="263.8"
                                            strokeDashoffset={263.8 - (263.8 * animatedRing) / 100}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-3xl font-extrabold text-white">
                                            <AnimatedCounter value={problemsSolved} />
                                        </span>
                                        <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider">Solved</span>
                                    </div>
                                </div>

                                <div className="space-y-1 w-full text-center">
                                    <p className="text-xs font-semibold text-[#D1D5DB]">Remaining: <AnimatedCounter value={3600 - problemsSolved} /> Backlog</p>
                                    <p className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wider">+3,200 XP Cumulative Balance</p>
                                </div>
                            </CardGlow>

                            {/* Difficulty progress bars */}
                            <CardGlow className="bg-[#111827]/40 backdrop-blur-md border border-[#1F2937] p-6 rounded-2xl space-y-5">
                                <h3 className="text-white font-extrabold text-sm uppercase tracking-wider flex items-center gap-2">
                                    <Layers className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
                                    Difficulty Distribution
                                </h3>

                                <div className="space-y-4">
                                    {/* Easy */}
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-baseline text-xs font-semibold">
                                            <span className="text-emerald-400">Easy</span>
                                            <span className="text-white">110 <span className="text-[#6B7280]">/ 1200</span></span>
                                        </div>
                                        <div className="w-full h-2 bg-[#0B1120] rounded-full border border-[#1F2937] overflow-hidden">
                                            <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: '9%' }} />
                                        </div>
                                    </div>

                                    {/* Medium */}
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-baseline text-xs font-semibold">
                                            <span className="text-amber-400">Medium</span>
                                            <span className="text-white">108 <span className="text-[#6B7280]">/ 1600</span></span>
                                        </div>
                                        <div className="w-full h-2 bg-[#0B1120] rounded-full border border-[#1F2937] overflow-hidden">
                                            <div className="h-full bg-amber-500 rounded-full transition-all duration-1000" style={{ width: '6.7%' }} />
                                        </div>
                                    </div>

                                    {/* Hard */}
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-baseline text-xs font-semibold">
                                            <span className="text-rose-400">Hard</span>
                                            <span className="text-white">30 <span className="text-[#6B7280]">/ 800</span></span>
                                        </div>
                                        <div className="w-full h-2 bg-[#0B1120] rounded-full border border-[#1F2937] overflow-hidden">
                                            <div className="h-full bg-rose-500 rounded-full transition-all duration-1000" style={{ width: '3.75%' }} />
                                        </div>
                                    </div>
                                </div>
                            </CardGlow>
                        </div>

                        {/* SECTION 12: RECOMMENDED PRACTICE */}
                        <div className="space-y-3">
                            <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Recommended Practice Sets</span>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {RECOMMENDATIONS.map((rec, i) => (
                                    <CardGlow
                                        key={rec.id}
                                        delay={`${i * 60}ms`}
                                        className="bg-[#111827]/40 border border-[#1F2937] p-5 rounded-2xl flex flex-col justify-between h-44 hover:border-amber-500/20 hover:bg-[#111827]"
                                    >
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md ${rec.diff === 'Hard' ? 'bg-rose-500/10 text-rose-400' :
                                                        rec.diff === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                                                    }`}>
                                                    {rec.diff}
                                                </span>
                                                <span className="text-[10px] font-semibold text-[#6B7280] flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {rec.time}
                                                </span>
                                            </div>
                                            <h4 className="text-sm font-bold text-white group-hover/glow:text-amber-400 transition-colors pt-1 leading-snug">{rec.topic}</h4>
                                        </div>

                                        <div className="flex items-center justify-between border-t border-[#1F2937] pt-3 mt-2">
                                            <span className="text-[11px] font-extrabold text-amber-400">+{rec.xp} XP</span>
                                            <button
                                                onClick={(e) => handleSolveTask(rec.topic, rec.xp, e)}
                                                className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-[#0B1120] px-3.5 py-2 rounded-xl hover:bg-amber-400 transition-colors cursor-pointer"
                                            >
                                                Start Practice
                                            </button>
                                        </div>
                                    </CardGlow>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT CONTAINER (4 COLS DESKTOP): DAILY CHALLENGE, TIMER, INSIGHTS */}
                    <div
                        className={`lg:col-span-4 space-y-6 transition-all duration-700 delay-300 transform ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}
                    >

                        {/* SECTION 4: DAILY GOAL */}
                        <CardGlow className="bg-[#111827]/40 backdrop-blur-md border border-[#1F2937] p-6 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/[0.02] rounded-full blur-2xl pointer-events-none" />
                            <h3 className="text-white text-sm font-bold flex items-center gap-2 mb-4">
                                <Target className="w-4.5 h-4.5 text-amber-500" />
                                Today's Solving Target
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-xs font-semibold text-[#9CA3AF]">Solve 2 Problems</span>
                                    <span className="text-sm font-extrabold text-white">
                                        <AnimatedCounter value={todayGoal.solved} /> <span className="text-[#6B7280]">/ 2</span>
                                    </span>
                                </div>

                                <div className="w-full h-2 bg-[#0B1120] rounded-full border border-[#1F2937] overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-1000"
                                        style={{ width: `${(todayGoal.solved / todayGoal.target) * 100}%` }}
                                    />
                                </div>

                                <div className="bg-amber-500/5 border border-amber-500/10 p-3 rounded-xl flex items-center gap-2">
                                    <Info className="w-4.5 h-4.5 text-amber-500 flex-shrink-0 animate-pulse" />
                                    <p className="text-[10px] text-[#9CA3AF] leading-relaxed">
                                        Daily completions extend streak calculations by +1 calendar day. Solve challenges to stack points.
                                    </p>
                                </div>
                            </div>
                        </CardGlow>

                        {/* SECTION 8: DAILY CHALLENGE HIGHLIGHT */}
                        <CardGlow className="bg-gradient-to-br from-amber-600/10 via-orange-600/5 to-[#111827] border border-amber-500/20 p-6 rounded-2xl relative group">
                            <span className="absolute top-4 right-4 bg-amber-500 text-[#0B1120] text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full select-none shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                                Daily Challenge
                            </span>

                            <div className="space-y-4">
                                <div className="space-y-1 pt-2">
                                    <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 rounded-md uppercase tracking-wider">Hard Complexity</span>
                                    <h4 className="text-base font-extrabold text-white pt-1">Regular Expression Matching</h4>
                                    <p className="text-xs text-[#9CA3AF] leading-normal">
                                        Evaluate parameters within matching constraints supporting dynamic `.` and `*` regex evaluations.
                                    </p>
                                </div>

                                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                                    <span>Duration: <span className="text-white font-extrabold">45 min</span></span>
                                    <span>Reward: <span className="text-amber-400 font-extrabold">+120 XP</span></span>
                                </div>

                                <button
                                    onClick={(e) => {
                                        setIsChallengeStarted(true);
                                        triggerToast('Daily LeetCode Challenge started!', 'info');
                                    }}
                                    disabled={isChallengeStarted}
                                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-[#0B1120] font-bold text-xs rounded-xl shadow-lg transition-all active:scale-98 disabled:opacity-50 select-none cursor-pointer"
                                >
                                    {isChallengeStarted ? 'Challenge Active...' : 'Start Daily Challenge'}
                                </button>
                            </div>
                        </CardGlow>

                        {/* SECTION 13: FOCUS SESSION TIMER */}
                        <CardGlow className="bg-[#111827]/40 backdrop-blur-md border border-[#1F2937] p-6 rounded-2xl relative">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white text-sm font-bold flex items-center gap-2">
                                    <Hourglass className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
                                    Focus Session Timer
                                </h3>
                                <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest bg-slate-900 border border-[#1F2937] px-2 py-0.5 rounded-md">
                                    Pomodoro
                                </span>
                            </div>

                            <div className="flex flex-col items-center justify-center py-3 relative">
                                <div className="relative w-32 h-32 flex items-center justify-center mb-5">
                                    {/* Circular tracking ring dial */}
                                    <svg className="w-full h-full transform -rotate-90 absolute" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="44" className="stroke-[#1F2937]" strokeWidth="4" fill="none" />
                                        <circle
                                            cx="50" cy="50" r="44"
                                            className="stroke-amber-500 fill-none transition-all duration-300"
                                            strokeWidth="4"
                                            strokeDasharray="276.4"
                                            strokeDashoffset={276.4 - (276.4 * (timerSeconds / (25 * 60)))}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <span className="text-2xl font-extrabold text-white tracking-widest relative z-10 select-none">
                                        {formatTimer()}
                                    </span>
                                </div>

                                <div className="flex gap-2 w-full">
                                    <button
                                        onClick={() => setTimerActive(!timerActive)}
                                        className="flex-1 py-2 bg-[#0B1120] border border-[#1F2937] hover:border-amber-500/30 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                                    >
                                        {timerActive ? <Pause className="w-3.5 h-3.5 animate-pulse" /> : <Play className="w-3.5 h-3.5" />}
                                        <span>{timerActive ? 'Pause' : 'Start'}</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setTimerActive(false);
                                            setTimerSeconds(25 * 60);
                                        }}
                                        className="px-3.5 py-2 bg-[#0B1120] border border-[#1F2937] hover:border-[#374151] text-slate-400 hover:text-white rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </CardGlow>

                        {/* SECTION 9: CONTEST PERFORMANCE (ONLY CARDS, NO TREND GRAPHS / NO TREND LINES) */}
                        <CardGlow className="bg-[#111827]/40 backdrop-blur-md border border-[#1F2937] p-6 rounded-2xl">
                            <h3 className="text-white text-sm font-bold flex items-center gap-2 mb-4">
                                <Trophy className="w-4.5 h-4.5 text-amber-500" />
                                Contest Performance
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-[#1F2937] pb-2 text-xs">
                                    <span className="text-[#9CA3AF]">Contest Rating</span>
                                    <span className="text-white font-bold"><AnimatedCounter value={contestRating} /></span>
                                </div>
                                <div className="flex justify-between items-center border-b border-[#1F2937] pb-2 text-xs">
                                    <span className="text-[#9CA3AF]">Current Rank</span>
                                    <span className="text-white font-bold">12,842 <span className="text-[10px] text-emerald-400">(Top 2%)</span></span>
                                </div>
                                <div className="flex justify-between items-center border-b border-[#1F2937] pb-2 text-xs">
                                    <span className="text-[#9CA3AF]">Best Contest Rank</span>
                                    <span className="text-white font-bold">#412</span>
                                </div>
                                <div className="flex justify-between items-center pb-1 text-xs">
                                    <span className="text-[#9CA3AF]">Contests Participated</span>
                                    <span className="text-white font-bold">14 Events</span>
                                </div>
                            </div>
                        </CardGlow>

                        {/* SECTION 10: LANGUAGE USAGE */}
                        <CardGlow className="bg-[#111827]/40 backdrop-blur-md border border-[#1F2937] p-6 rounded-2xl">
                            <h3 className="text-white text-sm font-bold flex items-center gap-2 mb-4">
                                <Code2 className="w-4.5 h-4.5 text-amber-500" />
                                Language Statistics
                            </h3>

                            <div className="space-y-3.5">
                                {LANGUAGES.map(lang => (
                                    <div key={lang.name} className="space-y-1">
                                        <div className="flex justify-between text-xs font-semibold">
                                            <span className="text-slate-300">{lang.name}</span>
                                            <span className="text-slate-400">{lang.solved} Solved <span className="text-white">({lang.pct}%)</span></span>
                                        </div>
                                        <div className="w-full h-1.5 bg-[#0B1120] rounded-full overflow-hidden border border-[#1F2937]">
                                            <div className={`h-full ${lang.color}`} style={{ width: `${lang.pct}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardGlow>

                        {/* SECTION 6: RECENT SUBMISSIONS TIMELINE */}
                        <CardGlow className="bg-[#111827]/40 backdrop-blur-md border border-[#1F2937] p-6 rounded-2xl">
                            <h3 className="text-white font-extrabold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                                <History className="w-4.5 h-4.5 text-amber-500" />
                                Submissions Timeline
                            </h3>

                            <div className="relative space-y-6 pl-4 before:absolute before:top-0 before:bottom-0 before:left-1 before:w-[1.5px] before:bg-gradient-to-b before:from-[#1F2937] before:to-transparent">
                                {SUBMISSIONS.map((sub) => (
                                    <div key={sub.id} className="relative flex items-center justify-between gap-4 group cursor-pointer">
                                        <div className="absolute -left-[16px] w-2.5 h-2.5 rounded-full bg-slate-800 border-2 border-[#111827] group-hover:bg-amber-500 group-hover:border-amber-400 transition-all duration-300" />

                                        <div className="space-y-1">
                                            <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">{sub.name}</h4>
                                            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold text-[#6B7280]">
                                                <span className={`px-2 py-0.5 rounded-md ${sub.diff === 'Hard' ? 'bg-rose-500/10 text-rose-400' :
                                                        sub.diff === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                                                    }`}>
                                                    {sub.diff}
                                                </span>
                                                <span>Runtime: {sub.runtime}</span>
                                                <span>Language: {sub.lang}</span>
                                                <span>{sub.time}</span>
                                            </div>
                                        </div>

                                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${sub.status === 'Accepted'
                                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                                : sub.status === 'TLE'
                                                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-400 animate-pulse'
                                                    : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                                            }`}>
                                            {sub.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardGlow>

                        {/* SECTION 14: DEVELOPER QUOTE CARD */}
                        <CardGlow className="bg-gradient-to-tr from-amber-600/10 via-[#111827] text-orange-500/5 border border-amber-500/20 p-6 rounded-2xl relative">
                            <Quote className="absolute top-4 right-4 w-12 h-12 text-amber-500/5 pointer-events-none" />
                            <p className="text-xs font-bold text-amber-300 italic leading-relaxed">
                                "The more problems you solve, the easier impossible problems become."
                            </p>
                            <span className="block text-[10px] text-[#6B7280] font-extrabold uppercase tracking-widest mt-3">
                                CODESPARK MOTIVATION
                            </span>
                        </CardGlow>

                    </div>

                </div>

            </div>

        </div>
    );
}