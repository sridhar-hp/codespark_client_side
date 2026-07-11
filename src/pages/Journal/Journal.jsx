import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Terminal, Focus, Search, Share2, Download, Heart,
    Archive, ChevronDown, ChevronUp, CheckCircle, Zap, Star,
    Clock, Trophy, Target, ArrowRight, Activity, Sparkles, Brain,
    Plus, Mic, X, BarChart2, BookOpen
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// --- MOCK DATA ---
const MOCK_ANALYTICS = [
    { name: 'Mon', words: 400, focus: 2 },
    { name: 'Tue', words: 300, focus: 1.5 },
    { name: 'Wed', words: 650, focus: 3 },
    { name: 'Thu', words: 500, focus: 2.5 },
    { name: 'Fri', words: 800, focus: 4 },
    { name: 'Sat', words: 200, focus: 1 },
    { name: 'Sun', words: 900, focus: 5 },
];

const MOCK_ACHIEVEMENTS = [
    { id: 1, title: 'Solved 3 LeetCode Hard', icon: <Zap size={18} className="text-[#F59E0B]" /> },
    { id: 2, title: 'Shipped User Auth', icon: <CheckCircle size={18} className="text-[#10B981]" /> },
    { id: 3, title: 'Fixed Memory Leak', icon: <Activity size={18} className="text-[#EF4444]" /> },
    { id: 4, title: 'Completed GraphQL Module', icon: <BookOpen size={18} className="text-[#06B6D4]" /> },
    { id: 5, title: '7-Day Streak Maintained', icon: <Star size={18} className="text-[#F97316]" /> },
];

const MOCK_TIMELINE = [
    {
        id: 1,
        time: 'Morning',
        tech: 'React & Vite',
        duration: '2.5 hrs',
        reflection: 'Struggled with Framer Motion layout animations initially, but understanding AnimatePresence fixed the unmounting issues.',
        lessons: 'Always wrap conditional components in AnimatePresence.',
        mistakes: 'Forgot to add unique keys to mapped items.',
        achievements: 'Created a flawless staggered layout.'
    },
    {
        id: 2,
        time: 'Afternoon',
        tech: 'Node.js & MongoDB',
        duration: '3 hrs',
        reflection: 'Deep dive into aggregate pipelines. Managed to optimize a slow query by 400ms.',
        lessons: '$match should always precede $lookup for performance.',
        mistakes: 'Accidentally pushed .env to a local branch (caught before remote).',
        achievements: 'Query optimization complete.'
    },
    {
        id: 3,
        time: 'Evening',
        tech: 'System Design',
        duration: '1.5 hrs',
        reflection: 'Read about distributed caching architectures. Redis cluster setup looks complex but necessary for scale.',
        lessons: 'Cache invalidation is still the hardest problem.',
        mistakes: 'None today.',
        achievements: 'Finished chapter 4 of DDIA.'
    },
    {
        id: 4,
        time: 'Night',
        tech: 'Algorithm Practice',
        duration: '1 hr',
        reflection: 'Solved a dynamic programming problem that previously stumped me. The state transition finally clicked.',
        lessons: 'Memoization top-down is often more intuitive than bottom-up tabulation.',
        mistakes: 'Off-by-one error in array bounds.',
        achievements: 'Accepted solution on first submit.'
    }
];

const MOCK_JOURNALS = [
    {
        id: 1,
        date: 'Oct 24, 2025',
        mood: '🔥',
        tags: ['React', 'Performance'],
        tech: 'React 18',
        summary: 'Refactored the dashboard using useMemo and useCallback. Dropped render times by 30%. Incredible day for performance gains.',
        duration: '4h 15m'
    },
    {
        id: 2,
        date: 'Oct 23, 2025',
        mood: '😓',
        tags: ['Debugging', 'AWS'],
        tech: 'AWS S3, IAM',
        summary: 'Spent 6 hours debugging an IAM permissions issue for S3 bucket uploads. Found out it was a missing wildcard in the ARN.',
        duration: '6h 00m'
    },
    {
        id: 3,
        date: 'Oct 22, 2025',
        mood: '😀',
        tags: ['Learning', 'System Design'],
        tech: 'Kafka',
        summary: 'Built a small event-driven microservice prototype using Kafka and Node.js. Event sourcing is a fascinating pattern.',
        duration: '3h 30m'
    },
    {
        id: 4,
        date: 'Oct 21, 2025',
        mood: '🙂',
        tags: ['UI/UX', 'Tailwind'],
        tech: 'Tailwind CSS',
        summary: 'Created a new dark mode theme for the internal tool. The new color palette feels much more premium.',
        duration: '2h 45m'
    }
];

