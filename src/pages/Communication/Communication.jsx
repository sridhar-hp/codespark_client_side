import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
    fetchCommunicationsThunk,
    fetchCommunicationStatsThunk,
    createCommunicationThunk,
    updateCommunicationThunk,
    deleteCommunicationThunk,
    markCompletedThunk,
    markMissedThunk,
} from '../../redux/communicationThunks';
import { setCommunicationFilters } from '../../redux/communicationSlice';
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
    Mic, MessageSquare, Video, PenTool, TrendingUp, Activity, Award, Star,
    Clock, Zap, Target, BookOpen, Layers, Monitor, Briefcase, FileText,
    Share2, Linkedin, Terminal, CheckCircle2, Calendar, Play, BarChart3,
    ChevronRight, Volume2, Users, Plus, X, Search, Trash2, AlertCircle, Phone, Edit
} from 'lucide-react';

const COMMUNICATION_TYPES = [
    'All',
    'Interview',
    'HR',
    'Recruiter',
    'Networking',
    'Meeting',
    'Email',
    'LinkedIn',
    'Phone Call',
    'Mock Interview',
    'Other',
];

const SORT_OPTIONS = [
    { label: 'Newest First', value: 'newest' },
    { label: 'Oldest First', value: 'oldest' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Completed', value: 'completed' },
    { label: 'Missed', value: 'missed' },
    { label: 'Priority', value: 'priority' },
    { label: 'Alphabetical', value: 'alphabetical' },
];

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
    const dispatch = useDispatch();
    const { communications, stats, filters, loading, saving } = useSelector((state) => state.communication || {});

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [errorMsg, setErrorMsg] = useState('');
    const [toastMsg, setToastMsg] = useState('');

    const initialForm = {
        title: '',
        personName: '',
        company: '',
        communicationType: 'Interview',
        status: 'Upcoming',
        priority: 'Medium',
        platform: 'Zoom',
        durationMinutes: 30,
        notes: '',
        rating: 5,
    };

    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        dispatch(fetchCommunicationsThunk());
        dispatch(fetchCommunicationStatsThunk());
    }, [dispatch]);

    const handleOpenCreate = () => {
        setEditingItem(null);
        setForm(initialForm);
        setErrorMsg('');
        setIsCreateOpen(true);
    };

    const handleOpenEdit = (item) => {
        setEditingItem(item);
        setForm({
            title: item.title || '',
            personName: item.personName || '',
            company: item.company || '',
            communicationType: item.communicationType || 'Interview',
            status: item.status || 'Upcoming',
            priority: item.priority || 'Medium',
            platform: item.platform || 'Zoom',
            durationMinutes: item.durationMinutes || 30,
            notes: item.notes || '',
            rating: item.rating || 5,
        });
        setErrorMsg('');
        setIsCreateOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!form.title.trim() || form.title.trim().length < 3) {
            setErrorMsg('Title is required (minimum 3 characters).');
            return;
        }

        if (!form.personName.trim()) {
            setErrorMsg('Person Name is required.');
            return;
        }

        let res;
        if (editingItem) {
            res = await dispatch(updateCommunicationThunk({ id: editingItem._id || editingItem.id, data: form }));
        } else {
            res = await dispatch(createCommunicationThunk(form));
        }

        if (createCommunicationThunk.fulfilled.match(res) || updateCommunicationThunk.fulfilled.match(res)) {
            // 1. Close Modal
            setIsCreateOpen(false);
            // 2. Clear Form
            setForm(initialForm);
            setEditingItem(null);
            // 3 & 4. Refresh Communications & Stats
            dispatch(fetchCommunicationsThunk(filters));
            dispatch(fetchCommunicationStatsThunk());
            // 5. Show Toast
            setToastMsg(editingItem ? 'Communication updated successfully!' : 'Communication logged successfully!');
            setTimeout(() => setToastMsg(''), 4000);
        } else {
            setErrorMsg(res.payload || 'Action failed. Please try again.');
        }
    };

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchTerm(val);
        dispatch(setCommunicationFilters({ search: val }));
        dispatch(fetchCommunicationsThunk({ ...filters, search: val }));
    };

    const handleTypeFilter = (type) => {
        const nextType = filters?.communicationType === type ? 'All' : type;
        dispatch(setCommunicationFilters({ communicationType: nextType }));
        dispatch(fetchCommunicationsThunk({ ...filters, communicationType: nextType }));
    };

    const handleSortChange = (e) => {
        const sortBy = e.target.value;
        let timeframe = 'All';
        if (sortBy === 'upcoming') timeframe = 'upcoming';
        if (sortBy === 'completed') timeframe = 'completed';
        if (sortBy === 'missed') timeframe = 'missed';

        dispatch(setCommunicationFilters({ sortBy, timeframe }));
        dispatch(fetchCommunicationsThunk({ ...filters, sortBy, timeframe }));
    };

    const handleComplete = async (id) => {
        await dispatch(markCompletedThunk(id));
        dispatch(fetchCommunicationsThunk(filters));
        dispatch(fetchCommunicationStatsThunk());
        setToastMsg('Meeting marked as completed!');
        setTimeout(() => setToastMsg(''), 4000);
    };

    const handleMissed = async (id) => {
        await dispatch(markMissedThunk(id));
        dispatch(fetchCommunicationsThunk(filters));
        dispatch(fetchCommunicationStatsThunk());
        setToastMsg('Meeting marked as missed.');
        setTimeout(() => setToastMsg(''), 4000);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this communication record?')) {
            await dispatch(deleteCommunicationThunk(id));
            dispatch(fetchCommunicationsThunk(filters));
            dispatch(fetchCommunicationStatsThunk());
            setToastMsg('Communication log deleted.');
            setTimeout(() => setToastMsg(''), 4000);
        }
    };

    const performanceData = stats?.weeklyPerformance && stats.weeklyPerformance.length > 0
        ? stats.weeklyPerformance
        : [
            { name: 'Mon', confidence: 65, clarity: 70, pacing: 60 },
            { name: 'Tue', confidence: 68, clarity: 75, pacing: 65 },
            { name: 'Wed', confidence: 74, clarity: 72, pacing: 70 },
            { name: 'Thu', confidence: 79, clarity: 80, pacing: 75 },
            { name: 'Fri', confidence: 85, clarity: 82, pacing: 78 },
            { name: 'Sat', confidence: 82, clarity: 85, pacing: 80 },
            { name: 'Sun', confidence: 88, clarity: 89, pacing: 85 },
        ];

    const interviewModules = [
        { title: 'Technical Interview', attempts: stats?.interviewCount || 0, completion: '85%', confidence: 'High', lastPracticed: 'Live DB', icon: Terminal, accent: 'group-hover:text-cyan-500' },
        { title: 'System Design', attempts: stats?.upcomingMeetings || 0, completion: '60%', confidence: 'Medium', lastPracticed: 'Live DB', icon: Layers, accent: 'group-hover:text-amber-500' },
        { title: 'HR & Recruiter Call', attempts: stats?.recruiterConversations || 0, completion: '95%', confidence: 'Very High', lastPracticed: 'Live DB', icon: Briefcase, accent: 'group-hover:text-emerald-500' },
        { title: 'Networking Drive', attempts: stats?.networkingEvents || 0, completion: '70%', confidence: 'High', lastPracticed: 'Live DB', icon: Users, accent: 'group-hover:text-rose-500' },
    ];

    const writingModules = [
        { title: 'API Documentation', count: 12, icon: FileText },
        { title: 'LinkedIn Posts', count: 8, icon: Linkedin },
        { title: 'Code Review Comments', count: 145, icon: MessageSquare },
        { title: 'Technical Blogs', count: 3, icon: PenTool },
    ];

    return (
        <div className="min-h-screen text-gray-300 font-sans selection:bg-amber-500/30 overflow-x-hidden pb-24 relative">
            {/* Background Ambient Glows */}
            <div className="fixed top-0 left-1/4 w-[800px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="fixed bottom-0 right-1/4 w-[600px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

            {/* Success Toast Notification */}
            <AnimatePresence>
                {toastMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-6 right-6 z-[100] bg-emerald-500 text-gray-950 font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm"
                    >
                        <CheckCircle2 size={18} /> {toastMsg}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto px-6 pt-12 space-y-12">

                {/* HERO SECTION */}
                <section className="relative w-full py-10 flex flex-col lg:flex-row items-center justify-between gap-12">
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
                            <span>Communication Activity Tracker</span>
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
                            Elevate your engineering career. Log recruiter calls, HR interviews, networking meetings, system design practice, and technical feedback.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="w-full lg:w-[400px] h-[280px] relative"
                    >
                        <div className="absolute inset-0 bg-[#111827]/80 backdrop-blur-xl border border-[#1F2937] rounded-3xl p-8 flex flex-col items-center justify-between shadow-2xl shadow-amber-500/10 overflow-hidden">
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl" />
                            <div className="w-full flex justify-between items-start z-10">
                                <div>
                                    <h3 className="text-white font-semibold flex items-center gap-2">
                                        <Volume2 size={18} className="text-amber-500" /> Communication Log
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1">Track calls & scheduled meetings...</p>
                                </div>
                                <div className="h-10 w-10 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/20">
                                    <Mic className="text-amber-500" size={20} />
                                </div>
                            </div>

                            <div className="w-full flex-1 flex items-end justify-center pb-4 z-10">
                                <VoiceWave />
                            </div>

                            <button
                                onClick={handleOpenCreate}
                                className="w-full py-3 bg-white text-[#0B1120] font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2 z-10"
                            >
                                <Plus size={18} /> Log New Call / Meeting
                            </button>
                        </div>
                    </motion.div>
                </section>

                {/* DASHBOARD METRICS */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {[
                        { label: "Upcoming Meetings", value: stats?.upcomingMeetings || 0, sub: "Pending calls", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
                        { label: "Completed This Week", value: stats?.completedThisWeek || 0, sub: "Calls finished", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                        { label: "Total Hours", value: `${stats?.totalHours || 0}h`, sub: "Logged time", icon: Zap, color: "text-cyan-500", bg: "bg-cyan-500/10" },
                        { label: "Interviews", value: stats?.interviewCount || 0, sub: "Technical & HR", icon: Briefcase, color: "text-rose-500", bg: "bg-rose-500/10" },
                        { label: "Avg Rating", value: `${stats?.avgRating || 5}/5`, sub: "Self rating 🌟", icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" },
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
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </section>

                {/* SEARCH & FILTERS BAR */}
                <section className="bg-[#111827] border border-[#1F2937] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="relative w-full md:w-80">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search by title, person, company..."
                            className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 overflow-x-auto max-w-full py-1">
                        {COMMUNICATION_TYPES.map((type) => (
                            <button
                                key={type}
                                onClick={() => handleTypeFilter(type)}
                                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors whitespace-nowrap ${filters?.communicationType === type
                                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                                        : 'bg-[#0B1120] border-[#1F2937] text-gray-400 hover:text-white'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <div>
                        <select
                            value={filters?.sortBy || 'newest'}
                            onChange={handleSortChange}
                            className="bg-[#0B1120] border border-[#1F2937] text-xs text-gray-300 px-3 py-2 rounded-xl focus:outline-none focus:border-amber-500"
                        >
                            {SORT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </section>

                {/* INTERVIEW PRACTICE BENTO */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Briefcase className="text-amber-500" /> Communication Breakdown
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {interviewModules.map((mod, i) => (
                            <motion.div
                                key={mod.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-[#111827] border border-[#1F2937] rounded-2xl p-6 hover:-translate-y-1 hover:border-gray-600 transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-3 rounded-xl bg-[#0B1120] border border-[#1F2937] transition-colors duration-300 ${mod.accent}`}>
                                        <mod.icon size={24} />
                                    </div>
                                    <span className="text-xs font-medium text-gray-500 bg-[#0B1120] px-2 py-1 rounded-md border border-[#1F2937]">
                                        {mod.lastPracticed}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-4">{mod.title}</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Total Count</span>
                                        <span className="text-white font-medium">{mod.attempts}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Confidence</span>
                                        <span className="text-white font-medium">{mod.confidence}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* WRITING & PRESENTATION STUDIO */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

                {/* STATS & TIMELINE */}
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
                                <BarChart3 className="text-indigo-500" /> Weekly Communication Activity
                            </h2>
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

                    {/* Live Communication Sessions Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#111827] border border-[#1F2937] rounded-3xl p-8 overflow-y-auto max-h-[480px]"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Calendar className="text-rose-500" /> Logged Communication Calls
                            </h2>
                        </div>

                        {loading ? (
                            <div className="text-center py-12 text-gray-500 text-sm">Loading communication logs...</div>
                        ) : !communications || communications.length === 0 ? (
                            <div className="text-center py-12 text-gray-500 text-sm">
                                <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
                                No communication logs match filter criteria.
                            </div>
                        ) : (
                            <div className="relative pl-4 border-l border-[#1F2937] space-y-6">
                                {communications.map((event) => (
                                    <div key={event._id || event.id} className="relative">
                                        <div className="absolute -left-[25px] top-1 h-3.5 w-3.5 rounded-full border-2 border-[#111827] bg-amber-500" />
                                        <div className="bg-[#0B1120] border border-[#1F2937] rounded-xl p-4 hover:border-gray-600 transition-colors">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">{event.communicationType}</span>
                                                <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${event.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : event.status === 'Missed' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                                    {event.status}
                                                </span>
                                            </div>
                                            <h4 className="text-sm font-bold text-white">{event.title}</h4>
                                            <p className="text-xs text-gray-400 mt-1">{event.personName} {event.company ? `(${event.company})` : ''} • {event.durationMinutes || 30} mins</p>
                                            {event.notes && <p className="text-xs text-gray-500 mt-2 italic line-clamp-2">"{event.notes}"</p>}

                                            <div className="mt-3 pt-3 border-t border-[#1F2937] flex items-center justify-between gap-2">
                                                {event.status !== 'Completed' && (
                                                    <button
                                                        onClick={() => handleComplete(event._id || event.id)}
                                                        className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
                                                    >
                                                        <CheckCircle2 size={12} /> Mark Done
                                                    </button>
                                                )}
                                                {event.status === 'Upcoming' && (
                                                    <button
                                                        onClick={() => handleMissed(event._id || event.id)}
                                                        className="text-[11px] text-red-400 hover:underline flex items-center gap-1"
                                                    >
                                                        <X size={12} /> Mark Missed
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleOpenEdit(event)}
                                                    className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 ml-auto"
                                                >
                                                    <Edit size={12} /> Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(event._id || event.id)}
                                                    className="text-[11px] text-gray-500 hover:text-red-400 transition-colors"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </section>
            </div>

            {/* CREATE / EDIT COMMUNICATION MODAL */}
            <AnimatePresence>
                {isCreateOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setIsCreateOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-6"
                        >
                            <div className="flex items-center justify-between border-b border-[#1F2937] pb-4">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Phone className="text-amber-500" size={20} /> {editingItem ? 'Edit Communication Log' : 'Log Communication Call / Meeting'}
                                </h3>
                                <button onClick={() => setIsCreateOpen(false)} className="text-gray-400 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>

                            {errorMsg && (
                                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs flex items-center gap-2">
                                    <AlertCircle size={16} /> {errorMsg}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-xs font-medium text-gray-400">Title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        placeholder="e.g. System Design Interview Round 1"
                                        className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500 mt-1"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-gray-400">Person Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={form.personName}
                                            onChange={(e) => setForm({ ...form, personName: e.target.value })}
                                            placeholder="e.g. Sarah Jenkins"
                                            className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500 mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-400">Company</label>
                                        <input
                                            type="text"
                                            value={form.company}
                                            onChange={(e) => setForm({ ...form, company: e.target.value })}
                                            placeholder="e.g. Google"
                                            className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500 mt-1"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-gray-400">Type</label>
                                        <select
                                            value={form.communicationType}
                                            onChange={(e) => setForm({ ...form, communicationType: e.target.value })}
                                            className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500 mt-1"
                                        >
                                            {COMMUNICATION_TYPES.filter(t => t !== 'All').map(t => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-400">Platform</label>
                                        <select
                                            value={form.platform}
                                            onChange={(e) => setForm({ ...form, platform: e.target.value })}
                                            className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500 mt-1"
                                        >
                                            <option value="Zoom">Zoom</option>
                                            <option value="Google Meet">Google Meet</option>
                                            <option value="Microsoft Teams">Microsoft Teams</option>
                                            <option value="Phone">Phone</option>
                                            <option value="LinkedIn">LinkedIn</option>
                                            <option value="Email">Email</option>
                                            <option value="WhatsApp">WhatsApp</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-gray-400">Duration (Mins)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="600"
                                            value={form.durationMinutes}
                                            onChange={(e) => setForm({ ...form, durationMinutes: parseInt(e.target.value, 10) || 0 })}
                                            className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500 mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-400">Status</label>
                                        <select
                                            value={form.status}
                                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                                            className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500 mt-1"
                                        >
                                            <option value="Upcoming">Upcoming</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Missed">Missed</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-gray-400">Notes / Takeaways</label>
                                    <textarea
                                        rows="3"
                                        value={form.notes}
                                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                        placeholder="Add meeting takeaways or preparation notes..."
                                        className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500 mt-1"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-[#1F2937]">
                                    <button
                                        type="button"
                                        onClick={() => setIsCreateOpen(false)}
                                        className="px-4 py-2 rounded-xl bg-[#0B1120] border border-[#1F2937] text-sm text-gray-300 hover:text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold text-sm transition-colors"
                                    >
                                        {saving ? 'Saving...' : editingItem ? 'Update Communication' : 'Save Communication Log'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
