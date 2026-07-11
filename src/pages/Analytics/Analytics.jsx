import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
    AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
} from "recharts";
import {
    Activity, TrendingUp, TrendingDown, Zap, Flame, Trophy, Github, Code2, BookOpen,
    MessageSquare, CheckSquare, Linkedin, ChevronDown, ChevronUp, X, Download,
    Share2, FileText, Calendar, Target, Award, Rocket, Brain, Clock, ArrowUpRight,
    ArrowDownRight, Sparkles, GitBranch, Users, Server, Database, Cloud, Puzzle,
    Mic, GraduationCap, BarChart3, Layers, ChevronRight, Star,
} from "lucide-react";

/* =========================================================
   DESIGN TOKENS
   ========================================================= */
const C = {
    bg: "#0B1120",
    surface: "#111827",
    surface2: "#0F172A",
    border: "#1F2937",
    amber: "#F59E0B",
    emerald: "#10B981",
    cyan: "#06B6D4",
    danger: "#EF4444",
    warning: "#F97316",
    text: "#F9FAFB",
    textSecondary: "#9CA3AF",
    textMuted: "#6B7280",
};

/* =========================================================
   MOCK DATA — designed so real data can replace it 1:1 later
   ========================================================= */
const HERO_STATS = {
    productivityScore: 87,
    overallXP: 42850,
    rank: "Senior Contributor",
    rankTier: 4,
    growthTrend: 12.4,
    weeklyPerformance: 91,
    currentStreak: 23,
};

const PERFORMANCE_CARDS = [
    {
        id: "github", label: "GitHub", icon: Github, accent: C.emerald, score: 92, xp: 8420,
        completion: 78, growth: 9.2, trend: "up",
        detail: { repos: 34, commits: 1284, prs: 96, reviews: 61, stars: 210 },
    },
    {
        id: "leetcode", label: "LeetCode", icon: Code2, accent: C.amber, score: 81, xp: 6210,
        completion: 64, growth: 14.7, trend: "up",
        detail: { solved: 342, easy: 140, medium: 168, hard: 34, streak: 23 },
    },
    {
        id: "learning", label: "Learning", icon: BookOpen, accent: C.cyan, score: 74, xp: 5100,
        completion: 58, growth: 4.1, trend: "up",
        detail: { courses: 12, hours: 186, certificates: 5, inProgress: 2 },
    },
    {
        id: "communication", label: "Communication", icon: MessageSquare, accent: "#A78BFA", score: 69, xp: 3980,
        completion: 51, growth: -2.3, trend: "down",
        detail: { messages: 1840, meetings: 62, responseTime: "1.2h", clarity: 88 },
    },
    {
        id: "tasks", label: "Tasks", icon: CheckSquare, accent: C.emerald, score: 88, xp: 7340,
        completion: 82, growth: 6.8, trend: "up",
        detail: { completed: 418, onTime: "94%", overdue: 6, active: 11 },
    },
    {
        id: "linkedin", label: "LinkedIn", icon: Linkedin, accent: "#38BDF8", score: 58, xp: 2600,
        completion: 39, growth: 1.5, trend: "up",
        detail: { posts: 18, connections: 640, profileViews: 1120, engagement: "4.6%" },
    },
];

const WEEKLY_TIMELINE = [
    { day: "Mon", coding: 62, learning: 20, communication: 35, tasks: 48 },
    { day: "Tue", coding: 78, learning: 30, communication: 28, tasks: 55 },
    { day: "Wed", coding: 54, learning: 44, communication: 40, tasks: 62 },
    { day: "Thu", coding: 88, learning: 18, communication: 22, tasks: 70 },
    { day: "Fri", coding: 70, learning: 36, communication: 30, tasks: 58 },
    { day: "Sat", coding: 40, learning: 52, communication: 12, tasks: 30 },
    { day: "Sun", coding: 25, learning: 38, communication: 8, tasks: 20 },
];

// 8 weeks x 7 days intensity grid (unique "Pulse Grid", not a GitHub heatmap)
const PULSE_GRID = Array.from({ length: 8 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
        const seed = (w * 7 + d) * 13.37;
        return Math.round(Math.abs(Math.sin(seed)) * 100);
    })
);

const TIME_DISTRIBUTION = [
    { name: "Coding", value: 38, color: C.emerald },
    { name: "Learning", value: 18, color: C.cyan },
    { name: "Communication", value: 14, color: "#A78BFA" },
    { name: "Meetings", value: 12, color: C.amber },
    { name: "Planning", value: 10, color: C.warning },
    { name: "Breaks", value: 8, color: C.textMuted },
];

const SKILL_RADAR = [
    { skill: "Frontend", value: 88 },
    { skill: "Backend", value: 74 },
    { skill: "Database", value: 66 },
    { skill: "Cloud", value: 58 },
    { skill: "AI", value: 47 },
    { skill: "Problem Solving", value: 91 },
    { skill: "Communication", value: 69 },
    { skill: "Leadership", value: 54 },
];

