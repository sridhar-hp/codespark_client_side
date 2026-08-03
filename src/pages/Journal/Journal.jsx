import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
    fetchJournalsThunk,
    fetchJournalStatsThunk,
    createJournalThunk,
    deleteJournalThunk,
    toggleFavoriteThunk,
    togglePinThunk,
} from '../../redux/journalThunks';
import { setJournalFilters } from '../../redux/journalSlice';
import {
    Terminal, Focus, Search, Share2, Download, Heart,
    Archive, ChevronDown, ChevronUp, CheckCircle, Zap, Star,
    Clock, Trophy, Target, ArrowRight, Activity, Sparkles, Brain,
    Plus, Mic, X, BarChart2, BookOpen, Trash2, Pin, Tag, Filter
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const MOODS = ['😀', '🙂', '😐', '😓', '🔥'];

const MOOD_MAP_REVERSE = {
  'Happy': '😀',
  'Focused': '🙂',
  'Productive': '🔥',
  'Neutral': '😐',
  'Stressed': '😓',
  'Tired': '😴',
  'Excited': '⚡',
  'Sad': '😢',
};

const KNOWLEDGE_TAGS = ['React', 'Node.js', 'JavaScript', 'MongoDB', 'Express', 'Next.js', 'System Design', 'TypeScript', 'DSA', 'Tailwind', 'GraphQL', 'Docker'];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

const scaleVariants = {
    hover: { scale: 1.05, transition: { type: 'spring', stiffness: 400, damping: 10 } },
    tap: { scale: 0.95 }
};

const HeroSection = () => {
    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative z-10 pt-16 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center"
        >
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-[#111827] border border-[#1F2937] px-4 py-2 rounded-full mb-8 shadow-sm">
                <Sparkles size={16} className="text-[#F59E0B]" />
                <span className="text-[#9CA3AF] text-sm font-medium tracking-wide">CODESPARK EDITORIAL WORKSPACE</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#F9FAFB] tracking-tight mb-4 leading-tight">
                Every Great Developer <br className="hidden md:block" /> Has A Story.
            </motion.h1>

            <motion.div variants={itemVariants} className="relative inline-block mb-6">
                <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#10B981]">
                    Write Yours.
                </h2>
                <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute -right-5 md:-right-6 bottom-1 w-3 md:w-4 h-8 md:h-10 bg-[#06B6D4]"
                />
            </motion.div>

            <motion.p variants={itemVariants} className="text-base md:text-lg text-[#9CA3AF] max-w-2xl mx-auto mt-6">
                A premium digital journal designed specifically for software engineers to reflect, document breakthroughs, track daily growth, and cultivate engineering excellence.
            </motion.p>
        </motion.section>
    );
};

const PremiumEditor = () => {
    const dispatch = useDispatch();
    const { saving } = useSelector((state) => state.journal);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [selectedMood, setSelectedMood] = useState('🔥');
    const [selectedTags, setSelectedTags] = useState(['React', 'Performance']);
    const textareaRef = useRef(null);

    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const chars = text.length;

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.max(200, textareaRef.current.scrollHeight)}px`;
        }
    }, [text]);

    const handleSave = async () => {
        if (!text.trim() || text.trim().length < 10) return;

        const journalTitle = title.trim() || text.trim().split('\n')[0].substring(0, 50) || `Reflection ${new Date().toLocaleDateString()}`;

        const res = await dispatch(createJournalThunk({
            title: journalTitle,
            content: text,
            mood: selectedMood,
            tags: selectedTags,
        }));

        if (createJournalThunk.fulfilled.match(res)) {
            setText('');
            setTitle('');
        }
    };

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const EditorContent = (
        <motion.div
            layout
            className={`relative flex flex-col w-full mx-auto transition-all duration-500 ease-out ${isFocusMode
                    ? 'max-w-4xl h-full justify-center p-8'
                    : 'bg-[#111827] border border-[#1F2937] rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden group'
                }`}
        >
            {!isFocusMode && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#1F2937]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            )}

            {/* Editor Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 z-10 space-y-4 md:space-y-0">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex bg-[#0F172A] border border-[#1F2937] rounded-full p-1">
                        {MOODS.map((mood, idx) => (
                            <motion.button
                                key={idx}
                                whileHover="hover"
                                whileTap="tap"
                                variants={scaleVariants}
                                onClick={() => setSelectedMood(mood)}
                                className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full text-lg md:text-xl transition-colors ${selectedMood === mood ? 'bg-[#1F2937] shadow-inner' : 'hover:bg-[#111827]'
                                    }`}
                            >
                                {mood}
                            </motion.button>
                        ))}
                    </div>
                    <AnimatePresence mode="wait">
                        {saving ? (
                            <motion.div
                                key="saving"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center text-xs text-[#9CA3AF]"
                            >
                                <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse mr-2" />
                                Saving entry...
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>

                <div className="flex items-center space-x-4 text-xs md:text-sm text-[#9CA3AF]">
                    <span>{words} Words</span>
                    <span className="hidden md:inline">{chars} Characters</span>
                    <button
                        onClick={() => setIsFocusMode(!isFocusMode)}
                        className={`p-2 rounded-lg transition-all ${isFocusMode ? 'bg-[#F59E0B]/20 text-[#F59E0B]' : 'hover:bg-[#1F2937] text-[#9CA3AF]'}`}
                        title="Focus Mode"
                    >
                        {isFocusMode ? <X size={18} /> : <Focus size={18} />}
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving || text.trim().length < 10}
                        className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-[#0B1120] font-bold text-xs px-4 py-2 rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity"
                    >
                        {saving ? 'Saving...' : 'Save Entry (+20 XP)'}
                    </button>
                </div>
            </div>

            {/* Title Input */}
            <div className="relative z-10 w-full mb-3">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Entry Title (optional)..."
                    className="w-full bg-transparent text-[#F9FAFB] placeholder-[#9CA3AF]/40 text-lg md:text-xl font-bold focus:outline-none border-b border-[#1F2937]/60 pb-2 mb-2"
                />
            </div>

            {/* Text Area */}
            <div className="relative z-10 w-full flex-grow">
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What did you build, break, or learn today? (minimum 10 characters)..."
                    className={`w-full bg-transparent text-[#F9FAFB] placeholder-[#9CA3AF]/50 focus:outline-none resize-none overflow-hidden transition-all duration-300 ${isFocusMode ? 'text-xl md:text-2xl leading-relaxed min-h-[50vh]' : 'text-base md:text-lg leading-relaxed min-h-[160px]'
                        }`}
                    spellCheck="false"
                />
            </div>

            {/* Tag Selector */}
            <div className="relative z-10 flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-[#1F2937]">
                <span className="text-xs text-[#9CA3AF] mr-2">Tags:</span>
                {['React', 'Node.js', 'Debugging', 'Learning', 'System Design', 'Performance', 'AWS'].map((tag) => (
                    <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${selectedTags.includes(tag)
                                ? 'bg-[#06B6D4]/20 border-[#06B6D4] text-[#06B6D4]'
                                : 'bg-[#0F172A] border-[#1F2937] text-[#9CA3AF] hover:text-white'
                            }`}
                    >
                        #{tag}
                    </button>
                ))}
            </div>
        </motion.div>
    );

    return (
        <>
            <div className="w-full max-w-5xl mx-auto px-4 md:px-6 relative z-10 mt-8 mb-20">
                {EditorContent}
            </div>

            {/* Focus Mode Overlay */}
            <AnimatePresence>
                {isFocusMode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-[#0B1120] overflow-y-auto flex items-center justify-center"
                    >
                        <div className="absolute top-6 right-6 flex items-center space-x-4">
                            <span className="text-[#9CA3AF] text-sm">{words} words</span>
                            <button
                                onClick={() => setIsFocusMode(false)}
                                className="bg-[#1F2937] hover:bg-[#111827] text-[#F9FAFB] border border-[#1F2937] px-4 py-2 rounded-lg flex items-center transition-colors"
                            >
                                <X size={16} className="mr-2" /> Exit Focus
                            </button>
                        </div>
                        {EditorContent}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const StatCard = ({ title, value, icon, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 relative overflow-hidden group shadow-sm"
    >
        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity`} />
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#9CA3AF] font-medium text-sm">{title}</h3>
            {icon}
        </div>
        <div className="text-3xl font-bold text-[#F9FAFB]">{value}</div>
    </motion.div>
);

const SummarySection = () => {
    const { stats } = useSelector((state) => state.journal);
    const { totalXP } = useSelector((state) => state.xp);

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-6 mb-20 relative z-10">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#F9FAFB] flex items-center">
                    <Activity className="mr-3 text-[#06B6D4]" size={24} /> Today's Telemetry
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard title="Total Entries" value={stats?.totalJournals || 0} icon={<BookOpen className="text-[#06B6D4]" size={20} />} color="from-[#06B6D4] to-transparent" />
                <StatCard title="Writing Streak" value={`${stats?.writingStreak || 0}d`} icon={<Brain className="text-[#F59E0B]" size={20} />} color="from-[#F59E0B] to-transparent" />
                <StatCard title="Favorites" value={stats?.favoriteJournals || 0} icon={<Heart className="text-[#10B981]" size={20} />} color="from-[#10B981] to-transparent" />
                <StatCard title="Pinned" value={stats?.pinnedJournals || 0} icon={<Star className="text-[#F97316]" size={20} />} color="from-[#F97316] to-transparent" />
                <StatCard title="Total XP" value={`+${totalXP || 0}`} icon={<Trophy className="text-[#EF4444]" size={20} />} color="from-[#EF4444] to-transparent" />
            </div>
        </section>
    );
};

const InsightsSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-6 mb-20 relative z-10">
            <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-1 relative overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] via-[#F59E0B] to-[#10B981] opacity-20 animate-pulse" />

                <div className="relative bg-[#0B1120] rounded-[22px] p-6 md:p-10 h-full flex flex-col lg:flex-row gap-10">
                    <div className="lg:w-1/3 lg:border-r border-[#1F2937] lg:pr-8">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#0F172A] border border-[#1F2937] flex items-center justify-center">
                                <Brain className="text-[#06B6D4]" size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-[#F9FAFB]">Reflection AI</h2>
                                <p className="text-xs text-[#9CA3AF]">Synthesized Insights</p>
                            </div>
                        </div>
                        <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6">
                            Based on your journal logs, you've optimized performance significantly and consistently reflect on engineering patterns. Keep logging daily entries to maintain momentum.
                        </p>
                        <div className="bg-[#0F172A] p-4 rounded-xl border border-[#1F2937]">
                            <p className="text-[#F9FAFB] text-sm italic">"First, solve the problem. Then, write the code."</p>
                            <p className="text-[#9CA3AF] text-xs mt-2">— John Johnson</p>
                        </div>
                    </div>

                    <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-[#111827] rounded-xl p-5 border border-[#1F2937]">
                            <h3 className="text-[#10B981] font-semibold flex items-center text-sm mb-3">
                                <CheckCircle size={16} className="mr-2" /> Today's Wins
                            </h3>
                            <ul className="text-[#9CA3AF] text-sm space-y-2">
                                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>Consistent daily journal entries recorded</span></li>
                                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>CodeSpark module features shipped</span></li>
                            </ul>
                        </div>
                        <div className="bg-[#111827] rounded-xl p-5 border border-[#1F2937]">
                            <h3 className="text-[#EF4444] font-semibold flex items-center text-sm mb-3">
                                <Target size={16} className="mr-2" /> Challenges
                            </h3>
                            <ul className="text-[#9CA3AF] text-sm space-y-2">
                                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>Complex asynchronous state management</span></li>
                                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>Context switching during debugging</span></li>
                            </ul>
                        </div>
                        <div className="bg-[#111827] rounded-xl p-5 border border-[#1F2937]">
                            <h3 className="text-[#F59E0B] font-semibold flex items-center text-sm mb-3">
                                <Zap size={16} className="mr-2" /> Tomorrow's Focus
                            </h3>
                            <ul className="text-[#9CA3AF] text-sm space-y-2">
                                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>Document API specifications</span></li>
                                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>Refactor module performance</span></li>
                            </ul>
                        </div>
                        <div className="bg-[#111827] rounded-xl p-5 border border-[#1F2937]">
                            <h3 className="text-[#06B6D4] font-semibold flex items-center text-sm mb-3">
                                <Sparkles size={16} className="mr-2" /> Improvement
                            </h3>
                            <ul className="text-[#9CA3AF] text-sm space-y-2">
                                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>Automate test workflows</span></li>
                                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>Maintain 15 mins daily reflection</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const KnowledgeTags = () => {
    const dispatch = useDispatch();
    const { filters } = useSelector((state) => state.journal);

    const handleSelectTag = (tag) => {
        const nextTag = filters.tag === tag ? '' : tag;
        dispatch(setJournalFilters({ tag: nextTag }));
        dispatch(fetchJournalsThunk({ ...filters, tag: nextTag }));
    };

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-6 mb-20 relative z-10 text-center">
            <h2 className="text-lg md:text-xl font-bold text-[#F9FAFB] mb-6">Knowledge Graph</h2>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {KNOWLEDGE_TAGS.map((tag, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -5, scale: 1.05 }}
                        onClick={() => handleSelectTag(tag)}
                        className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium cursor-pointer transition-colors duration-300 border ${filters.tag === tag
                                ? 'bg-[#06B6D4]/20 border-[#06B6D4] text-[#06B6D4]'
                                : 'bg-[#111827] border-[#1F2937] text-[#9CA3AF] hover:text-white'
                            }`}
                    >
                        #{tag}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const WritingAnalytics = () => {
    const { stats } = useSelector((state) => state.journal);

    const analyticsData = [
        { name: 'Mon', words: Math.max(100, (stats.totalJournals || 1) * 80), focus: 2 },
        { name: 'Tue', words: Math.max(150, (stats.totalJournals || 1) * 120), focus: 2.5 },
        { name: 'Wed', words: Math.max(300, (stats.totalJournals || 1) * 200), focus: 3 },
        { name: 'Thu', words: Math.max(250, (stats.totalJournals || 1) * 160), focus: 2.8 },
        { name: 'Fri', words: Math.max(400, (stats.totalJournals || 1) * 250), focus: 4 },
        { name: 'Sat', words: Math.max(120, (stats.totalJournals || 1) * 90), focus: 1.5 },
        { name: 'Sun', words: Math.max(350, (stats.totalJournals || 1) * 220), focus: 3.5 },
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-6 mb-20 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <h2 className="text-xl md:text-2xl font-bold text-[#F9FAFB] flex items-center">
                    <BarChart2 className="mr-3 text-[#10B981]" size={24} /> Productivity Trend
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6">
                    <div className="bg-[#111827] border border-[#1F2937] p-5 md:p-6 rounded-2xl shadow-sm">
                        <h3 className="text-[#9CA3AF] text-sm mb-1">Total Journal Entries</h3>
                        <p className="text-2xl md:text-3xl font-bold text-[#F9FAFB]">{stats?.totalJournals || 0}</p>
                    </div>
                    <div className="bg-[#111827] border border-[#1F2937] p-5 md:p-6 rounded-2xl shadow-sm">
                        <h3 className="text-[#9CA3AF] text-sm mb-1">Writing Streak</h3>
                        <p className="text-2xl md:text-3xl font-bold text-[#F9FAFB]">{stats?.writingStreak || 0} Days</p>
                    </div>
                    <div className="bg-[#111827] border border-[#1F2937] p-5 md:p-6 rounded-2xl shadow-sm">
                        <h3 className="text-[#9CA3AF] text-sm mb-1">Avg Entries / Week</h3>
                        <p className="text-2xl md:text-3xl font-bold text-[#F9FAFB]">{stats?.avgEntriesPerWeek || 0}</p>
                    </div>
                </div>

                <div className="lg:col-span-3 bg-[#111827] border border-[#1F2937] p-5 md:p-6 rounded-2xl h-[350px] md:h-[400px] shadow-sm">
                    <h3 className="text-[#F9FAFB] font-medium mb-6">Writing Output Analytics</h3>
                    <ResponsiveContainer width="100%" height="80%">
                        <AreaChart data={analyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                            <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0B1120', borderColor: '#1F2937', color: '#F9FAFB', borderRadius: '8px' }}
                                itemStyle={{ color: '#06B6D4' }}
                            />
                            <Area type="monotone" dataKey="words" stroke="#06B6D4" strokeWidth={2} fillOpacity={1} fill="url(#colorWords)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

const JournalCard = ({ journal }) => {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false);

    const journalId = journal._id || journal.id;
    const dateStr = journal.createdAt
        ? new Date(journal.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'Today';

    const moodEmoji = MOOD_MAP_REVERSE[journal.mood] || '🔥';

    const handleToggleFav = (e) => {
        e.stopPropagation();
        dispatch(toggleFavoriteThunk(journalId));
    };

    const handleTogglePin = (e) => {
        e.stopPropagation();
        dispatch(togglePinThunk(journalId));
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this journal entry?')) {
            dispatch(deleteJournalThunk(journalId));
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`bg-[#111827] border rounded-2xl p-5 break-inside-avoid mb-6 transition-colors shadow-sm ${journal.isPinned ? 'border-[#F59E0B]/60 bg-[#111827]/90' : 'border-[#1F2937] hover:border-[#F59E0B]/50'
                }`}
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-[#9CA3AF] text-xs font-medium bg-[#0F172A] px-2 py-1 rounded-md border border-[#1F2937]">
                            {dateStr}
                        </span>
                        {journal.isPinned && (
                            <span className="text-[10px] bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 px-2 py-0.5 rounded-md flex items-center gap-1 font-semibold">
                                <Pin size={10} /> PINNED
                            </span>
                        )}
                    </div>
                    <h3 className="text-[#F9FAFB] font-semibold mt-3 text-base md:text-lg">{journal.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleToggleFav}
                        className={`p-1.5 rounded-lg border transition-colors ${journal.isFavorite ? 'bg-red-500/20 text-red-500 border-red-500/30' : 'bg-[#0F172A] border-[#1F2937] text-[#9CA3AF] hover:text-white'}`}
                        title={journal.isFavorite ? 'Unfavorite' : 'Favorite'}
                    >
                        <Heart size={14} className={journal.isFavorite ? 'fill-red-500' : ''} />
                    </button>
                    <button
                        onClick={handleTogglePin}
                        className={`p-1.5 rounded-lg border transition-colors ${journal.isPinned ? 'bg-amber-500/20 text-amber-500 border-amber-500/30' : 'bg-[#0F172A] border-[#1F2937] text-[#9CA3AF] hover:text-white'}`}
                        title={journal.isPinned ? 'Unpin' : 'Pin'}
                    >
                        <Pin size={14} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-1.5 rounded-lg bg-[#0F172A] border border-[#1F2937] text-[#9CA3AF] hover:text-red-400 transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={14} />
                    </button>
                    <div className="text-xl md:text-2xl bg-[#0F172A] w-9 h-9 rounded-full flex items-center justify-center border border-[#1F2937] ml-1">
                        {moodEmoji}
                    </div>
                </div>
            </div>

            {journal.tags && journal.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {journal.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] md:text-xs text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-1 rounded-full border border-[#06B6D4]/20">
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            <motion.div layout className="relative">
                <p className={`text-[#9CA3AF] text-sm leading-relaxed whitespace-pre-line ${!expanded ? 'line-clamp-3' : ''}`}>
                    {journal.content}
                </p>
            </motion.div>

            <div className="mt-5 flex items-center justify-between border-t border-[#1F2937] pt-4">
                <span className="text-[#9CA3AF] text-xs flex items-center"><Clock size={12} className="mr-1" /> {journal.wordCount || 0} words</span>
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-[#F59E0B] text-xs font-medium flex items-center hover:text-[#F97316] transition-colors"
                >
                    {expanded ? 'Collapse' : 'View More'}
                    {expanded ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />}
                </button>
            </div>
        </motion.div>
    );
};

const RecentJournals = () => {
    const dispatch = useDispatch();
    const { journals, filters, loading } = useSelector((state) => state.journal);

    const handleMoodFilter = (moodVal) => {
        const nextMood = filters.mood === moodVal ? 'All' : moodVal;
        dispatch(setJournalFilters({ mood: nextMood }));
        dispatch(fetchJournalsThunk({ ...filters, mood: nextMood }));
    };

    const handleSortChange = (e) => {
        const sortBy = e.target.value;
        dispatch(setJournalFilters({ sortBy }));
        dispatch(fetchJournalsThunk({ ...filters, sortBy }));
    };

    const handleToggleFavFilter = () => {
        const isFavorite = !filters.isFavorite;
        dispatch(setJournalFilters({ isFavorite }));
        dispatch(fetchJournalsThunk({ ...filters, isFavorite }));
    };

    const handleTogglePinFilter = () => {
        const isPinned = !filters.isPinned;
        dispatch(setJournalFilters({ isPinned }));
        dispatch(fetchJournalsThunk({ ...filters, isPinned }));
    };

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-32 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <h2 className="text-xl md:text-2xl font-bold text-[#F9FAFB] flex items-center">
                    <Archive className="mr-3 text-[#9CA3AF]" size={24} /> Journal Archive
                </h2>

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={handleToggleFavFilter}
                        className={`text-xs px-3 py-2 rounded-lg border flex items-center gap-1.5 transition-colors ${filters.isFavorite ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-[#111827] border-[#1F2937] text-[#9CA3AF]'}`}
                    >
                        <Heart size={14} className={filters.isFavorite ? 'fill-red-400' : ''} /> Favorites
                    </button>
                    <button
                        onClick={handleTogglePinFilter}
                        className={`text-xs px-3 py-2 rounded-lg border flex items-center gap-1.5 transition-colors ${filters.isPinned ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-[#111827] border-[#1F2937] text-[#9CA3AF]'}`}
                    >
                        <Pin size={14} /> Pinned
                    </button>
                    <select
                        value={filters.sortBy || 'newest'}
                        onChange={handleSortChange}
                        className="bg-[#111827] border border-[#1F2937] text-[#9CA3AF] text-xs px-3 py-2 rounded-lg focus:outline-none"
                    >
                        <option value="newest">Sort: Newest First</option>
                        <option value="oldest">Sort: Oldest First</option>
                        <option value="title_asc">Title A-Z</option>
                        <option value="title_desc">Title Z-A</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-[#9CA3AF] text-sm">Loading journal entries from MongoDB...</div>
            ) : journals.length === 0 ? (
                <div className="text-center py-16 bg-[#111827] border border-[#1F2937] rounded-2xl p-8">
                    <BookOpen size={36} className="mx-auto text-[#9CA3AF] mb-3 opacity-50" />
                    <h3 className="text-[#F9FAFB] font-bold text-lg mb-1">No Journal Entries Found</h3>
                    <p className="text-[#9CA3AF] text-sm max-w-md mx-auto">Start writing your developer thoughts above to build your daily reflection timeline.</p>
                </div>
            ) : (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {journals.map(journal => (
                        <JournalCard key={journal._id || journal.id} journal={journal} />
                    ))}
                </div>
            )}
        </section>
    );
};

const FloatingDock = ({ onActionClick }) => {
    const actions = [
        { id: 'new', icon: <Plus size={18} />, label: 'New', color: 'text-[#10B981]' },
        { id: 'voice', icon: <Mic size={18} />, label: 'Voice', color: 'text-[#06B6D4]' },
        { id: 'search', icon: <Search size={18} />, label: 'Search (⌘K)', color: 'text-[#F9FAFB]' },
        { id: 'export', icon: <Download size={18} />, label: 'Export PDF', color: 'text-[#F59E0B]' },
        { id: 'share', icon: <Share2 size={18} />, label: 'Share', color: 'text-[#F97316]' },
        { id: 'fav', icon: <Heart size={18} />, label: 'Favorite', color: 'text-[#EF4444]' },
    ];

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.5 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 flex items-center bg-[#111827]/90 backdrop-blur-xl border border-[#1F2937] p-2 rounded-2xl shadow-2xl space-x-1 md:space-x-2"
        >
            {actions.map((action) => (
                <motion.button
                    key={action.id}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onActionClick(action.id)}
                    className={`p-2.5 md:p-3 rounded-xl bg-[#0F172A] hover:bg-[#1F2937] transition-colors relative group ${action.color}`}
                >
                    {action.icon}
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#0B1120] border border-[#1F2937] text-[#F9FAFB] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden md:block">
                        {action.label}
                    </div>
                </motion.button>
            ))}
        </motion.div>
    );
};

const SearchOverlay = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { filters, journals } = useSelector((state) => state.journal);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchTerm(val);
        dispatch(setJournalFilters({ search: val }));
        dispatch(fetchJournalsThunk({ ...filters, search: val }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-[#0B1120]/80 backdrop-blur-md flex items-start justify-center pt-[15vh] px-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, y: -20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: -20, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-2xl bg-[#111827] border border-[#1F2937] rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="flex items-center px-4 py-4 border-b border-[#1F2937]">
                            <Search className="text-[#9CA3AF] mr-3" size={20} />
                            <input
                                autoFocus
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Search title, content, or tags in real-time..."
                                className="w-full bg-transparent text-[#F9FAFB] focus:outline-none text-base md:text-lg placeholder-[#9CA3AF]/50"
                            />
                            <span className="text-[#9CA3AF] text-xs bg-[#0F172A] px-2 py-1 rounded border border-[#1F2937] ml-2 hidden sm:block">ESC</span>
                        </div>
                        <div className="p-4 bg-[#0B1120] text-[#9CA3AF] text-sm max-h-[50vh] overflow-y-auto space-y-3">
                            {searchTerm ? (
                                journals.length > 0 ? (
                                    journals.map(j => (
                                        <div key={j._id || j.id} className="p-3 bg-[#111827] border border-[#1F2937] rounded-xl text-left">
                                            <h4 className="font-semibold text-white text-sm">{j.title}</h4>
                                            <p className="text-xs text-[#9CA3AF] line-clamp-2 mt-1">{j.content}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-8 text-center">No matching journals found</div>
                                )
                            ) : (
                                <div className="py-8 text-center">Start typing to search across all journals...</div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const ActionModal = ({ isOpen, onClose, title, message }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-[#0B1120]/60 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl"
                    >
                        <div className="w-12 h-12 bg-[#0F172A] border border-[#1F2937] rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle size={24} className="text-[#10B981]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#F9FAFB] mb-2">{title}</h3>
                        <p className="text-[#9CA3AF] text-sm mb-6">{message}</p>
                        <button
                            onClick={onClose}
                            className="w-full bg-[#1F2937] hover:bg-[#374151] text-[#F9FAFB] py-2 rounded-lg font-medium transition-colors"
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default function Journal() {
    const dispatch = useDispatch();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [modalState, setModalState] = useState({ isOpen: false, title: '', message: '' });

    useEffect(() => {
        dispatch(fetchJournalsThunk());
        dispatch(fetchJournalStatsThunk());
    }, [dispatch]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleActionClick = (actionId) => {
        switch (actionId) {
            case 'new':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'search':
                setIsSearchOpen(true);
                break;
            case 'voice':
                setModalState({ isOpen: true, title: 'Voice Note Enabled', message: 'Recording started. Speak your thoughts...' });
                break;
            case 'export':
                setModalState({ isOpen: true, title: 'Exporting PDF', message: 'Your journal is being generated as a beautiful PDF.' });
                break;
            case 'share':
                setModalState({ isOpen: true, title: 'Share Link Created', message: 'A secure link to this reflection has been copied to your clipboard.' });
                break;
            case 'fav':
                dispatch(setJournalFilters({ isFavorite: true }));
                dispatch(fetchJournalsThunk({ isFavorite: true }));
                setModalState({ isOpen: true, title: 'Favorites Filtered', message: 'Showing your favorite journal highlights.' });
                break;
            default:
                break;
        }
    };

    return (
        <div className="relative w-full text-[#F9FAFB] font-sans selection:bg-[#06B6D4]/30 overflow-hidden">
            <main className="relative z-10 pt-8 md:pt-12">
                <HeroSection />
                <PremiumEditor />
                <SummarySection />
                <InsightsSection />
                <KnowledgeTags />
                <WritingAnalytics />
                <RecentJournals />
            </main>

            <FloatingDock onActionClick={handleActionClick} />

            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            <ActionModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ ...modalState, isOpen: false })}
                title={modalState.title}
                message={modalState.message}
            />
        </div>
    );
}