import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import {
    Settings, Monitor, Layout, Zap, Sun, Moon, Sparkles, Check, ChevronRight,
    Download, Trash2, Github, Linkedin, Calendar, Database, Search, Bell,
    Sliders, Layers, Activity, Lock, Globe, Clock, Command, Play, RotateCcw,
    Code, Hexagon, Terminal, User, BookOpen, AlertCircle, RefreshCw, Palette
} from 'lucide-react';

// --- CONSTANTS & MAPPINGS ---

const ACCENT_COLORS = {
    Amber: '#F59E0B',
    Orange: '#F97316',
    Cyan: '#06B6D4',
    Emerald: '#10B981',
    Purple: '#8B5CF6',
    Rose: '#F43F5E'
};

const BORDER_RADII = {
    Rounded: '1rem',
    Medium: '0.5rem',
    Sharp: '0rem'
};

const BORDER_RADII_MINI = {
    Rounded: '0.5rem',
    Medium: '0.25rem',
    Sharp: '0rem'
};

const ANIMATION_SPEEDS = {
    Fast: 0.2,
    Normal: 0.4,
    'Reduced Motion': 0
};

const THEME_PRESETS = [
    {
        id: 'classic',
        name: 'CodeSpark Classic',
        desc: 'The original premium experience.',
        colors: ['#111827', '#F59E0B', '#0B1120'],
        settings: { theme: 'Dark', accent: 'Amber', density: 'Comfortable', sidebar: 'Expanded', borderRadius: 'Medium', animation: 'Normal' }
    },
    {
        id: 'midnight',
        name: 'Midnight Developer',
        desc: 'Deep focus with high contrast.',
        colors: ['#000000', '#8B5CF6', '#111827'],
        settings: { theme: 'Dark', accent: 'Purple', density: 'Compact', sidebar: 'Collapsed', borderRadius: 'Sharp', animation: 'Fast' }
    },
    {
        id: 'arctic',
        name: 'Arctic Cyan',
        desc: 'Cool, precise, and technical.',
        colors: ['#0B1120', '#06B6D4', '#0F172A'],
        settings: { theme: 'Dark', accent: 'Cyan', density: 'Comfortable', sidebar: 'Expanded', borderRadius: 'Medium', animation: 'Normal' }
    },
    {
        id: 'autumn',
        name: 'Autumn Amber',
        desc: 'Warm tones for extended sessions.',
        colors: ['#1c1917', '#F97316', '#292524'],
        settings: { theme: 'Dark', accent: 'Orange', density: 'Comfortable', sidebar: 'Floating', borderRadius: 'Rounded', animation: 'Normal' }
    },
    {
        id: 'forest',
        name: 'Forest Green',
        desc: 'Calm and organic workspace.',
        colors: ['#064e3b', '#10B981', '#065f46'],
        settings: { theme: 'Dark', accent: 'Emerald', density: 'Comfortable', sidebar: 'Expanded', borderRadius: 'Medium', animation: 'Normal' }
    },
    {
        id: 'neon',
        name: 'Neon Focus',
        desc: 'Vibrant and energetic.',
        colors: ['#0f172a', '#F43F5E', '#1e293b'],
        settings: { theme: 'Dark', accent: 'Rose', density: 'Compact', sidebar: 'Collapsed', borderRadius: 'Sharp', animation: 'Fast' }
    }
];

const INTEGRATIONS = [
    { id: 'github', name: 'GitHub', icon: Github, connected: true, lastSync: '2 mins ago' },
    { id: 'leetcode', name: 'LeetCode', icon: Code, connected: true, lastSync: '1 hour ago' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, connected: false, lastSync: null },
    { id: 'hackerrank', name: 'HackerRank', icon: Hexagon, connected: false, lastSync: null },
    { id: 'calendar', name: 'Google Calendar', icon: Calendar, connected: true, lastSync: 'Just now' },
    { id: 'notion', name: 'Notion', icon: Database, connected: false, lastSync: null }
];

// --- HELPER COMPONENTS ---

const AnimatedCounter = ({ value, suffix = "" }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(value, 10);
        if (start === end) return;
        let totalMilSecDur = 1500;
        let incrementTime = (totalMilSecDur / end) * 2;
        let timer = setInterval(() => {
            start += 1;
            setDisplayValue(String(start) + suffix);
            if (start === end) clearInterval(timer);
        }, incrementTime);
        return () => clearInterval(timer);
    }, [value, suffix]);

    return <span>{displayValue || value}</span>;
};

