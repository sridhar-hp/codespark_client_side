import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
    Bell,
    Search,
    Sparkles,
    BookOpen,
    Github,
    Code2,
    MessageSquare,
    Briefcase,
    NotebookPen,
    Trophy,
    Check,
    CheckCheck,
    Bookmark,
    BookmarkCheck,
    X,
    ChevronDown,
    ChevronUp,
    Clock,
    Flame,
    ArrowUpRight,
    Settings2,
    Command,
    Inbox,
    AlertTriangle,
    Zap,
    CircleDot,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* MOCK DATA — replace with API responses later                       */
/* ------------------------------------------------------------------ */

const MODULES = {
    learning: { label: "Learning", icon: BookOpen, accent: "#F59E0B" },
    github: { label: "GitHub", icon: Github, accent: "#22D3EE" },
    leetcode: { label: "LeetCode", icon: Code2, accent: "#F97316" },
    communication: { label: "Communication", icon: MessageSquare, accent: "#22D3EE" },
    career: { label: "Career", icon: Briefcase, accent: "#F59E0B" },
    journal: { label: "Journal", icon: NotebookPen, accent: "#9CA3AF" },
    achievements: { label: "Achievements", icon: Trophy, accent: "#F97316" },
};

const NOTIFICATIONS = [
    {
        id: "n1",
        module: "leetcode",
        title: "3-day solving streak reached",
        description: "You've solved a problem for 3 days in a row. One more for a 4-day streak.",
        time: "10m ago",
        bucket: "Today",
        priority: "High",
        unread: true,
        bookmarked: false,
    },
    {
        id: "n2",
        module: "github",
        title: "Pull request merged into main",
        description: "\"Refactor auth middleware\" was merged by your reviewer.",
        time: "42m ago",
        bucket: "Today",
        priority: "Medium",
        unread: true,
        bookmarked: false,
    },
    {
        id: "n3",
        module: "learning",
        title: "Node.js module 4 unlocked",
        description: "Event loop and async patterns — next in your learning path.",
        time: "2h ago",
        bucket: "Today",
        priority: "Low",
        unread: false,
        bookmarked: true,
    },
    {
        id: "n4",
        module: "career",
        title: "Resume review due",
        description: "Your quarterly resume checkpoint is ready for review.",
        time: "Yesterday, 6:12 PM",
        bucket: "Yesterday",
        priority: "Medium",
        unread: false,
        bookmarked: false,
    },
    {
        id: "n5",
        module: "communication",
        title: "Mock interview feedback ready",
        description: "Your system design mock interview was scored. Review notes inside.",
        time: "Yesterday, 11:03 AM",
        bucket: "Yesterday",
        priority: "High",
        unread: false,
        bookmarked: false,
    },
    {
        id: "n6",
        module: "achievements",
        title: "Badge earned: Consistent Committer",
        description: "You've committed code for 5 consecutive weekdays.",
        time: "2 days ago",
        bucket: "Earlier",
        priority: "Low",
        unread: false,
        bookmarked: true,
    },
    {
        id: "n7",
        module: "journal",
        title: "Weekly journal reflection missing",
        description: "You haven't logged a reflection for last week yet.",
        time: "3 days ago",
        bucket: "Earlier",
        priority: "Medium",
        unread: false,
        bookmarked: false,
    },
];

const AI_RECOMMENDATIONS = [
    {
        id: "r1",
        title: "Continue Node.js today",
        detail: "Pick up where you left off in Module 4",
        time: "25 min",
        difficulty: "Intermediate",
        xp: 120,
        icon: BookOpen,
    },
    {
        id: "r2",
        title: "Complete one Medium LeetCode problem",
        detail: "Keeps your solving streak alive",
        time: "35 min",
        difficulty: "Medium",
        xp: 150,
        icon: Code2,
    },
    {
        id: "r3",
        title: "Update LinkedIn portfolio",
        detail: "Add your latest merged project",
        time: "15 min",
        difficulty: "Easy",
        xp: 60,
        icon: Briefcase,
    },
    {
        id: "r4",
        title: "Practice communication for 20 minutes",
        detail: "Mock interview: behavioral round",
        time: "20 min",
        difficulty: "Intermediate",
        xp: 90,
        icon: MessageSquare,
    },
];