const CAREER_TIMELINE = [
    { id: 1, title: "First Project", date: "Jan 2024", icon: Rocket, desc: "Shipped the first production repository — the launch pad for everything after." },
    { id: 2, title: "100 Problems", date: "Apr 2024", icon: Code2, desc: "Crossed 100 solved LeetCode problems, building core algorithmic fluency." },
    { id: 3, title: "GitHub Milestone", date: "Aug 2024", icon: Github, desc: "Reached 500 commits across 20 repositories with consistent contribution activity." },
    { id: 4, title: "Learning Completion", date: "Dec 2024", icon: GraduationCap, desc: "Completed the Advanced Systems Design learning track with a certificate." },
    { id: 5, title: "Interview Practice", date: "Mar 2025", icon: Mic, desc: "Completed 30 mock interviews, sharpening communication under pressure." },
    { id: 6, title: "Current Goal", date: "In progress", icon: Target, desc: "Reach Staff-level productivity score and ship 3 open-source releases." },
];

const INSIGHTS = [
    { id: "time", title: "Best Coding Time", icon: Clock, accent: C.emerald, summary: "9–11 AM", detail: "Your commit and focus-session data shows peak output between 9–11 AM, with 34% higher throughput than the daily average." },
    { id: "strong", title: "Strongest Skill", icon: Star, accent: C.amber, summary: "Problem Solving", detail: "Problem Solving leads all tracked skills at 91/100, driven by consistent LeetCode streaks and fast debugging cycles." },
    { id: "weak", title: "Weakest Skill", icon: Puzzle, accent: C.danger, summary: "AI & ML", detail: "AI sits at 47/100 — the lowest tracked skill. Two focused learning sprints could meaningfully move this metric." },
    { id: "day", title: "Most Productive Day", icon: Calendar, accent: C.cyan, summary: "Thursday", detail: "Thursdays average a 88/100 productivity score, the highest of the week, largely from deep coding blocks." },
    { id: "learn", title: "Learning Trend", icon: BookOpen, accent: C.cyan, summary: "+4.1% this month", detail: "Learning velocity is up 4.1% month-over-month, with course completion accelerating in the last two weeks." },
    { id: "comm", title: "Communication Trend", icon: MessageSquare, accent: "#A78BFA", summary: "-2.3% this month", detail: "Communication engagement dipped slightly, mostly from fewer async messages during a focused coding sprint." },
    { id: "gh", title: "GitHub Trend", icon: Github, accent: C.emerald, summary: "+9.2% this month", detail: "GitHub activity is trending upward, driven by an increase in pull request reviews and merged contributions." },
];

const ACHIEVEMENTS = {
    xp: 42850, badges: 28, milestones: 14, longestStreak: 41, currentStreak: 23, completionRate: 76,
};

const PREDICTIONS = [
    { id: "lc", title: "500 LeetCode Problems", icon: Code2, accent: C.amber, estimate: "October 2026", progress: 68 },
    { id: "gh", title: "100 Repositories", icon: Github, accent: C.emerald, estimate: "January 2027", progress: 34 },
    { id: "learn", title: "Complete Next.js Track", icon: BookOpen, accent: C.cyan, estimate: "August 2026", progress: 82 },
    { id: "comm", title: "Interview Ready", icon: Mic, accent: "#A78BFA", estimate: "September 2026", progress: 58 },
];

/* =========================================================
   SMALL UTILITIES
   ========================================================= */
function useCountUp(target, duration = 1400, decimals = 0, start = true) {
    const [value, setValue] = useState(0);
    const raf = useRef(null);
    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const step = (ts) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(target * eased);
            if (progress < 1) raf.current = requestAnimationFrame(step);
        };
        raf.current = requestAnimationFrame(step);
        return () => raf.current && cancelAnimationFrame(raf.current);
    }, [target, duration, start]);
    return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();
}

function useInView(threshold = 0.2) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const obs = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && setInView(true),
            { threshold }
        );
        obs.observe(node);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, inView];
}

/* =========================================================
   SHARED UI PRIMITIVES
   ========================================================= */
function SectionHeader({ eyebrow, title, subtitle, right }) {
    return (
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
                <div className="text-xs font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: C.amber }}>
                    {eyebrow}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold" style={{ color: C.text }}>{title}</h2>
                {subtitle && <p className="mt-1 text-sm" style={{ color: C.textSecondary }}>{subtitle}</p>}
            </div>
            {right}
        </div>
    );
}

function GhostButton({ icon: Icon, children, onClick, tone = "default" }) {
    const [ripples, setRipples] = useState([]);
    const toneStyles = {
        default: { border: C.border, color: C.text },
        amber: { border: "rgba(245,158,11,0.4)", color: C.amber },
        emerald: { border: "rgba(16,185,129,0.4)", color: C.emerald },
    }[tone];

    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const id = Date.now();
        setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
        setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
        onClick && onClick();
    };

    return (
        <button
            onClick={handleClick}
            className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium
                 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
                borderColor: toneStyles.border,
                color: toneStyles.color,
                background: "rgba(255,255,255,0.02)",
                "--tw-ring-color": C.amber,
                "--tw-ring-offset-color": C.bg,
            }}
        >
            {Icon && <Icon size={16} />}
            {children}
            {ripples.map((r) => (
                <span
                    key={r.id}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        left: r.x, top: r.y, width: 8, height: 8,
                        background: "rgba(245,158,11,0.35)",
                        transform: "translate(-50%,-50%)",
                        animation: "ripple 600ms ease-out forwards",
                    }}
                />
            ))}
        </button>
    );
}

