import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
    Mic, MessageSquare, Video, PenTool, TrendingUp, Activity, Award, Star,
    Clock, Zap, Target, BookOpen, Layers, Monitor, Briefcase, FileText,
    Share2, Linkedin, Terminal, CheckCircle2, Calendar, Play, BarChart3,
    ChevronRight, Volume2, Users
} from 'lucide-react';

// --- MOCK DATA ---
const performanceData = [
    { name: 'Mon', confidence: 65, clarity: 70, pacing: 60 },
    { name: 'Tue', confidence: 68, clarity: 75, pacing: 65 },
    { name: 'Wed', confidence: 74, clarity: 72, pacing: 70 },
    { name: 'Thu', confidence: 79, clarity: 80, pacing: 75 },
    { name: 'Fri', confidence: 85, clarity: 82, pacing: 78 },
    { name: 'Sat', confidence: 82, clarity: 85, pacing: 80 },
    { name: 'Sun', confidence: 88, clarity: 89, pacing: 85 },
];

const activityData = [
    { name: 'System Design', time: 120 },
    { name: 'Behavioral', time: 85 },
    { name: 'Tech Blog', time: 150 },
    { name: 'Code Review', time: 90 },
];

const timelineEvents = [
    { id: 1, type: 'interview', title: 'System Design Explanation', duration: '15 min', topic: 'Microservices', xp: '+150 XP', icon: Layers, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 2, type: 'writing', title: 'Technical Documentation', duration: '45 min', topic: 'React Hooks API', xp: '+200 XP', icon: FileText, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    { id: 3, type: 'presentation', title: 'Project Demo', duration: '10 min', topic: 'Authentication Flow', xp: '+100 XP', icon: Monitor, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 4, type: 'behavioral', title: 'HR Interview Practice', duration: '20 min', topic: 'Conflict Resolution', xp: '+180 XP', icon: Users, color: 'text-rose-500', bg: 'bg-rose-500/10' },
];

const interviewModules = [
    { title: 'Technical Interview', attempts: 24, completion: '85%', confidence: 'High', lastPracticed: '2h ago', icon: Terminal, accent: 'group-hover:text-cyan-500' },
    { title: 'System Design', attempts: 18, completion: '60%', confidence: 'Medium', lastPracticed: '1d ago', icon: Layers, accent: 'group-hover:text-amber-500' },
    { title: 'Behavioral (STAR)', attempts: 32, completion: '95%', confidence: 'Very High', lastPracticed: '5h ago', icon: Briefcase, accent: 'group-hover:text-emerald-500' },
    { title: 'HR & Cultural Fit', attempts: 15, completion: '70%', confidence: 'High', lastPracticed: '3d ago', icon: Users, accent: 'group-hover:text-rose-500' },
];

const writingModules = [
    { title: 'API Documentation', count: 12, icon: FileText },
    { title: 'LinkedIn Posts', count: 8, icon: Linkedin },
    { title: 'Code Review Comments', count: 145, icon: MessageSquare },
    { title: 'Technical Blogs', count: 3, icon: PenTool },
];

// --- COMPONENTS ---

const VoiceWave = () => {
    return (
        <div className="flex items-end justify-center space-x-1 h-16 opacity-80">
            {[...Array(16)].map((_, i) => (
                <motion.div
                    key={i}
                    className="w-1.5 bg-amber-500 rounded-full"
                    animate={{
                        height: ["20%", "100%", "40%", "80%", "20%"],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.08,
                    }}
                />
            ))}
        </div>
    );
};

const CircularProgress = ({ value, label, subtitle, color, size = 120 }) => {
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle
                    className="text-[#1F2937]"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <motion.circle
                    className={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    stroke="currentColor"
                    fill="transparent"
                    strokeLinecap="round"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold text-white">{label}</span>
                <span className="text-xs text-gray-400">{subtitle}</span>
            </div>
        </div>
    );
};

export default function CommunicationStudio() {
    const [hoveredCard, setHoveredCard] = useState(null);

    return (
        <div className="min-h-screen  text-gray-300 font-sans selection:bg-amber-500/30 overflow-x-hidden pb-24">
            {/* Background Ambient Glows */}
            <div className="fixed top-0 left-1/4 w-[800px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="fixed bottom-0 right-1/4 w-[600px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6 pt-12 space-y-12">

                {/* ================= HERO SECTION ================= */}
                <section className="relative w-full py-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Floating Background Particles */}
                    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                        <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 left-10 text-[#1F2937]">
                            <MessageSquare size={48} />
                        </motion.div>
                        <motion.div animate={{ y: [10, -15, 10], rotate: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-10 right-20 text-[#1F2937]">
                            <Mic size={64} />
                        </motion.div>
                    </div>

                    <div className="flex-1 space-y-6 z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-amber-500 text-sm font-medium"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </span>
                            <span>Studio Active</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
                        >
                            Master the Art of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                                Developer Communication.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-gray-400 max-w-xl leading-relaxed"
                        >
                            Elevate your engineering career. Practice system design explanations, behavioral interviews, and technical documentation with real-time AI feedback.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="w-full lg:w-[400px] h-[280px] relative"
                    >
                        {/* Glassmorphic Audio/Mic Panel */}
                        <div className="absolute inset-0 bg-[#111827]/80 backdrop-blur-xl border border-[#1F2937] rounded-3xl p-8 flex flex-col items-center justify-between shadow-2xl shadow-amber-500/10 overflow-hidden">
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl" />
                            <div className="w-full flex justify-between items-start z-10">
                                <div>
                                    <h3 className="text-white font-semibold flex items-center gap-2">
                                        <Volume2 size={18} className="text-amber-500" /> Live Session
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1">Listening to pacing & clarity...</p>
                                </div>
                                <div className="h-10 w-10 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/20">
                                    <Mic className="text-amber-500" size={20} />
                                </div>
                            </div>

                            <div className="w-full flex-1 flex items-end justify-center pb-4 z-10">
                                <VoiceWave />
                            </div>

                            <button className="w-full py-3 bg-white text-[#0B1120] font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2 z-10">
                                <Play size={18} fill="currentColor" /> Start Practice
                            </button>
                        </div>
                    </motion.div>
                </section>

                {/* ================= DASHBOARD METRICS ================= */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {[
                        { label: "Today's Speaking Time", value: "45m", sub: "+12m from yesterday", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
                        { label: "Communication XP", value: "12,450", sub: "Level 14 Orator", icon: Zap, color: "text-cyan-500", bg: "bg-cyan-500/10" },
                        { label: "Current Goal", value: "Sys Design", sub: "3/5 sessions done", icon: Target, color: "text-rose-500", bg: "bg-rose-500/10" },
                        { label: "Dev Comm Level", value: "Senior", sub: "Top 15% globally", icon: Award, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                        { label: "Confidence Score", value: "88/100", sub: "Trending up 📈", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-500/10" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5 hover:border-gray-700 transition-colors group relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-2 rounded-lg ${stat.bg}`}>
                                    <stat.icon size={20} className={stat.color} />
                                </div>
                            </div>
                            <h4 className="text-3xl font-bold text-white mb-1">{stat.value}</h4>
                            <p className="text-sm font-medium text-gray-300 mb-1">{stat.label}</p>
                            <p className="text-xs text-gray-500">{stat.sub}</p>

                            {/* Hover gradient effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </section>

                {/* ================= DAILY CHALLENGE & PROGRESS ================= */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Daily Challenge - Takes up 2 cols */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 relative bg-gradient-to-br from-[#111827] to-[#111827]/50 border border-amber-500/20 rounded-3xl p-8 overflow-hidden group shadow-[0_0_40px_-15px_rgba(245,158,11,0.1)] hover:shadow-[0_0_40px_-15px_rgba(245,158,11,0.2)] transition-shadow"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <MessageSquare size={120} />
                        </div>

                        <div className="flex items-center space-x-3 mb-6">
                            <div className="bg-amber-500/20 p-2 rounded-xl border border-amber-500/30">
                                <Zap className="text-amber-500" size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Daily Communication Challenge</h2>
                        </div>

                        <div className="space-y-4 max-w-xl z-10 relative">
                            <h3 className="text-3xl font-semibold text-white leading-tight">
                                Explain "React Hooks" to a Junior Developer in under 2 minutes.
                            </h3>
                            <p className="text-gray-400 text-lg">
                                Focus on clarity, eliminating jargon, and using real-world analogies. Your pacing and filler-word usage will be analyzed.
                            </p>

                            <div className="pt-6 flex gap-4">
                                <button className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold rounded-xl transition-colors active:scale-95 flex items-center gap-2">
                                    <Mic size={20} /> Start Recording
                                </button>
                                <button className="px-6 py-3 bg-transparent border border-[#1F2937] hover:bg-[#1F2937] text-white font-medium rounded-xl transition-colors active:scale-95">
                                    View Examples
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Speaking Progress */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#111827] border border-[#1F2937] rounded-3xl p-8 flex flex-col items-center justify-center relative"
                    >
                        <h3 className="absolute top-6 left-6 font-semibold text-white flex items-center gap-2">
                            <Activity size={18} className="text-cyan-500" /> Speaking Progress
                        </h3>

                        <div className="mt-8">
                            <CircularProgress value={75} label="45m" subtitle="Today's Goal" color="text-cyan-500" size={160} />
                        </div>

                        <div className="w-full grid grid-cols-2 gap-4 mt-8">
                            <div className="bg-[#0B1120] p-3 rounded-xl border border-[#1F2937] text-center">
                                <p className="text-xs text-gray-400 mb-1">Weekly Avg</p>
                                <p className="text-lg font-bold text-white">38m</p>
                            </div>
                            <div className="bg-[#0B1120] p-3 rounded-xl border border-[#1F2937] text-center">
                                <p className="text-xs text-gray-400 mb-1">Streak</p>
                                <p className="text-lg font-bold text-white flex items-center justify-center gap-1">
                                    12 <Zap size={14} className="text-amber-500" fill="currentColor" />
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* ================= BENTO GRID: INTERVIEWS & PRESENTATION ================= */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Briefcase className="text-amber-500" /> Interview Practice
                        </h2>
                        <button className="text-sm text-amber-500 hover:text-amber-400 flex items-center gap-1 transition-colors">
                            View All <ChevronRight size={16} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {interviewModules.map((mod, i) => (
                            <motion.div
                                key={mod.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                onHoverStart={() => setHoveredCard(i)}
                                onHoverEnd={() => setHoveredCard(null)}
                                className="group bg-[#111827] border border-[#1F2937] rounded-2xl p-6 hover:-translate-y-1 hover:border-gray-600 transition-all duration-300 relative overflow-hidden cursor-pointer"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-3 rounded-xl bg-[#0B1120] border border-[#1F2937] transition-colors duration-300 ${mod.accent}`}>
                                        <mod.icon size={24} />
                                    </div>
                                    <span className="text-xs font-medium text-gray-500 bg-[#0B1120] px-2 py-1 rounded-md border border-[#1F2937]">
                                        {mod.lastPracticed}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                    {mod.title}
                                </h3>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Attempts</span>
                                        <span className="text-white font-medium">{mod.attempts}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Confidence</span>
                                        <span className="text-white font-medium">{mod.confidence}</span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="pt-2">
                                        <div className="w-full bg-[#0B1120] rounded-full h-1.5 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: mod.completion }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="bg-amber-500 h-1.5 rounded-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Ambient hover glow */}
                                <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl transition-opacity duration-500 ${hoveredCard === i ? 'opacity-100' : 'opacity-0'}`} />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ================= WRITING & PRESENTATION STUDIO ================= */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Writing Studio */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#111827] border border-[#1F2937] rounded-3xl p-8"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <PenTool className="text-cyan-500" /> Writing Studio
                            </h2>
                            <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 text-xs font-medium rounded-full border border-cyan-500/20">
                                Weekly Goal: 4/5
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {writingModules.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[#0B1120] border border-[#1F2937] hover:border-cyan-500/30 transition-colors cursor-pointer group">
                                    <div className="p-2 bg-[#111827] rounded-lg border border-[#1F2937] group-hover:text-cyan-500 transition-colors">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                                        <p className="text-xs text-gray-500">{item.count} items drafted</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Presentation Studio */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-[#111827] to-[#0B1120] border border-[#1F2937] rounded-3xl p-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                            <Monitor size={160} />
                        </div>

                        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                            <Monitor className="text-emerald-500" /> Presentation Practice
                        </h2>
                        <p className="text-gray-400 text-sm mb-8">Master the art of presenting your code and architecture to stakeholders.</p>

                        <div className="space-y-4 relative z-10">
                            {['Authentication Flow Overview', 'Q3 Performance Optimization', 'Database Migration Strategy'].map((pres, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[#111827] border border-[#1F2937] hover:bg-[#1F2937]/50 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                            <Video size={14} />
                                        </div>
                                        <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{pres}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Star size={12} className="text-amber-500" fill="currentColor" /> 92%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* ================= STATS & TIMELINE ================= */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Charts (Takes 2 cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 bg-[#111827] border border-[#1F2937] rounded-3xl p-8"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <BarChart3 className="text-indigo-500" /> Communication Statistics
                            </h2>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 bg-[#0B1120] text-xs font-medium text-white border border-[#1F2937] rounded-lg">Confidence</button>
                                <button className="px-3 py-1 bg-transparent text-xs font-medium text-gray-400 border border-transparent hover:text-white rounded-lg transition-colors">Activity</button>
                            </div>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorClarity" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                                    <XAxis dataKey="name" stroke="#6B7280" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#6B7280" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111827', borderColor: '#1F2937', borderRadius: '12px', color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="confidence" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorConfidence)" />
                                    <Area type="monotone" dataKey="clarity" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorClarity)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Recent Practice Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#111827] border border-[#1F2937] rounded-3xl p-8"
                    >
                        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-8">
                            <Calendar className="text-rose-500" /> Recent Sessions
                        </h2>

                        <div className="relative pl-4 border-l border-[#1F2937] space-y-8">
                            {timelineEvents.map((event, i) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className="relative"
                                >
                                    {/* Timeline Dot */}
                                    <div className={`absolute -left-[33px] top-1 h-4 w-4 rounded-full border-4 border-[#111827] ${event.bg} flex items-center justify-center`}>
                                        <div className={`h-1.5 w-1.5 rounded-full ${event.color.replace('text-', 'bg-')}`} />
                                    </div>

                                    <div className="bg-[#0B1120] border border-[#1F2937] rounded-xl p-4 hover:border-gray-600 transition-colors group cursor-pointer">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <event.icon size={14} className={event.color} />
                                                <span className="text-xs font-medium text-gray-400 capitalize">{event.type}</span>
                                            </div>
                                            <span className="text-xs font-bold text-amber-500">{event.xp}</span>
                                        </div>
                                        <h4 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">{event.title}</h4>
                                        <p className="text-xs text-gray-500 mt-1">{event.topic} • {event.duration}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                </section>
            </div>
        </div>
    );
}