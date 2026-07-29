import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trophy, Star, Zap, Flame, Target, Award, Crown, CheckSquare, CheckCircle2,
    Sparkles, Lock, Shield, RefreshCw, AlertCircle, Search, X, Check
} from "lucide-react";
import { fetchAchievementsThunk, checkAchievementsThunk } from "../../redux/achievementThunks";
import useAuth from "../../hooks/useAuth";

const C = {
    bg: "#0B1120",
    card: "#111827",
    surface: "#0F172A",
    border: "#1F2937",
    amber: "#F59E0B",
    orange: "#F97316",
    cyan: "#06B6D4",
    success: "#10B981",
    danger: "#EF4444",
    text: "#F9FAFB",
    textSecondary: "#9CA3AF",
    textMuted: "#6B7280",
};

const ICON_MAP = {
    CheckSquare,
    CheckCircle2,
    Zap,
    Crown,
    Sparkles,
    Compass: Target,
    Award,
    Star,
    Trophy,
    Shield,
};

const CATEGORY_NAMES = {
    task: "Task Achievements",
    xp: "XP Achievements",
    level: "Level Achievements",
};

export default function Achievements() {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const { achievements, unlockedCount, totalCount, loading, error } = useSelector((state) => state.achievements);
    const { totalXP, level } = useSelector((state) => state.xp);

    const [query, setQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    useEffect(() => {
        dispatch(checkAchievementsThunk());
    }, [dispatch]);

    const handleRefresh = () => {
        dispatch(checkAchievementsThunk());
    };

    const userXP = totalXP !== undefined ? totalXP : (user?.stats?.totalXP || 0);
    const userLevel = level || user?.stats?.level || 1;

    const filteredAchievements = useMemo(() => {
        return (achievements || []).filter((a) => {
            const matchesQuery = (a.title + a.description + a.category).toLowerCase().includes(query.toLowerCase());
            if (!matchesQuery) return false;
            if (activeFilter === "All") return true;
            if (activeFilter === "Unlocked") return a.unlocked;
            if (activeFilter === "Locked") return !a.unlocked;
            if (activeFilter === "Task") return a.category === "task";
            if (activeFilter === "XP") return a.category === "xp";
            if (activeFilter === "Level") return a.category === "level";
            return true;
        });
    }, [achievements, query, activeFilter]);

    const completionRate = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

    return (
        <div className="min-h-screen w-full p-6 md:p-8 max-w-[1400px] mx-auto space-y-8" style={{ color: C.text }}>
            {/* HERO / HEADER SECTION */}
            <div className="relative overflow-hidden rounded-[32px] border p-6 md:p-10" style={{ borderColor: C.border, background: C.card }}>
                <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(120% 100% at 15% 0%, rgba(245,158,11,0.14), transparent 55%), ${C.card}` }} />
                
                <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-amber-500">
                            <Sparkles size={14} /> Badges & Milestones
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                            Achievements
                        </h1>
                        <p className="text-sm md:text-base text-[#9CA3AF] max-w-xl">
                            Unlock badges by completing tasks, earning XP, and advancing your level.
                        </p>
                    </div>

                    <button
                        onClick={handleRefresh}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-[#9CA3AF] hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Sync Achievements
                    </button>
                </div>

                {/* OVERVIEW METRICS GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                    <div className="rounded-2xl p-4 border bg-white/[0.02]" style={{ borderColor: C.border }}>
                        <Trophy size={18} className="text-amber-500 mb-2" />
                        <div className="text-2xl font-bold text-white">{unlockedCount} / {totalCount}</div>
                        <div className="text-xs text-[#6B7280]">Unlocked Badges</div>
                    </div>
                    <div className="rounded-2xl p-4 border bg-white/[0.02]" style={{ borderColor: C.border }}>
                        <Zap size={18} className="text-amber-400 mb-2" />
                        <div className="text-2xl font-bold text-white">{userXP.toLocaleString()}</div>
                        <div className="text-xs text-[#6B7280]">Total XP</div>
                    </div>
                    <div className="rounded-2xl p-4 border bg-white/[0.02]" style={{ borderColor: C.border }}>
                        <Crown size={18} className="text-orange-400 mb-2" />
                        <div className="text-2xl font-bold text-white">Level {userLevel}</div>
                        <div className="text-xs text-[#6B7280]">Current Level</div>
                    </div>
                    <div className="rounded-2xl p-4 border bg-white/[0.02]" style={{ borderColor: C.border }}>
                        <Target size={18} className="text-emerald-500 mb-2" />
                        <div className="text-2xl font-bold text-white">{completionRate}%</div>
                        <div className="text-xs text-[#6B7280]">Completion Rate</div>
                    </div>
                </div>
            </div>

            {/* ERROR ALERT */}
            {error && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        <span>Failed to load achievements: {typeof error === 'object' ? (error.message || JSON.stringify(error)) : String(error)}</span>
                    </div>
                    <button
                        onClick={handleRefresh}
                        className="px-3 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-lg text-xs font-bold transition-all"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* SEARCH & FILTERS */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                {/* SEARCH INPUT */}
                <div className="relative flex-1 max-w-md">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search achievements..."
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border text-sm bg-[#0F172A] border-[#1F2937] text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    {query && (
                        <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-white">
                            <X size={14} />
                        </button>
                    )}
                </div>

                {/* CATEGORY FILTER BUTTONS */}
                <div className="flex flex-wrap gap-2">
                    {["All", "Unlocked", "Locked", "Task", "XP", "Level"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                activeFilter === f
                                    ? "bg-amber-500 border-amber-500 text-[#0B1120]"
                                    : "bg-[#111827] border-[#1F2937] text-[#9CA3AF] hover:text-white"
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* LOADING STATE */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="bg-[#111827] border border-[#1F2937] p-6 rounded-2xl animate-pulse space-y-4">
                            <div className="w-12 h-12 bg-[#1F2937] rounded-xl" />
                            <div className="w-32 h-5 bg-[#1F2937] rounded" />
                            <div className="w-48 h-3 bg-[#1F2937] rounded" />
                        </div>
                    ))}
                </div>
            ) : filteredAchievements.length === 0 ? (
                /* EMPTY STATE */
                <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-12 text-center max-w-md mx-auto space-y-3">
                    <Trophy className="w-10 h-10 text-[#6B7280] mx-auto" />
                    <h3 className="text-lg font-bold text-white">No achievements found</h3>
                    <p className="text-xs text-[#9CA3AF]">Try adjusting your search query or filter selection.</p>
                </div>
            ) : (
                /* ACHIEVEMENTS GRID */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredAchievements.map((ach) => {
                        const IconComponent = ICON_MAP[ach.icon] || Trophy;
                        return (
                            <div
                                key={ach.key}
                                className={`relative rounded-2xl border p-5 transition-all duration-300 flex flex-col justify-between ${
                                    ach.unlocked
                                        ? "bg-[#111827] border-amber-500/30 hover:border-amber-500/60 shadow-lg shadow-amber-500/5"
                                        : "bg-[#111827]/40 border-[#1F2937] opacity-60"
                                }`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                                                ach.unlocked
                                                    ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                                                    : "bg-[#1F2937]/50 border-[#1F2937] text-[#6B7280]"
                                            }`}
                                        >
                                            <IconComponent size={22} />
                                        </div>

                                        {ach.unlocked ? (
                                            <span className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
                                                <Check size={12} /> Unlocked
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#1F2937] text-[#6B7280]">
                                                <Lock size={12} /> Locked
                                            </span>
                                        )}
                                    </div>

                                    <h3 className={`font-bold text-base mb-1 ${ach.unlocked ? "text-white" : "text-[#9CA3AF]"}`}>
                                        {ach.title}
                                    </h3>
                                    <p className="text-xs text-[#9CA3AF] leading-relaxed mb-4">
                                        {ach.description}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-[#1F2937]/60 flex items-center justify-between text-xs font-medium">
                                    <span className="text-[11px] uppercase tracking-wider text-[#6B7280]">
                                        {CATEGORY_NAMES[ach.category] || ach.category}
                                    </span>
                                    {ach.unlocked && ach.unlockedAt && (
                                        <span className="text-[11px] text-amber-500/80 font-mono">
                                            {new Date(ach.unlockedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
