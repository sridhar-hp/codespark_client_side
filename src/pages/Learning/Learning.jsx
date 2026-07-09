import React, { useState, useEffect, useRef } from 'react';
import {
    BookOpen,
    Sparkles,
    Flame,
    Trophy,
    Award,
    Clock,
    CheckCircle2,
    Play,
    TrendingUp,
    ChevronRight,
    Youtube,
    Code,
    BookOpenText,
    ExternalLink,
    Compass,
    Sliders,
    Search,
    ListTodo,
    CheckCircle,
    Bookmark,
    Cpu,
    ArrowUpRight,
    Network,
    Terminal,
    Target,
    Zap,
    GraduationCap,
    HelpCircle,
    Check
} from 'lucide-react';

// --- PREMIUM HARDWARE-ACCELERATED KEYFRAMES ---
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
@keyframes line-draw-progress {
    from { stroke-dashoffset: 100; }
    to { stroke-dashoffset: 0; }
}
@keyframes element-entrance {
    0% { opacity: 0; transform: translateY(12px) scale(0.99); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes shimmer-sweep {
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

// --- CUSTOM CODESPARK MOUSE SPOTLIGHT CARD WRAPPER ---
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

// --- INITIAL STATE DATA PRESETS ---
const INITIAL_COURSES = [
    { id: 'react-adv', title: 'React 19 Advanced Patterns', progress: 75, totalLessons: 24, remainingLessons: 6, time: '2.5h left', color: 'from-amber-600 to-amber-500' },
    { id: 'system-design', title: 'Distributed Systems Architecture', progress: 42, totalLessons: 30, remainingLessons: 17, time: '8h left', color: 'from-orange-600 to-amber-500' },
    { id: 'backend-dev', title: 'Database Scalability & Sharding', progress: 90, totalLessons: 12, remainingLessons: 2, time: '45m left', color: 'from-amber-500 to-yellow-400' },
    { id: 'dsa-prog', title: 'Advanced Dynamic Programming', progress: 15, totalLessons: 40, remainingLessons: 34, time: '14h left', color: 'from-orange-700 to-amber-600' }
];

const WEEKLY_GRAPH_DATA = [
    { day: 'Mon', hours: 2.5, xp: 150, topics: 'React Ref & Portals' },
    { day: 'Tue', hours: 4.2, xp: 240, topics: 'Redis Cache Strategies' },
    { day: 'Wed', hours: 3.0, xp: 180, topics: 'Binary Search Trees' },
    { day: 'Thu', hours: 5.5, xp: 320, topics: 'Message Queues (Kafka)' },
    { day: 'Fri', hours: 1.5, xp: 90, topics: 'English Active Listening' },
    { day: 'Sat', hours: 0.8, xp: 50, topics: 'System Design Basics' },
    { day: 'Sun', hours: 0.0, xp: 0, topics: 'Rest & Mental Balance' }
];

const CATEGORIES = [
    { name: 'React', progress: 84, hours: 42, xp: 1200, level: 'Expert' },
    { name: 'Backend', progress: 68, hours: 30, xp: 950, level: 'Proficient' },
    { name: 'Node.js', progress: 75, hours: 18, xp: 600, level: 'Expert' },
    { name: 'DSA', progress: 45, hours: 28, xp: 840, level: 'Intermediate' },
    { name: 'System Design', progress: 32, hours: 14, xp: 420, level: 'Beginner' },
    { name: 'Soft Skills', progress: 90, hours: 12, xp: 360, level: 'Master' }
];

const INITIAL_PLAN = [
    { id: 't1', text: 'React useTransition State optimization', time: '30m', diff: 'Hard', cat: 'React', done: false },
    { id: 't2', text: 'Analyze database sharding parameters', time: '45m', diff: 'Medium', cat: 'Backend', done: true },
    { id: 't3', text: 'Binary Search tree pattern solving', time: '20m', diff: 'Easy', cat: 'DSA', done: false },
    { id: 't4', text: 'Active English system terminology drills', time: '15m', diff: 'Easy', cat: 'Soft Skills', done: false }
];

const TIMELINE_EVENTS = [
    { id: 1, title: 'Completed React useDeferredValue Hook', time: '10m ago', xp: 50, cat: 'React' },
    { id: 2, title: 'Finished Sharding Execution Video', time: '1h ago', xp: 80, cat: 'Backend' },
    { id: 3, title: 'Solved 2 Dynamic Programming patterns', time: '4h ago', xp: 100, cat: 'DSA' },
    { id: 4, title: 'Practiced Public Communication Pitch', time: '1d ago', xp: 40, cat: 'Soft Skills' }
];

const ROADMAP_STEPS = [
    { id: 1, title: 'Frontend Fundamentals', desc: 'HTML5, CSS Semantics, and Browser APIs', completed: true },
    { id: 2, title: 'JavaScript Advanced', desc: 'Closes, Event Loops, and Prototypes', completed: true },
    { id: 3, title: 'React Core & Ecosystem', desc: 'Context, Reducers, Custom Hooks', completed: true },
    { id: 4, title: 'Next.js Staging Pipeline', desc: 'ISR, SSR, and Edge Handlers', completed: false },
    { id: 5, title: 'Distributed Systems Map', desc: 'Docker structures and load balancing', completed: false }
];

const FAVORITE_RESOURCES = [
    { name: 'freeCodeCamp', icon: '🔥', desc: 'Comprehensive full-stack interactive tracks.', link: 'https://freecodecamp.org' },
    { name: 'React Docs', icon: '⚛️', desc: 'Reference patterns for React 19 concurrent builds.', link: 'https://react.dev' },
    { name: 'MDN Web Docs', icon: '📖', desc: 'Standards catalog for JS execution and APIs.', link: 'https://developer.mozilla.org' },
    { name: 'System Design Primer', icon: '⚙️', desc: 'Distributed layout models and protocols.', link: 'https://github.com' }
];

export default function LearningPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [toasts, setToasts] = useState([]);
    const [particles, setParticles] = useState([]);
    const [studyPlan, setStudyPlan] = useState(INITIAL_PLAN);
    const [activeGraphIndex, setActiveGraphIndex] = useState(3); // Default index hovered Thursday
    const [completedHoursToday, setCompletedHoursToday] = useState(1.8);
    const [weeklyGoalProgress, setWeeklyGoalProgress] = useState(65);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const triggerToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    };

    // Trigger incremental study task status updates
    const handleToggleTask = (id, event) => {
        setStudyPlan(prev => prev.map(item => {
            if (item.id === id) {
                const nextState = !item.done;
                if (nextState) {
                    // Update stats counters
                    setCompletedHoursToday(prevHours => Math.min(4, prevHours + 0.5));
                    setWeeklyGoalProgress(prevPct => Math.min(100, prevPct + 3));
                    triggerToast(`Study Task Complete! Gained +40 XP.`, 'xp');

                    // Sparkle particles burst
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
                } else {
                    setCompletedHoursToday(prevHours => Math.max(0, prevHours - 0.5));
                    setWeeklyGoalProgress(prevPct => Math.max(0, prevPct - 3));
                    triggerToast('Objective marked as active.', 'info');
                }
                return { ...item, done: nextState };
            }
            return item;
        }));
    };

    const handleContinueLearning = (title) => {
        triggerToast(`Resuming session: "${title}"...`, 'info');
    };

    return (
        <div className="min-h-screen bg-[#0B1120] text-[#F9FAFB] font-sans antialiased relative overflow-hidden selection:bg-amber-500/30 selection:text-amber-200">
            <style dangerouslySetInnerHTML={{ __html: MOTION_STYLES }} />

            {/* --- BACKGROUND ABSTRACT LAYOUT GLOWS --- */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
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

            {/* --- CONFETTI SPARKLE PARTICLES CANVAS --- */}
            <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
                {particles.map(p => (
                    <div
                        key={p.id}
                        className="absolute w-2.5 h-2.5 rounded-full"
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

            {/* --- FLOATING TOAST STACK NOTIFICATIONS --- */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-xl border shadow-2xl relative overflow-hidden ${
                            toast.type === 'xp'
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

            {/* --- MAIN PAGE GRAPHICS SCROLLING CANVASES --- */}
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 relative z-10">

                {/* SECTION 1: MAIN HERO DASHBOARD */}
                <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-6 transition-all duration-700 transform ${
                        isMounted ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                    }`}
                >
                    {/* Left Portal Hero Identity Panel */}
                    <div className="lg:col-span-8 bg-gradient-to-br from-[#111827] via-[#111827] to-amber-950/15 border border-[#1F2937] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative overflow-hidden group">
                        {/* Soft floating background orb light */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.02] rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
                        
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <span className="text-[10px] text-amber-500 uppercase tracking-widest font-extrabold flex items-center gap-1.5">
                                    <GraduationCap className="w-3.5 h-3.5" /> Learning Portal Active
                                </span>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none whitespace-nowrap">
                                    Knowledge Hub
                                </h1>
                            </div>

                            <p className="text-xs text-[#9CA3AF] max-w-md leading-relaxed">
                                Build structured conceptual skills. Level up your developer profile, and automatically aggregate session metrics directly into the workspace footprint.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
                                <div className="flex items-center gap-1.5 bg-[#0B1120] border border-[#1F2937] px-3 py-1.5 rounded-xl">
                                    <Zap className="w-4 h-4 text-amber-500" />
                                    <span className="text-[#9CA3AF]">Level</span>
                                    <span className="text-white">5</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-[#0B1120] border border-[#1F2937] px-3 py-1.5 rounded-xl">
                                    <Flame className="w-4 h-4 text-orange-500" />
                                    <span className="text-[#9CA3AF]">Streak</span>
                                    <span className="text-white">18 Days</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-[#0B1120] border border-[#1F2937] px-3 py-1.5 rounded-xl">
                                    <Clock className="w-4 h-4 text-amber-500" />
                                    <span className="text-[#9CA3AF]">Today</span>
                                    <span className="text-white">{completedHoursToday.toFixed(1)} hrs</span>
                                </div>
                            </div>
                        </div>

                        {/* Radial circular progress gauges inside left hero */}
                        <div className="w-full sm:w-52 space-y-2 bg-[#0B1120]/40 p-4 rounded-2xl border border-[#1F2937]/60 flex-shrink-0">
                            <div className="flex justify-between items-center text-[10px] font-extrabold uppercase text-[#9CA3AF]">
                                <span>Level Progress</span>
                                <span className="text-amber-500">82%</span>
                            </div>
                            <div className="w-full h-2 bg-[#0B1120] border border-[#1F2937]/50 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-full" style={{ width: '82%' }} />
                            </div>
                            <span className="block text-[9px] font-semibold text-[#6B7280]">
                                Next: Senior Architect Rank
                            </span>
                        </div>
                    </div>

                    {/* Right Weekly Target Progress Dial Panel */}
                    <CardGlow className="lg:col-span-4 bg-gradient-to-br from-[#111827] to-[#0B1120] border border-[#1F2937] rounded-3xl p-6 flex flex-row items-center justify-between gap-4">
                        <div className="space-y-3">
                            <span className="text-[10px] text-amber-500 uppercase tracking-widest font-extrabold block">Weekly Target</span>
                            <div>
                                <h3 className="text-2xl font-black text-white leading-tight">
                                    <AnimatedCounter value={weeklyGoalProgress} suffix="%" />
                                </h3>
                                <p className="text-xs text-[#9CA3AF] mt-0.5 font-medium">Of 20 hrs target achieved</p>
                            </div>
                            <span className="inline-block text-[9px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/25">
                                +1,200 XP Goal Weight
                            </span>
                        </div>

                        {/* Radial progress ring graph */}
                        <div className="relative w-24 h-24 flex-shrink-0 select-none">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="42" className="stroke-slate-900 fill-none" strokeWidth="6" />
                                <circle
                                    cx="50" cy="50" r="42"
                                    className="stroke-amber-500 fill-none transition-all duration-1000 ease-out"
                                    strokeWidth="6"
                                    strokeDasharray="263.8"
                                    strokeDashoffset={263.8 - (263.8 * weeklyGoalProgress) / 100}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-sm font-extrabold text-white">{weeklyGoalProgress}%</span>
                            </div>
                        </div>
                    </CardGlow>
                </div>

                {/* --- TWO ROW COLUMN GRID LAYOUT WRAPPER --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT CONTAINER (8 COLS DESKTOP): CONTINUE LEARNING, GRAPH, ROADMAP */}
                    <div
                        className={`lg:col-span-8 space-y-8 transition-all duration-700 delay-100 transform ${
                            isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}
                    >

                        {/* SECTION 2: CONTINUE LEARNING (LARGE INTERACTIVE CARDS) */}
                        <div className="space-y-3.5">
                            <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block">Continue Learning Concepts</span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {INITIAL_COURSES.map((course, idx) => (
                                    <CardGlow
                                        key={course.id}
                                        delay={`${idx * 40}ms`}
                                        className="bg-[#111827]/40 border border-[#1F2937] p-5 rounded-2xl flex flex-col justify-between h-48 hover:border-amber-500/20 hover:scale-[1.01]"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex justify-between items-start gap-2">
                                                <h4 className="text-sm font-extrabold text-white leading-snug tracking-tight line-clamp-2 pr-12">
                                                    {course.title}
                                                </h4>
                                                <span className="text-[10px] font-semibold text-[#6B7280] flex-shrink-0 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {course.time}
                                                </span>
                                            </div>
                                            <p className="text-[10px] text-[#6B7280] font-semibold">
                                                {course.remainingLessons} lessons remaining • Of {course.totalLessons}
                                            </p>
                                        </div>

                                        <div className="space-y-3 pt-3">
                                            <div className="space-y-1">
                                                <div className="flex justify-between items-center text-[9px] font-bold text-[#9CA3AF]">
                                                    <span>Progression Map</span>
                                                    <span className="text-amber-500">{course.progress}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-[#0B1120] border border-[#1F2937]/50 rounded-full overflow-hidden">
                                                    <div className={`h-full bg-gradient-to-r ${course.color} rounded-full`} style={{ width: `${course.progress}%` }} />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between border-t border-[#1F2937]/50 pt-3 mt-1">
                                                <span className="text-[10px] font-extrabold uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                                                    Active
                                                </span>
                                                <button
                                                    onClick={() => handleContinueLearning(course.title)}
                                                    className="text-[10px] font-extrabold uppercase bg-amber-500 text-[#0B1120] px-3.5 py-1.5 rounded-lg hover:bg-amber-400 active:scale-95 duration-150 transition-all cursor-pointer shadow-md shadow-amber-500/5 flex items-center gap-1"
                                                >
                                                    <span>Resume Session</span>
                                                    <ChevronRight className="w-3 h-3 stroke-[2.5]" />
                                                </button>
                                            </div>
                                        </div>
                                    </CardGlow>
                                ))}
                            </div>
                        </div>

                        {/* SECTION 4: LEARNING TIMELINE (WEEKLY BAR CHART) */}
                        <CardGlow className="bg-[#111827]/40 backdrop-blur-md border border-[#1F2937] p-6 rounded-2xl">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F2937] pb-4 mb-6">
                                <div>
                                    <h3 className="text-white font-extrabold text-sm uppercase tracking-wider flex items-center gap-2">
                                        <TrendingUp className="w-4.5 h-4.5 text-amber-500" />
                                        Weekly Learning Timeline
                                    </h3>
                                    <p className="text-[11px] text-[#6B7280] mt-0.5">Real-time developer skill integration rates. Click or hover bars.</p>
                                </div>
                                <div className="flex items-center gap-4 text-xs font-semibold text-[#9CA3AF]">
                                    <span>Weekly Total: <span className="text-white font-bold">17.2 Hours</span></span>
                                    <span>Average: <span className="text-amber-500 font-bold">2.4h / day</span></span>
                                </div>
                            </div>

                            {/* Custom Responsive Column chart structure */}
                            <div className="grid grid-cols-7 gap-4 pt-6 relative items-end h-44 select-none border-b border-[#1F2937] pb-2">
                                {WEEKLY_GRAPH_DATA.map((day, idx) => {
                                    // Scale height matching maximum possible 6 hrs of daily learning target
                                    const scaledHeight = day.hours > 0 ? (day.hours / 6) * 100 : 4;
                                    const isHovered = activeGraphIndex === idx;

                                    return (
                                        <div
                                            key={day.day}
                                            onClick={() => setActiveGraphIndex(idx)}
                                            onMouseEnter={() => setActiveGraphIndex(idx)}
                                            className="flex flex-col items-center justify-end h-full group cursor-pointer"
                                        >
                                            <div
                                                className={`w-full rounded-t-xl transition-all duration-500 relative ${
                                                    isHovered
                                                        ? 'bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                                                        : 'bg-gradient-to-t from-slate-900 to-slate-800 border border-[#1F2937]'
                                                }`}
                                                style={{ height: `${scaledHeight}%` }}
                                            >
                                                {day.hours > 0 && (
                                                    <span className={`absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-white transition-opacity ${
                                                        isHovered ? 'opacity-100' : 'opacity-0'
                                                    }`}>
                                                        {day.hours}h
                                                    </span>
                                                )}
                                            </div>
                                            <span className={`text-[10px] font-bold mt-2.5 transition-colors ${
                                                isHovered ? 'text-amber-400' : 'text-[#6B7280]'
                                            }`}>
                                                {day.day}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Interactive details display block for active hovered graph element */}
                            {activeGraphIndex !== null && (
                                <div className="mt-6 bg-[#0B1120]/60 rounded-xl p-4 border border-[#1F2937] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-[shimmer-sweep_0.5s_ease]">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                                            Session stats &bull; {WEEKLY_GRAPH_DATA[activeGraphIndex].day} Details
                                        </span>
                                        <h4 className="text-sm font-extrabold text-white">
                                            {WEEKLY_GRAPH_DATA[activeGraphIndex].topics}
                                        </h4>
                                    </div>
                                    <div className="flex gap-4 font-bold text-xs">
                                        <div className="bg-[#111827] border border-[#1F2937] px-3.5 py-1.5 rounded-lg">
                                            <span className="text-[#6B7280]">Hours: </span>
                                            <span className="text-white">{WEEKLY_GRAPH_DATA[activeGraphIndex].hours.toFixed(1)}h</span>
                                        </div>
                                        <div className="bg-[#111827] border border-[#1F2937] px-3.5 py-1.5 rounded-lg">
                                            <span className="text-amber-500">XP Yield: </span>
                                            <span className="text-amber-400">+{WEEKLY_GRAPH_DATA[activeGraphIndex].xp} XP</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardGlow>

                        {/* SECTION 8: KNOWLEDGE ROADMAP (VERTICAL STEPS FLOW) */}
                        <CardGlow className="bg-[#111827]/40 backdrop-blur-md border border-[#1F2937] p-6 rounded-2xl relative overflow-hidden">
                            <div className="flex justify-between items-center border-b border-[#1F2937] pb-4 mb-6">
                                <div>
                                    <h3 className="text-white font-extrabold text-sm uppercase tracking-wider flex items-center gap-2">
                                        <Network className="w-4.5 h-4.5 text-amber-500" />
                                        Knowledge Roadmap: Frontend Track
                                    </h3>
                                    <p className="text-[11px] text-[#6B7280] mt-0.5">Visual sequential mastery paths. Expand nodes below to level up.</p>
                                </div>
                                <span className="text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full animate-pulse">
                                    3 / 5 Complete
                                </span>
                            </div>

                            {/* Roadmap Flow Elements Stack */}
                            <div className="relative space-y-6 pl-6 before:absolute before:top-2 before:bottom-2 before:left-3 before:w-[1.5px] before:bg-gradient-to-b before:from-amber-500 before:via-[#1F2937] before:to-transparent">
                                {ROADMAP_STEPS.map((step, idx) => {
                                    return (
                                        <div 
                                            key={step.id} 
                                            className={`relative flex flex-col sm:flex-row justify-between sm:items-center gap-4 group transition-all duration-300 ${
                                                step.completed ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                                            }`}
                                        >
                                            {/* Roadmap sequential node anchor bubble */}
                                            <div className={`absolute -left-[24px] top-1 w-4 h-4 rounded-full border-2 bg-[#0B1120] transition-colors duration-300 ${
                                                step.completed ? 'border-amber-500 bg-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.4)]' : 'border-[#374151]'
                                            }`} />

                                            <div className="space-y-0.5">
                                                <h4 className={`text-sm font-extrabold transition-colors group-hover:text-amber-400 ${
                                                    step.completed ? 'text-white' : 'text-[#9CA3AF]'
                                                }`}>
                                                    {step.title}
                                                </h4>
                                                <p className="text-xs text-[#6B7280] font-medium leading-relaxed max-w-md">
                                                    {step.desc}
                                                </p>
                                            </div>

                                            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg border w-max flex items-center gap-1 ${
                                                step.completed 
                                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                                                    : 'bg-slate-900 border-[#1F2937] text-slate-500'
                                            }`}>
                                                {step.completed ? <CheckCircle className="w-3.5 h-3.5" /> : null}
                                                {step.completed ? 'Completed' : 'Staged Lock'}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardGlow>

                    </div>

                    {/* RIGHT CONTAINER (4 COLS DESKTOP): DAILY GOALS, CATEGORIES, CHECKLIST, STATS */}
                    <div
                        className={`lg:col-span-4 space-y-6 transition-all duration-700 delay-200 transform ${
                            isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}
                    >

                        {/* SECTION 6: TODAY'S STUDY PLAN (MODERN CHECKLIST) */}
                        <CardGlow className="bg-[#111827]/40 backdrop-blur-md border border-[#1F2937] p-6 rounded-2xl relative">
                            <div className="flex items-center justify-between mb-4 border-b border-[#1F2937] pb-3">
                                <h3 className="text-white text-sm font-bold flex items-center gap-2">
                                    <ListTodo className="w-4 h-4 text-amber-500 animate-pulse" />
                                    Today's Study Plan
                                </h3>
                                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                                    Track Checklist
                                </span>
                            </div>

                            <div className="space-y-2.5">
                                {studyPlan.map(item => {
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={(e) => handleToggleTask(item.id, e)}
                                            className="w-full flex items-start justify-between p-3 rounded-xl bg-[#0B1120]/40 border border-[#1F2937]/60 hover:bg-[#111827] hover:border-amber-500/20 text-left transition-all duration-200 group cursor-pointer active:scale-[0.98]"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`h-4.5 w-4.5 rounded border flex items-center justify-center flex-shrink-0 transition-colors mt-0.5 ${
                                                    item.done
                                                        ? 'bg-amber-500 border-amber-500 text-[#0B1120]'
                                                        : 'bg-slate-900 border-[#1F2937] group-hover:border-amber-500'
                                                }`}
                                                    style={{ animation: item.done ? 'check-bounce 0.4s forwards' : 'none' }}
                                                >
                                                    {item.done && <Check className="w-3.5 h-3.5 stroke-[3.5px]" />}
                                                </div>
                                                <div className="space-y-1">
                                                    <span className={`text-xs font-semibold block leading-tight transition-all ${
                                                        item.done ? 'text-[#6B7280] line-through' : 'text-white'
                                                    }`}>
                                                        {item.text}
                                                    </span>
                                                    
                                                    {/* Study parameters badges */}
                                                    <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                                                        <span>{item.cat}</span>
                                                        <span>&bull;</span>
                                                        <span>{item.time}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 ${
                                                item.diff === 'Hard' ? 'bg-rose-500/10 text-rose-400' :
                                                item.diff === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                                            }`}>
                                                {item.diff}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </CardGlow>

                        {/* SECTION 5: CATEGORY PROGRESS MAPS */}
                        <CardGlow className="bg-[#111827]/40 backdrop-blur-md border border-[#1F2937] p-6 rounded-2xl">
                            <h3 className="text-white text-sm font-bold flex items-center gap-2 mb-4">
                                <Bookmark className="w-4.5 h-4.5 text-amber-500" />
                                Category Distribution
                            </h3>

                            <div className="space-y-4">
                                {CATEGORIES.map(category => (
                                    <div key={category.name} className="space-y-1 group">
                                        <div className="flex justify-between text-xs font-bold transition-colors group-hover:text-white">
                                            <span className="text-slate-300">{category.name}</span>
                                            <span className="text-slate-400">Level {category.level} <span className="text-white">({category.progress}%)</span></span>
                                        </div>
                                        <div className="w-full h-1.5 bg-[#0B1120] border border-[#1F2937]/50 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400" style={{ width: `${category.progress}%` }} />
                                        </div>
                                        <div className="flex justify-between text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                                            <span>Est. {category.hours} hours logged</span>
                                            <span>{category.xp} XP total</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardGlow>

                        {/* SECTION 7: RECENT LEARNING TIMELINE */}
                        <CardGlow className="bg-[#111827]/40 backdrop-blur-md border border-[#1F2937] p-6 rounded-2xl">
                            <h3 className="text-white font-extrabold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                                <Clock className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
                                Recent Activity Timeline
                            </h3>

                            <div className="relative space-y-6 pl-4 before:absolute before:top-0 before:bottom-0 before:left-1 before:w-[1.5px] before:bg-gradient-to-b before:from-[#1F2937] before:to-transparent">
                                {TIMELINE_EVENTS.map(event => (
                                    <div key={event.id} className="relative flex items-center justify-between gap-4 group cursor-pointer">
                                        <div className="absolute -left-[16px] w-2 h-2 rounded-full bg-slate-800 border-2 border-[#111827] group-hover:bg-amber-500 group-hover:border-amber-400 transition-all duration-300" />
                                        
                                        <div className="space-y-1">
                                            <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors leading-tight">{event.title}</h4>
                                            <div className="flex items-center gap-2 text-[10px] font-semibold text-[#6B7280]">
                                                <span className="text-amber-500/80">{event.cat}</span>
                                                <span>&bull;</span>
                                                <span>{event.time}</span>
                                            </div>
                                        </div>

                                        <span className="text-[9px] font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                                            +{event.xp} XP
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardGlow>

                        {/* SECTION 9: FAVORITE LEARNING RESOURCES */}
                        <div className="space-y-3">
                            <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block">Core Learning Resources</span>
                            <div className="grid grid-cols-2 gap-3">
                                {FAVORITE_RESOURCES.map(res => (
                                    <a
                                        key={res.name}
                                        href={res.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#111827]/40 border border-[#1F2937] hover:border-amber-500/30 p-3.5 rounded-xl flex flex-col justify-between h-28 group transition-all duration-300"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg">{res.icon}</span>
                                                <ArrowUpRight className="w-3.5 h-3.5 text-[#6B7280] group-hover:text-amber-500 transition-colors" />
                                            </div>
                                            <h4 className="text-xs font-extrabold text-white pt-1">{res.name}</h4>
                                            <p className="text-[9px] text-[#6B7280] leading-tight line-clamp-2">{res.desc}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* SECTION 10: ANALYTICS SPARKLINE AND STATISTICS */}
                        <CardGlow className="bg-[#111827]/40 backdrop-blur-md border border-[#1F2937] p-6 rounded-2xl">
                            <h3 className="text-white text-sm font-bold flex items-center gap-2 mb-4">
                                <Trophy className="w-4.5 h-4.5 text-amber-500" />
                                Overall Learning Statistics
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-[#1F2937]/50 pb-2.5 text-xs">
                                    <span className="text-[#9CA3AF]">Total Study Hours</span>
                                    <span className="text-white font-bold"><AnimatedCounter value={142} suffix=" hrs" /></span>
                                </div>
                                <div className="flex justify-between items-center border-b border-[#1F2937]/50 pb-2.5 text-xs">
                                    <span className="text-[#9CA3AF]">Sessions Completed</span>
                                    <span className="text-white font-bold"><AnimatedCounter value={54} /> Sessions</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-[#1F2937]/50 pb-2.5 text-xs">
                                    <span className="text-[#9CA3AF]">Average Session Length</span>
                                    <span className="text-white font-bold">45 min</span>
                                </div>

                                <div className="pt-2">
                                    <span className="block text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">XP Progress Velocity</span>
                                    {/* Mock Rating Sparkline SVG vector graph */}
                                    <svg className="w-full h-12 text-amber-500/20" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M0 25 Q 15 15, 30 22 T 60 8 T 90 2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M0 25 Q 15 15, 30 22 T 60 8 T 90 2 L 100 30 L 0 30 Z" fill="currentColor" stroke="none" />
                                        <circle cx="90" cy="2" r="2" fill="#F59E0B" className="animate-pulse" />
                                    </svg>
                                </div>
                            </div>
                        </CardGlow>

                    </div>

                </div>

            </div>

        </div>
    );
}