const KNOWLEDGE_TAGS = ['React', 'Node.js', 'JavaScript', 'MongoDB', 'Express', 'Next.js', 'System Design', 'TypeScript', 'DSA', 'Tailwind', 'GraphQL', 'Docker'];
const MOODS = ['😀', '🙂', '😐', '😓', '🔥'];

// --- ANIMATION VARIANTS ---
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

// --- COMPONENTS ---

const BackgroundEffects = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Ambient Lighting */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-[10%] w-[40%] h-[40vh] rounded-full bg-[#F59E0B] blur-[150px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.1, 0.15, 0.1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50vh] rounded-full bg-[#06B6D4] blur-[150px]"
            />

            {/* Floating Particles */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: ['-10vh', '110vh'],
                        x: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
                        opacity: [0, 0.5, 0],
                        rotate: [0, 360]
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear"
                    }}
                    className="absolute top-0 w-1 h-1 bg-[#F9FAFB] rounded-full opacity-20"
                    style={{ left: `${Math.random() * 100}%` }}
                />
            ))}

            {/* Floating Code Snippets */}
            <motion.div
                animate={{ y: [0, -20, 0], opacity: [0.05, 0.1, 0.05] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] right-[15%] font-mono text-xs text-[#06B6D4] select-none"
            >
                {`const reflect = (day) => {\n  return growth;\n}`}
            </motion.div>
            <motion.div
                animate={{ y: [0, 20, 0], opacity: [0.05, 0.1, 0.05] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[30%] left-[10%] font-mono text-xs text-[#F59E0B] select-none"
            >
                {`await commit(changes);\n// Keep pushing`}
            </motion.div>
        </div>
    );
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
    const [text, setText] = useState('');
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [selectedMood, setSelectedMood] = useState(null);
    const textareaRef = useRef(null);

    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const chars = text.length;

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.max(200, textareaRef.current.scrollHeight)}px`;
        }
    }, [text]);

    // Autosave simulation
    useEffect(() => {
        if (text.length > 0) {
            setIsSaving(true);
            const timer = setTimeout(() => {
                setIsSaving(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [text]);

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
                        {isSaving ? (
                            <motion.div
                                key="saving"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center text-xs text-[#9CA3AF]"
                            >
                                <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse mr-2" />
                                Saving...
                            </motion.div>
                        ) : text.length > 0 ? (
                            <motion.div
                                key="saved"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center text-xs text-[#9CA3AF]"
                            >
                                <CheckCircle size={12} className="mr-1 text-[#10B981]" /> Saved
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
                </div>
            </div>

            {/* Text Area */}
            <div className="relative z-10 w-full flex-grow">
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What did you build, break, or learn today?..."
                    className={`w-full bg-transparent text-[#F9FAFB] placeholder-[#9CA3AF]/50 focus:outline-none resize-none overflow-hidden transition-all duration-300 ${isFocusMode ? 'text-xl md:text-2xl leading-relaxed min-h-[50vh]' : 'text-base md:text-lg leading-relaxed min-h-[200px]'
                        }`}
                    spellCheck="false"
                />
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
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-6 mb-20 relative z-10">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#F9FAFB] flex items-center">
                    <Activity className="mr-3 text-[#06B6D4]" size={24} /> Today's Telemetry
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard title="Hours Focused" value="6.5" icon={<Clock className="text-[#06B6D4]" size={20} />} color="from-[#06B6D4] to-transparent" />
                <StatCard title="Deep Work" value="4.2h" icon={<Brain className="text-[#F59E0B]" size={20} />} color="from-[#F59E0B] to-transparent" />
                <StatCard title="Learning" value="1.5h" icon={<BookOpen className="text-[#10B981]" size={20} />} color="from-[#10B981] to-transparent" />
                <StatCard title="Commits" value="12" icon={<Terminal className="text-[#F97316]" size={20} />} color="from-[#F97316] to-transparent" />
                <StatCard title="XP Earned" value="+450" icon={<Trophy className="text-[#EF4444]" size={20} />} color="from-[#EF4444] to-transparent" />
            </div>

            {/* Horizontal Sliding Achievements */}
            <div className="mt-8 flex overflow-x-auto space-x-4 pb-4 hide-scrollbar">
                {MOCK_ACHIEVEMENTS.map((ach) => (
                    <motion.div
                        key={ach.id}
                        whileHover={{ scale: 1.02 }}
                        className="flex-shrink-0 bg-[#0F172A] border border-[#1F2937] rounded-xl px-4 py-3 flex items-center space-x-3 cursor-default"
                    >
                        {ach.icon}
                        <span className="text-[#F9FAFB] text-sm font-medium whitespace-nowrap">{ach.title}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const InsightsSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-6 mb-20 relative z-10">
            <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-1 relative overflow-hidden shadow-lg">
                {/* Animated border effect container */}
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
                            Based on today's inputs, you've optimized performance significantly but faced hurdles with IAM roles. Maintain focus on AWS configuration patterns tomorrow.
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
                                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>Render time reduced by 30%</span></li>
                                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>Kafka microservice prototype running</span></li>
                            </ul>
                        </div>
                        <div className="bg-[#111827] rounded-xl p-5 border border-[#1F2937]">
                            <h3 className="text-[#EF4444] font-semibold flex items-center text-sm mb-3">
                                <Target size={16} className="mr-2" /> Challenges
                            </h3>
                            <ul className="text-[#9CA3AF] text-sm space-y-2">
                                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>S3 IAM permission wildcard missing</span></li>
                                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>Context switching during debugging</span></li>
                            </ul>
                        </div>
                        <div className="bg-[#111827] rounded-xl p-5 border border-[#1F2937]">
                            <h3 className="text-[#F59E0B] font-semibold flex items-center text-sm mb-3">
                                <Zap size={16} className="mr-2" /> Tomorrow's Focus
                            </h3>
                            <ul className="text-[#9CA3AF] text-sm space-y-2">
                                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>Document IAM setup for team</span></li>
                                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>Start GraphQL schema definitions</span></li>
                            </ul>
                        </div>
                        <div className="bg-[#111827] rounded-xl p-5 border border-[#1F2937]">
                            <h3 className="text-[#06B6D4] font-semibold flex items-center text-sm mb-3">
                                <Sparkles size={16} className="mr-2" /> Improvement
                            </h3>
                            <ul className="text-[#9CA3AF] text-sm space-y-2">
                                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>Use AWS Policy Simulator next time</span></li>
                                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0 text-[#1F2937]" /> <span>Timeblock 2 hours for deep work</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const TimelineItem = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="relative pl-8 mb-8 group">
            {/* Line & Node */}
            <div className="absolute left-[11px] top-0 bottom-[-32px] w-[2px] bg-[#1F2937] group-last:bg-transparent" />
            <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#0F172A] border-2 border-[#06B6D4] flex items-center justify-center z-10">
                <div className="w-2 h-2 rounded-full bg-[#06B6D4]" />
            </div>

            <div
                className="bg-[#111827] border border-[#1F2937] rounded-2xl p-4 md:p-5 cursor-pointer hover:border-[#06B6D4]/50 transition-colors shadow-sm"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-2 gap-2 sm:gap-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[#F9FAFB] font-semibold">{item.time}</span>
                        <span className="text-xs bg-[#0F172A] px-2 py-1 rounded-md border border-[#1F2937] text-[#06B6D4]">
                            {item.tech}
                        </span>
                    </div>
                    <div className="flex items-center text-[#9CA3AF] text-sm space-x-3">
                        <span className="flex items-center"><Clock size={14} className="mr-1" /> {item.duration}</span>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                </div>

                <p className="text-[#9CA3AF] text-sm leading-relaxed">{item.reflection}</p>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 border-t border-[#1F2937] grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <h4 className="text-xs text-[#10B981] font-semibold uppercase tracking-wider mb-2">Lessons Learned</h4>
                                    <p className="text-sm text-[#F9FAFB]">{item.lessons}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs text-[#EF4444] font-semibold uppercase tracking-wider mb-2">Mistakes</h4>
                                    <p className="text-sm text-[#F9FAFB]">{item.mistakes}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs text-[#F59E0B] font-semibold uppercase tracking-wider mb-2">Achievements</h4>
                                    <p className="text-sm text-[#F9FAFB]">{item.achievements}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const MemoryTimeline = () => {
    return (
        <section className="max-w-4xl mx-auto px-4 md:px-6 mb-20 relative z-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#F9FAFB] flex items-center mb-8 md:mb-10">
                <Clock className="mr-3 text-[#F59E0B]" size={24} /> Memory Timeline
            </h2>
            <div className="ml-2">
                {MOCK_TIMELINE.map(item => (
                    <TimelineItem key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
};

const KnowledgeTags = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-6 mb-20 relative z-10 text-center">
            <h2 className="text-lg md:text-xl font-bold text-[#F9FAFB] mb-6">Knowledge Graph</h2>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {KNOWLEDGE_TAGS.map((tag, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -5, scale: 1.05, backgroundColor: '#0F172A', borderColor: '#06B6D4' }}
                        className="bg-[#111827] border border-[#1F2937] text-[#9CA3AF] px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium cursor-pointer transition-colors duration-300"
                    >
                        {tag}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const WritingAnalytics = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-6 mb-20 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <h2 className="text-xl md:text-2xl font-bold text-[#F9FAFB] flex items-center">
                    <BarChart2 className="mr-3 text-[#10B981]" size={24} /> Productivity Trend
                </h2>
                <div className="flex self-start sm:self-auto space-x-2">
                    <span className="px-3 py-1 bg-[#111827] border border-[#1F2937] rounded-lg text-xs text-[#9CA3AF]">This Week</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6">
                    <div className="bg-[#111827] border border-[#1F2937] p-5 md:p-6 rounded-2xl shadow-sm">
                        <h3 className="text-[#9CA3AF] text-sm mb-1">Words Written</h3>
                        <p className="text-2xl md:text-3xl font-bold text-[#F9FAFB]">3,250</p>
                        <p className="text-[#10B981] text-xs mt-2 flex items-center"><ArrowRight size={12} className="-rotate-45 mr-1" /> +12% vs last week</p>
                    </div>
                    <div className="bg-[#111827] border border-[#1F2937] p-5 md:p-6 rounded-2xl shadow-sm">
                        <h3 className="text-[#9CA3AF] text-sm mb-1">Journal Streak</h3>
                        <p className="text-2xl md:text-3xl font-bold text-[#F9FAFB]">14 Days</p>
                        <p className="text-[#F59E0B] text-xs mt-2 flex items-center"><Star size={12} className="mr-1" /> Best: 32 Days</p>
                    </div>
                    <div className="bg-[#111827] border border-[#1F2937] p-5 md:p-6 rounded-2xl shadow-sm">
                        <h3 className="text-[#9CA3AF] text-sm mb-1">Avg Reflection</h3>
                        <p className="text-2xl md:text-3xl font-bold text-[#F9FAFB]">15m</p>
                        <p className="text-[#06B6D4] text-xs mt-2 flex items-center"><Clock size={12} className="mr-1" /> Per Entry</p>
                    </div>
                </div>

                <div className="lg:col-span-3 bg-[#111827] border border-[#1F2937] p-5 md:p-6 rounded-2xl h-[350px] md:h-[400px] shadow-sm">
                    <h3 className="text-[#F9FAFB] font-medium mb-6">Output Analytics</h3>
                    <ResponsiveContainer width="100%" height="80%">
                        <AreaChart data={MOCK_ANALYTICS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5 break-inside-avoid mb-6 hover:border-[#F59E0B]/50 transition-colors shadow-sm"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="text-[#9CA3AF] text-xs font-medium bg-[#0F172A] px-2 py-1 rounded-md border border-[#1F2937]">
                        {journal.date}
                    </span>
                    <h3 className="text-[#F9FAFB] font-semibold mt-3 text-base md:text-lg">{journal.tech}</h3>
                </div>
                <div className="text-xl md:text-2xl bg-[#0F172A] w-10 h-10 rounded-full flex items-center justify-center border border-[#1F2937]">
                    {journal.mood}
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {journal.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] md:text-xs text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-1 rounded-full">
                        #{tag}
                    </span>
                ))}
            </div>

            <motion.div layout className="relative">
                <p className={`text-[#9CA3AF] text-sm leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}>
                    {journal.summary}
                </p>
            </motion.div>

            <div className="mt-5 flex items-center justify-between border-t border-[#1F2937] pt-4">
                <span className="text-[#9CA3AF] text-xs flex items-center"><Clock size={12} className="mr-1" /> {journal.duration}</span>
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
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-32 relative z-10">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#F9FAFB] flex items-center">
                    <Archive className="mr-3 text-[#9CA3AF]" size={24} /> Archive
                </h2>

                {/* Filters Mock */}
                <div className="hidden md:flex space-x-3">
                    {['Mood', 'Technology', 'Tags', 'Month'].map((filter, i) => (
                        <button key={i} className="bg-[#111827] border border-[#1F2937] text-[#9CA3AF] text-sm px-4 py-2 rounded-lg flex items-center hover:bg-[#0F172A] transition-colors">
                            {filter} <ChevronDown size={14} className="ml-2" />
                        </button>
                    ))}
                </div>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {MOCK_JOURNALS.map(journal => (
                    <JournalCard key={journal.id} journal={journal} />
                ))}
            </div>
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

                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#0B1120] border border-[#1F2937] text-[#F9FAFB] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden md:block">
                        {action.label}
                    </div>
                </motion.button>
            ))}
        </motion.div>
    );
};

