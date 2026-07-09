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
    Check,
    Calendar,
    Activity,
    Database,
    Laptop,
    MessageSquare,
    ShieldCheck
} from 'lucide-react';

const STUDIO_STYLES = `
@keyframes studio-ambient-glow {
    0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.12; filter: blur(120px); }
    33% { transform: translate(30px, -50px) scale(1.1); opacity: 0.22; filter: blur(140px); }
    66% { transform: translate(-20px, 20px) scale(0.9); opacity: 0.16; filter: blur(100px); }
}
@keyframes orbit-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
@keyframes float-gentle {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-12px) rotate(2deg); }
}
@keyframes float-gentle-reverse {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(12px) rotate(-2deg); }
}
@keyframes particle-fire {
    0% { transform: translate(0, 0) scale(1.3); opacity: 1; }
    100% { transform: translate(var(--mx), var(--my)) scale(0.2); opacity: 0; }
}
@keyframes line-pulse {
    0% { stroke-dashoffset: 100; }
    100% { stroke-dashoffset: 0; }
}
@keyframes check-elastic {
    0% { transform: scale(0.7); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}
@keyframes scale-entrance {
    0% { transform: scale(0.96) translateY(20px); opacity: 0; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
}
@keyframes text-shine {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
@keyframes liquid-wave {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
.animate-scale-entrance {
    animation: scale-entrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.text-gradient-shimmer {
    background: linear-gradient(to right, #F59E0B, #F97316, #EF4444, #F59E0B);
    background-size: 300% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: text-shine 6s linear infinite;
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

// --- INITIAL STATE DATA PRESETS (MANDATORY TO PRESERVE ALL ORIGINAL DATA STRUCTURES) ---
const INITIAL_COURSES = [
    { id: 'react-adv', title: 'React 19 Advanced Patterns', progress: 75, totalLessons: 24, remainingLessons: 6, time: '2.5h left', color: 'from-amber-600 to-amber-500', icon: '⚛️' },
    { id: 'system-design', title: 'Distributed Systems Architecture', progress: 42, totalLessons: 30, remainingLessons: 17, time: '8h left', color: 'from-orange-600 to-amber-500', icon: '☁️' },
    { id: 'backend-dev', title: 'Database Scalability & Sharding', progress: 90, totalLessons: 12, remainingLessons: 2, time: '45m left', color: 'from-amber-500 to-yellow-400', icon: '🗄️' },
    { id: 'dsa-prog', title: 'Advanced Dynamic Programming', progress: 15, totalLessons: 40, remainingLessons: 34, time: '14h left', color: 'from-orange-700 to-amber-600', icon: '🧩' }
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
    { name: 'React', progress: 84, hours: 42, xp: 1200, level: 'Expert', color: '#3182CE' },
    { name: 'Backend', progress: 68, hours: 30, xp: 950, level: 'Proficient', color: '#ED8936' },
    { name: 'Node.js', progress: 75, hours: 18, xp: 600, level: 'Expert', color: '#48BB78' },
    { name: 'DSA', progress: 45, hours: 28, xp: 840, level: 'Intermediate', color: '#ECC94B' },
    { name: 'System Design', progress: 32, hours: 14, xp: 420, level: 'Beginner', color: '#9F7AEA' },
    { name: 'Soft Skills', progress: 90, hours: 12, xp: 360, level: 'Master', color: '#ED64A6' }
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
    { id: 1, title: 'Frontend Fundamentals', desc: 'HTML5, CSS Semantics, and Browser APIs', completed: true, x: 10, y: 30 },
    { id: 2, title: 'JavaScript Advanced', desc: 'Closures, Event Loops, and Prototypes', completed: true, x: 30, y: 70 },
    { id: 3, title: 'React Core & Ecosystem', desc: 'Context, Reducers, Custom Hooks', completed: true, x: 50, y: 20 },
    { id: 4, title: 'Next.js Staging Pipeline', desc: 'ISR, SSR, and Edge Handlers', completed: false, x: 70, y: 65 },
    { id: 5, title: 'Distributed Systems Map', desc: 'Docker structures and load balancing', completed: false, x: 90, y: 35 }
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

    // Mouse coordinates tracking for deep 3D-space parallax effects on the Studio Hero
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
    const [dockHoveredIndex, setDockHoveredIndex] = useState(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleHeroMouseMove = (e) => {
        const { clientX, clientY } = e;
        const x = (clientX - window.innerWidth / 2) / 45;
        const y = (clientY - window.innerHeight / 2) / 45;
        setMouseOffset({ x, y });
    };

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

                        const sparks = Array.from({ length: 14 }).map((_, i) => ({
                            id: `spark-${Date.now()}-${i}`,
                            x: originX,
                            y: originY,
                            mx: (Math.cos((i / 14) * 2 * Math.PI) * (50 + Math.random() * 50)).toFixed(1),
                            my: (Math.sin((i / 14) * 2 * Math.PI) * (50 + Math.random() * 50)).toFixed(1),
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
            <style dangerouslySetInnerHTML={{ __html: STUDIO_STYLES }} />

            {/* --- DEEP NEBULA AMBIENT GRADIENTS --- */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div
                    className="absolute w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full"
                    style={{
                        top: '5%',
                        left: '-5%',
                        animation: 'studio-ambient-glow 20s infinite ease-in-out'
                    }}
                />
                <div
                    className="absolute w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full"
                    style={{
                        bottom: '15%',
                        right: '-5%',
                        animation: 'studio-ambient-glow 25s infinite ease-in-out reverse'
                    }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
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
                            animation: 'particle-fire 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards'
                        }}
                    />
                ))}
            </div>

            {/* --- FLOATING TOAST STACK NOTIFICATIONS --- */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-xl border shadow-2xl relative overflow-hidden animate-scale-entrance ${toast.type === 'xp'
                                ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                                : toast.type === 'success'
                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                    : 'bg-[#111827] border-[#1F2937] text-white'
                            }`}
                    >
                        <div className="absolute bottom-0 left-0 h-[3px] bg-amber-500/40 animate-[toast-progress_4s_linear_forwards]" style={{ width: '100%' }} />
                        <div className="flex-shrink-0">
                            {toast.type === 'xp' ? <Sparkles className="w-5 h-5 text-amber-500" /> : <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                        </div>
                        <p className="text-xs font-semibold tracking-wide leading-relaxed">{toast.message}</p>
                    </div>
                ))}
            </div>

            {/* --- CORE IMMERSIVE STUDIO GRAPHICS CONTAINER --- */}
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-12 relative z-10">

                {/* ==================================================
                    SECTION 1: LEARNING STUDIO HERO (ORACLE INTERFACE)
                    ================================================== */}
                <div
                    onMouseMove={handleHeroMouseMove}
                    className="relative bg-gradient-to-br from-[#111827] via-[#111827]/90 to-amber-950/10 border border-[#1F2937] rounded-3xl p-8 sm:p-10 lg:p-12 overflow-hidden group select-none animate-scale-entrance"
                >
                    {/* Floating space background orbs reacting to mouse parallax coordinates */}
                    <div
                        className="absolute inset-0 pointer-events-none transition-transform duration-500 ease-out z-0 opacity-40"
                        style={{ transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)` }}
                    >
                        <div className="absolute top-10 right-1/4 w-72 h-72 bg-gradient-to-tr from-amber-500 to-amber-600 rounded-full blur-[100px] opacity-20" />
                        <div className="absolute -bottom-10 left-10 w-96 h-96 bg-emerald-500 to-teal-600 rounded-full blur-[120px] opacity-10" />

                        {/* Space Orbit Micro Icons */}
                        <div className="absolute top-[15%] right-[10%] p-3 rounded-full bg-[#111827]/40 border border-[#1F2937] text-amber-500 animate-[float-gentle_8s_infinite_ease-in-out]">
                            <Code className="w-5 h-5" />
                        </div>
                        <div className="absolute bottom-[20%] left-[5%] p-3 rounded-full bg-[#111827]/40 border border-[#1F2937] text-[#22C55E] animate-[float-gentle-reverse_10s_infinite_ease-in-out]">
                            <Cpu className="w-5 h-5" />
                        </div>
                        <div className="absolute top-[45%] left-[40%] p-2 rounded-full bg-[#111827]/40 border border-[#1F2937] text-orange-500 animate-[float-gentle_12s_infinite_ease-in-out]">
                            <Database className="w-4.5 h-4.5" />
                        </div>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-8 space-y-6">
                            <div className="space-y-2">
                                <span className="text-[10px] text-amber-500 uppercase tracking-widest font-extrabold flex items-center gap-1.5 bg-amber-500/10 w-max px-3 py-1 rounded-full border border-amber-500/20">
                                    <GraduationCap className="w-3.5 h-3.5 animate-pulse" /> Learning Studio Active
                                </span>
                                <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-none">
                                    Welcome to your <span className="text-gradient-shimmer">Learning Studio</span>
                                </h1>
                            </div>

                            <p className="text-sm sm:text-base text-[#9CA3AF] max-w-xl leading-relaxed">
                                A high-fidelity sandbox built to streamline structural engineering concepts. Level up active tracks, monitor session velocities, and synchronize real-time skill trees.
                            </p>

                            <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
                                <div className="flex items-center gap-2 bg-[#0B1120]/80 backdrop-blur border border-[#1F2937] px-4 py-2 rounded-xl transition-all hover:border-amber-500/20">
                                    <Zap className="w-4.5 h-4.5 text-amber-500" />
                                    <span className="text-[#9CA3AF]">Level</span>
                                    <span className="text-white">5</span>
                                </div>
                                <div className="flex items-center gap-2 bg-[#0B1120]/80 backdrop-blur border border-[#1F2937] px-4 py-2 rounded-xl transition-all hover:border-amber-500/20">
                                    <Flame className="w-4.5 h-4.5 text-orange-500" />
                                    <span className="text-[#9CA3AF]">Streak</span>
                                    <span className="text-white">18 Days</span>
                                </div>
                                <div className="flex items-center gap-2 bg-[#0B1120]/80 backdrop-blur border border-[#1F2937] px-4 py-2 rounded-xl transition-all hover:border-amber-500/20">
                                    <Clock className="w-4.5 h-4.5 text-amber-500" />
                                    <span className="text-[#9CA3AF]">Today</span>
                                    <span className="text-white">{completedHoursToday.toFixed(1)} hrs</span>
                                </div>
                            </div>
                        </div>

                        {/* Immersive Apple Fitness-style Circular Gauge Widgets */}
                        <div className="lg:col-span-4 flex justify-center lg:justify-end">
                            <div className="relative w-56 h-56 bg-[#0B1120]/60 backdrop-blur-xl border border-[#1F2937]/80 p-6 rounded-3xl flex flex-col justify-between overflow-hidden shadow-2xl">

                                {/* Inner liquid backdrop wave */}
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/[0.03] rounded-[45%] pointer-events-none animate-[liquid-wave_12s_infinite_linear]" />

                                <div className="flex justify-between items-center text-[10px] font-extrabold uppercase text-[#9CA3AF] tracking-wider">
                                    <span>Weekly Target</span>
                                    <span className="text-amber-500">Active</span>
                                </div>

                                <div className="relative w-28 h-28 mx-auto my-3 flex items-center justify-center">
                                    <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="42" className="stroke-slate-900 fill-none" strokeWidth="7" />
                                        <circle
                                            cx="50" cy="50" r="42"
                                            className="stroke-amber-500 fill-none transition-all duration-1000 ease-out"
                                            strokeWidth="7"
                                            strokeDasharray="263.8"
                                            strokeDashoffset={263.8 - (263.8 * weeklyGoalProgress) / 100}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="text-center z-10">
                                        <span className="text-2xl font-black text-white">
                                            <AnimatedCounter value={weeklyGoalProgress} />%
                                        </span>
                                        <span className="block text-[8px] font-bold text-[#6B7280] uppercase tracking-widest mt-0.5">Done</span>
                                    </div>
                                </div>

                                <span className="block text-center text-[9px] font-bold text-[#6B7280] uppercase tracking-widest leading-none">
                                    Next: Senior Rank Lock
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ==================================================
                    SECTION 2: CONTINUE LEARNING (HORIZONTAL MEDIA CAROUSEL)
                    ================================================== */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#1F2937]/50 pb-2">
                        <span className="text-xs font-bold text-[#6B7280] uppercase tracking-widest">Active Media Channels</span>
                        <span className="text-xs text-amber-500 font-bold hover:underline cursor-pointer flex items-center gap-1">
                            Browse Catalog <ChevronRight className="w-4 h-4" />
                        </span>
                    </div>

                    {/* Netflix/Apple TV style scroll track */}
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                        {INITIAL_COURSES.map((course, idx) => (
                            <CardGlow
                                key={course.id}
                                delay={`${idx * 40}ms`}
                                className="flex-shrink-0 w-80 bg-[#111827]/40 border border-[#1F2937] p-5 rounded-2xl flex flex-col justify-between h-56 hover:border-amber-500/20 hover:scale-[1.02] duration-300 transition-all select-none"
                            >
                                <div className="space-y-2">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="text-2xl p-2 rounded-xl bg-[#0B1120] border border-[#1F2937]">
                                            {course.icon}
                                        </div>
                                        <span className="text-[10px] font-bold text-[#6B7280] flex items-center gap-1 mt-1 bg-[#0B1120] border border-[#1F2937]/80 px-2 py-0.5 rounded-full">
                                            <Clock className="w-3 h-3" /> {course.time}
                                        </span>
                                    </div>
                                    <div className="space-y-0.5">
                                        <h4 className="text-sm font-extrabold text-white leading-snug tracking-tight line-clamp-1 group-hover:text-amber-500">
                                            {course.title}
                                        </h4>
                                        <p className="text-[10px] text-[#6B7280] font-bold">
                                            {course.remainingLessons} lessons remaining &bull; Of {course.totalLessons}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-3 border-t border-[#1F2937]/50">
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center text-[9px] font-extrabold text-[#9CA3AF] uppercase">
                                            <span>Progress</span>
                                            <span className="text-amber-500">{course.progress}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-[#0B1120] border border-[#1F2937]/50 rounded-full overflow-hidden">
                                            <div className={`h-full bg-gradient-to-r ${course.color} rounded-full transition-all duration-1000`} style={{ width: `${course.progress}%` }} />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-extrabold uppercase text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded">
                                            Staged
                                        </span>
                                        <button
                                            onClick={() => handleContinueLearning(course.title)}
                                            className="text-[10px] font-extrabold uppercase bg-amber-500 text-[#0B1120] px-4 py-1.5 rounded-lg hover:bg-amber-400 active:scale-95 duration-150 transition-all cursor-pointer shadow-md shadow-amber-500/5 flex items-center gap-1 group/btn"
                                        >
                                            <span>Resume</span>
                                            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                                        </button>
                                    </div>
                                </div>
                            </CardGlow>
                        ))}
                    </div>
                </div>

                {/* --- TWO ROW COLUMN GRID LAYOUT WRAPPER --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT CONTAINER (8 COLS DESKTOP): CHECKLISTS, TIMELINES, SKILL GALAXY, ROADMAP */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* ==================================================
                            SECTION 3: LEARNING TIMELINE (CONNECTED WEEKLY PLOT)
                            ================================================== */}
                        <CardGlow className="bg-[#111827]/40 border border-[#1F2937] p-6 rounded-3xl">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F2937] pb-4 mb-6">
                                <div>
                                    <h3 className="text-white font-extrabold text-sm uppercase tracking-wider flex items-center gap-2">
                                        <TrendingUp className="w-4.5 h-4.5 text-amber-500" />
                                        Weekly Target Timeline
                                    </h3>
                                    <p className="text-[11px] text-[#6B7280] mt-0.5">Track computational concepts and log study speeds.</p>
                                </div>
                                <div className="flex items-center gap-4 text-xs font-semibold text-[#9CA3AF]">
                                    <span>Total: <span className="text-white font-bold">17.2 Hours</span></span>
                                    <span>Average: <span className="text-amber-500 font-bold">2.4h/d</span></span>
                                </div>
                            </div>

                            {/* Timeline layout containing linked node graph components */}
                            <div className="grid grid-cols-7 gap-4 pt-6 items-end h-44 select-none border-b border-[#1F2937] pb-2 relative">
                                {WEEKLY_GRAPH_DATA.map((day, idx) => {
                                    const scaledHeight = day.hours > 0 ? (day.hours / 6) * 100 : 5;
                                    const isHovered = activeGraphIndex === idx;

                                    return (
                                        <div
                                            key={day.day}
                                            onClick={() => setActiveGraphIndex(idx)}
                                            onMouseEnter={() => setActiveGraphIndex(idx)}
                                            className="flex flex-col items-center justify-end h-full group cursor-pointer"
                                        >
                                            <div
                                                className={`w-full rounded-t-xl transition-all duration-500 relative ${isHovered
                                                        ? 'bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                                                        : 'bg-gradient-to-t from-slate-900 to-slate-800 border border-[#1F2937]'
                                                    }`}
                                                style={{ height: `${scaledHeight}%` }}
                                            >
                                                {day.hours > 0 && (
                                                    <span className={`absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-white transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'
                                                        }`}>
                                                        {day.hours}h
                                                    </span>
                                                )}
                                            </div>
                                            <span className={`text-[10px] font-bold mt-2.5 transition-colors ${isHovered ? 'text-amber-400' : 'text-[#6B7280]'
                                                }`}>
                                                {day.day}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Pop-up detail card matching active node index */}
                            {activeGraphIndex !== null && (
                                <div className="mt-6 bg-[#0B1120]/60 rounded-2xl p-4 border border-[#1F2937] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-scale-entrance">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                                            Session Overview &bull; {WEEKLY_GRAPH_DATA[activeGraphIndex].day} Track
                                        </span>
                                        <h4 className="text-sm font-extrabold text-white">
                                            {WEEKLY_GRAPH_DATA[activeGraphIndex].topics}
                                        </h4>
                                    </div>
                                    <div className="flex gap-3 font-bold text-xs">
                                        <div className="bg-[#111827] border border-[#1F2937] px-3.5 py-1.5 rounded-lg">
                                            <span className="text-[#6B7280]">Duration: </span>
                                            <span className="text-white">{WEEKLY_GRAPH_DATA[activeGraphIndex].hours.toFixed(1)}h</span>
                                        </div>
                                        <div className="bg-[#111827] border border-[#1F2937] px-3.5 py-1.5 rounded-lg">
                                            <span className="text-amber-500">Yield: </span>
                                            <span className="text-amber-400">+{WEEKLY_GRAPH_DATA[activeGraphIndex].xp} XP</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardGlow>

                        {/* ==================================================
                            SECTION 4: KNOWLEDGE ROADMAP (CONNECTIVE PIPELINES)
                            ================================================== */}
                        <CardGlow className="bg-[#111827]/40 border border-[#1F2937] p-6 rounded-3xl relative overflow-hidden">
                            <div className="flex justify-between items-center border-b border-[#1F2937] pb-4 mb-6">
                                <div>
                                    <h3 className="text-white font-extrabold text-sm uppercase tracking-wider flex items-center gap-2">
                                        <Network className="w-4.5 h-4.5 text-amber-500" />
                                        Interactive Knowledge Roadmap
                                    </h3>
                                    <p className="text-[11px] text-[#6B7280] mt-0.5">Winding conceptual tracks linked with dynamic vector pipes.</p>
                                </div>
                                <span className="text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full animate-pulse">
                                    3 / 5 Connected
                                </span>
                            </div>

                            {/* Interconnected Canvas Interface */}
                            <div className="relative min-h-[340px] bg-[#0B1120]/60 rounded-2xl border border-[#1F2937]/80 overflow-hidden select-none p-4">
                                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                                    {ROADMAP_STEPS.map((step, idx) => {
                                        if (idx === ROADMAP_STEPS.length - 1) return null;
                                        const nextStep = ROADMAP_STEPS[idx + 1];
                                        const isConnected = step.completed && nextStep.completed;

                                        return (
                                            <g key={`pipe-${step.id}`}>
                                                <line
                                                    x1={`${step.x}%`}
                                                    y1={`${step.y}%`}
                                                    x2={`${nextStep.x}%`}
                                                    y2={`${nextStep.y}%`}
                                                    stroke={isConnected ? '#F59E0B' : '#1F2937'}
                                                    strokeWidth={isConnected ? '3' : '1.5'}
                                                    strokeDasharray={!nextStep.completed ? '5 5' : '0'}
                                                    style={{
                                                        transition: 'stroke 0.3s, stroke-width 0.3s',
                                                        animation: isConnected ? 'line-pulse 1.5s linear infinite' : 'none'
                                                    }}
                                                />
                                            </g>
                                        );
                                    })}
                                </svg>

                                <div className="absolute inset-0 z-10">
                                    {ROADMAP_STEPS.map((step) => {
                                        const isActive = step.completed;
                                        return (
                                            <div
                                                key={step.id}
                                                className="absolute group/node cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                                                style={{ left: `${step.x}%`, top: `${step.y}%` }}
                                            >
                                                {/* Floating sphere node */}
                                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isActive
                                                        ? 'bg-amber-500 border-amber-400 text-[#0B1120] shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-110'
                                                        : 'bg-slate-900 border-[#1F2937] text-slate-600 opacity-60'
                                                    }`}>
                                                    <span className="text-[10px] font-extrabold">{step.id}</span>
                                                </div>

                                                {/* Description display card popup on node hover */}
                                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 p-3 rounded-xl bg-[#111827] border border-[#1F2937] shadow-2xl opacity-0 scale-90 group-hover/node:opacity-100 group-hover/node:scale-100 transition-all duration-200 pointer-events-none text-center">
                                                    <h4 className="text-xs font-extrabold text-white leading-tight">{step.title}</h4>
                                                    <p className="text-[9px] text-[#6B7280] leading-normal mt-1">{step.desc}</p>
                                                    <span className={`inline-block text-[8px] font-extrabold uppercase mt-1.5 px-2 py-0.5 rounded ${isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'
                                                        }`}>
                                                        {isActive ? 'Connected' : 'Staged Lock'}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </CardGlow>

                        {/* ==================================================
                            SECTION 5: SKILL GALAXY (PLANETARY CODESPARK NODES)
                            ================================================== */}
                        <div className="space-y-4">
                            <span className="text-xs font-bold text-[#6B7280] uppercase tracking-widest block">Nebula Skill Galaxy</span>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {CATEGORIES.map((category, idx) => {
                                    // Assign custom planetary diameters based on estimated XP depth metrics
                                    const orbitTimer = 10 + idx * 3;
                                    const progressCircumference = 2 * Math.PI * 18;

                                    return (
                                        <div
                                            key={category.name}
                                            className="bg-[#111827]/40 border border-[#1F2937] rounded-3xl p-5 h-44 flex flex-col justify-between items-center text-center hover:border-amber-500/20 hover:scale-105 duration-300 transition-all select-none group relative overflow-hidden"
                                        >
                                            {/* Perimeter orbit trail indicator */}
                                            <div
                                                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.01)_0%,transparent_70%)] pointer-events-none"
                                                style={{ animation: `orbit-slow ${orbitTimer}s infinite linear` }}
                                            />

                                            <div className="relative w-16 h-16 flex items-center justify-center">
                                                {/* Mini progress tracker mapping category depth */}
                                                <svg className="absolute w-full h-full transform -rotate-90">
                                                    <circle cx="32" cy="32" r="18" className="stroke-slate-900 fill-none" strokeWidth="3" />
                                                    <circle
                                                        cx="32" cy="32" r="18"
                                                        className="stroke-amber-500 fill-none transition-all duration-1000"
                                                        strokeWidth="3"
                                                        strokeDasharray={progressCircumference}
                                                        strokeDashoffset={progressCircumference - (progressCircumference * category.progress) / 100}
                                                        strokeLinecap="round"
                                                    />
                                                </svg>

                                                {/* Planet Core Sphere */}
                                                <div
                                                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black shadow-lg relative group-hover:scale-110 duration-500"
                                                    style={{
                                                        background: `radial-gradient(circle at 30% 30%, ${category.color} 0%, #0F172A 100%)`,
                                                        boxShadow: `0 0 15px ${category.color}33`
                                                    }}
                                                >
                                                    <span className="text-white text-[10px] tracking-tight">{category.name.substring(0, 3)}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-0.5 relative z-10">
                                                <h4 className="text-xs font-black text-white">{category.name} Planet</h4>
                                                <p className="text-[9px] text-[#6B7280] font-extrabold uppercase tracking-widest">{category.level} level</p>
                                            </div>

                                            <span className="block text-[9px] text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full font-bold">
                                                {category.progress}% completion
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT CONTAINER (4 COLS DESKTOP): STUDY PLAN, STATS, ACTIONS */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* ==================================================
                            SECTION 6: TODAY'S STUDY PLAN (PRODUCTIVITY PANEL)
                            ================================================== */}
                        <CardGlow className="bg-[#111827]/40 border border-[#1F2937] p-6 rounded-3xl relative">
                            <div className="flex items-center justify-between mb-4 border-b border-[#1F2937] pb-3">
                                <h3 className="text-white text-sm font-bold flex items-center gap-2">
                                    <ListTodo className="w-4 h-4 text-amber-500 animate-pulse" />
                                    Active Learning Index
                                </h3>
                                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                                    Checklist
                                </span>
                            </div>

                            <div className="space-y-2.5">
                                {studyPlan.map(item => {
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={(e) => handleToggleTask(item.id, e)}
                                            className="w-full flex items-start justify-between p-3 rounded-xl bg-[#0B1120]/40 border border-[#1F2937]/60 hover:bg-[#111827] hover:border-amber-500/20 text-left transition-all duration-200 group cursor-pointer active:scale-[0.98] relative overflow-hidden"
                                        >
                                            <div className="flex items-start gap-3 relative z-10">
                                                <div className={`h-4.5 w-4.5 rounded border flex items-center justify-center flex-shrink-0 transition-colors mt-0.5 ${item.done
                                                        ? 'bg-amber-500 border-amber-500 text-[#0B1120]'
                                                        : 'bg-slate-900 border-[#1F2937] group-hover:border-amber-500'
                                                    }`}
                                                    style={{ animation: item.done ? 'check-elastic 0.4s forwards' : 'none' }}
                                                >
                                                    {item.done && <Check className="w-3 h-3 stroke-[3.5px]" />}
                                                </div>
                                                <div className="space-y-1">
                                                    <span className={`text-xs font-semibold block leading-tight transition-all ${item.done ? 'text-[#6B7280] line-through' : 'text-white'
                                                        }`}>
                                                        {item.text}
                                                    </span>

                                                    <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                                                        <span>{item.cat}</span>
                                                        <span>&bull;</span>
                                                        <span>{item.time}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 relative z-10 ${item.diff === 'Hard' ? 'bg-rose-500/10 text-rose-400' :
                                                    item.diff === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                                                }`}>
                                                {item.diff}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </CardGlow>

                        {/* ==================================================
                            SECTION 7: RECENT ACTIVITY FEED (CONNECTED TIMELINE)
                            ================================================== */}
                        <CardGlow className="bg-[#111827]/40 border border-[#1F2937] p-6 rounded-3xl">
                            <h3 className="text-white font-extrabold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                                <Clock className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
                                Interactive Timeline
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

                                        <span className="text-[9px] font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded">
                                            +{event.xp} XP
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardGlow>

                        {/* ==================================================
                            SECTION 9: SYSTEM STATISTICS (LIQUID DIALS & VELOCITY)
                            ================================================== */}
                        <CardGlow className="bg-[#111827]/40 border border-[#1F2937] p-6 rounded-3xl">
                            <h3 className="text-white text-sm font-bold flex items-center gap-2 mb-4">
                                <Trophy className="w-4.5 h-4.5 text-amber-500" />
                                Studio Metrics Engine
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-[#1F2937]/50 pb-2.5 text-xs">
                                    <span className="text-[#9CA3AF]">Total Focused Tracks</span>
                                    <span className="text-white font-bold"><AnimatedCounter value={142} suffix=" hrs" /></span>
                                </div>
                                <div className="flex justify-between items-center border-b border-[#1F2937]/50 pb-2.5 text-xs">
                                    <span className="text-[#9CA3AF]">Staged Sprints</span>
                                    <span className="text-white font-bold"><AnimatedCounter value={54} /> Sessions</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-[#1F2937]/50 pb-2.5 text-xs">
                                    <span className="text-[#9CA3AF]">Average Sprint Length</span>
                                    <span className="text-white font-bold">45 min</span>
                                </div>

                                <div className="pt-2">
                                    <span className="block text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">XP Progression Trend</span>
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

                {/* ==================================================
                    SECTION 8: FAVORITE RESOURCES (MACOS PROXIMITY DOCK)
                    ================================================== */}
                <div className="flex flex-col items-center justify-center space-y-4 pt-4 border-t border-[#1F2937]/60">
                    <span className="text-xs font-bold text-[#6B7280] uppercase tracking-widest text-center">CODESPARK Resource Dock</span>

                    <div className="bg-[#111827]/40 backdrop-blur-xl border border-[#1F2937] p-3 rounded-2xl flex items-center gap-3 relative select-none">
                        {FAVORITE_RESOURCES.map((res, i) => {
                            const isHovered = dockHoveredIndex === i;
                            const isSibling = dockHoveredIndex !== null && Math.abs(dockHoveredIndex - i) === 1;

                            let dockScale = 'scale-100';
                            if (isHovered) dockScale = 'scale-125 z-20';
                            else if (isSibling) dockScale = 'scale-110 z-10';

                            return (
                                <a
                                    key={res.name}
                                    href={res.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={() => setDockHoveredIndex(i)}
                                    onMouseLeave={() => setDockHoveredIndex(null)}
                                    className={`relative p-3.5 rounded-xl bg-[#0B1120]/80 border border-[#1F2937] text-white hover:border-amber-500/50 shadow-2xl transition-all duration-200 flex flex-col items-center group cursor-pointer ${dockScale}`}
                                >
                                    <span className="text-xl">{res.icon}</span>

                                    {/* Tooltip hovering tag */}
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#111827] border border-[#1F2937] px-2.5 py-1.5 rounded-lg text-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none w-max max-w-[150px] shadow-2xl z-50">
                                        <h4 className="text-[10px] font-black text-white">{res.name}</h4>
                                        <p className="text-[8px] text-[#6B7280] leading-tight pt-0.5">{res.desc}</p>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>

            </div>

        </div>
    );
}