import React, { useState, useMemo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    Trash2,
} from "lucide-react";
import {
    fetchNotificationsThunk,
    markAsReadThunk,
    markAllAsReadThunk,
    deleteNotificationThunk,
    deleteAllNotificationsThunk,
} from "../../redux/notificationThunks";

const TYPE_CONFIG = {
    TASK: { label: "Task", icon: BookOpen, accent: "#F59E0B" },
    LEARNING: { label: "Learning", icon: BookOpen, accent: "#F59E0B" },
    GOAL: { label: "Goal", icon: Zap, accent: "#F59E0B" },
    XP: { label: "XP", icon: Sparkles, accent: "#F59E0B" },
    ACHIEVEMENT: { label: "Achievement", icon: Trophy, accent: "#F97316" },
    STREAK: { label: "Streak", icon: Flame, accent: "#F97316" },
    SYSTEM: { label: "System", icon: Bell, accent: "#22D3EE" },
    GITHUB: { label: "GitHub", icon: Github, accent: "#22D3EE" },
};

const FILTER_CHIPS = [
    "All",
    "Unread",
    "TASK",
    "LEARNING",
    "GOAL",
    "XP",
    "ACHIEVEMENT",
    "STREAK",
    "GITHUB",
    "SYSTEM",
];

const PREFERENCES = [
    { id: "desktop", label: "Desktop notifications", description: "Get notified in real time on this device" },
    { id: "email", label: "Email summary", description: "A daily digest of what happened" },
    { id: "learning", label: "Learning alerts", description: "New modules and course progress" },
    { id: "github", label: "GitHub alerts", description: "Pull requests, commits and reviews" },
    { id: "leetcode", label: "LeetCode alerts", description: "Streaks, submissions and reminders" },
    { id: "ai", label: "AI suggestions", description: "Personalized daily recommendations" },
];