const Card = ({ children, className = "", delay = 0, hover = true }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : {}}
            className={`bg-[#111827] border border-[#1F2937] rounded-xl shadow-xl overflow-hidden relative ${className}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
            {children}
        </motion.div>
    );
};

const SectionHeader = ({ title, subtitle, icon: Icon }) => (
    <div className="mb-8 flex items-center space-x-4">
        <div className="p-3 bg-[#0F172A] rounded-lg border border-[#1F2937] text-[#F59E0B]">
            <Icon size={24} />
        </div>
        <div>
            <h2 className="text-2xl font-semibold text-[#F9FAFB] tracking-tight">{title}</h2>
            <p className="text-[#9CA3AF] text-sm mt-1">{subtitle}</p>
        </div>
    </div>
);

const Toggle = ({ enabled, onChange, accentColor }) => (
    <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none`}
        style={{ backgroundColor: enabled ? accentColor : '#1F2937' }}
    >
        <motion.span
            layout
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
        />
    </button>
);

const Select = ({ value, options, onChange }) => (
    <div className="relative">
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="appearance-none bg-[#0F172A] border border-[#1F2937] text-[#F9FAFB] text-sm rounded-lg focus:ring-[#F59E0B] focus:border-[#F59E0B] block w-full p-2.5 pr-8 transition-colors cursor-pointer"
        >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#9CA3AF]">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
    </div>
);

const SettingRow = ({ label, description, control }) => (
    <div className="flex items-center justify-between py-4 border-b border-[#1F2937] last:border-0 group">
        <div className="pr-8">
            <h4 className="text-sm font-medium text-[#F9FAFB] transition-colors group-hover:text-white">{label}</h4>
            {description && <p className="text-xs text-[#9CA3AF] mt-1">{description}</p>}
        </div>
        <div className="flex-shrink-0">
            {control}
        </div>
    </div>
);

const Button = ({ children, variant = 'primary', icon: Icon, onClick, accentColor, className = "" }) => {
    const baseStyle = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0B1120]";
    let variantStyle = "";
    let dynamicStyle = {};

    if (variant === 'primary') {
        variantStyle = "text-white shadow-lg";
        dynamicStyle = { backgroundColor: accentColor || '#F59E0B', boxShadow: `0 4px 14px 0 ${accentColor || '#F59E0B'}40` };
    } else if (variant === 'secondary') {
        variantStyle = "bg-[#0F172A] text-[#F9FAFB] border border-[#1F2937] hover:bg-[#1F2937]";
    } else if (variant === 'danger') {
        variantStyle = "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20";
    } else if (variant === 'ghost') {
        variantStyle = "text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937]";
    }

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`${baseStyle} ${variantStyle} ${className}`}
            style={dynamicStyle}
        >
            {Icon && <Icon className="w-4 h-4 mr-2" />}
            {children}
        </motion.button>
    );
};