const SearchOverlay = ({ isOpen, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

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
                                placeholder="Search reflections, tags, or code snippets..."
                                className="w-full bg-transparent text-[#F9FAFB] focus:outline-none text-base md:text-lg placeholder-[#9CA3AF]/50"
                            />
                            <span className="text-[#9CA3AF] text-xs bg-[#0F172A] px-2 py-1 rounded border border-[#1F2937] ml-2 hidden sm:block">ESC</span>
                        </div>
                        <div className="p-4 bg-[#0B1120] text-center text-[#9CA3AF] text-sm py-12">
                            Start typing to search across all journals...
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

// --- MAIN PAGE COMPONENT ---

export default function Journal() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [modalState, setModalState] = useState({ isOpen: false, title: '', message: '' });

    // Handle Ctrl+K shortcut for search (available on the page level)
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
                setModalState({ isOpen: true, title: 'Saved to Favorites', message: 'This entry has been pinned to your highlights.' });
                break;
            default:
                break;
        }
    };

    return (
        <div className="relative w-full  text-[#F9FAFB] font-sans selection:bg-[#06B6D4]/30 overflow-hidden">
            {/* <BackgroundEffects /> */}

            {/* Page Content strictly contained within the Router Outlet boundary */}
            <main className="relative z-10 pt-8 md:pt-12">
                <HeroSection />
                <PremiumEditor />
                <SummarySection />
                <InsightsSection />
                <MemoryTimeline />
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