function formatRelativeTime(dateStr) {
    if (!dateStr) return 'Recently';
    const date = new Date(dateStr);
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays}d ago`;
}

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

function NotificationCard({ item, onDismiss, onToggleRead, index }) {
    const [expanded, setExpanded] = useState(false);
    const typeKey = (item.type || 'SYSTEM').toUpperCase();
    const config = TYPE_CONFIG[typeKey] || TYPE_CONFIG.SYSTEM;
    const IconComponent = config.icon;
    const isUnread = !item.isRead && !item.read;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -12, transition: { duration: 0.2 } }}
            transition={{ duration: 0.35, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -2 }}
            className={`group relative rounded-2xl border bg-[#111827]/70 p-4 backdrop-blur-sm transition-colors duration-300 sm:p-5 ${isUnread ? "border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.05)]" : "border-[#1F2937]/60"
                } hover:border-[#F59E0B]/40`}
        >
            {isUnread && (
                <span className="absolute top-5 right-5 h-2 w-2 rounded-full bg-[#F59E0B] shadow-[0_0_8px_rgba(245,158,11,0.8)]" aria-hidden="true" />
            )}

            <div className="flex gap-4">
                <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${config.accent}1A` }}
                >
                    <IconComponent size={17} style={{ color: config.accent }} strokeWidth={2} />
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0">
                            <h4 className="truncate text-[15px] font-medium text-[#F9FAFB]">{item.title}</h4>
                            <p className={`mt-1 text-sm text-[#9CA3AF] ${expanded ? "" : "line-clamp-2"}`}>
                                {item.message || item.description}
                            </p>
                        </div>
                        <span
                            className="shrink-0 rounded-full border border-[#1F2937] bg-[#0B1120] px-2.5 py-1 text-xs font-semibold text-[#F59E0B]"
                        >
                            {config.label}
                        </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                            <Clock size={12} />
                            <span>{formatRelativeTime(item.createdAt || item.time)}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setExpanded((e) => !e)}
                                aria-label={expanded ? "Collapse" : "Expand"}
                                className="rounded-lg p-1.5 text-[#9CA3AF] outline-none transition-colors hover:bg-[#1F2937] hover:text-[#F9FAFB]"
                            >
                                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                            <button
                                onClick={() => onToggleRead(item._id || item.id)}
                                aria-label={isUnread ? "Mark read" : "Mark unread"}
                                className="rounded-lg p-1.5 text-[#9CA3AF] outline-none transition-colors hover:bg-[#1F2937] hover:text-[#F9FAFB]"
                                title={isUnread ? "Mark read" : "Already read"}
                            >
                                {isUnread ? <Check size={14} /> : <CheckCheck size={14} className="text-amber-500" />}
                            </button>
                            <button
                                onClick={() => onDismiss(item._id || item.id)}
                                aria-label="Delete"
                                className="rounded-lg p-1.5 text-[#9CA3AF] outline-none transition-colors hover:bg-red-500/20 hover:text-red-400"
                                title="Delete Notification"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function Notification() {
    const dispatch = useDispatch();
    const { notifications = [], unreadCount = 0, loading = false } = useSelector((state) => state.notifications);

    const [activeFilter, setActiveFilter] = useState("All");
    const [query, setQuery] = useState("");
    const [preferences, setPreferences] = useState(
        PREFERENCES.reduce((acc, p) => ({ ...acc, [p.id]: true }), {})
    );
    const searchRef = useRef(null);

    useEffect(() => {
        dispatch(fetchNotificationsThunk());
    }, [dispatch]);

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

    const dismiss = (id) => dispatch(deleteNotificationThunk(id));
    const toggleRead = (id) => dispatch(markAsReadThunk(id));
    const markAllRead = () => dispatch(markAllAsReadThunk());
    const deleteAll = () => {
        if (window.confirm("Are you sure you want to delete all notifications?")) {
            dispatch(deleteAllNotificationsThunk());
        }
    };

    const togglePreference = (id) =>
        setPreferences((prev) => ({ ...prev, [id]: !prev[id] }));

    const filtered = useMemo(() => {
        return notifications.filter((n) => {
            const matchesQuery =
                query.trim() === "" ||
                (n.title && n.title.toLowerCase().includes(query.toLowerCase())) ||
                (n.message && n.message.toLowerCase().includes(query.toLowerCase()));

            if (!matchesQuery) return false;

            if (activeFilter === "All") return true;
            if (activeFilter === "Unread") return !n.isRead && !n.read;
            return (n.type || "").toUpperCase() === activeFilter.toUpperCase();
        });
    }, [notifications, activeFilter, query]);

    const stats = {
        unread: unreadCount,
        total: notifications.length,
        system: notifications.filter((n) => (n.type || "").toUpperCase() === "SYSTEM").length,
        achievements: notifications.filter((n) => (n.type || "").toUpperCase() === "ACHIEVEMENT").length,
    };

    const isEmpty = filtered.length === 0;

    return (
        <div className="min-h-screen w-full px-4 py-10 text-[#F9FAFB] sm:px-8 lg:px-12">
            <div className="mx-auto max-w-6xl">
                {/* HERO */}
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

                    <div className="flex items-center gap-3">
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllRead}
                                className="flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer"
                            >
                                <CheckCheck size={15} />
                                Mark all as read
                            </button>
                        )}
                        {notifications.length > 0 && (
                            <button
                                onClick={deleteAll}
                                className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
                            >
                                <Trash2 size={15} />
                                Clear all
                            </button>
                        )}
                    </div>
                </motion.header>

                {/* STAT CARDS */}
                <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                    <StatCard label="Unread" value={stats.unread} icon={Inbox} accent="#F59E0B" index={0} />
                    <StatCard label="Total Received" value={stats.total} icon={Zap} accent="#22D3EE" index={1} />
                    <StatCard label="System Alerts" value={stats.system} icon={AlertTriangle} accent="#F97316" index={2} />
                    <StatCard label="Achievements" value={stats.achievements} icon={Trophy} accent="#F59E0B" index={3} />
                </div>

                {/* SEARCH + FILTERS */}
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
                                    className={`relative rounded-full border px-3.5 py-1.5 text-xs font-medium outline-none transition-colors cursor-pointer ${active
                                        ? "border-[#F59E0B]/40 bg-[#F59E0B] text-[#0B1120] font-bold"
                                        : "border-[#1F2937] text-[#9CA3AF] hover:border-[#1F2937] hover:text-[#F9FAFB]"
                                        }`}
                                >
                                    <span className="relative">{chip}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* NOTIFICATIONS LIST */}
                <section className="mt-8">
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-24 rounded-2xl bg-[#111827]/50 border border-[#1F2937] animate-pulse" />
                            ))}
                        </div>
                    ) : isEmpty ? (
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
                        <div className="space-y-3">
                            <AnimatePresence mode="popLayout">
                                {filtered.map((item, i) => (
                                    <NotificationCard
                                        key={item._id || item.id || i}
                                        item={item}
                                        onDismiss={dismiss}
                                        onToggleRead={toggleRead}
                                        index={i}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </section>

                {/* PREFERENCES */}
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