function Card({ children, className = "", style = {}, hover = true }) {
    return (
        <div
            className={`rounded-[28px] border transition-all duration-300 ${hover ? "hover:-translate-y-1 hover:shadow-2xl" : ""} ${className}`}
            style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                borderColor: C.border,
                backdropFilter: "blur(6px)",
                ...style,
            }}
        >
            {children}
        </div>
    );
}

function Modal({ open, onClose, title, children, accent = C.amber }) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ animation: "fadeIn 200ms ease-out" }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
        >
            <div
                className="absolute inset-0"
                style={{ background: "rgba(3,7,18,0.75)", backdropFilter: "blur(8px)" }}
                onClick={onClose}
            />
            <div
                className="relative w-full max-w-lg rounded-[28px] border p-6 md:p-8"
                style={{
                    background: "linear-gradient(180deg, rgba(17,24,39,0.95), rgba(15,23,42,0.95))",
                    borderColor: C.border,
                    boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.02)`,
                    animation: "scaleIn 220ms cubic-bezier(0.16,1,0.3,1)",
                }}
            >
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold" style={{ color: C.text }}>{title}</h3>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="p-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2"
                        style={{ color: C.textSecondary, "--tw-ring-color": accent }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                        <X size={20} />
                    </button>
                </div>
                <div style={{ color: C.textSecondary }}>{children}</div>
            </div>
        </div>
    );
}

function Toast({ message, show }) {
    if (!show) return null;
    return (
        <div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] px-5 py-3 rounded-2xl border text-sm font-medium"
            style={{
                background: "rgba(17,24,39,0.95)", borderColor: C.border, color: C.text,
                animation: "toastIn 250ms ease-out", boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            }}
        >
            {message}
        </div>
    );
}

/* =========================================================
   SECTION 1 — DEVELOPER INTELLIGENCE HERO
   ========================================================= */
function Hero({ notify, openModal }) {
    const score = useCountUp(HERO_STATS.productivityScore, 1600);
    const xp = useCountUp(HERO_STATS.overallXP, 1800);
    const weekly = useCountUp(HERO_STATS.weeklyPerformance, 1600);
    const streak = useCountUp(HERO_STATS.currentStreak, 1200);

    return (
        <section className="relative overflow-hidden rounded-[32px] border" style={{ borderColor: C.border }}>
            {/* ambient gradient + particles */}
            <div className="absolute inset-0" style={{ background: `radial-gradient(120% 100% at 15% 0%, rgba(245,158,11,0.14), transparent 55%), radial-gradient(100% 90% at 90% 20%, rgba(16,185,129,0.12), transparent 50%), ${C.surface}` }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,17,32,0) 0%, rgba(11,17,32,0.5) 100%)" }} />
            {Array.from({ length: 14 }).map((_, i) => (
                <span
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: 3 + (i % 3), height: 3 + (i % 3),
                        left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`,
                        background: i % 2 === 0 ? "rgba(245,158,11,0.5)" : "rgba(16,185,129,0.4)",
                        animation: `floatParticle ${6 + (i % 5)}s ease-in-out infinite`,
                        animationDelay: `${i * 0.4}s`,
                    }}
                />
            ))}

            <div className="relative p-6 md:p-12">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: C.emerald }}>
                    <Sparkles size={14} /> Developer Intelligence
                </div>

                <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4" style={{ color: C.text }}>
                            Your complete developer journey, <span style={{ color: C.amber }}>quantified</span>.
                        </h1>
                        <p className="text-sm md:text-base mb-8 max-w-lg" style={{ color: C.textSecondary }}>
                            Every commit, problem, lesson, and conversation rolled into one productivity signal — updated in real time as you work.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                            {[
                                { label: "Productivity", value: score, suffix: "", icon: Activity, color: C.amber },
                                { label: "Overall XP", value: xp, suffix: "", icon: Zap, color: C.emerald },
                                { label: "Weekly Perf.", value: weekly, suffix: "%", icon: TrendingUp, color: C.cyan },
                                { label: "Streak", value: streak, suffix: "d", icon: Flame, color: C.warning },
                            ].map((s) => (
                                <div key={s.label} className="rounded-2xl p-4 border" style={{ borderColor: C.border, background: "rgba(255,255,255,0.02)" }}>
                                    <s.icon size={16} style={{ color: s.color }} className="mb-2" />
                                    <div className="text-xl font-bold" style={{ color: C.text }}>{s.value}{s.suffix}</div>
                                    <div className="text-[11px] mt-0.5" style={{ color: C.textMuted }}>{s.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <GhostButton icon={FileText} tone="amber" onClick={() => openModal("weeklyReport")}>View Weekly Report</GhostButton>
                            <GhostButton icon={Download} onClick={() => notify("Analytics exported as PDF")}>Export Analytics</GhostButton>
                            <GhostButton icon={Share2} onClick={() => openModal("share")}>Share Progress</GhostButton>
                        </div>
                    </div>

                    {/* floating rank / trend panel */}
                    <div className="relative">
                        <div
                            className="rounded-[28px] border p-6 relative overflow-hidden"
                            style={{ borderColor: C.border, background: "rgba(17,24,39,0.6)", animation: "floatCard 5s ease-in-out infinite" }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <div className="text-xs" style={{ color: C.textMuted }}>Developer Rank</div>
                                    <div className="text-lg font-bold" style={{ color: C.text }}>{HERO_STATS.rank}</div>
                                </div>
                                <Trophy size={28} style={{ color: C.amber }} />
                            </div>

                            <div className="flex items-center gap-1.5 mb-6">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <span key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i < HERO_STATS.rankTier ? C.amber : C.border }} />
                                ))}
                            </div>

                            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: C.emerald }}>
                                <TrendingUp size={16} /> +{HERO_STATS.growthTrend}% growth this month
                            </div>

                            <div className="mt-6 h-16">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={WEEKLY_TIMELINE}>
                                        <defs>
                                            <linearGradient id="heroSpark" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor={C.amber} stopOpacity={0.5} />
                                                <stop offset="100%" stopColor={C.amber} stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="coding" stroke={C.amber} strokeWidth={2} fill="url(#heroSpark)" isAnimationActive />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* =========================================================
   SECTION 2 — OVERALL PRODUCTIVITY GAUGE
   ========================================================= */