// --- MAIN COMPONENT ---

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('appearance');
    const [isSaving, setIsSaving] = useState(false);

    // Real App Settings
    const [settings, setSettings] = useState({
        theme: 'Dark', accent: 'Amber', density: 'Comfortable', sidebar: 'Expanded', borderRadius: 'Medium', animation: 'Normal',
        language: 'English (US)', timezone: 'UTC-08:00 Pacific Time', dateFormat: 'MM/DD/YYYY', autoSave: true, defaultDashboard: 'Overview'
    });

    // Live Studio Preview Settings
    const [preview, setPreview] = useState({ ...settings });
    const hasChanges = JSON.stringify(settings) !== JSON.stringify(preview);
    const accentHex = ACCENT_COLORS[preview.accent];

    const handleApplyChanges = () => {
        setIsSaving(true);
        setTimeout(() => {
            setSettings({ ...preview });
            setIsSaving(false);
        }, 600);
    };

    const handleRevert = () => setPreview({ ...settings });

    // Mouse Parallax Effect for Hero
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const handleMouseMove = (e) => {
        setMousePosition({
            x: (e.clientX / window.innerWidth - 0.5) * 20,
            y: (e.clientY / window.innerHeight - 0.5) * 20
        });
    };

    return (
        <div
            className="min-h-screen text-[#F9FAFB] font-sans overflow-hidden selection:bg-[#F59E0B]/30"
            onMouseMove={handleMouseMove}
        >
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none flex justify-center items-center overflow-hidden">
                <motion.div
                    animate={{ x: mousePosition.x * -2, y: mousePosition.y * -2 }}
                    transition={{ type: "spring", damping: 50, stiffness: 100 }}
                    className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#F59E0B] opacity-[0.03] rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ x: mousePosition.x * 2, y: mousePosition.y * 2 }}
                    transition={{ type: "spring", damping: 50, stiffness: 100 }}
                    className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-[#06B6D4] opacity-[0.02] rounded-full blur-[100px]"
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 space-y-20">

                {/* SECTION 1: HERO */}
                <section className="space-y-10">
                    <div className="text-center space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, type: "spring" }}
                            className="inline-flex items-center justify-center p-4 bg-[#111827] rounded-2xl border border-[#1F2937] shadow-2xl shadow-black/50 mb-4"
                        >
                            <Command size={32} color={accentHex} />
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-[#9CA3AF]"
                        >
                            Settings
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-[#9CA3AF]"
                        >
                            Configure your premium CodeSpark workspace.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { label: 'Workspace Ready', value: '100', suffix: '%', icon: Activity, color: '#10B981' },
                            { label: 'Connected Apps', value: '3', icon: Layers, color: '#F59E0B' },
                            { label: 'Current Theme', value: preview.theme, textOnly: true, icon: Palette, color: '#8B5CF6' },
                            { label: 'Learning Goal', value: '14', suffix: 'h', icon: Zap, color: '#06B6D4' }
                        ].map((stat, i) => (
                            <Card key={i} delay={0.1 * i} className="p-6 flex flex-col justify-between h-32">
                                <div className="flex justify-between items-start">
                                    <span className="text-sm font-medium text-[#9CA3AF]">{stat.label}</span>
                                    <stat.icon size={18} color={stat.color} />
                                </div>
                                <div className="text-3xl font-bold mt-4">
                                    {stat.textOnly ? stat.value : <AnimatedCounter value={stat.value} suffix={stat.suffix} />}
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* ⭐ SIGNATURE FEATURE: LIVE THEME STUDIO & APPEARANCE */}
                <section className="space-y-8">
                    <SectionHeader title="Appearance & Live Studio" subtitle="Design your perfect developer environment." icon={Layout} />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Controls */}
                        <div className="lg:col-span-5 space-y-6">
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold mb-6 flex items-center"><Sliders size={18} className="mr-2 text-[#9CA3AF]" /> Editor Controls</h3>
                                <div className="space-y-2">
                                    <SettingRow
                                        label="Theme Mode"
                                        control={<Select value={preview.theme} options={['Dark', 'Light', 'System']} onChange={v => setPreview({ ...preview, theme: v })} />}
                                    />
                                    <SettingRow
                                        label="Accent Color"
                                        control={
                                            <div className="flex space-x-2">
                                                {Object.entries(ACCENT_COLORS).map(([name, hex]) => (
                                                    <button
                                                        key={name}
                                                        onClick={() => setPreview({ ...preview, accent: name })}
                                                        className={`w-6 h-6 rounded-full focus:outline-none transition-transform ${preview.accent === name ? 'ring-2 ring-offset-2 ring-offset-[#111827] scale-110' : 'hover:scale-110'}`}
                                                        style={{ backgroundColor: hex, ringColor: hex }}
                                                        title={name}
                                                    />
                                                ))}
                                            </div>
                                        }
                                    />
                                    <SettingRow
                                        label="Layout Density"
                                        control={<Select value={preview.density} options={['Comfortable', 'Compact']} onChange={v => setPreview({ ...preview, density: v })} />}
                                    />
                                    <SettingRow
                                        label="Sidebar Style"
                                        control={<Select value={preview.sidebar} options={['Expanded', 'Collapsed', 'Floating']} onChange={v => setPreview({ ...preview, sidebar: v })} />}
                                    />
                                    <SettingRow
                                        label="Border Radius"
                                        control={<Select value={preview.borderRadius} options={['Rounded', 'Medium', 'Sharp']} onChange={v => setPreview({ ...preview, borderRadius: v })} />}
                                    />
                                    <SettingRow
                                        label="Animation Speed"
                                        control={<Select value={preview.animation} options={['Fast', 'Normal', 'Reduced Motion']} onChange={v => setPreview({ ...preview, animation: v })} />}
                                    />
                                </div>
                            </Card>

                            <AnimatePresence>
                                {hasChanges && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, height: 0 }}
                                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                                        exit={{ opacity: 0, y: -10, height: 0 }}
                                        className="flex space-x-4 bg-[#111827] p-4 rounded-xl border border-[#F59E0B]/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                                    >
                                        <Button onClick={handleApplyChanges} accentColor={accentHex} className="flex-1">
                                            {isSaving ? <RefreshCw className="animate-spin w-4 h-4 mr-2" /> : <Check className="w-4 h-4 mr-2" />}
                                            Apply Changes
                                        </Button>
                                        <Button variant="secondary" onClick={handleRevert} icon={RotateCcw}>Reset</Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Live Preview Pane */}
                        <div className="lg:col-span-7">
                            <Card className="h-full flex flex-col overflow-hidden bg-[#0F172A]" hover={false}>
                                <div className="px-4 py-3 border-b border-[#1F2937] flex justify-between items-center bg-[#111827]">
                                    <div className="flex items-center space-x-2">
                                        <Sparkles size={16} className="text-[#F59E0B]" />
                                        <span className="text-xs font-semibold tracking-widest text-[#9CA3AF] uppercase">Live Theme Studio</span>
                                    </div>
                                    <div className="flex space-x-1">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                                    </div>
                                </div>

                                {/* THE MINIATURE OS PREVIEW */}
                                <div className="flex-1 p-6 flex items-center justify-center bg-[#0B1120] overflow-hidden relative">
                                    {/* Subtle Grid Background in Preview */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

                                    <motion.div
                                        layout
                                        transition={{ duration: ANIMATION_SPEEDS[preview.animation] }}
                                        className="relative w-full max-w-[500px] aspect-[16/10] bg-[#111827] border border-[#1F2937] shadow-2xl flex overflow-hidden flex-row"
                                        style={{ borderRadius: BORDER_RADII[preview.borderRadius] }}
                                    >
                                        {/* Mini Sidebar */}
                                        <motion.div
                                            layout
                                            transition={{ duration: ANIMATION_SPEEDS[preview.animation] }}
                                            className="border-r border-[#1F2937] bg-[#0F172A] flex flex-col py-4"
                                            style={{
                                                width: preview.sidebar === 'Collapsed' ? '48px' : '120px',
                                                position: preview.sidebar === 'Floating' ? 'absolute' : 'relative',
                                                height: preview.sidebar === 'Floating' ? '90%' : '100%',
                                                left: preview.sidebar === 'Floating' ? '8px' : '0',
                                                top: preview.sidebar === 'Floating' ? '5%' : '0',
                                                borderRadius: preview.sidebar === 'Floating' ? BORDER_RADII_MINI[preview.borderRadius] : '0',
                                                zIndex: 10
                                            }}
                                        >
                                            <div className="px-3 mb-6 flex items-center overflow-hidden whitespace-nowrap">
                                                <Command size={20} color={accentHex} className="flex-shrink-0" />
                                                {preview.sidebar !== 'Collapsed' && <span className="ml-2 text-xs font-bold">CodeSpark</span>}
                                            </div>
                                            <div className="space-y-2 px-2 flex-1">
                                                {[Layout, Activity, Zap, User].map((Icon, i) => (
                                                    <div key={i} className={`h-8 rounded flex items-center px-2 ${i === 0 ? 'bg-[#1F2937]' : 'opacity-50'} overflow-hidden whitespace-nowrap`} style={{ borderRadius: BORDER_RADII_MINI[preview.borderRadius] }}>
                                                        <Icon size={14} className="flex-shrink-0" style={{ color: i === 0 ? accentHex : '#9CA3AF' }} />
                                                        {preview.sidebar !== 'Collapsed' && <div className="ml-2 w-12 h-1.5 bg-[#9CA3AF] rounded opacity-30" />}
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>

                                        {/* Mini Main Content */}
                                        <div className="flex-1 flex flex-col" style={{ paddingLeft: preview.sidebar === 'Floating' ? '136px' : '0' }}>
                                            {/* Mini Topnav */}
                                            <div className="h-10 border-b border-[#1F2937] flex items-center justify-between px-4">
                                                <div className="w-32 h-5 bg-[#0F172A] rounded border border-[#1F2937] flex items-center px-2" style={{ borderRadius: BORDER_RADII_MINI[preview.borderRadius] }}>
                                                    <Search size={10} className="text-[#9CA3AF]" />
                                                    <div className="w-16 h-1 ml-2 bg-[#9CA3AF] opacity-20 rounded" />
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Bell size={12} className="text-[#9CA3AF]" />
                                                    <div className="w-4 h-4 rounded-full bg-[#1F2937]" />
                                                </div>
                                            </div>

                                            {/* Mini Dashboard */}
                                            <div className={"flex-1 p-4 overflow-hidden space-y-" + (preview.density === 'Compact' ? '2' : '4')}>
                                                <div className="w-24 h-3 bg-[#9CA3AF] opacity-20 rounded mb-2" />

                                                <div className="grid grid-cols-2 gap-4">
                                                    <motion.div layout transition={{ duration: ANIMATION_SPEEDS[preview.animation] }} className="bg-[#0F172A] p-3 border border-[#1F2937]" style={{ borderRadius: BORDER_RADII_MINI[preview.borderRadius] }}>
                                                        <div className="w-8 h-8 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${accentHex}20` }}>
                                                            <Activity size={12} color={accentHex} />
                                                        </div>
                                                        <div className="w-16 h-2 bg-[#9CA3AF] opacity-30 rounded mb-1" />
                                                        <div className="w-10 h-4 bg-white opacity-80 rounded" />
                                                    </motion.div>
                                                    <motion.div layout transition={{ duration: ANIMATION_SPEEDS[preview.animation] }} className="bg-[#0F172A] p-3 border border-[#1F2937] flex flex-col justify-end" style={{ borderRadius: BORDER_RADII_MINI[preview.borderRadius] }}>
                                                        <div className="flex items-end space-x-1 h-12">
                                                            <div className="w-full bg-[#1F2937] rounded-t h-4" />
                                                            <div className="w-full bg-[#1F2937] rounded-t h-8" />
                                                            <div className="w-full rounded-t h-10" style={{ backgroundColor: accentHex }} />
                                                            <div className="w-full bg-[#1F2937] rounded-t h-6" />
                                                        </div>
                                                    </motion.div>
                                                </div>

                                                <motion.div layout transition={{ duration: ANIMATION_SPEEDS[preview.animation] }} className="w-full h-12 bg-[#0F172A] border border-[#1F2937] flex items-center px-3" style={{ borderRadius: BORDER_RADII_MINI[preview.borderRadius] }}>
                                                    <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: accentHex }}>
                                                        <Check size={12} className="text-white" />
                                                    </div>
                                                    <div className="ml-3 flex-1">
                                                        <div className="w-20 h-2 bg-white opacity-80 rounded mb-1.5" />
                                                        <div className="w-full h-1 bg-[#1F2937] rounded overflow-hidden">
                                                            <div className="h-full w-2/3" style={{ backgroundColor: accentHex }} />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* ⭐ SIGNATURE FEATURE: THEME PRESETS */}
                <section className="space-y-6">
                    <SectionHeader title="Theme Presets" subtitle="Instantly switch your entire workspace vibe." icon={Palette} />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {THEME_PRESETS.map((preset, i) => (
                            <Card key={preset.id} delay={i * 0.1} className="group cursor-pointer">
                                <div
                                    className="h-24 relative overflow-hidden flex items-end p-4 border-b border-[#1F2937]"
                                    style={{ background: `linear-gradient(135deg, ${preset.colors[0]}, ${preset.colors[2]})` }}
                                    onClick={() => setPreview(preset.settings)}
                                >
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20" />
                                    <motion.div
                                        layoutId={`preset-accent-${preset.id}`}
                                        className="w-8 h-8 rounded shadow-lg flex items-center justify-center z-10"
                                        style={{ backgroundColor: preset.colors[1] }}
                                    >
                                        <Code size={16} className="text-white" />
                                    </motion.div>

                                    {/* Miniature abstract UI in background */}
                                    <div className="absolute right-4 bottom-[-10px] w-24 h-16 bg-white/5 rounded-t-xl border border-white/10" />
                                    <div className="absolute right-8 bottom-4 w-16 h-2 rounded bg-white/20" />
                                    <div className="absolute right-8 bottom-8 w-10 h-2 rounded" style={{ backgroundColor: preset.colors[1] }} />
                                </div>

                                <div className="p-4" onClick={() => setPreview(preset.settings)}>
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="text-sm font-semibold text-[#F9FAFB]">{preset.name}</h4>
                                        {JSON.stringify(preview) === JSON.stringify(preset.settings) && (
                                            <span className="flex h-2 w-2 relative">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: accentHex }}></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: accentHex }}></span>
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-[#9CA3AF]">{preset.desc}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* SECTION: WORKSPACE */}
                <section className="space-y-6">
                    <SectionHeader title="Workspace" subtitle="Configure regional and global preferences." icon={Globe} />
                    <Card className="p-2">
                        <div className="px-4">
                            <SettingRow
                                label="Language"
                                description="Your primary interface language."
                                control={<Select value={preview.language} options={['English (US)', 'Spanish', 'French', 'Japanese']} onChange={() => { }} />}
                            />
                            <SettingRow
                                label="Timezone"
                                control={<Select value={preview.timezone} options={['UTC-08:00 Pacific Time', 'UTC-05:00 Eastern Time', 'UTC+00:00 GMT']} onChange={() => { }} />}
                            />
                            <SettingRow
                                label="Date Format"
                                control={<Select value={preview.dateFormat} options={['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']} onChange={() => { }} />}
                            />
                            <SettingRow
                                label="Auto Save"
                                description="Automatically save changes in the editor."
                                control={<Toggle enabled={preview.autoSave} onChange={v => setPreview({ ...preview, autoSave: v })} accentColor={accentHex} />}
                            />
                        </div>
                    </Card>
                </section>

                {/* SECTION: LEARNING PREFERENCES */}
                <section className="space-y-6">
                    <SectionHeader title="Learning Preferences" subtitle="Set your goals and track progress." icon={BookOpen} />
                    <Card className="p-6">
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-[#F9FAFB]">Daily Learning Goal</label>
                                    <span className="text-sm font-bold" style={{ color: accentHex }}>14 Hours</span>
                                </div>
                                <input
                                    type="range"
                                    min="1" max="24" defaultValue="14"
                                    className="w-full h-2 bg-[#1F2937] rounded-lg appearance-none cursor-pointer accent-[#F59E0B]"
                                    style={{ accentColor: accentHex }}
                                />
                                <div className="flex justify-between text-xs text-[#9CA3AF] mt-2">
                                    <span>1h</span><span>12h</span><span>24h</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#F9FAFB]">Preferred Technology</label>
                                    <Select value="React.js" options={['React.js', 'Vue.js', 'Python', 'Go', 'Rust']} onChange={() => { }} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#F9FAFB]">Reminder Time</label>
                                    <input
                                        type="time"
                                        defaultValue="09:00"
                                        className="bg-[#0F172A] border border-[#1F2937] text-[#F9FAFB] text-sm rounded-lg focus:ring-[#F59E0B] focus:border-[#F59E0B] block w-full p-2.5 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* SECTION: DEVELOPER INTEGRATIONS */}
                <section className="space-y-6">
                    <SectionHeader title="Developer Integrations" subtitle="Connect your favorite platforms." icon={Database} />
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {INTEGRATIONS.map((integration, i) => (
                            <Card key={integration.id} delay={i * 0.1} className="p-5 flex flex-col justify-between">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-[#0F172A] border border-[#1F2937] rounded-lg">
                                            <integration.icon size={20} className="text-[#F9FAFB]" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-[#F9FAFB]">{integration.name}</h4>
                                            <div className="flex items-center mt-1">
                                                <span className={`w-2 h-2 rounded-full mr-2 ${integration.connected ? 'bg-green-500' : 'bg-[#9CA3AF]'}`} />
                                                <span className="text-xs text-[#9CA3AF]">{integration.connected ? 'Connected' : 'Not Connected'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-2 pt-4 border-t border-[#1F2937]/50">
                                    <span className="text-xs text-[#9CA3AF]">
                                        {integration.lastSync ? `Synced ${integration.lastSync}` : '—'}
                                    </span>
                                    {integration.connected ? (
                                        <div className="flex space-x-2">
                                            <Button variant="ghost" className="!p-2"><RefreshCw size={14} /></Button>
                                            <Button variant="secondary" className="!text-xs !px-3 !py-1.5">Disconnect</Button>
                                        </div>
                                    ) : (
                                        <Button variant="secondary" className="!text-xs !px-3 !py-1.5">Connect</Button>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* SECTION: DATA MANAGEMENT & DANGER ZONE */}
                <section className="space-y-6">
                    <SectionHeader title="Data Management" subtitle="Manage your local data and backups." icon={Download} />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="p-6 space-y-4">
                            <h3 className="text-sm font-semibold text-[#F9FAFB]">Export & Backup</h3>
                            <p className="text-xs text-[#9CA3AF]">Download your configurations, progress, and journal data safely to your local machine.</p>
                            <div className="flex flex-wrap gap-3 pt-2">
                                <Button variant="secondary" icon={Download}>Export Progress</Button>
                                <Button variant="secondary" icon={Download}>Export Analytics</Button>
                                <Button variant="secondary" icon={Download}>Download Backup</Button>
                            </div>
                        </Card>

                        <Card className="p-6 border-red-900/30 bg-gradient-to-br from-[#111827] to-red-950/10">
                            <div className="flex items-start space-x-3">
                                <AlertCircle size={20} className="text-red-500 mt-1" />
                                <div>
                                    <h3 className="text-sm font-semibold text-red-500">Danger Zone</h3>
                                    <p className="text-xs text-[#9CA3AF] mt-1 mb-4">Actions here are permanent and cannot be undone. Please be certain before proceeding.</p>
                                    <div className="space-x-3">
                                        <Button variant="danger" icon={Trash2}>Clear Cache</Button>
                                        <Button variant="danger" icon={Lock}>Delete Local Data</Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </section>

                {/* SECTION: ABOUT CODESPARK */}
                {/* SECTION: ABOUT CODESPARK */}
                <footer className="mt-24 pt-12 pb-8 border-t border-[#1F2937]">

                    {/* Logo */}
                    <div className="flex justify-center items-center gap-3 mb-6">
                        <Command
                            size={24}
                            color={accentHex}
                        />

                        <h3 className="text-2xl font-bold tracking-tight text-[#F9FAFB]">
                            CodeSpark
                        </h3>

                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#1F2937] border border-[#374151] text-[#9CA3AF]">
                            v1.0.0
                        </span>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-8 text-sm text-[#9CA3AF]">

                        <a
                            href="#"
                            className="transition-all duration-200 hover:text-[#F59E0B] hover:-translate-y-0.5"
                        >
                            Release Notes
                        </a>

                        <a
                            href="#"
                            className="transition-all duration-200 hover:text-[#F59E0B] hover:-translate-y-0.5"
                        >
                            Privacy Policy
                        </a>

                        <a
                            href="#"
                            className="transition-all duration-200 hover:text-[#F59E0B] hover:-translate-y-0.5"
                        >
                            Terms of Service
                        </a>

                        <a
                            href="#"
                            className="transition-all duration-200 hover:text-[#F59E0B] hover:-translate-y-0.5"
                        >
                            GitHub Repository
                        </a>

                    </div>

                    {/* Divider */}
                    <div className="w-full max-w-xl mx-auto h-px bg-[#1F2937] my-8" />

                    {/* Version */}
                    <div className="flex justify-center items-center gap-2 text-sm text-[#9CA3AF]/80">

                        <Command
                            size={16}
                            color={accentHex}
                        />

                        <span>
                            CodeSpark Version <strong className="text-[#F9FAFB]">1.0.0</strong>
                        </span>

                    </div>

                    {/* Tech Stack */}
                    <p className="mt-3 text-center text-sm text-[#6B7280]">
                        Built with React • Express • MongoDB
                    </p>

                    {/* Copyright */}
                    <p className="mt-6 text-center text-xs text-[#4B5563]">
                        © {new Date().getFullYear()} CodeSpark. All rights reserved.
                    </p>

                </footer>

            </div>
        </div>
    );
}