const FILTER_CHIPS = [
    "All",
    "Unread",
    "Important",
    "Learning",
    "GitHub",
    "Achievements",
    "Career",
    "Journal",
];

const PREFERENCES = [
    { id: "desktop", label: "Desktop notifications", description: "Get notified in real time on this device" },
    { id: "email", label: "Email summary", description: "A daily digest of what happened" },
    { id: "learning", label: "Learning alerts", description: "New modules and course progress" },
    { id: "github", label: "GitHub alerts", description: "Pull requests, commits and reviews" },
    { id: "leetcode", label: "LeetCode alerts", description: "Streaks, submissions and reminders" },
    { id: "career", label: "Career alerts", description: "Resume checkpoints and job milestones" },
    { id: "ai", label: "AI suggestions", description: "Personalized daily recommendations" },
];

const PRIORITY_STYLES = {
    High: { text: "text-[#F97316]", bg: "bg-[#F97316]/10", border: "border-[#F97316]/25", dot: "#F97316" },
    Medium: { text: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10", border: "border-[#F59E0B]/25", dot: "#F59E0B" },
    Low: { text: "text-[#9CA3AF]", bg: "bg-[#9CA3AF]/10", border: "border-[#9CA3AF]/20", dot: "#9CA3AF" },
};

/* ------------------------------------------------------------------ */
/* SMALL UTILITIES                                                     */
/* ------------------------------------------------------------------ */

function useCountUp(target, duration = 900) {
    const [value, setValue] = useState(0);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (reduceMotion) {
            setValue(target);
            return;
        }
        let start = null;
        let raf;
        const step = (ts) => {
            if (start === null) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target]);

    return value;
}

function ToggleSwitch({ checked, onChange, label }) {
    return (
        <button
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={onChange}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120] ${checked ? "bg-[#F59E0B]" : "bg-[#1F2937]"
                }`}
        >
            <motion.span
                className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-[#F9FAFB] shadow-sm"
                animate={{ x: checked ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
        </button>
    );
}

/* ------------------------------------------------------------------ */
/* STAT CARD                                                           */
/* ------------------------------------------------------------------ */

function StatCard({ label, value, icon: Icon, accent, index }) {
    const count = useCountUp(value);
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3 }}
            className="group relative overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827]/80 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-[#1F2937]"
        >
            <div
                className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
                style={{ background: accent }}
            />
            <div className="flex items-center justify-between">
                <span className="text-sm text-[#9CA3AF]">{label}</span>
                <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${accent}1A` }}
                >
                    <Icon size={16} style={{ color: accent }} strokeWidth={2} />
                </div>
            </div>
            <div className="mt-3 text-3xl font-semibold tracking-tight text-[#F9FAFB]">{count}</div>
        </motion.div>
    );
}

/* ------------------------------------------------------------------ */
/* NOTIFICATION CARD                                                   */
/* ------------------------------------------------------------------ */