function ProductivityGauge({ openModal }) {
    const [ref, inView] = useInView();
    const score = useCountUp(HERO_STATS.productivityScore, 1600, 0, inView);
    const radius = 90;
    const circumference = Math.PI * radius; // half circle
    const pct = HERO_STATS.productivityScore / 100;
    const offset = circumference - circumference * (inView ? pct : 0);

    return (
        <section ref={ref}>
            <SectionHeader eyebrow="Section 02" title="Overall Productivity" subtitle="A single composite score across every connected surface." />
            <Card className="p-6 md:p-10">
                <div className="grid md:grid-cols-[auto_1fr] gap-10 items-center">
                    <div className="relative mx-auto group cursor-pointer" onClick={() => openModal("productivity")}>
                        <svg width="240" height="150" viewBox="0 0 240 150">
                            <path d="M 30 130 A 90 90 0 0 1 210 130" fill="none" stroke={C.border} strokeWidth="16" strokeLinecap="round" />
                            <path
                                d="M 30 130 A 90 90 0 0 1 210 130"
                                fill="none" stroke={C.amber} strokeWidth="16" strokeLinecap="round"
                                strokeDasharray={circumference} strokeDashoffset={offset}
                                style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)", filter: "drop-shadow(0 0 8px rgba(245,158,11,0.5))" }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
                            <div className="text-4xl font-bold" style={{ color: C.text }}>{score}%</div>
                            <div className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: C.amber }}>View Details</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: "Weekly Change", value: "+4.2%", up: true },
                            { label: "Monthly Change", value: "+11.6%", up: true },
                            { label: "Yearly Change", value: "+38.9%", up: true },
                        ].map((s) => (
                            <div key={s.label} className="rounded-2xl p-4 border" style={{ borderColor: C.border }}>
                                <div className="text-xs mb-2" style={{ color: C.textMuted }}>{s.label}</div>
                                <div className="flex items-center gap-1 text-lg font-bold" style={{ color: s.up ? C.emerald : C.danger }}>
                                    {s.up ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}{s.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </section>
    );
}

/* =========================================================
   SECTION 3 — PERFORMANCE OVERVIEW
   ========================================================= */
function PerformanceCard({ data }) {
    const [expanded, setExpanded] = useState(false);
    const Icon = data.icon;
    const TrendIcon = data.trend === "up" ? TrendingUp : TrendingDown;

    return (
        <Card className="p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: `${data.accent}1A` }}>
                    <Icon size={20} style={{ color: data.accent }} />
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: data.trend === "up" ? C.emerald : C.danger }}>
                    <TrendIcon size={14} /> {data.growth > 0 ? "+" : ""}{data.growth}%
                </div>
            </div>

            <div className="text-sm mb-1" style={{ color: C.textSecondary }}>{data.label}</div>
            <div className="text-2xl font-bold mb-4" style={{ color: C.text }}>{data.score}<span className="text-sm font-normal" style={{ color: C.textMuted }}>/100</span></div>

            <div className="mb-1 flex items-center justify-between text-xs" style={{ color: C.textMuted }}>
                <span>Completion</span><span>{data.completion}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden mb-4" style={{ background: C.border }}>
                <div className="h-full rounded-full" style={{ width: `${data.completion}%`, background: data.accent, transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)" }} />
            </div>

            <div className="text-xs mb-4" style={{ color: C.textMuted }}>XP earned: <span style={{ color: C.text }}>{data.xp.toLocaleString()}</span></div>

            <button
                onClick={() => setExpanded((e) => !e)}
                className="mt-auto flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-xl border transition-colors focus:outline-none focus-visible:ring-2"
                style={{ borderColor: C.border, color: data.accent, "--tw-ring-color": data.accent }}
            >
                {expanded ? "Collapse" : "View More"} {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            <div
                className="grid overflow-hidden transition-all duration-300"
                style={{ gridTemplateRows: expanded ? "1fr" : "0fr", marginTop: expanded ? 16 : 0 }}
            >
                <div className="min-h-0 overflow-hidden">
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t" style={{ borderColor: C.border }}>
                        {Object.entries(data.detail).map(([k, v]) => (
                            <div key={k} className="text-xs">
                                <div style={{ color: C.textMuted }} className="capitalize">{k.replace(/([A-Z])/g, " $1")}</div>
                                <div className="font-semibold" style={{ color: C.text }}>{v}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
}

function PerformanceOverview() {
    return (
        <section>
            <SectionHeader eyebrow="Section 03" title="Performance Overview" subtitle="Every module contributing to your overall score." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {PERFORMANCE_CARDS.map((c) => <PerformanceCard key={c.id} data={c} />)}
            </div>
        </section>
    );
}

/* =========================================================
   SECTION 4 — WEEKLY ACTIVITY TIMELINE
   ========================================================= */
function WeeklyTimeline() {
    const [ref, inView] = useInView();
    return (
        <section ref={ref}>
            <SectionHeader eyebrow="Section 04" title="Weekly Activity Timeline" subtitle="Daily output across coding, learning, communication and tasks." />
            <Card className="p-6 md:p-8" hover={false}>
                <div className="h-72">
                    {inView && (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={WEEKLY_TIMELINE}>
                                <defs>
                                    {[["coding", C.amber], ["learning", C.cyan], ["communication", "#A78BFA"], ["tasks", C.emerald]].map(([k, color]) => (
                                        <linearGradient id={`grad-${k}`} key={k} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                                            <stop offset="100%" stopColor={color} stopOpacity={0} />
                                        </linearGradient>
                                    ))}
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
                                <XAxis dataKey="day" stroke={C.textMuted} fontSize={12} tickLine={false} axisLine={{ stroke: C.border }} />
                                <YAxis stroke={C.textMuted} fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip content={<TimelineTooltip />} />
                                <Area type="monotone" dataKey="coding" stroke={C.amber} strokeWidth={2} fill="url(#grad-coding)" animationDuration={1400} />
                                <Area type="monotone" dataKey="learning" stroke={C.cyan} strokeWidth={2} fill="url(#grad-learning)" animationDuration={1400} animationBegin={150} />
                                <Area type="monotone" dataKey="communication" stroke="#A78BFA" strokeWidth={2} fill="url(#grad-communication)" animationDuration={1400} animationBegin={300} />
                                <Area type="monotone" dataKey="tasks" stroke={C.emerald} strokeWidth={2} fill="url(#grad-tasks)" animationDuration={1400} animationBegin={450} />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                    {[["Coding", C.amber], ["Learning", C.cyan], ["Communication", "#A78BFA"], ["Tasks", C.emerald]].map(([label, color]) => (
                        <div key={label} className="flex items-center gap-2 text-xs" style={{ color: C.textSecondary }}>
                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} /> {label}
                        </div>
                    ))}
                </div>
            </Card>
        </section>
    );
}

function TimelineTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl border px-4 py-3 text-xs" style={{ background: "rgba(17,24,39,0.95)", borderColor: C.border }}>
            <div className="font-semibold mb-2" style={{ color: C.text }}>{label}</div>
            {payload.map((p) => (
                <div key={p.dataKey} className="flex items-center justify-between gap-6" style={{ color: C.textSecondary }}>
                    <span className="flex items-center gap-1.5 capitalize"><span className="w-2 h-2 rounded-full" style={{ background: p.color }} />{p.dataKey}</span>
                    <span style={{ color: C.text }}>{p.value}</span>
                </div>
            ))}
        </div>
    );
}

/* =========================================================
   SECTION 5 — DEVELOPER PULSE GRID (unique heatmap alt.)
   ========================================================= */
function PulseGrid() {
    const [ref, inView] = useInView();
    const [hovered, setHovered] = useState(null);

    const colorFor = (v) => {
        if (v > 80) return C.amber;
        if (v > 55) return C.emerald;
        if (v > 30) return C.cyan;
        return C.border;
    };

    return (
        <section ref={ref}>
            <SectionHeader eyebrow="Section 05" title="Developer Pulse Grid" subtitle="An intensity matrix of activity — not a contribution graph." />
            <Card className="p-6 md:p-8" hover={false}>
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {PULSE_GRID.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-2">
                            {week.map((v, di) => (
                                <div
                                    key={di}
                                    onMouseEnter={() => setHovered({ w: wi, d: di, v })}
                                    onMouseLeave={() => setHovered(null)}
                                    className="w-6 h-6 rounded-lg cursor-pointer relative"
                                    style={{
                                        background: colorFor(v),
                                        opacity: inView ? Math.max(0.25, v / 100) : 0,
                                        transform: inView ? "scale(1)" : "scale(0.4)",
                                        transition: `all 400ms cubic-bezier(0.16,1,0.3,1) ${(wi * 7 + di) * 12}ms`,
                                        boxShadow: hovered?.w === wi && hovered?.d === di ? `0 0 0 2px ${C.text}` : "none",
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-between mt-4 text-xs" style={{ color: C.textMuted }}>
                    <span>8 week rolling window</span>
                    <span>{hovered ? `Week ${hovered.w + 1}, Day ${hovered.d + 1} — ${hovered.v} intensity` : "Hover a cell to inspect"}</span>
                </div>
            </Card>
        </section>
    );
}

/* =========================================================
   SECTION 6 — TIME DISTRIBUTION DONUT
   ========================================================= */
function TimeDistribution() {
    const [active, setActive] = useState(null);
    const [ref, inView] = useInView();
    return (
        <section ref={ref}>
            <SectionHeader eyebrow="Section 06" title="Time Distribution" subtitle="Where your hours actually go across a typical week." />
            <Card className="p-6 md:p-8" hover={false}>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="h-64">
                        {inView && (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={TIME_DISTRIBUTION} dataKey="value" nameKey="name"
                                        innerRadius={70} outerRadius={100} paddingAngle={3}
                                        animationDuration={1200}
                                    >
                                        {TIME_DISTRIBUTION.map((entry, i) => (
                                            <Cell
                                                key={entry.name} fill={entry.color}
                                                opacity={active === null || active === i ? 1 : 0.3}
                                                stroke={C.bg} strokeWidth={2}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<DonutTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                    <div className="space-y-2">
                        {TIME_DISTRIBUTION.map((d, i) => (
                            <div
                                key={d.name}
                                onMouseEnter={() => setActive(i)}
                                onMouseLeave={() => setActive(null)}
                                className="flex items-center justify-between px-4 py-3 rounded-xl border cursor-pointer transition-all"
                                style={{ borderColor: C.border, background: active === i ? "rgba(255,255,255,0.04)" : "transparent" }}
                            >
                                <div className="flex items-center gap-2 text-sm" style={{ color: C.text }}>
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} /> {d.name}
                                </div>
                                <div className="text-sm font-semibold" style={{ color: C.textSecondary }}>{d.value}%</div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </section>
    );
}

function DonutTooltip({ active, payload }) {
    if (!active || !payload?.length) return null;
    const d = payload[0];
    return (
        <div className="rounded-xl border px-3 py-2 text-xs" style={{ background: "rgba(17,24,39,0.95)", borderColor: C.border, color: C.text }}>
            {d.name}: {d.value}%
        </div>
    );
}

/* =========================================================
   SECTION 7 — SKILL GROWTH RADAR
   ========================================================= */
function SkillRadar() {
    const [ref, inView] = useInView();
    return (
        <section ref={ref}>
            <SectionHeader eyebrow="Section 07" title="Skill Growth Radar" subtitle="A balanced view across eight core engineering competencies." />
            <Card className="p-6 md:p-8" hover={false}>
                <div className="h-96">
                    {inView && (
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={SKILL_RADAR} outerRadius="75%">
                                <PolarGrid stroke={C.border} />
                                <PolarAngleAxis dataKey="skill" stroke={C.textSecondary} fontSize={12} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={C.border} tick={false} axisLine={false} />
                                <Radar
                                    dataKey="value" stroke={C.cyan} fill={C.cyan} fillOpacity={0.25} strokeWidth={2}
                                    animationDuration={1400} isAnimationActive
                                />
                                <Tooltip content={<RadarTooltip />} />
                            </RadarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </Card>
        </section>
    );
}

function RadarTooltip({ active, payload }) {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
        <div className="rounded-xl border px-3 py-2 text-xs" style={{ background: "rgba(17,24,39,0.95)", borderColor: C.border, color: C.text }}>
            {d.skill}: {d.value}/100
        </div>
    );
}

/* =========================================================
   SECTION 8 — CAREER GROWTH TIMELINE
   ========================================================= */
function CareerTimeline() {
    const [openId, setOpenId] = useState(null);
    const [ref, inView] = useInView();

    return (
        <section ref={ref}>
            <SectionHeader eyebrow="Section 08" title="Career Growth Timeline" subtitle="Milestones that mark the shape of your journey so far." />
            <Card className="p-6 md:p-10" hover={false}>
                <div className="relative">
                    <div
                        className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
                        style={{ background: C.border }}
                    >
                        <div
                            className="w-full"
                            style={{
                                height: inView ? "100%" : "0%",
                                background: `linear-gradient(180deg, ${C.amber}, ${C.emerald})`,
                                transition: "height 1.6s cubic-bezier(0.16,1,0.3,1)",
                            }}
                        />
                    </div>

                    <div className="space-y-8">
                        {CAREER_TIMELINE.map((m, i) => {
                            const Icon = m.icon;
                            const isOpen = openId === m.id;
                            const leftSide = i % 2 === 0;
                            return (
                                <div key={m.id} className={`relative md:grid md:grid-cols-2 md:gap-10 flex`}>
                                    <div
                                        className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 w-10 h-10 rounded-full flex items-center justify-center border-2 z-10"
                                        style={{ background: C.surface, borderColor: m.id === 6 ? C.amber : C.emerald }}
                                    >
                                        <Icon size={16} style={{ color: m.id === 6 ? C.amber : C.emerald }} />
                                    </div>
                                    <div className={`pl-14 md:pl-0 ${leftSide ? "md:col-start-1 md:text-right md:pr-14" : "md:col-start-2 md:pl-14"}`}>
                                        <button
                                            onClick={() => setOpenId(isOpen ? null : m.id)}
                                            className="text-left md:w-full focus:outline-none"
                                        >
                                            <div className="text-xs mb-1" style={{ color: C.textMuted }}>{m.date}</div>
                                            <div className="flex items-center gap-2 font-semibold" style={{ color: C.text }}>
                                                <span className={leftSide ? "md:order-2" : ""}>{m.title}</span>
                                                {isOpen ? <ChevronUp size={14} style={{ color: C.amber }} /> : <ChevronDown size={14} style={{ color: C.textMuted }} />}
                                            </div>
                                        </button>
                                        <div
                                            className="grid overflow-hidden transition-all duration-300"
                                            style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                                        >
                                            <p className="min-h-0 overflow-hidden text-sm pt-2" style={{ color: C.textSecondary }}>{m.desc}</p>
                                        </div>
                                    </div>
                                    {!leftSide && <div className="hidden md:block" />}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Card>
        </section>
    );
}

/* =========================================================
   SECTION 9 — INSIGHTS CENTER
   ========================================================= */
function InsightCard({ data }) {
    const [expanded, setExpanded] = useState(false);
    const Icon = data.icon;
    return (
        <Card className="p-5">
            <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${data.accent}1A` }}>
                    <Icon size={18} style={{ color: data.accent }} />
                </div>
                <div>
                    <div className="text-xs" style={{ color: C.textMuted }}>{data.title}</div>
                    <div className="font-semibold" style={{ color: C.text }}>{data.summary}</div>
                </div>
            </div>
            <button
                onClick={() => setExpanded((e) => !e)}
                className="text-xs font-semibold flex items-center gap-1 focus:outline-none"
                style={{ color: data.accent }}
            >
                {expanded ? "Collapse" : "View Details"} {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
            <div className="grid overflow-hidden transition-all duration-300" style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}>
                <p className="min-h-0 overflow-hidden text-xs pt-3" style={{ color: C.textSecondary }}>{data.detail}</p>
            </div>
        </Card>
    );
}

function InsightsCenter() {
    return (
        <section>
            <SectionHeader eyebrow="Section 09" title="Insights Center" subtitle="Patterns pulled from across every connected surface." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {INSIGHTS.map((i) => <InsightCard key={i.id} data={i} />)}
            </div>
        </section>
    );
}

/* =========================================================
   SECTION 10 — ACHIEVEMENTS SUMMARY
   ========================================================= */
function AchievementsSummary({ openModal }) {
    const [ref, inView] = useInView();
    const xp = useCountUp(ACHIEVEMENTS.xp, 1600, 0, inView);
    const badges = useCountUp(ACHIEVEMENTS.badges, 1200, 0, inView);
    const milestones = useCountUp(ACHIEVEMENTS.milestones, 1200, 0, inView);
    const longest = useCountUp(ACHIEVEMENTS.longestStreak, 1200, 0, inView);
    const current = useCountUp(ACHIEVEMENTS.currentStreak, 1200, 0, inView);
    const completion = useCountUp(ACHIEVEMENTS.completionRate, 1200, 0, inView);

    const stats = [
        { label: "Total XP", value: xp, icon: Zap, color: C.amber },
        { label: "Badges", value: badges, icon: Award, color: C.emerald },
        { label: "Milestones", value: milestones, icon: Trophy, color: C.cyan },
        { label: "Longest Streak", value: `${longest}d`, icon: Flame, color: C.warning },
        { label: "Current Streak", value: `${current}d`, icon: Flame, color: C.amber },
        { label: "Completion Rate", value: `${completion}%`, icon: Target, color: C.emerald },
    ];

    return (
        <section ref={ref}>
            <SectionHeader
                eyebrow="Section 10" title="Achievements Summary" subtitle="A lifetime record of what you've built and finished."
                right={<GhostButton icon={ChevronRight} onClick={() => openModal("achievements")}>View All</GhostButton>}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {stats.map((s) => (
                    <Card key={s.label} className="p-5 text-center">
                        <s.icon size={20} style={{ color: s.color }} className="mx-auto mb-2" />
                        <div className="text-lg font-bold" style={{ color: C.text }}>{s.value}</div>
                        <div className="text-[11px] mt-1" style={{ color: C.textMuted }}>{s.label}</div>
                    </Card>
                ))}
            </div>
        </section>
    );
}

/* =========================================================
   SECTION 11 — FUTURE PREDICTION
   ========================================================= */
function PredictionCard({ data }) {
    const Icon = data.icon;
    return (
        <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: `${data.accent}1A` }}>
                    <Icon size={20} style={{ color: data.accent }} />
                </div>
                <div>
                    <div className="font-semibold text-sm" style={{ color: C.text }}>{data.title}</div>
                    <div className="text-xs" style={{ color: C.textMuted }}>Estimated {data.estimate}</div>
                </div>
            </div>
            <div className="flex items-center justify-between text-xs mb-1" style={{ color: C.textMuted }}>
                <span>At current pace</span><span>{data.progress}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.border }}>
                <div
                    className="h-full rounded-full"
                    style={{ width: `${data.progress}%`, background: data.accent, transition: "width 1.4s cubic-bezier(0.16,1,0.3,1)" }}
                />
            </div>
        </Card>
    );
}

function FuturePrediction() {
    return (
        <section>
            <SectionHeader eyebrow="Section 11" title="Future Prediction" subtitle="Where your current trajectory puts you next." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {PREDICTIONS.map((p) => <PredictionCard key={p.id} data={p} />)}
            </div>
        </section>
    );
}

/* =========================================================
   SECTION 12 — QUICK ANALYTICS ACTIONS (floating panel)
   ========================================================= */
function QuickActions({ notify, openModal }) {
    const [open, setOpen] = useState(false);
    const actions = [
        { label: "Generate Report", icon: FileText, action: () => openModal("weeklyReport") },
        { label: "Export PDF", icon: Download, action: () => notify("PDF export started") },
        { label: "Compare Weeks", icon: BarChart3, action: () => openModal("compare") },
        { label: "Download Data", icon: Layers, action: () => notify("Raw data downloaded") },
        { label: "Share Analytics", icon: Share2, action: () => openModal("share") },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
            <div
                className="flex flex-col items-end gap-2 transition-all duration-300"
                style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(12px)",
                    pointerEvents: open ? "auto" : "none",
                }}
            >
                {actions.map((a) => (
                    <button
                        key={a.label}
                        onClick={a.action}
                        className="flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-2xl border text-sm font-medium shadow-lg hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2"
                        style={{ background: "rgba(17,24,39,0.95)", borderColor: C.border, color: C.text, "--tw-ring-color": C.amber }}
                    >
                        {a.label} <a.icon size={16} style={{ color: C.amber }} />
                    </button>
                ))}
            </div>
            <button
                onClick={() => setOpen((o) => !o)}
                aria-label="Quick analytics actions"
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2"
                style={{ background: `linear-gradient(135deg, ${C.amber}, ${C.warning})`, "--tw-ring-color": C.amber }}
            >
                <div style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 250ms ease" }}>
                    <Sparkles size={22} color="#0B1120" />
                </div>
            </button>
        </div>
    );
}

/* =========================================================
   MODAL CONTENT ROUTER
   ========================================================= */
function ModalContent({ id }) {
    switch (id) {
        case "weeklyReport":
            return (
                <div className="space-y-3 text-sm">
                    <p>Your generated weekly report compiles output across every connected surface.</p>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl p-3 border" style={{ borderColor: C.border }}>
                            <div className="text-xs" style={{ color: C.textMuted }}>Avg. Daily Score</div>
                            <div className="font-bold" style={{ color: C.text }}>84/100</div>
                        </div>
                        <div className="rounded-xl p-3 border" style={{ borderColor: C.border }}>
                            <div className="text-xs" style={{ color: C.textMuted }}>XP This Week</div>
                            <div className="font-bold" style={{ color: C.text }}>3,120</div>
                        </div>
                    </div>
                </div>
            );
        case "share":
            return <p className="text-sm">A shareable snapshot link has been generated. Anyone with the link can view a read-only version of this analytics summary.</p>;
        case "productivity":
            return (
                <div className="space-y-2 text-sm">
                    <p>Your productivity score blends completion rate, consistency, and growth across all six modules.</p>
                    <p>This week's biggest contributor: <span style={{ color: C.text }} className="font-semibold">GitHub activity</span>, up 9.2%.</p>
                </div>
            );
        case "achievements":
            return (
                <div className="grid grid-cols-2 gap-3 text-sm">
                    {Object.entries(ACHIEVEMENTS).map(([k, v]) => (
                        <div key={k} className="rounded-xl p-3 border" style={{ borderColor: C.border }}>
                            <div className="text-xs capitalize" style={{ color: C.textMuted }}>{k.replace(/([A-Z])/g, " $1")}</div>
                            <div className="font-bold" style={{ color: C.text }}>{v}</div>
                        </div>
                    ))}
                </div>
            );
        case "compare":
            return <p className="text-sm">Comparing this week (91% performance) to last week (84% performance) — a <span style={{ color: C.emerald }} className="font-semibold">+7% improvement</span>, driven largely by increased coding output.</p>;
        default:
            return null;
    }
}

const MODAL_TITLES = {
    weeklyReport: "Weekly Report",
    share: "Share Progress",
    productivity: "Productivity Breakdown",
    achievements: "All Achievements",
    compare: "Compare Weeks",
};

/* =========================================================
   ROOT COMPONENT
   ========================================================= */
export default function AnalyticsPage() {
    const [modal, setModal] = useState(null);
    const [toast, setToast] = useState({ show: false, message: "" });

    const openModal = useCallback((id) => setModal(id), []);
    const closeModal = useCallback(() => setModal(null), []);

    const notify = useCallback((message) => {
        setToast({ show: true, message });
        setTimeout(() => setToast({ show: false, message: "" }), 2400);
    }, []);

    return (
        <div className="min-h-screen w-full" style={{ color: C.text }}>
            <style>{`
        @keyframes floatParticle { 0%,100% { transform: translateY(0) translateX(0); opacity:.6 } 50% { transform: translateY(-14px) translateX(6px); opacity:1 } }
        @keyframes floatCard { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
        @keyframes ripple { from { width:8px; height:8px; opacity:.5 } to { width:220px; height:220px; opacity:0; transform:translate(-50%,-50%) } }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes scaleIn { from { opacity:0; transform:scale(.94) translateY(8px) } to { opacity:1; transform:scale(1) translateY(0) } }
        @keyframes toastIn { from { opacity:0; transform:translate(-50%,12px) } to { opacity:1; transform:translate(-50%,0) } }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

            <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-16">
                <Hero notify={notify} openModal={openModal} />
                <ProductivityGauge openModal={openModal} />
                <PerformanceOverview />
                <WeeklyTimeline />
                <PulseGrid />
                <TimeDistribution />
                <SkillRadar />
                <CareerTimeline />
                <InsightsCenter />
                <AchievementsSummary openModal={openModal} />
                <FuturePrediction />
            </main>

            <QuickActions notify={notify} openModal={openModal} />

            <Modal open={!!modal} onClose={closeModal} title={MODAL_TITLES[modal] || ""}>
                <ModalContent id={modal} />
            </Modal>

            <Toast show={toast.show} message={toast.message} />
        </div>
    );
}