function NotificationCard({ item, onDismiss, onBookmark, onToggleRead, index }) {
    const [expanded, setExpanded] = useState(false);
    const mod = MODULES[item.module];
    const ModIcon = mod.icon;
    const p = PRIORITY_STYLES[item.priority];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -12, transition: { duration: 0.2 } }}
            transition={{ duration: 0.35, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -2 }}
            className={`group relative rounded-2xl border bg-[#111827]/70 p-4 backdrop-blur-sm transition-colors duration-300 sm:p-5 ${item.unread ? "border-[#1F2937]" : "border-[#1F2937]/60"
                } hover:border-[#F59E0B]/20`}
        >
            {item.unread && (
                <span className="absolute top-5 right-5 h-1.5 w-1.5 rounded-full bg-[#F59E0B]" aria-hidden="true" />
            )}

            <div className="flex gap-4">
                <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${mod.accent}1A` }}
                >
                    <ModIcon size={17} style={{ color: mod.accent }} strokeWidth={2} />
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0">
                            <h4 className="truncate text-[15px] font-medium text-[#F9FAFB]">{item.title}</h4>
                            <p className={`mt-1 text-sm text-[#9CA3AF] ${expanded ? "" : "line-clamp-2"}`}>
                                {item.description}
                            </p>
                        </div>
                        <span
                            className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${p.text} ${p.bg} ${p.border}`}
                        >
                            {item.priority}
                        </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                            <Clock size={12} />
                            <span>{item.time}</span>
                            <span className="text-[#1F2937]">•</span>
                            <span style={{ color: mod.accent }}>{mod.label}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setExpanded((e) => !e)}
                                aria-label={expanded ? "Collapse" : "Expand"}
                                className="rounded-lg p-1.5 text-[#9CA3AF] outline-none transition-colors hover:bg-[#1F2937] hover:text-[#F9FAFB] focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                            >
                                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                            <button
                                onClick={() => onToggleRead(item.id)}
                                aria-label={item.unread ? "Mark read" : "Mark unread"}
                                className="rounded-lg p-1.5 text-[#9CA3AF] outline-none transition-colors hover:bg-[#1F2937] hover:text-[#F9FAFB] focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                            >
                                {item.unread ? <Check size={14} /> : <CheckCheck size={14} />}
                            </button>
                            <button
                                onClick={() => onBookmark(item.id)}
                                aria-label={item.bookmarked ? "Remove bookmark" : "Bookmark"}
                                className="rounded-lg p-1.5 text-[#9CA3AF] outline-none transition-colors hover:bg-[#1F2937] hover:text-[#F9FAFB] focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                            >
                                {item.bookmarked ? (
                                    <BookmarkCheck size={14} className="text-[#F59E0B]" />
                                ) : (
                                    <Bookmark size={14} />
                                )}
                            </button>
                            <button
                                onClick={() => onDismiss(item.id)}
                                aria-label="Dismiss"
                                className="rounded-lg p-1.5 text-[#9CA3AF] outline-none transition-colors hover:bg-[#1F2937] hover:text-[#F9FAFB] focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                            >
                                <X size={14} />
                            </button>
                            <button className="ml-1 flex items-center gap-1 rounded-lg border border-[#1F2937] px-2.5 py-1.5 text-xs font-medium text-[#F9FAFB] outline-none transition-colors hover:border-[#F59E0B]/40 hover:bg-[#F59E0B]/10 focus-visible:ring-2 focus-visible:ring-[#F59E0B]">
                                View
                                <ArrowUpRight size={12} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* ------------------------------------------------------------------ */
/* MAIN COMPONENT                                                      */
/* ------------------------------------------------------------------ */

export default function Notification() {
    const [notifications, setNotifications] = useState(NOTIFICATIONS);
    const [activeFilter, setActiveFilter] = useState("All");
    const [query, setQuery] = useState("");
    const [preferences, setPreferences] = useState(
        PREFERENCES.reduce((acc, p) => ({ ...acc, [p.id]: true }), {})
    );
    const searchRef = useRef(null);
    const reduceMotion = useReducedMotion();

    // Keyboard shortcut: Ctrl/Cmd + K focuses search
    useEffect(() => {
        const handler = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                searchRef.current?.focus();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const dismiss = (id) => setNotifications((prev) => prev.filter((n) => n.id !== id));
    const bookmark = (id) =>
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, bookmarked: !n.bookmarked } : n))
        );
    const toggleRead = (id) =>
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
        );
    const togglePreference = (id) =>
        setPreferences((prev) => ({ ...prev, [id]: !prev[id] }));

    const filtered = useMemo(() => {
        return notifications.filter((n) => {
            const matchesQuery =
                query.trim() === "" ||
                n.title.toLowerCase().includes(query.toLowerCase()) ||
                n.description.toLowerCase().includes(query.toLowerCase());

            if (!matchesQuery) return false;

            switch (activeFilter) {
                case "All":
                    return true;
                case "Unread":
                    return n.unread;
                case "Important":
                    return n.priority === "High";
                case "Learning":
                    return n.module === "learning";
                case "GitHub":
                    return n.module === "github";
                case "Achievements":
                    return n.module === "achievements";
                case "Career":
                    return n.module === "career";
                case "Journal":
                    return n.module === "journal";
                default:
                    return true;
            }
        });
    }, [notifications, activeFilter, query]);

    const grouped = useMemo(() => {
        const buckets = { Today: [], Yesterday: [], Earlier: [] };
        filtered.forEach((n) => buckets[n.bucket]?.push(n));
        return buckets;
    }, [filtered]);

    const stats = {
        unread: notifications.filter((n) => n.unread).length,
        today: notifications.filter((n) => n.bucket === "Today").length,
        important: notifications.filter((n) => n.priority === "High").length,
        aiSuggestions: AI_RECOMMENDATIONS.length,
    };

    const moduleCounts = useMemo(() => {
        const counts = {};
        Object.keys(MODULES).forEach((key) => {
            counts[key] = notifications.filter((n) => n.module === key).length;
        });
        return counts;
    }, [notifications]);

    const isEmpty = filtered.length === 0;

    return (
        <div className="min-h-screen w-full  px-4 py-10 text-[#F9FAFB] sm:px-8 lg:px-12">
            <div className="mx-auto max-w-6xl">
                {/* ---------------------------------------------------------- */}
                {/* HERO                                                       */}
                {/* ---------------------------------------------------------- */}
                <motion.header
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
                >
                    <div>
                        <div className="mb-3 flex items-center gap-2 text-xs font-medium tracking-wide text-[#9CA3AF]">
                            <Bell size={14} className="text-[#F59E0B]" />
                            CODESPARK
                        </div>
                        <h1 className="text-3xl font-semibold tracking-tight text-[#F9FAFB] sm:text-4xl">
                            Notifications
                        </h1>
                        <p className="mt-2 text-sm text-[#9CA3AF] sm:text-base">
                            Stay informed about your engineering journey.
                        </p>
                    </div>

                    <button className="flex w-fit items-center gap-2 rounded-xl border border-[#1F2937] bg-[#111827] px-4 py-2.5 text-sm font-medium text-[#F9FAFB] outline-none transition-colors hover:border-[#F59E0B]/30 focus-visible:ring-2 focus-visible:ring-[#F59E0B]">
                        <Settings2 size={15} />
                        Preferences
                    </button>
                </motion.header>

                {/* ---------------------------------------------------------- */}
                {/* STAT CARDS                                                  */}
                {/* ---------------------------------------------------------- */}
                <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                    <StatCard label="Unread" value={stats.unread} icon={Inbox} accent="#F59E0B" index={0} />
                    <StatCard label="Today's updates" value={stats.today} icon={Zap} accent="#22D3EE" index={1} />
                    <StatCard label="Important" value={stats.important} icon={AlertTriangle} accent="#F97316" index={2} />
                    <StatCard label="AI suggestions" value={stats.aiSuggestions} icon={Sparkles} accent="#F59E0B" index={3} />
                </div>

                {/* ---------------------------------------------------------- */}
                {/* TODAY'S FOCUS — AI SUMMARY CARD                             */}
                {/* ---------------------------------------------------------- */}
                <motion.section
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mt-10 overflow-hidden rounded-3xl border border-[#1F2937] p-6 sm:p-8"
                    style={{
                        background:
                            "radial-gradient(120% 140% at 0% 0%, rgba(245,158,11,0.10) 0%, rgba(17,24,39,0.4) 45%, rgba(15,23,42,0.9) 100%)",
                    }}
                >
                    <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-[#22D3EE]/10 blur-3xl" />
                    <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                        <div className="max-w-xl">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F59E0B]/15">
                                <Sparkles size={18} className="text-[#F59E0B]" />
                            </div>
                            <h2 className="text-xl font-medium text-[#F9FAFB] sm:text-2xl">Good afternoon.</h2>
                            <p className="mt-3 text-sm leading-relaxed text-[#9CA3AF] sm:text-[15px]">
                                Today you completed a React learning session, pushed a GitHub commit, solved one
                                LeetCode problem and wrote a journal entry. You're currently on track to maintain
                                your weekly goal.
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {[
                                    { label: "React learning", icon: BookOpen },
                                    { label: "GitHub commit", icon: Github },
                                    { label: "1 LeetCode problem", icon: Code2 },
                                    { label: "Journal entry", icon: NotebookPen },
                                ].map((tag) => (
                                    <span
                                        key={tag.label}
                                        className="flex items-center gap-1.5 rounded-full border border-[#1F2937] bg-[#0F172A]/70 px-3 py-1.5 text-xs text-[#F9FAFB]"
                                    >
                                        <tag.icon size={12} className="text-[#F59E0B]" />
                                        {tag.label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-[#1F2937] bg-[#0F172A]/60 px-5 py-4">
                            <Flame size={22} className="text-[#F97316]" />
                            <div>
                                <div className="text-lg font-semibold text-[#F9FAFB]">Weekly goal</div>
                                <div className="text-xs text-[#9CA3AF]">On track — 4 of 7 days</div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* ---------------------------------------------------------- */}
                {/* SEARCH + FILTERS                                            */}
                {/* ---------------------------------------------------------- */}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full sm:max-w-sm">
                        <Search size={16} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-[#9CA3AF]" />
                        <input
                            ref={searchRef}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            type="text"
                            placeholder="Search notifications"
                            className="w-full rounded-xl border border-[#1F2937] bg-[#111827] py-2.5 pr-16 pl-10 text-sm text-[#F9FAFB] placeholder-[#9CA3AF] outline-none transition-colors focus:border-[#F59E0B]/40 focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                        />
                        <span className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-0.5 rounded-md border border-[#1F2937] px-1.5 py-0.5 text-[10px] text-[#9CA3AF]">
                            <Command size={10} />K
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {FILTER_CHIPS.map((chip) => {
                            const active = activeFilter === chip;
                            return (
                                <button
                                    key={chip}
                                    onClick={() => setActiveFilter(chip)}
                                    className={`relative rounded-full border px-3.5 py-1.5 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#F59E0B] ${active
                                        ? "border-[#F59E0B]/40 text-[#0B1120]"
                                        : "border-[#1F2937] text-[#9CA3AF] hover:border-[#1F2937] hover:text-[#F9FAFB]"
                                        }`}
                                >
                                    {active && (
                                        <motion.span
                                            layoutId="chip-active"
                                            className="absolute inset-0 rounded-full bg-[#F59E0B]"
                                            transition={{ type: "spring", stiffness: 500, damping: 32 }}
                                        />
                                    )}
                                    <span className="relative">{chip}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ---------------------------------------------------------- */}
                {/* PRIORITY NOTIFICATIONS + TIMELINE                           */}
                {/* ---------------------------------------------------------- */}
                <section className="mt-8">
                    {isEmpty ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#1F2937] py-20 text-center"
                        >
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#111827]">
                                <CheckCheck size={24} className="text-[#F59E0B]" />
                            </div>
                            <h3 className="text-lg font-medium text-[#F9FAFB]">You're all caught up.</h3>
                            <p className="mt-2 max-w-xs text-sm text-[#9CA3AF]">
                                Keep learning. Your next update will appear automatically.
                            </p>
                        </motion.div>
                    ) : (
                        Object.entries(grouped).map(([bucket, items]) =>
                            items.length === 0 ? null : (
                                <div key={bucket} className="mb-10">
                                    <div className="mb-4 flex items-center gap-3">
                                        <h3 className="text-sm font-medium text-[#F9FAFB]">{bucket}</h3>
                                        <span className="h-px flex-1 bg-[#1F2937]" />
                                        <span className="text-xs text-[#9CA3AF]">{items.length}</span>
                                    </div>
                                    <div className="relative space-y-3 border-l border-[#1F2937] pl-6">
                                        <AnimatePresence mode="popLayout">
                                            {items.map((item, i) => (
                                                <div key={item.id} className="relative">
                                                    <span
                                                        className="absolute top-6 -left-[29px] h-2 w-2 rounded-full"
                                                        style={{ backgroundColor: MODULES[item.module].accent }}
                                                        aria-hidden="true"
                                                    />
                                                    <NotificationCard
                                                        item={item}
                                                        onDismiss={dismiss}
                                                        onBookmark={bookmark}
                                                        onToggleRead={toggleRead}
                                                        index={i}
                                                    />
                                                </div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            )
                        )
                    )}
                </section>

                {/* ---------------------------------------------------------- */}
                {/* DEVELOPER MODULES                                           */}
                {/* ---------------------------------------------------------- */}
                <section className="mt-6">
                    <h3 className="mb-4 text-sm font-medium text-[#F9FAFB]">Developer modules</h3>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                        {Object.entries(MODULES).map(([key, mod], i) => {
                            const Icon = mod.icon;
                            return (
                                <motion.div
                                    key={key}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ duration: 0.35, delay: i * 0.04 }}
                                    whileHover={{ y: -2 }}
                                    className="flex items-center gap-3 rounded-2xl border border-[#1F2937] bg-[#111827]/60 p-4"
                                >
                                    <div
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                                        style={{ backgroundColor: `${mod.accent}1A` }}
                                    >
                                        <Icon size={16} style={{ color: mod.accent }} />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="truncate text-sm font-medium text-[#F9FAFB]">{mod.label}</div>
                                        <div className="text-xs text-[#9CA3AF]">{moduleCounts[key]} updates</div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* ---------------------------------------------------------- */}
                {/* AI COACH                                                    */}
                {/* ---------------------------------------------------------- */}
                <section className="mt-12">
                    <div className="mb-4 flex items-center gap-2">
                        <Sparkles size={16} className="text-[#F59E0B]" />
                        <h3 className="text-sm font-medium text-[#F9FAFB]">AI coach recommends</h3>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {AI_RECOMMENDATIONS.map((rec, i) => {
                            const Icon = rec.icon;
                            return (
                                <motion.div
                                    key={rec.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -3 }}
                                    className="rounded-2xl border border-[#1F2937] bg-[#111827]/70 p-5"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F59E0B]/15">
                                                <Icon size={16} className="text-[#F59E0B]" />
                                            </div>
                                            <h4 className="text-sm font-medium text-[#F9FAFB]">{rec.title}</h4>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-sm text-[#9CA3AF]">{rec.detail}</p>

                                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#9CA3AF]">
                                        <span className="flex items-center gap-1.5">
                                            <Clock size={12} />
                                            {rec.time}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <CircleDot size={12} />
                                            {rec.difficulty}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-[#F59E0B]">
                                            <Zap size={12} />
                                            {rec.xp} XP
                                        </span>
                                    </div>

                                    <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#1F2937] py-2 text-xs font-medium text-[#F9FAFB] outline-none transition-colors hover:border-[#F59E0B]/40 hover:bg-[#F59E0B]/10 focus-visible:ring-2 focus-visible:ring-[#F59E0B]">
                                        Start now
                                        <ArrowUpRight size={12} />
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* ---------------------------------------------------------- */}
                {/* PREFERENCES                                                 */}
                {/* ---------------------------------------------------------- */}
                <section className="mt-12 mb-6">
                    <div className="mb-4 flex items-center gap-2">
                        <Settings2 size={16} className="text-[#9CA3AF]" />
                        <h3 className="text-sm font-medium text-[#F9FAFB]">Notification preferences</h3>
                    </div>
                    <div className="divide-y divide-[#1F2937] rounded-2xl border border-[#1F2937] bg-[#111827]/60">
                        {PREFERENCES.map((pref) => (
                            <div key={pref.id} className="flex items-center justify-between gap-4 p-4 sm:p-5">
                                <div className="min-w-0">
                                    <div className="text-sm font-medium text-[#F9FAFB]">{pref.label}</div>
                                    <div className="mt-0.5 text-xs text-[#9CA3AF]">{pref.description}</div>
                                </div>
                                <ToggleSwitch
                                    checked={preferences[pref.id]}
                                    onChange={() => togglePreference(pref.id)}
                                    label={pref.label}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}